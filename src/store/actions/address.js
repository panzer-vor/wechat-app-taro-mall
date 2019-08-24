import Taro from '@tarojs/taro'
import QQMapWX from 'utils/qqmap-wx-jssdk'
import { post } from 'utils/request'
import { WX_MAP_KEY } from 'config/globalConfig'
import { GET_SEARCH_ITEMS, SELECT_KEYWORD, SET_LOCATION, GET_SHOP_LIST, GET_DIRECTION, RESET_MAP, SELECT_SHOP } from '../constants/address.js'

const qqmapsdk = new QQMapWX({
  key: WX_MAP_KEY
})

export const getShopList = (curlatitude, curlongitude) => async dispatch => {
  const response = await post({
    uri: 'shop/subshop/list',
    data: {
      curlatitude,
      curlongitude,
    }
  })

  return dispatch({
    type: GET_SHOP_LIST,
    payload: response.data || [],
  })
} 

export const getSearchItems = keyword => async dispatch => {
  qqmapsdk.getSuggestion({
    keyword,
    success(res) {
      return dispatch({
        type: GET_SEARCH_ITEMS,
        payload: res.data
      })
    },
    fail() {
      Taro.showToast({
        title: '地址获取失败',
        duration: 2000,
      })
    },
  })
}

export const setLocation = () => async dispatch => {
  const response = await Taro.getLocation({
    type: 'wgs84'
  })

  dispatch({
    type: SET_LOCATION,
    payload: response,
  })

  dispatch(getShopList(response.longitude, response.longitude))
}

export const selectKeyword = (item) => ({
  type: SELECT_KEYWORD,
  payload: item
})

export const getDirection = (from, to) => async dispatch => {
  qqmapsdk.direction({
    mode: 'driving',
    from,
    to, 
    success (res) {
      const coors = res.result.routes[0].polyline, pl = [];
      const kr = 1000000;
      for (let i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
      }
      for (let i = 0; i < coors.length; i += 2) {
        pl.push({ latitude: coors[i], longitude: coors[i + 1] })
      }
      dispatch({
        type: GET_DIRECTION,
        payload: {
          points: pl,
          color: '#FE5957',
          width: 4  
        }
      })
    },
  })
}

export const resetMap = () => ({
  type: RESET_MAP,
})

export const selectShop = (item) => ({
  type: SELECT_SHOP,
  payload: item,
})