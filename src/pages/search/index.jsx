import Taro from '@tarojs/taro'
import Search from 'components/search';
import { View, Image } from '@tarojs/components';
import goodsImage from 'assets/goodsImage.png'
import './index.scss'

export default function SearchPage() {

  const temp = [{
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

  const searchCard = temp.map((item) => {
    return(
      <View className='searchCard' key={item.id}>
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

  return(
    <View>
      <Search 
        styles={{
          marginTop: '15px',
          marginBottom: '15px',
          background: '#ffffff'
        }}
        placeholder='搜索商品'
      />
      {searchCard}
    </View>
  )
}

SearchPage.config = {
  navigationBarTitleText: '搜索'
}