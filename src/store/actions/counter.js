import { get } from 'utils/request'
import {
  ADD,
  MINUS,
  ASYNC_LIST,
} from '../constants/counter'

export const add = () => ({
  type: ADD
})

export const minus = () => ({
  type: MINUS
})

// 异步的action
export const asyncAdd = () => dispatch => setTimeout(() => {
    dispatch(add())
  }, 2000)

export const asyncList = (studentId) => 
  async dispatch => {
    const result = await get({
      uri: 'course-arrange',
      data: {
        studentId
      }
    })
    dispatch({
      type: ASYNC_LIST,
      payload: result.data
    })
  }
