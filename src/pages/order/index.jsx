import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Tab from 'components/tab/index'
import { switchCurrent } from 'actions/order'
import { useDispatch, useSelector } from '@tarojs/redux'
import l from 'assets/goodsImage.png'
import './index.scss'

const tabList = [{title: '全部'}, {title: '待付款'}, {title: '待安装'}]

function Order () {
  const order = useSelector(state => state.order)
  
  const dispatch = useDispatch()

  const tabClick = (i) => {
    dispatch(switchCurrent(i))
  } 
  
  return (
    <View>
      <Tab tabList={tabList} tabClick={tabClick} current={order.current} />
      {
        false ? 
          <View></View> :
          <View className='order--list'>
            <View className='item'>
              <View className='head'>
                <Text className='order--number'>订单号：35053545454543543</Text>
                <Text className='status'>待付款</Text>
              </View>
              <View className='body'>
                <View className='content'>
                  <Image src={l} />
                  <View className='info'>
                    <View className='title'>【宝骏560原配】全新德国马牌轮胎</View>
                    <View className='cates'>
                      <View>XX轮胎系列</View>
                      <View>XX花纹系列</View>
                    </View>
                    <View className='pay'>
                      <Text className='money'>￥800</Text>
                      <Text className='number'>x1</Text>
                    </View>
                  </View>
                </View>
                <View className='foot'>
                  <View className='total'>
                    <Text className='count'>共 1 件商品 合计</Text>
                    <Text>￥800.0</Text>
                  </View>
                  <View className='operator'>
                    <View className='btn cancel'>取消</View>
                    <View className='btn'>去支付</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
      }
    </View>
  )
}

Order.config = {
  navigationBarTitleText: '我的订单'
}

export default Order