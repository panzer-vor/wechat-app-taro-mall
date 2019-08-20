import Taro, {useState, useEffect} from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import {get} from 'utils/request'

function Banner() {

  const [bannerUrl, setBannerUrl] = useState([])

  useEffect(()=>{
    get({
      uri:'banner/list'
    })
    .then(res => {
      setBannerUrl(res.data)
    })
  },[])

  const temp = bannerUrl.map(item => {
    return (
      <SwiperItem key={item.paixu}>
        <Image src={item.picUrl} />
      </SwiperItem>
    )
  })

  return (
    <Swiper
      indicatorColor='#999'
      indicatorActiveColor='#fff'
      circular
      indicatorDots
      autoplay='true'
      style={{height:'180px'}}
    >
      {temp}
    </Swiper>
  )
}

export default Banner
