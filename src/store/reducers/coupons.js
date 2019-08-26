import { SWITCH_COUPONS_CURRENT, GET_ALL_COUPONS, 
  SET_COUPONS_CURRENT_LIST, SET_ENABLE_LIST_NUMBER, SET_SELECTED_COUPONS } from '../constants/coupons'

const INITIAL_STATE = {
  current: 0,
  list: [],
  currentList: [],
  enableNumber: 0,
  selectedCoupons: {},
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SWITCH_COUPONS_CURRENT:
      return {
        ...state,
        current: payload
      }
    case GET_ALL_COUPONS:
      return {
        ...state,
        list: payload
      }
    case SET_COUPONS_CURRENT_LIST:
      return {
        ...state,
        currentList: payload,
      }
    case SET_ENABLE_LIST_NUMBER:
      return {
        ...state,
        enableNumber: payload,
      }
    case SET_SELECTED_COUPONS:
      return {
        ...state,
        selectedCoupons: payload,
      }
     default:
       return state
  }
}
