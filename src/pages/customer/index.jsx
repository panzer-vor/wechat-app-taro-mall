import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import bg from 'assets/customer-bg.png'
import head from 'assets/customer-head.png'
import './index.scss'

function Customer () {


  return (
    <View className='index'>
      <View 
        className='customer--wrapper'
        style={{
          background: `url(${bg})`
        }}
      >
        <Image className='customer--head' src={head} />
      </View>
    </View>
  )
}

Customer.config = {
  navigationBarTitleText: '在线客服'
}

export default Customer
