import Taro, { useEffect, useReducer } from '@tarojs/taro'
import { Map, View, Image, Text } from '@tarojs/components'
import Search from 'components/search/index'
import icon from 'assets/locationIcon.png'
import './index.scss'

const mapData = {
  markers: [{
    id: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    width: 50,
    height: 50
  }],
  longitude: 0,
  latitude: 0,
}
function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case 'setLocation':
      const { latitude, longitude } = payload
      return {
        ...state,
        latitude,
        longitude,
      };
    default:
      return state
  }
}
function Address () {

  const regionchange = (e) => console.log(e.type)

  const makerTap = (e) => console.log(e.markerId)

  const controlTap = (e) => console.log(e.controlId)

  const [state, dispatch] = useReducer(reducer, mapData)

  useEffect(() => {

    Taro.getLocation({
      type: 'wgs84'
    })
      .then((res) => dispatch({
        type: 'setLocation',
        payload: res
      }))
    
  }, [])

  return (
    <View className='index'>
      <View className='search--wrapper'>
        <Search 
          placeholder='搜索地址'
        />
      </View>
      <View className='map--wrapper'>
        <View className='address'>
          <Image src={icon} />
          <Text>福建省厦门市湖里区</Text>
        </View>
        <Map 
          id='map' 
          longitude={state.longitude} 
          latitude={state.latitude} 
          scale='14' 
          bindcontroltap={controlTap} 
          markers={mapData.markers}
          bindmarkertap={makerTap} 
          bindregionchange={regionchange}
          show-location
          style='width: 100%; height: 300px;' 
        />
      </View>
      <View className='address--list'>
        <Text className='sub'>附近安装点</Text>
        <View className='item'>
          <Text>福建省厦门市湖里区蔡塘学校46号</Text>
          <Text className='master'>半身瓜（先生） 15822064578</Text>
        </View>
      </View>
    </View>
  )
}

Address.config = {
  navigationBarTitleText: '地址选择'
}

export default Address
