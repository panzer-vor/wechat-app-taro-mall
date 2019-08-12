import {
  SWITCH_CURRENT
} from '../constants/coupons'

export const switchCurrent = (index) => ({
  type: SWITCH_CURRENT,
  payload: index,
})

