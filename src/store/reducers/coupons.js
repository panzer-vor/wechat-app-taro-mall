import { SWITCH_CURRENT } from '../constants/coupons'

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
     default:
       return state
  }
}
