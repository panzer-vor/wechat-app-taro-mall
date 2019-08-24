import Taro, { useEffect } from '@tarojs/taro'
import { Map, View, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'
import { setLocation, getSearchItems, } from 'actions/address'
import Search from 'components/search/index'
import icon from 'assets/locationIcon.png'
import './index.scss'

function Address () {
  const address = useSelector(state => state.address)
  
  const dispatch = useDispatch()

  const onSearchKeyword = (e) => {
    const value = e.currentTarget.value
    getsuggest(value)
  }

  const getsuggest = keyword => {
    dispatch(getSearchItems(keyword))
  }


  const makerTap = (e) => console.log(e)

  useEffect(() => {
    dispatch(setLocation())
  }, [])

  return (
    <View className='index'>
      <View className='search--wrapper'>
        <Search 
          placeholder='搜索地址'
          onChange={onSearchKeyword}
          keywords={address.keywords}
        />
      </View>
      {
        !address.keywords.length && <View>
          <View className='map--wrapper'>
            <View className='address'>
              <Image src={icon} />
              <Text>{address.title}</Text>
            </View>
            <Map
              id='map' 
              longitude={address.longitude} 
              latitude={address.latitude} 
              scale='14' 
              markers={address.markers}
              onMarkertap={makerTap} 
              show-location
              style='width: 100%; height: 300px;' 
            />
          </View>
          <View className='address--list'>
            <Text className='sub'>附近安装点</Text>
            {
              address.shopList.map(v => (
                <View className='item' key={v.id}>
                  <Text>{v.address}</Text>
                  <Text className='master'>{v.name} {v.linkPhone}</Text>
                </View>
              ))
            }
          </View>
        </View>
      }
    </View>
  )
}

Address.config = {
  navigationBarTitleText: '地址选择'
}

export default Address
