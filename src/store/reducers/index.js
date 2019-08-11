import { combineReducers } from 'redux'
import counter from './counter'
import coupons from './coupons'

export default combineReducers({
  counter,
  coupons,
})
