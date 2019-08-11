import { map } from 'rxjs/operators'
import { obsGet } from 'utils/obs_request'
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
  dispatch => {
    obsGet({
      uri: 'course-arrange',
      data: {
        studentId
      }
    }).pipe(
      map(v => v)
    ).subscribe(v =>
      dispatch({
        type: ASYNC_LIST,
        payload: v
      })
    )
  }
