import Taro from '@tarojs/taro'
import {
  PUBLIC_URL
} from 'config/globalConfig'

const ContentType = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded',
  'formData': 'multipart/form-data',
}

export const request = (method = 'GET') => 
({
  uri,
  data,
  contentType = 'json',
  publicUrl = PUBLIC_URL,
  loading = true,
}) => 
  new Promise((resolve, reject) => {
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

export const post = request('POST')