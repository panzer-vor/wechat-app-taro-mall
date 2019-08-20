import Taro, {useState, useEffect} from '@tarojs/taro'
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components'
import customizedBanner from 'assets/customizedBanner.png'
import {get} from 'utils/request'
import './index.scss'



function Customized() {
  let goodsId = 0  
  const [tyreList, setTyreList] = useState([])
  const [patternList, setPatternList] = useState([])
  const [tyreId, setTyreId] = useState(0)
  const [tyrePropertyId, setTyrePropertyId] = useState(0)
  const [patternId, setPatternId] = useState(0)
  const [patternPropertyId, setPatternPropertyId] = useState(0)
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
      setTyreList(res.data.properties[0].childsCurGoods)
      setTyreId(res.data.properties[0].childsCurGoods[0].id)
      setTyrePropertyId(res.data.properties[0].childsCurGoods[0].propertyId)
      setPatternList(res.data.properties[1].childsCurGoods)
      setPatternId(res.data.properties[1].childsCurGoods[0].id)
      setPatternPropertyId(res.data.properties[1].childsCurGoods[0].propertyId)
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
    setTyreId(tyreList[current].id)
    setTyrePropertyId(tyreList[current].propertyId)
    getGoodsPrice()
  }

  const patternChange = (e) => {
    const current = e.detail.current
    setPatternId(patternList[current].id)
    setPatternPropertyId(patternList[current].propertyId)
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
      setPrice(res.data.originalPrice)
    })
  }

  const toGoodsCar = () => {
    console.log(1)
  }

  return(
    <View onClick={toGoodsCar}>
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