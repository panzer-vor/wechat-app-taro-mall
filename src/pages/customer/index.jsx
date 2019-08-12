import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import head from 'assets/customer-head.png'
import wave from 'assets/customer-wave.png'
import code from 'assets/customer-code.png'
import bg from './bg'
import './index.scss'

function Customer () {
  return (
    <View className='index'>
      <View 
        className='customer--wrapper'
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
        <Image className='customer--head' src={head} />
        <View className='customer--title'>
          <Image className='customer--wave' src={wave} />
          <Text>在线客服</Text>
        </View>
        <Text className='customer--more'>邀请更多好友前来加入</Text>
        <Image className='customer--code' src={code} />
        <Text className='customer--last'>欢迎咨询选购</Text>
      </View>
    </View>
  )
}

Customer.config = {
  navigationBarTitleText: '在线客服'
}

export default Customer
