import Taro from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { selectKeyword } from 'actions/address'
import { useDispatch } from '@tarojs/redux'
import iconSearch from 'assets/search-grey.png'
import './index.scss'

export default function Search ({
  styles,
  onChange,
  placeholder = '搜索商品',
  keywords = [],
}) {

  const dispatch = useDispatch()

  return (
    <View className='search--wrapper' style={styles} >
      <Image className='search--icon' src={iconSearch} />
      <Input className='search--input' type='text' placeholder={placeholder} onChange={onChange} />
      {
        keywords.length && <View className='keywords--wrapper'>
          {
            keywords.map(item => (
              <View className='item' key={item.id} onClick={() => dispatch(selectKeyword(item))}>
                <View>{item.title}</View>
                { item.address }
              </View>
            ))
          }
        </View>
      }
    </View>
  )
}
