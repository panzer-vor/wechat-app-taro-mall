import Taro, { useState } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import Banner from 'components/banner/index'
import location from 'assets/locationIcon.png'
import goodsImage from 'assets/goodsImage.png'
import searchRed from 'assets/search-red.png'
import './index.scss'

function Index () {

  const [ current, setCurrent ] = useState(0)

  const [ tabsList ] = useState([{
    id: 0,
    value: '14寸'
  },{
    id: 1,
    value: '15寸'
  },{
    id: 2,
    value: '16寸'
  },{
    id: 3,
    value: '17寸'
  },{
    id: 4,
    value: '18寸'
  },{
    id: 5,
    value: '19寸'
  },{
    id: 6,
    value: '20寸'
  },{
    id: 7,
    value: '21寸及以上'
  }])

  const homeTabsList = tabsList.map((item, index) => {
    return(
      <View 
        className={current === item.id ? 'homeTabsListActive' : 'homeTabsList'}
        key={item.id}
        onClick={() => setCurrent(index)}
      >
        {item.value}
      </View>
    )
  })

  const cardList = [{
    id: 0,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '800'
  },{
    id: 1,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '689'
  },{
    id: 2,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '810'
  },{
    id: 3,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '180'
  },{
    id: 4,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '600'
  },{
    id: 5,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '788'
  },{
    id: 6,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '899'
  },{
    id: 7,
    url: {goodsImage},
    title: '宝骏560原配】全新德国马牌轮胎',
    price: '388'
  }]

  const tabsContentCardList = cardList.map((item) => {
    return(
      <View className='tabsContentCard' key={item.id}>
        <View className='cardImage'> 
          <Image src={goodsImage} />
        </View>
        <View className='cardContent'>
          <View className='cardTitle'>
            {item.title}
          </View>
          <View className='cardBottom'>
            <View className='cardPrice'>
              ¥ {item.price}
            </View>
            <View className='cardButton'>
              去定制
            </View>
          </View>
        </View>
      </View>
    )
  })

  return (
    <View>
      <Banner />
      <View className='location'>
        <View className='locationIcon'>
          <Image src={location} />
        </View>
        <View>福建省厦门市湖里区</View>
      </View>
      <View className='homeContent'>
        <View className='homeTabs'>
          <View className='homeTabsList search'>
            <View className='searchIcon'>
              <Image src={searchRed} />
            </View>
            搜索
          </View>
          {homeTabsList}
        </View>
        <ScrollView className='tabsContent' scrollY style={{height:'567px'}}>
          <View className='tabsContentTitle'>
            · {tabsList[current].value} ·
          </View>
          {tabsContentCardList}
        </ScrollView>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '福漳通轮胎商场'
}

export default Index
