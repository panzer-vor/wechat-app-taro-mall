import R from 'ramda'
import { ADD, MINUS, ASYNC_LIST } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
  list: null
}

export default (state = INITIAL_STATE, { type, payload }) => 
  R.cond([
    [
      R.equals(ADD), 
      R.compose(
        R.always,
        R.evolve({
          num: R.inc
        })
      )(state)
    ],
    [
      R.equals(MINUS),
      R.always(
        R.evolve({
          num: R.dec
        })(state)
      )
    ],
    [
      R.equals(ASYNC_LIST), 
      R.compose(
        R.always,
        R.evolve({
          num: R.inc
        })
      )(state)
    ],
    [
      R.T, 
      R.always(state)  
    ]
  ])(type)
