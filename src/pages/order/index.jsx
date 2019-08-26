import Taro, { useRouter, useDidShow, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Tab from 'components/tab/index'
import Goods from 'components/goods/index'
import { switchCurrent, getOrderList, setCurrentList, deleteOrder, payOrder } from 'actions/order'
import { useDispatch, useSelector } from '@tarojs/redux'
import none from 'assets/order-none.png'
import * as R from 'ramda'
import { linkTo } from 'utils/tools'
import './index.scss'

const tabList = [{title: '全部'}, {title: '待付款'}, {title: '待安装'}]

function Order () {
  const router = useRouter()

  const order = useSelector(state => state.order)
  
  const dispatch = useDispatch()

  const tabClick = (i) => {
    dispatch(switchCurrent(i))
    dispatch(setCurrentList())
  } 
  
  const goDetail = R.thunkify((status, id) => {
    if (status !== 0) linkTo(`waitInstall?orderId=${id}`)()
  })

  const goPay = R.thunkify(o => {
    dispatch(payOrder(o))
  })

  const handleCancelOrder = R.thunkify(id => {
    Taro.showModal({
      title: '警告',
      content: '确定取消订单？（取消后删除该订单）',
      success(res) {
        if (res.confirm) {
          dispatch(deleteOrder(id))
        }
      },
    })
  })

  useDidShow(() => {
    dispatch(switchCurrent(router.params.status))
  })

  useEffect(() => {
    dispatch(getOrderList())
  }, [])

  return (
    <View>
      <Tab tabList={tabList} tabClick={tabClick} current={order.current} />
      {
        !order.currentList.length ? 
          <View className='order__none'>
            <Image src={none} />
            <Text>您还没有订单，快去添加吧</Text>
            <View onClick={linkTo('index')}>添加</View>
          </View> :
          <View className='order--list'>
            {
              order.currentList.map(v => (
                <View className='item' key={v.orderNumber} onClick={goDetail(v.status, v.id)}>
                  <View className='head'>
                    <Text className='order--number'>订单号：{v.orderNumber}</Text>
                    <Text className='status'>{v.statusType}</Text>
                  </View>
                  <View className='body'>
                    {
                      v.goods.map(good => (
                        <View className='content' key={good.goodsId}>
                          <Goods 
                            image={good.pic} 
                            title={good.goodsName}
                            cates={good.property}
                            money={good.amountSingle}
                            number={good.number}
                          />
                        </View>
                      ))
                    }
                    <View className='foot'>
                      {
                        v.status === 0 && <View className='underline' />
                      }
                      <View className='total'>
                        <Text className='count'>共 { v.goodsNumber } 件商品 合计</Text>
                        <Text>￥{ v.amountReal }</Text>
                      </View>
                    </View>
                    {
                      v.status === 0 && <View className='operator'>
                        <View className='btn cancel' onClick={handleCancelOrder(v.id)}>取消</View>
                        <View className='btn' onClick={goPay(v)}>去支付</View>
                      </View>
                    }
                    </View>
                </View>
              ))
            }
            
          </View>
      }
    </View>
  )
}

Order.config = {
  navigationBarTitleText: '我的订单'
}

export default Order