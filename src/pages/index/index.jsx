import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import { useDispatch, useSelector } from '@tarojs/redux'
import { setLocation } from 'actions/address'
import Banner from 'components/banner/index'
import location from 'assets/locationIcon.png'
import goodsImage from 'assets/goodsImage.png'
import searchRed from 'assets/search-red.png'
import shopCar from 'assets/shopCar.png'
import {get} from 'utils/request'
import './index.scss'

let basicInfo = {}
let price = 0

function Index () {
  const addressState = useSelector(state => state.address)
  
  const dispatch = useDispatch()

  const [current, setCurrent] = useState(0)
  const [tabsList, setTabsList] = useState([])
  const [cardList, setCardList] = useState([])
  const [basicInfoArray, setBasicInfoArray] = useState([])

  useDidShow(() => {
    basicInfo = Taro.getStorageSync('basicInfo') || null
    if (basicInfo) {
      basicInfo.tyreTag = basicInfo.propertyChildNames.slice(5, basicInfo.propertyChildNames.indexOf(','))
      basicInfo.temp = basicInfo.propertyChildNames.slice(basicInfo.propertyChildNames.indexOf(','), -1) + ','
      basicInfo.patternTag = basicInfo.temp.slice(6, -1)
      basicInfo.count = 1
      basicInfoArray.push(basicInfo)
      price = price + basicInfoArray[basicInfoArray.length - 1].originalPrice
      setBasicInfoArray(basicInfoArray)
      Taro.removeStorageSync('basicInfo')
    }
  })
  
  useEffect(() => {
    // 获取tabs
    dispatch(setLocation())
    get({
      uri:'shop/goods/category/all'
    })
    .then(res => {
      setTabsList(res.data)
      // 获取默认tab下的的商品
      getGoodsData(res.data[0].id)
    })
  },[])

  const homeTabsList = tabsList.map((item, index) => {
    return(
      <View 
        className={current === item.paixu ? 'homeTabsListActive' : 'homeTabsList'}
        key={item.paixu}
        onClick={() => {
          setCurrent(index)
          getGoodsData(item.id)
        }}
      >
        {item.name}
      </View>
    )
  })

  const getGoodsData = (tabsId) => {
    get({
      uri: 'shop/goods/list',
      data: {
        categoryId: tabsId
      }
    })
    .then(res => {
      if (res.code !== 0){
        Taro.showModal({
          content: res.msg,
          showCancel: false
        })
        setCardList([])
        return
      }
      setCardList(res.data)
    })
  }

  const toCustomized  = (id) => {
    Taro.navigateTo({
      url: '/pages/customized/index?id=' + id
    })
  }

  const tabsContentCardList = cardList.map((item) => {
    return(
      <View className='tabsContentCard' key={item.paixu}>
      <View className='cardImage'> 
        <Image src={item.pic} />
      </View>
      <View className='cardContent'>
        <View className='cardTitle'>
          {item.name}
        </View>
        <View className='cardBottom'>
          <View className='cardPrice'>
            ¥ {item.originalPrice}
          </View>
          <View className='cardButton' onClick={() => toCustomized(item.id)}>
            去定制
          </View>
        </View>
      </View>
    </View>
    )
  })

  const [carShow, setCarShow] = useState(false)

  const showShopCar = () => {
    if (basicInfoArray.length){
      setCarShow(true)
    }
  }

  const hideShopCar = () => {
    setCarShow(false)
  }

  const countSub = (index) => {
    if (basicInfoArray[index].count === 0) {
      return
    }
    basicInfoArray[index].count = basicInfoArray[index].count - 1
    price = price - basicInfoArray[index].originalPrice
    setBasicInfoArray(basicInfoArray)
  }

  const countAdd = (index) => {
    basicInfoArray[index].count = basicInfoArray[index].count + 1
    price = price + basicInfoArray[index].originalPrice
    setBasicInfoArray(basicInfoArray)
  }

  const goodsCarList = basicInfoArray.map((item,index) => {
    return (
      <View className='shopCarCard' key={item.paixu}>
        <View className='shopCarCardIcon'>
          <Image src={goodsImage} />
        </View>
        <View className='shopCarCardContent'>
          <View className='shopCarCardTitle'>
            {item.name}
          </View>
          <View className='shopCarCardBody'>
            <View className='tireTag'>
              {item.tyreTag}
            </View>
            <View className='tireTag'>
              {item.patternTag}
            </View>
          </View>
          <View className='shopCarCardBottom'>
            <View className='shopCarCardPrice'>
              ¥ {Number(item.originalPrice) * Number(item.count)}
            </View>
            <View className='shopCarCount'>
              <View className='sub' onClick={() => countSub(index)}>-</View>
              <View className='goodsCount'>{item.count}</View>
              <View className='add' onClick={() => countAdd(index)}>+</View>
            </View>
          </View>
        </View>
      </View>
    )
  })

  const toSearch = () => {
    Taro.navigateTo({
      url:'/pages/search/index'
    })
  }

  const toConfirmOrder = () => {
    Taro.setStorage({key: 'basicInfoArray', data: basicInfoArray})
    .then(() => {
      Taro.setStorageSync('price', price)
    })
    .then(() => {
      Taro.navigateTo({
        url: '/pages/confirmOrder/index'
      })
    })
  }

  return (
    <View>
      <Banner />
      <View className='shopCarIcon' onClick={showShopCar}>
        <View className='goodsLength'>{basicInfoArray.length ? basicInfoArray.length:null}</View>
        <Image src={shopCar} />
      </View>
      <View className='location'>
        <View className='locationIcon'>
          <Image src={location} />
        </View>
        <View>{addressState.title}</View>
      </View>
      <View className='homeContent'>
        <View className='homeTabs'>
          <View className='homeTabsList search' onClick={toSearch}>
            <View className='searchIcon'>
              <Image src={searchRed} />
            </View>
            搜索
          </View>
          {homeTabsList}
        </View>
        <ScrollView className='tabsContent' scrollY style={{height:'567px'}}>
          <View className='tabsContentTitle'>
            · {tabsList[current].name} ·
          </View>
          <View>
            {tabsContentCardList}
          </View>
          
        </ScrollView>
      </View>
      <AtFloatLayout scrollY isOpened={carShow} onClose={hideShopCar}>
        {goodsCarList}
        <View style={{width:'100%',height:'51px'}}></View>
        <View className='orderBottom'>
          <View className='orderPrice'>
            合计: <Text>¥ {price}</Text>
          </View>
          <View className='orderBottomButton' onClick={toConfirmOrder}>
            去支付
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '福漳通轮胎商场'
}

export default Index
