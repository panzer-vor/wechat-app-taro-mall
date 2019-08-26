import { get } from 'utils/request'
import { getToken } from 'utils/tools'
import {
  SWITCH_COUPONS_CURRENT,
  GET_ALL_COUPONS,
  SET_ENABLE_LIST_NUMBER,
  SET_COUPONS_CURRENT_LIST,
  SET_SELECTED_COUPONS,
} from '../constants/coupons'

export const switchCurrent = (index) => ({
  type: SWITCH_COUPONS_CURRENT,
  payload: ~~index,
})

export const setSelectedCoupons = (item) => ({
  type: SET_SELECTED_COUPONS,
  payload: item,
})

export const getAllCoupons = () => async dispatch => {
  const token = await getToken()
  const res = await get({
    uri: 'discounts/my',
    data: {
      token,
    }
  })

  const list = res.data.sort((a, b) => a.status - b.status)

  const number = list.filter(v => v.status === 0).length

  dispatch({
    type: GET_ALL_COUPONS,
    payload: list
  })

  dispatch(setCurrentList())

  dispatch(setEnableNumber(number))
}

export const setEnableNumber = (number) => ({
  type: SET_ENABLE_LIST_NUMBER,
  payload: number,
})

export const setCurrentList = () => (dispatch, getState) => {
  const { list, current } = getState().coupons
  if (current === 0) {
    dispatch({
      type: SET_COUPONS_CURRENT_LIST,
      payload: list,
    })
  } else {
    dispatch({
      type: SET_COUPONS_CURRENT_LIST,
      payload: list.filter(v => v.status !== 0),
    })
  }
}


