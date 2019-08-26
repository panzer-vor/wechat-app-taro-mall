import { SWITCH_CURRENT, GET_ORDER_LIST, SET_CURRENT_LIST, SET_ORDER_NUMBER } from '../constants/order'

const INITIAL_STATE = {
  current: 0,
  list: [],
  currentList: [],
  orderNumberNotPay: 0,
  orderNumberNotInstall: 0,
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SWITCH_CURRENT:
      return {
        ...state,
        current: payload
      }
    case GET_ORDER_LIST:
      return {
        ...state,
        list: payload,
      }
    case SET_CURRENT_LIST:
      return {
        ...state,
        currentList: payload,
      }
    case SET_ORDER_NUMBER:
      return {
        ...state,
        ...payload,
      }
     default:
       return state
  }
}
