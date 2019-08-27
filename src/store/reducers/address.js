import addressPath from 'assets/address.png'
import addressSelectPath from 'assets/address_select.png'
import { GET_SEARCH_ITEMS, DELETE_SEARCH_ITEMS, 
  SET_LOCATION, SELECT_KEYWORD, GET_SHOP_LIST, GET_DIRECTION, RESET_STATE_WITHOUT_SELECTED_SHOP, SELECT_SHOP, RESRT_STATE } from '../constants/address'

const INITIAL_STATE = {
  keywords: [],
  markers: [],
  shopList: [],
  title: '您当前的位置',
  longitude: 0,
  latitude: 0,
  direction: [],
  addressSelect: {},
  selectedShop: {},
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_SEARCH_ITEMS:
    case DELETE_SEARCH_ITEMS:
      return {
        ...state,
        keywords: payload
      }
    case SET_LOCATION:
      {
        const { latitude, longitude } = payload
        return {
          ...state,
          latitude,
          longitude,
        }
      }
    case SELECT_KEYWORD:
      {
        const { location, title } = payload
        const { lat: latitude, lng: longitude } = location

        return {
          ...state,
          addressSelect: {
            longitude,
            latitude,
            id: 0,
            width: 20,
            height: 20,
            title,
            iconPath: addressSelectPath, 
          },
          direction: [],
          longitude,
          latitude,
          title,
          keywords: [],
        }
      }
      case GET_SHOP_LIST:
        {
          const markers = payload.map(v => ({
            id: v.id,
            latitude: v.latitude,
            longitude: v.longitude,
            width: 20,
            height: 20,
            title: v.name,
            iconPath: addressPath, 
          }))
          return {
            ...state,
            markers,
            shopList: payload,
          }
        }
      case GET_DIRECTION:
        const direction = [payload]
        return {
          ...state,
          direction,
        }
      case RESET_STATE_WITHOUT_SELECTED_SHOP:
        return {
          ...INITIAL_STATE,
          selectedShop: state.selectedShop
        }
      case SELECT_SHOP:
        return {
          ...state,
          selectedShop: payload,
        }
      case RESRT_STATE:
        return {
          ...INITIAL_STATE
        }
      default:
        return state
  }
}
