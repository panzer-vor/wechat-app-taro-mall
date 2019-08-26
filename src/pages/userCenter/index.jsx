import Taro, { useEffect } from '@tarojs/taro'
import { useSelector, useDispatch } from '@tarojs/redux'
import { View, Image, Text } from '@tarojs/components'
import { getOrderList } from 'actions/order'
import { getAllCoupons } from 'actions/coupons'
import { linkTo } from 'utils/tools'
import pay from 'assets/user-pay.png'
import install from 'assets/user-install.png'
import arrow from 'assets/arrow.png'
import order from 'assets/order.png'
import join from 'assets/join.png'
import phone from 'assets/phone.png'
import customer from 'assets/customer.png'
import ticket from 'assets/ticket.png'
import userHead from './bg'
import './index.scss'

function UserCenter () {
  const {
    order: orderState,
    coupons: couponsState,
    globalState,
  } = useSelector(state => state)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderList())
    dispatch(getAllCoupons())
  }, [])

  return (
    <View className='index'>
      <View
        className='.user--head__wrapper'
        style={{
          backgroundImage: `url(${userHead})`
        }}
      >
        <View className='user--head'>
          <Image src={globalState.userInfo.avatarUrl} />
          <Text>{globalState.userInfo.nickName}</Text>
        </View>
        <View className='user--status'>
          <View className='item' onClick={linkTo('order?status=1')}>
            <Image src={pay} className='icon' />
            <Text className='status'>待付款</Text>
            <Text className='number'>{orderState.orderNumberNotPay}</Text>
            <Image className='arrow' src={arrow} />
          </View>
          <View className='line' />
          <View className='item'  onClick={linkTo('order?status=2')}>
            <Image src={install} className='icon' />
            <Text className='status'>待安装</Text>
            <Text className='number'>{orderState.orderNumberNotInstall}</Text>
            <Image className='arrow' src={arrow} />
          </View>
        </View>
      </View>
      <View className='user--operator'>
        <View className='item' onClick={linkTo('order')}>
          <View className='left'>
            <Image src={order} />
            <Text>我的订单</Text>
          </View>
          <Image className='arrow' src={arrow} />
        </View>
        <View className='item' onClick={linkTo('coupons?status=0')}>
          <View className='left'>
            <Image src={ticket} />
            <Text>我的优惠券</Text>
          </View>
          <View className='right'>
            <Text>{couponsState.enableNumber} 张未使用</Text>
            <Image className='arrow' src={arrow} />
          </View>
        </View>
        <View className='item' onClick={linkTo('join')}>
          <View className='left'>
            <Image src={join} />
            <Text>加入我们</Text>
          </View>
          <Image className='arrow' src={arrow} />
        </View>
        <View className='item' onClick={linkTo('customer')}>
          <View className='left'>
            <Image src={customer} />
            <Text>在线客服</Text>
          </View>
          <Image className='arrow' src={arrow} />
        </View>
        <View className='item'>
          <View className='left'>
            <Image src={phone} />
            <Text>电话客服</Text>
          </View>
          <View className='right'>
            <Text>400-125-5842</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

UserCenter.config = {
  navigationBarTitleText: '个人中心'
}

export default UserCenter
