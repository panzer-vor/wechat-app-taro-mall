import Taro, { useEffect, useRouter, useDidShow } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import Tab from 'components/tab/index'
import none from 'assets/coupons-none.png'
import * as R from 'ramda'
import c from 'assets/coupons-c.png'
import { switchCurrent, getAllCoupons, setCurrentList, setSelectedCoupons } from 'actions/coupons'
import { useDispatch, useSelector } from '@tarojs/redux'
import { linkTo, linkBack } from 'utils/tools'
import { o, s} from './bg'
import './index.scss'

const tabList = [{ title: '我的券' }, { title: '到期' }]

function Coupons () {
  const router = useRouter()

  const coupons = useSelector(state => state.coupons)

  const dispatch = useDispatch()

  const couponsChoose = R.thunkify(item => {
    if (router.params.id) {
      dispatch(setSelectedCoupons(item))
      linkBack()()
    }
  })

  const tabClick = (i) => {
    dispatch(switchCurrent(i))
    dispatch(setCurrentList())
  } 

  useDidShow(() => {
    dispatch(switchCurrent(router.params.status))
  })

  useEffect(() => {
    dispatch(getAllCoupons())
  }, [])

  return (
    <View className='index'>
      <Tab tabList={tabList} current={coupons.current} tabClick={tabClick} />
      {
        !coupons.currentList.length ? 
          <View className='couponse__none'>
            <Image src={none} />
            <Text>您还没有优惠券</Text>
          </View> :
          <View className='coupons--list'>
            {
              coupons.currentList.map(v => (
                <View 
                  key={v.id}
                  className='item'
                  style={{
                    backgroundImage: `url(${v.status === 0 ? s : o})`
                  }}
                  onClick={couponsChoose(v)}
                >
                  <View 
                    className='top'
                  >
                    <View className='content'>
                      <View className='symbol'>￥</View>
                      <View className='detail'>{v.money}</View>
                    </View>
                    <View className='info'>
                      <Text className='title'>优惠券</Text>
                      <Text className='desc'>满{v.moneyHreshold}可用</Text>
                    </View>
                  </View>
                  <View className='bottom'>
                    <Text className='date'>有效日期：{v.dateEnd}</Text>
                    {
                      v.status === 0 && (router.params.id ? (
                        <Image src={c} />
                      ) : <Text className='use' onClick={linkTo('index')}>立即使用</Text>)
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

Coupons.config = {
  navigationBarTitleText: '优惠券'
}

export default Coupons
