import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import iconSearch from 'assets/search-grey.png'
import './index.scss'

export default function Search ({
  styles,
  onChange,
  placeholder = '搜索商品',
}) {
  return (
    <View className='search--wrapper' style={styles} >
      <Image className='search--icon' src={iconSearch} />
      <Input className='search--input' type='text' placeholder={placeholder} onChange={onChange} />
    </View>
  )
}