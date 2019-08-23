import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Tab from 'components/tab/index'
import Goods from 'components/goods/index'
import { switchCurrent } from 'actions/order'
import { useDispatch, useSelector } from '@tarojs/redux'
import l from 'assets/goodsImage.png'
import none from 'assets/order-none.png'
import { linkTo } from 'utils/tools'
import './index.scss'

const tabList = [{title: '全部'}, {title: '待付款'}, {title: '待安装'}]

function Order () {
  const router = useRouter()

  const order = useSelector(state => state.order)
  
  const dispatch = useDispatch()

  const tabClick = (i) => {
    dispatch(switchCurrent(i))
  } 
  
  const handleCancelOrder = (i) => {
    Taro.showModal({
      title: '警告',
      content: '确定取消订单？（取消后删除该订单）',
      success(res) {
        if (res.confirm) {
          console.log(111);
        }
      },
    })
  }

  useDidShow(() => {
    dispatch(switchCurrent(router.params.status))
  })

  return (
    <View>
      <Tab tabList={tabList} tabClick={tabClick} current={order.current} />
      {
        false ? 
          <View className='order__none'>
            <Image src={none} />
            <Text>您还没有订单，快去添加吧</Text>
            <View onClick={linkTo('index')}>添加</View>
          </View> :
          <View className='order--list'>
            <View className='item'>
              <View className='head'>
                <Text className='order--number'>订单号：35053545454543543</Text>
                <Text className='status'>待付款</Text>
              </View>
              <View className='body'>
                <View className='content'>
                  <Goods 
                    image={l} 
                    title='【宝骏560原配】全新德国马牌轮胎'
                    cates={['XX轮胎系列', 'XX花纹系列']}
                    money='800'
                    number='1'
                  />
                </View>
                <View className='foot'>
                  <View className='underline' />
                  <View className='total'>
                    <Text className='count'>共 1 件商品 合计</Text>
                    <Text>￥800.0</Text>
                  </View>
                </View>
                <View className='operator'>
                  <View className='btn cancel' onClick={handleCancelOrder}>取消</View>
                  <View className='btn'>去支付</View>
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