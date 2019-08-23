import { get } from 'utils/request'
import {
  SWITCH_CURRENT,
  GET_ALL_COUPONS,
} from '../constants/coupons'
import { dateDiffDay } from 'utils/tools'

export const switchCurrent = (index) => ({
  type: SWITCH_CURRENT,
  payload: index,
})

export const getAllCoupons = () => async dispatch => {
  const res = await get({ uri: 'discounts/coupons' })
  const maxNumber = res.data.moneyHreshold
  const { type, name, id, dateEnd, dateEndDays } = res.data

  let mainName = name
  switch (type) {
    case '满减':
      mainName = ''
  }

  return dispatch({
    type: GET_ALL_COUPONS,
    payload: res.data
  })
}
  

  

