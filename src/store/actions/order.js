import Taro from '@tarojs/taro'
import { post } from 'utils/request'
import { getToken } from 'utils/tools'
import * as R from 'ramda'
import {
  SWITCH_CURRENT,
  GET_ORDER_LIST,
  SET_CURRENT_LIST,
  SET_ORDER_NUMBER,
} from '../constants/order'

const handleStatus = R.cond([
  [R.equals(0), R.always('待付款')],
  [R.equals(1), R.always('待安装')],
  [R.T, R.always('已关闭')],
])

export const setCurrentList = () => (dispatch, getState) => {
  const { list, current } = getState().order

  if (current === 0) {
    dispatch({
      type: SET_CURRENT_LIST,
      payload: list,
    })
  } else {
    dispatch({
      type: SET_CURRENT_LIST,
      payload: list.filter(v => (current - 1) === v.status),
    })
  }
}

export const switchCurrent = (index) => ({
  type: SWITCH_CURRENT,
  payload: ~~index,
})

export const getOrderList = () => async (dispatch) => {
  const token = await getToken()
  const response = await post({
    uri: 'order/list',
    data: {
      token,
    },
  })
  const { data } = response

  const list = data.orderList
    .map(v => ({
      ...v,
      goods: data.goodsMap[v.id].map(val => ({
        ...val,
        property: val.property.split(',').map(p => p.split(':')[1])
      })),
      statusType: handleStatus(v.status),
    }))
    .sort((a, b) => b.status - a.status)

  dispatch({
    type: GET_ORDER_LIST,
    payload: list,
  })
  
  const notPayNumber = list.filter(v => v.status === 0).length
  const notInstallNumber = list.filter(v => v.status === 1).length

  dispatch(setOrderNumber(notPayNumber, notInstallNumber))

  dispatch(setCurrentList())
} 

export const deleteOrder = id => async dispatch => {
  const token = await getToken()
  const response = await post({
    uri: 'order/close',
    data: {
      orderId: id,
      token,
    }
  })

  if (response.code) {
    Taro.showModal({
      content: response.msg,
      showCancel: false
    })
  } else {
    dispatch(getOrderList())
  }
}

export const payOrder = order => async dispatch => {
  const token = await getToken()
  const pay = await post({
    uri: 'pay/wx/wxapp',
    data: {
      money: order.amountReal || .01,
      token,
    },
  })
  if (pay.code) {
    Taro.showModal({
      content: pay.msg,
      showCancel: false,
    })
    return
  }
  Taro.requestPayment({
    timeStamp: pay.data.timeStamp,
    nonceStr: pay.data.nonceStr,
    package: 'prepay_id=' + pay.data.prepayId,
    signType: 'MD5',
    paySign: pay.data.sign,
    success: async () => {
      const res = await post({
        uri: 'order/pay',
        data: {
          token,
          orderId: order.id,
        }
      })
      if (res.code) {
        Taro.showModal({
          content: res.msg,
          showCancel: false,
        })
      } else {
        dispatch(getOrderList())
      }
    },
    complete() {
      console.log('finish')
    }
  })
}

export const setOrderNumber = (orderNumberNotPay = 0, orderNumberNotInstall = 0) => ({
  type: SET_ORDER_NUMBER,
  payload: {
    orderNumberNotPay,
    orderNumberNotInstall,
  }
})