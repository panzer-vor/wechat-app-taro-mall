import Taro from '@tarojs/taro'
import {
  PUBLIC_URL
} from 'config/globalConfig'

const ContentType = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded',
  'formData': 'multipart/form-data',
}

export const request = ({
  uri,
  data,
  contentType = 'json',
  publicUrl = PUBLIC_URL,
  loading = true,
  method = 'GET'
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
        resolve(res)
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

export const get = (config) => 
  request({ ...config, method: 'GET' })

export const post = (config) => 
  request({ ...config, method: 'POST'}) 