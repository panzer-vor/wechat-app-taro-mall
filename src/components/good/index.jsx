import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

function Good ({
  image,
  title,
  cates = [],
  money,
  number,
  children,
}) {
  return (
    <View className='content'>
      <View className='image'>
        <Image src={image} />
      </View>
      <View className='info'>
        <View className='title'>{title}</View>
        <View className='cates'>
          {
            cates.map((v, i) => <View key={`cate${i}`}>{v}</View>)
          }
        </View>
        <View className='pay'>
          <Text className='money'>￥{money}</Text>
          { 
            number && <Text className='number'>x{number}</Text> 
          }
          { children }
        </View>
      </View>
    </View>
  )
}

export default Good