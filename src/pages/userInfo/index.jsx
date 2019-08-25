import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { post } from 'utils/request'
import { useDispatch } from '@tarojs/redux'
import { setUserInfo, setToken } from 'actions/global'
import './index.scss'

function GetUserInfo() {
  const dispatch = useDispatch()

  const getToken = () => {
    Taro.login({
      success:res => {
        post({
          uri: 'user/wxapp/login',
          data: {
            code:res.code
          },
          contentType: 'form'
        })
        .then(resolve => {
          dispatch(setToken(resolve.data.token))
          Taro.setStorageSync('token', resolve.data.token)
        })
      }
    })
  }

  const getUserInfo = () => {
    Taro.login({
      success:() => {
        Taro.login({
          success: function(res) {
            Taro.getUserInfo({
              success: function(resolve) {
                dispatch(setUserInfo(resolve.userInfo))
                Taro.setStorageSync('userInfo', resolve.userInfo)
                post({
                  uri: 'user/wxapp/register/complex',
                  data: {
                    code: res.code,
                    encryptedData: resolve.encryptedData,
                    iv: resolve.iv
                  },
                  contentType: 'form'
                })
                .then(event => {
                  if(event.code === 10000 || event.code === 0){
                    getToken()
                    Taro.reLaunch({
                      url: '/pages/index/index'
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  return(
    <View>
      <AtButton openType='getUserInfo' onGetUserInfo={getUserInfo}>
        授权登陆
      </AtButton>
    </View>
  )
}

GetUserInfo.config = {
  navigationBarTitleText: '授权'
}

export default GetUserInfo