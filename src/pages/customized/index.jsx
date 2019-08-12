import Taro from '@tarojs/taro'
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components'
import customizedBanner from 'assets/customizedBanner.png'
import './index.scss'

function Customized() {
  
  const tyreSwiper = <Swiper
    indicatorColor='#EEEEEE'
    indicatorActiveColor='#FFB24E'
    circular
    indicatorDots
    className='customizedSwiper'
  >
    <SwiperItem>
      1
    </SwiperItem>
    <SwiperItem>
      2
    </SwiperItem>
  </Swiper>

  return(
    <View>
      <View className='customizedBanner'>
        <Image src={customizedBanner} />
      </View>
      <View className='customizedCard'>
        <View className='customizedTitle'>轮胎定制</View>
        {tyreSwiper}
      </View>
      <View className='customizedCard'>
        <View className='customizedTitle'>轮胎花纹</View>
        {tyreSwiper}
      </View>
      <View className='seat'></View>
      <View className='customizeBottom'>
        <View className='customizePrice'>
          合计: <Text>¥800</Text>
        </View>
        <View className='customizeButton'>
          加入购物车
        </View>
      </View>
    </View>
  )
}

Customized.config = {
  navigationBarTitleText: '定制轮胎'
}

export default Customized