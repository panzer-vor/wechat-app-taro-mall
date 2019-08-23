import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import * as R from 'ramda'

export const dateDiffDay = (d1, d2) => {
  const day1 = dayjs(d1)
  const day2 = dayjs(d2)
  return day1.diff(day2, 'day')
}

export const linkTo = R.compose(
  R.thunkify(Taro.navigateTo),
  ([pageUri, params]) => ({ url: `/pages/${pageUri}/index${params ? `?${params}` : ''}` }),
  R.split('?'),
)