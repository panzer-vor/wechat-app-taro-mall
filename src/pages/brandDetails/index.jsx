import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import customizedBanner from 'assets/customizedBanner.png'

function BrandDetails() {
  return (
    <View>
      <View className='customizedBanner'>
        <Image src={customizedBanner} />
      </View>
      <View className='brandDetails'>
        <Image src={customizedBanner} />
      </View>
    </View>
  )
}

BrandDetails.config = {
  navigationBarTitleText: '品牌详情'
}

export default BrandDetails