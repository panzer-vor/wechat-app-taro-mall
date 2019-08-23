import Taro, {useState} from '@tarojs/taro'
import Search from 'components/search'
import { View, Image } from '@tarojs/components'
import {get} from 'utils/request'
import './index.scss'

export default function SearchPage() {

  const [searchData, setSearchData] = useState([])

  const goodsSearch = (event) => {
    const value = event.detail.value
    get({
      uri: 'shop/goods/list',
      data: {
        nameLike: value
      }
    })
    .then(res => {
      setSearchData(res.data)
    })
  }

  const toCustomized = (id) => {
    Taro.navigateTo({
      url: '/pages/customized/index?id=' + id
    })
  }

  const searchCard = searchData.map((item) => {
    return(
      <View className='searchCard' key={item.paixu}>
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

  return(
    <View>
      <Search 
        styles={{
          marginTop: '15px',
          marginBottom: '15px',
          background: '#ffffff'
        }}
        placeholder='搜索商品'
        onChange={goodsSearch}
      />
      {searchCard}
    </View>
  )
}

SearchPage.config = {
  navigationBarTitleText: '搜索'
}