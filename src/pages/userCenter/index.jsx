import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import userHead from 'assets/user-head.png'
import testUser from 'assets/test-head.png'
import pay from 'assets/user-pay.png'
import install from 'assets/user-install.png'
import arrow from 'assets/arrow.png'
import order from 'assets/order.png'
import join from 'assets/join.png'
import phone from 'assets/phone.png'
import address from 'assets/address.png'
import customer from 'assets/customer.png'
import ticket from 'assets/ticket.png'
import './index.scss'

function UserCenter () {

  return (
    <View className='index'>
      <View
        className='.user--head__wrapper'
        style={{
          backgroundImage: `url(${userHead})`
        }}
      >
        <View className='user--head'>
          <Image src={testUser} />
          <Text>半身瓜</Text>
        </View>
        <View className='user--status'>
          <View className='item'>
            <Image src={pay} className='icon' />
            <Text className='status'>待付款</Text>
            <Text className='number'>0</Text>
            <Image className='arrow' src={arrow} />
          </View>
          <View className='line' />
          <View className='item'>
            <Image src={install} className='icon' />
            <Text className='status'>待安装</Text>
            <Text className='number'>0</Text>
            <Image className='arrow' src={arrow} />
          </View>
        </View>
      </View>
      <View className='user--operator'>
        <View className='item'>
          <View className='left'>
            <Image src={order} />
            <Text>我的订单</Text>
          </View>
          <Image className='arrow' src={arrow} />
        </View>
        <View className='item'>
          <View className='left'>
            <Image src={ticket} />
            <Text>我的优惠券</Text>
          </View>
          <View className='right'>
            <Text>0 张未使用</Text>
            <Image className='arrow' src={arrow} />
          </View>
        </View>
        <View className='item'>
          <View className='left'>
            <Image src={join} />
            <Text>加入我们</Text>
          </View>
          <Image className='arrow' src={arrow} />
        </View>
        <View className='item'>
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
            <Image className='arrow' src={arrow} />
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
