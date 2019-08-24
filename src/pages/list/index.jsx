import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { useSelector } from '@tarojs/redux'
import { linkTo } from 'utils/tools'

function List () {
  
  const address = useSelector(state => state.address)

  return (
    <View className='index'>
      <Button onClick={linkTo('address')}>点击跳转地图</Button>
      <View><Text>{JSON.stringify(address.selectedShop)}</Text></View>
    </View>
  )
}

List.config = {
  navigationBarTitleText: '列表'
}

export default List
