import Taro, { useEffect, useReducer } from '@tarojs/taro'
import { Map, View } from '@tarojs/components'
import Search from 'components/search/index'

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
    Taro.getLocation()
      .then((res) => dispatch({
        type: 'setLocation',
        payload: res
      }))
  }, [])

  return (
    <View className='index'>
      <Search 
        styles={{
          marginTop: '15px',
          marginBottom: '15px',
        }}
        placeholder='搜索地址'
      />
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
  )
}

Address.config = {
  navigationBarTitleText: '地址选择'
}

export default Address
