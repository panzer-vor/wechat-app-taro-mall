import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import location from 'assets/locationIcon.png'
import colorfulLine from 'assets/colorfulLine.png'
import goodsImage from 'assets/goodsImage.png'
import './index.scss'

function WaitInstall() {

  const productData = [{
    id: 0,
    goodsName: '【宝骏560原配】全新德国马牌轮胎是的是的的是多少度爱是',
    goodsImage: '',
    tire: 'XX轮胎系列',
    pattern: 'XX花纹系列',
    price: '800',
    count: 1,
  },{
    id: 1,
    goodsName: '【宝骏560原配】全新德国马牌轮胎是的是的的是多少度爱是',
    goodsImage: '',
    tire: 'XX轮胎系列',
    pattern: 'XX花纹系列',
    price: '600',
    count: 3,
  }]

  const product = productData.map((item) => {
    return (
      <View className='shopCarCard' key={item.id}>
        <View className='shopCarCardIcon'>
          <Image src={goodsImage} />
        </View>
        <View className='shopCarCardContent'>
          <View className='shopCarCardTitle'>
            {item.goodsName}
          </View>
          <View className='shopCarCardBody'>
            <View className='tireTag'>
              {item.tire}
            </View>
            <View className='tireTag'>
              {item.pattern}
            </View>
          </View>
          <View className='shopCarCardBottom'>
            <View className='shopCarCardPrice'>
              ¥ {item.price}
            </View>
            <View className='shopCarCount'>
              X {item.count}
            </View>
          </View>
        </View>
      </View>
    )
  })

  const listData = [{
    id: 0,
    title: '支付方式',
    extraText: '微信支付'
  },{
    id: 1,
    title: '安装时间',
    extraText: '现在安装'
  },{
    id: 2,
    title: '发票需求',
    extraText: '电子发票'
  },{
    id: 3,
    title: '订单号',
    extraText: '1324 7782 2434 233'
  },{
    id: 4,
    title: '下单时间',
    extraText: '2019-08-17'
  },{
    id: 5,
    title: '订单状态',
    extraText: '待安装'
  },{
    id: 6,
    title: '安装码',
    extraText: '3500'
  }]

  const orderList = listData.map(item => {
    return (
      <View className='orderList' key={item.id}>
        <View>
          {item.title}
        </View>
        <View className='extraText'>
          {item.extraText}
        </View>
      </View>
    )
  })

  return(
    <View>
      <View className='confirmHeader'>
        <View className='headerLeft'>
          <View className='location'>
            <View className='locationIcon'>
              <Image src={location} />
            </View>
            <View className='store'>
              厦门市湖里区福漳通轮胎专卖店
            </View>
          </View>
          <View className='address'>
            福建省厦门市湖里区钟宅路海天广场67号海鸿楼一楼               
          </View>
        </View>
      </View>
      <View className='colorfulLine'>
        <Image src={colorfulLine} />
      </View>
      <View className='product'>
        {product}
      </View>
      <View>
        {orderList}
      </View>
    </View>
  )
}

WaitInstall.config = {
  navigationBarTitleText: '等待安装'
}

export default WaitInstall