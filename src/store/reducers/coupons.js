import { SWITCH_CURRENT, GET_ALL_COUPONS } from '../constants/coupons'

const INITIAL_STATE = {
  current: 0,
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SWITCH_CURRENT:
      return {
        ...state,
        current: payload
      }
    case GET_ALL_COUPONS:
      return {
        ...state,
        coupons: payload
      }
     default:
       return state
  }
}
