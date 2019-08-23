import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import {post} from 'utils/request'
import Index from './pages/index'
import configStore from './store'

import './app.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/list/index',
      'pages/customer/index',
      'pages/address/index',
      'pages/userCenter/index',
      'pages/coupons/index',
      'pages/search/index',
      'pages/order/index',
      'pages/customized/index',
      'pages/join/index',
      'pages/confirmOrder/index',
      'pages/waitInstall/index',
      'pages/brandDetails/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '##666666',
      selectedColor: '#FE5957',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/homeIcon.png',
        selectedIconPath: './assets/homeSelectIcon.png'
      },{
        pagePath: 'pages/userCenter/index',
        text: '个人中心',
        iconPath: './assets/personalIcon.png',
        selectedIconPath: './assets/personalSelectIcon.png'
      }]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于在地图中定位'
      }
    },
  }

  componentDidMount () {
    Taro.login({
      success: function(res) {
        Taro.getUserInfo({
          success: function(resolve) {
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
              console.log(event.msg)
            })
          }
        })
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
