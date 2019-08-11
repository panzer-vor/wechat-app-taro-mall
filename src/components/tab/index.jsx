import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default function Search ({
  tabList = [],
  tabClick,
  current = 0,
}) {
  const onTabClick = (index) => {
    tabClick(index)
  }

  return (
    <View className='tab--wrapper'>
      {
        tabList.map((v, i) => (
          <View 
            className={`item ${i === current ? 'active' : ''}`} 
            key={`tab${i}`}
            onClick={() => onTabClick(i)}
          >
            {v.title}
          </View>
        ))
      }
    </View>
  )
}