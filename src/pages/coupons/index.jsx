import Taro, { useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Tab from 'components/tab/index'
import none from 'assets/coupons-none.png'
import c from 'assets/coupons-c.png'
import { switchCurrent, getAllCoupons } from 'actions/coupons'
import { useDispatch, useSelector } from '@tarojs/redux'
import { o, s} from './bg'
import './index.scss'

const tabList = [{ title: '我的券' }, { title: '到期' }]

function Coupons () {
  const coupons = useSelector(state => state.coupons)

  const dispatch = useDispatch()

  const tabClick = (i) => {
    dispatch(switchCurrent(i))
  } 

  useEffect(() => {
    dispatch(getAllCoupons())
  }, [])

  return (
    <View className='index'>
      <Tab tabList={tabList} current={coupons.current} tabClick={tabClick} />
      {
        false ? 
          <View className='couponse__none'>
            <Image src={none} />
            <Text>您还没有优惠券</Text>
          </View> :
          <View className='coupons--list'>
            <View 
              className='item'
              style={{
                backgroundImage: `url(${s})`
              }}
            >
              <View 
                className='top'
              >
                <View className='content'>
                  <View className='symbol'>￥</View>
                  <View className='detail'>50.00</View>
                </View>
                <View className='info'>
                  <Text className='title'>优惠券</Text>
                  <Text className='desc'>满800可用</Text>
                </View>
              </View>
              <View className='bottom'>
                <Text className='date'>有效日期：2018-07-07</Text>
                {
                  true ? <Image src={c} /> : <Text className='use'>立即使用</Text>
                }
              </View>
            </View>
            <View 
              className='item'
              style={{
                backgroundImage: `url(${o})`
              }}
            >
              <View 
                className='top'
              >
                <View className='content'>
                  <View className='symbol'>￥</View>
                  <View className='detail'>50.00</View>
                </View>
                <View className='info'>
                  <Text className='title'>优惠券</Text>
                  <Text className='desc'>满800可用</Text>
                </View>
              </View>
              <View className='bottom'>
                <Text className='date'>有效日期：2018-07-07</Text>
                {
                  true ? <Image src={c} /> : <Text className='use'>立即使用</Text>
                }
              </View>
            </View>
            </View>
      }
    </View>
  )
}

Coupons.config = {
  navigationBarTitleText: '优惠券'
}

export default Coupons
