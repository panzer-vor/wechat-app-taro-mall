import Taro, {useState, useEffect} from '@tarojs/taro'
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components'
import customizedBanner from 'assets/customizedBanner.png'
import {get} from 'utils/request'
import './index.scss'


let goodsId = 0
let tyrePropertyId = 0
let patternId = 0
let patternPropertyId = 0
let tyreId = 0

function Customized() {

  const [tyreList, setTyreList] = useState([])
  const [patternList, setPatternList] = useState([])
  const [price, setPrice] = useState(0)

  useEffect(()=>{
    goodsId = this.$router.params.id
    get({
      uri: 'shop/goods/detail',
      data: {
        id: goodsId
      }
    })
    .then(res => {
      const { properties } = res.data
      setTyreList(properties[0].childsCurGoods)
      setPatternList(properties[1].childsCurGoods)
      tyreId = properties[0].childsCurGoods[0].id
      tyrePropertyId = properties[0].childsCurGoods[0].propertyId
      patternId = properties[1].childsCurGoods[0].id
      patternPropertyId = properties[1].childsCurGoods[0].propertyId
      getGoodsPrice()
    })
  },[])

  const tyreSwiper = tyreList.map(item => {
    return (
      <SwiperItem key={item.paixu}>
        <Image src={item.remark} />
      </SwiperItem>
    )
  })

  const patternSwiper = patternList.map(item => {
    return (
      <SwiperItem key={item.paixu}>
        <Image src={item.remark} />
      </SwiperItem>
    )
  })

  const toBrandDetails = () => {
    Taro.navigateTo({
      url: '/pages/brandDetails/index'
    })
  }

  const tyreChange = (e) => {
    const current = e.detail.current
    tyreId = tyreList[current].id
    tyrePropertyId = tyreList[current].propertyId
    
    getGoodsPrice()
  }

  const patternChange = (e) => {
    const current = e.detail.current
    patternId = patternList[current].id
    patternPropertyId = patternList[current].propertyId
    getGoodsPrice()
  }

  const getGoodsPrice = () => {
    get({
      uri: 'shop/goods/price',
      data: {
        goodsId,
        propertyChildIds: tyrePropertyId + ':' + tyreId + ',' + patternPropertyId+ ':' + patternId
      }
    })
    .then(res => {
      const { originalPrice } = res.data || {}
      setPrice(originalPrice || 0)
    })
  }

  const toGoodsCar = () => {
    console.log(1)
  }

  return(
    <View>
      <View className='customizedBanner' onClick={toBrandDetails}>
        <Image src={customizedBanner} />
      </View>
      <View className='customizedCard'>
        <View className='customizedTitle'>轮胎定制</View>
        <Swiper
          indicatorColor='#EEEEEE'
          indicatorActiveColor='#FFB24E'
          circular
          indicatorDots
          onChange={tyreChange}
          className='customizedSwiper'
        >
          {tyreSwiper}
        </Swiper>
      </View>
      <View className='customizedCard'>
        <View className='customizedTitle'>轮胎花纹</View>
        <Swiper
          indicatorColor='#EEEEEE'
          indicatorActiveColor='#FFB24E'
          circular
          indicatorDots
          onChange={patternChange}
          className='customizedSwiper'
        >
          {patternSwiper}
        </Swiper>
      </View>
      <View className='seat'></View>
      <View className='customizeBottom'>
        <View className='customizePrice'>
          合计: <Text>¥ {price}</Text>
        </View>
        <View className='customizeButton' onClick={toGoodsCar}>
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