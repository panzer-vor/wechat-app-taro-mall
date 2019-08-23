import Taro, {useState, useDidShow} from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import location from 'assets/locationIcon.png'
import colorfulLine from 'assets/colorfulLine.png'
import right from 'assets/right.png'
import circle from 'assets/circle.png'
import choose from 'assets/choose.png'
import './index.scss'

function ConfirmOrder() {

  const [productData, setProductData] = useState([])
  const [price, setPrice] = useState(0)
  useDidShow(() => {
    setProductData(Taro.getStorageSync('basicInfoArray') || [])
    setPrice(Taro.getStorageSync('price'))
  })

  const timeListData = [{
    id: 0,
    value: '现在安装'
  },{
    id: 1,
    value: '30分钟后'
  },{
    id: 2,
    value: '60分钟后'
  },{
    id: 3,
    value: '120分钟后'
  }]

  const [timeActive, setTimeActive] = useState(0)
  
  const timeList = timeListData.map((item, index) => {
    return (
      <View className='chooseList' key={item.id} onClick={() => setTimeActive(index)}>
        <View className='chooseIcon'>
          <Image src={timeActive === index ? choose : circle} />
        </View>
        <View>
          {item.value}
        </View>
      </View>
    )
  })

  const wayListData = [{
    id: 0,
    value: '店内安装'
  },{
    id: 1,
    value: '施救安装（救援费用 ¥100）'
  }]

  const [wayActive, setWayActive] = useState(0)

  const wayList = wayListData.map((item, index) => {
    return (
      <View className='wayList' key={item.id} onClick={() => setWayActive(index)}>
        <View>
          {item.value}
        </View>
        <View className='chooseIcon'>
          <Image src={wayActive === index ? choose : circle} />
        </View>
      </View>
    )
  })

  const product = productData.map((item) => {
    return (
      <View className='shopCarCard' key={item.id}>
        <View className='shopCarCardIcon'>
          <Image src={item.pic} />
        </View>
        <View className='shopCarCardContent'>
          <View className='shopCarCardTitle'>
            {item.name}
          </View>
          <View className='shopCarCardBody'>
            <View className='tireTag'>
              {item.tyreTag}
            </View>
            <View className='tireTag'>
              {item.patternTag}
            </View>
          </View>
          <View className='shopCarCardBottom'>
            <View className='shopCarCardPrice'>
              ¥ {item.originalPrice}
            </View>
            <View className='shopCarCount'>
              X {item.count}
            </View>
          </View>
        </View>
      </View>
    )
  })

  const [invoice, setInvoice] = useState(true)

  const toWaitInstall = () => {
    Taro.navigateTo({
      url: '/pages/waitInstall/index'
    })
  }

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
        <View className='rightIcon'>
          <Image src={right} />
        </View>
      </View>
      <View className='colorfulLine'>
        <Image src={colorfulLine} />
      </View>
      <View className='title'>
        请选择安装时间
      </View>
      <View className='chooseTime'>
        {timeList}
      </View>
      <View className='title'>
        请选择安装方式
      </View>
      <View className='chooseWay'>
        {wayList}
      </View>
      <View className='title'>
        产品
      </View>
      <View className='product'>
        {product}
      </View>
      <View className='orderList'>
        <View>
          优惠券
        </View>
        <View className='listRight'>
          <View className='extraText'>
            已使用
          </View>
          <View className='rightIcon'>
            <Image src={right} />
          </View>
        </View>
      </View>
      <View className='orderList'>
        <View>
          商家优惠
        </View>
        <View className='discount'>
          -¥50.0
        </View>
      </View>
      <View className='invoice'>
        <View className='wayList' onClick={() => setInvoice(!invoice)}>
          <View>
            发票需求
          </View>
          <View className='chooseIcon'>
            <Image src={invoice ? choose : circle} />
          </View>
        </View>
      </View>
      <View className='invoiceText' style={{display: invoice ? 'block' : 'none'}}>
        如需发票，请在微信支付成功提示消息中申请，我们将为您提供电子发票。                  
      </View>
      <View className='orderBottom'>
        <View className='orderPrice'>
          合计: <Text>¥ {price}</Text>
        </View>
        <View className='orderBottomButton' onClick={toWaitInstall}>
          去支付
        </View>
      </View>
    </View>
  )
}

ConfirmOrder.config = {
  navigationBarTitleText: '确认订单'
}

export default ConfirmOrder