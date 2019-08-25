import Taro from '@tarojs/taro'
import { SET_USER_INFO } from '../constants/global'

const INITIAL_STATE = {
  userInfo: Taro.getStorageSync('userInfo') || {},
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      }
    default:
      return state
  }
}