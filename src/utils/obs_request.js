import { from } from 'rxjs'
import { get, post, request } from './request'

const toObservable = (fn) => (args) => 
  from(fn.call(null, args))

export const obsGet = toObservable(get)
export const obsPost = toObservable(post)
export const obsRequest = toObservable(request)

