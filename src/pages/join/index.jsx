import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import join from 'assets/join-us.png'
import './index.scss'

function Join () {

  return (
    <View className='index'>
      <Image src={join} />
    </View>
  )
}

Join.config = {
  navigationBarTitleText: '加入我们'
}

export default Join