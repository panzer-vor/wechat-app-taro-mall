import { combineReducers } from 'redux'
import counter from './counter'
import coupons from './coupons'
import order from './order'
import address from './address'

export default combineReducers({
  counter,
  coupons,
  order,
  address,
})
