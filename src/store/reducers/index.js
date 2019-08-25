import { combineReducers } from 'redux'
import counter from './counter'
import coupons from './coupons'
import order from './order'
import address from './address'
import globalState from './global'

export default combineReducers({
  counter,
  coupons,
  order,
  address,
  globalState,
})
