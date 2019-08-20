import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber } from "taro-ui"
import Banner from 'components/banner/index'
import location from 'assets/locationIcon.png'
import goodsImage from 'assets/goodsImage.png'
import searchRed from 'assets/search-red.png'
import shopCar from 'assets/shopCar.png'
import {get} from 'utils/request'
import './index.scss'

function Index () {

  const [current, setCurrent] = useState(0)
  const [tabsList, setTabsList] = useState([])
  const [cardList, setCardList] = useState([])

  useEffect(() => {
    // 获取tabs
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
    setCarShow(true)
  }

  const hideShopCar = () => {
    setCarShow(false)
  }

  const [goodsCount, setGoodsCountChange] = useState(1)

  const goodsCountChange = (value) => {
    setGoodsCountChange(value)
  }

  const toSearch = () => {
    Taro.navigateTo({
      url:'/pages/search/index'
    })
  }

  const toConfirmOrder = () => {
    Taro.navigateTo({
      url: '/pages/confirmOrder/index'
    })
  }

  return (
    <View>
      <Banner />
      <View className='shopCarIcon' onClick={showShopCar}>
        <Image src={shopCar} />
      </View>
      <View className='location'>
        <View className='locationIcon'>
          <Image src={location} />
        </View>
        <View>福建省厦门市湖里区</View>
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
        <View className='shopCarCard'>
          <View className='shopCarCardIcon'>
            <Image src={goodsImage} />
          </View>
          <View className='shopCarCardContent'>
            <View className='shopCarCardTitle'>
              【宝骏560原配】全新德国马牌轮胎是的是的的是多少度爱是
            </View>
            <View className='shopCarCardBody'>
              <View className='tireTag'>
                xx轮胎系列
              </View>
              <View className='tireTag'>
                xx花纹系列
              </View>
            </View>
            <View className='shopCarCardBottom'>
              <View className='shopCarCardPrice'>
                ¥ 800
              </View>
              <View className='shopCarCount'>
                <AtInputNumber 
                  min={0} 
                  max={999}
                  step={1}
                  value={goodsCount}
                  onChange={goodsCountChange}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{width:'100%',height:'51px'}}></View>
        <View className='orderBottom'>
          <View className='orderPrice'>
            合计: <Text>¥ 800</Text>
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
