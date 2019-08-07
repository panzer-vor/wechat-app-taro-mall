import { ADD, MINUS, ASYNC_LIST } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  list: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
      case ASYNC_LIST:
        return {
          ...state,
          list: payload
        }
     default:
       return state
  }
}
