import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import * as R from 'ramda'
import { post } from './request'

export const dateDiffDay = (d1, d2) => {
  const day1 = dayjs(d1)
  const day2 = dayjs(d2)
  return day1.diff(day2, 'day')
}

export const linkTo = R.compose(
  R.ifElse(
    R.compose(
      R.test(/^\/pages\/(index|userCenter)/),
      R.prop('url'),
    ),
    R.thunkify(Taro.switchTab),
    R.thunkify(Taro.navigateTo),
  ),
  ([pageUri, params]) => ({url:`/pages/${pageUri}/index${params ? `?${params}` : ''}`}),
  R.split('?'),
)

export const linkBack = Taro.navigateBack

export const getToken = () => 
  new Promise(resolve => {
    Taro.login({
      success:res => {
        post({
          uri: 'user/wxapp/login',
          data: {
            code:res.code
          },
          contentType: 'form'
        })
        .then(response => {
          resolve(response.data.token)
        })
      }
    })
  })

export const handleStr = (str) => {
  const catchArr = []
  const catchedStr = str.matchAll(/(?<=\W+:)\w+[^\u0000-\u00FF]+/g)

  let value = catchedStr.next()
  while (value.value) {
    catchArr.push(value.value[0])
    value = catchedStr.next()
  }

  return catchArr
}

  