import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'

import { add, minus, asyncAdd } from 'actions/counter'

function List () {
  
  const dispatch = useDispatch()

  const counter = useSelector(state => state.counter)

  const Add = () => dispatch(add())

  const Dec = () => dispatch(minus())

  const AsyncAdd = () => dispatch(asyncAdd())

  return (
    <View className='index'>
      <Button className='add_btn' onClick={Add}>+</Button>
      <Button className='dec_btn' onClick={Dec}>-</Button>
      <Button className='dec_btn' onClick={AsyncAdd}>async</Button>
      <View><Text>{counter.num}</Text></View>
      <View><Text>Hello, World</Text></View>
    </View>
  )
}

List.config = {
  navigationBarTitleText: '列表'
}

export default List
