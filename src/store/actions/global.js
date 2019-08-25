import Taro from '@tarojs/taro'
import { SET_USER_INFO } from '../constants/global'

export const setUserInfo = (data) => ({
  type: SET_USER_INFO,
  payload: data,
})
