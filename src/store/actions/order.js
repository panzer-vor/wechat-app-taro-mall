import {
  SWITCH_CURRENT
} from '../constants/order'

export const switchCurrent = (index) => ({
  type: SWITCH_CURRENT,
  payload: ~~index,
})

