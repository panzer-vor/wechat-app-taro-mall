import Taro from '@tarojs/taro'
import * as R from 'ramda'
import {
  PUBLIC_URL
} from 'config/globalConfig'


const optionDefault = {
  data: {},
  contentType: 'json',
  publicUrl: PUBLIC_URL,
  loading: true,
}

const handleOptions = R.ifElse(
  R.compose(
    R.equals('String'),
    R.type,
  ),
  R.assoc('uri', R.__, optionDefault),
  R.merge(optionDefault)
)

const ContentType = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded',
  'formData': 'multipart/form-data',
}

export const request = (method = 'GET') => options => 
  new Promise((resolve, reject) => {
    const { uri, data, contentType, publicUrl, loading } = handleOptions(options)

    loading && Taro.showLoading({title: '加载中，请稍候'})

    Taro.request({
      url: `${publicUrl}${uri}`,
      data,
      method,
      header: {
        'content-type': ContentType[contentType]
      },
      success(res) {
        if (res.statusCode !== 200) {
          Taro.showModal({
            content: res.data.msg,
            showCancel: false
          })
          return
        }
        resolve(res.data)
      },
      fail(error) {
        Taro.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500
        })
        .then(() => reject(error))
      },
      complete() {
        loading && Taro.hideLoading()
      }
    })
  })
  

export const get = request()

export const post = R.compose(
  request('POST'),
  R.merge({ contentType: 'form' }),
)
