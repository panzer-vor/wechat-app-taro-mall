import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Banner from 'components/banner/index'
import location from 'assets/locationIcon.png'
import './index.scss'

function Index () {

  const [ tabsList ] = useState([{
    id: 0,
    value: '14寸'
  },{
    id: 1,
    value: '15寸'
  },{
    id: 2,
    value: '16寸'
  },{
    id: 3,
    value: '17寸'
  },{
    id: 4,
    value: '18寸'
  },{
    id: 5,
    value: '19寸'
  },{
    id: 6,
    value: '20寸'
  },{
    id: 7,
    value: '21寸及以上'
  }])

  const [ current, setCurrent ] = useState(0)

  const homeTabsList = tabsList.map((item, index) => {
    return(
      <View 
        className={current === item.id ? 'homeTabsListActive' : 'homeTabsList'}
        key={item.id}
        onClick={() => setCurrent(index)}
      >
        {item.value}
      </View>
    )
  })

  return (
    <View>
      <Banner />
      <View className='location'>
        <View className='locationIcon'>
          <image src={location} />
        </View>
        <View>福建省厦门市湖里区</View>
      </View>
      <View className='homeTabs'>
        {homeTabsList}
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '福漳通轮胎商场'
}

export default Index
