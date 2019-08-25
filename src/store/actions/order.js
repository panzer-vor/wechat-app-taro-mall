import { get } from 'utils/request'
import {
  SWITCH_CURRENT,
  GET_ORDER_LIST,
} from '../constants/order'

export const switchCurrent = (index) => ({
  type: SWITCH_CURRENT,
  payload: ~~index,
})

export const getOrderList = (index) => async dispatch => {
  const response = await get('order/list')

  return dispatch({
    type: GET_ORDER_LIST,
    payload: response.data,
  })
} 
