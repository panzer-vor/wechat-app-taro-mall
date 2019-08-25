import { SWITCH_CURRENT, GET_ORDER_LIST, SET_CURRENT_LIST } from '../constants/order'

const INITIAL_STATE = {
  current: 0,
  list: [],
  currentList: [],
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
     default:
       return state
  }
}
