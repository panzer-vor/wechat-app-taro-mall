import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { setLocation } from 'actions/address' 

function GetUserInfo() {
  const dispatch = useDispatch()

  const location = () => {
    dispatch(setLocation())
  }

  return(
    <View>
      <AtButton openType='getUserInfo' onClick={location}>
        授权位置
      </AtButton>
    </View>
  )
}

GetUserInfo.config = {
  navigationBarTitleText: '授权'
}

export default GetUserInfo