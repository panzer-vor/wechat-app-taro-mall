import Taro from '@tarojs/taro'
import QQMapWX from 'utils/qqmap-wx-jssdk'
import { post } from 'utils/request'
import { WX_MAP_KEY } from 'config/globalConfig'
import { GET_SEARCH_ITEMS, SELECT_KEYWORD, SET_LOCATION, GET_SHOP_LIST } from '../constants/address.js'

const qqmapsdk = new QQMapWX({
  key: WX_MAP_KEY
})

export const getShopList = (curlatitude, curlongitude) => async dispatch => {
  const response = await post({
    uri: 'shop/subshop/list',
    data: {
      curlatitude,
      curlongitude,
    }
  })

  return dispatch({
    type: GET_SHOP_LIST,
    payload: response.data || [],
  })
} 

export const getSearchItems = keyword => async dispatch => {
  qqmapsdk.getSuggestion({
    keyword,
    success(res) {
      return dispatch({
        type: GET_SEARCH_ITEMS,
        payload: res.data
      })
    },
    fail() {
      Taro.showToast({
        title: '地址获取失败',
        duration: 2000,
      })
    },
  })
}

export const setLocation = () => async dispatch => {
  const response = await Taro.getLocation({
    type: 'wgs84'
  })

  dispatch({
    type: SET_LOCATION,
    payload: response,
  })

  dispatch(getShopList(response.longitude, response.longitude))
}

export const selectKeyword = (item) => ({
  type: SELECT_KEYWORD,
  payload: item
})

export const getDirection = () => async dispatch => {
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  const response = await 

  return dispatch({
    type: ,
    payload: ,
  })
}
