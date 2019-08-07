import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useSelector, useDispatch } from '@tarojs/redux'

import { add, minus, asyncAdd, asyncList } from 'actions/counter'

import './index.scss'

function Index () {

  const dispatch = useDispatch()

  const counter = useSelector(state => state.counter)

  const Add = () => dispatch(add())

  const Dec = () => dispatch(minus())

  const AsyncAdd = () => dispatch(asyncAdd())

  const AsyncList = () => dispatch(asyncList(45))

  return (
    <View className='index'>
      <Button className='add_btn' onClick={Add}>+</Button>
      <Button className='dec_btn' onClick={Dec}>-</Button>
      <Button className='dec_btn' onClick={AsyncAdd}>async</Button>
      <Button className='dec_btn' onClick={AsyncList}>asyncList</Button>
      <View><Text>{counter.num}</Text></View>
      <View><Text>{JSON.stringify(counter.list)}</Text></View>
      <View onClick={() => Taro.navigateTo({url: '/pages/list/index?id=1'})}><Text>Hello, World</Text></View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}

export default Index
