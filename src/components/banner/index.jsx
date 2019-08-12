import Taro from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'

function Banner() {
  return (
    <Swiper
      indicatorColor='#999'
      indicatorActiveColor='#fff'
      circular
      indicatorDots
      autoplay='true'
      style={{height:'180px'}}
    >
      <SwiperItem style={{background:'red'}}>
        1
      </SwiperItem>
      <SwiperItem style={{background:'blue'}}>
        2
      </SwiperItem>
    </Swiper>
  )
}

export default Banner
