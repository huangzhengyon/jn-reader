// index.js

import { ACTIONS_HANDLERS as requestHandler } from './requestHandler'
import { ACTIONS_HANDLERS as swiperHandler } from './swiperHandler'

const workerSolution = (action) => {
  console.log('in workerSolution_________', action)
  const { type, payload } = action
  if (null==type) throw 'type is required'
  if (null==payload) throw 'payload is required'
  const handler = { ...requestHandler, ...swiperHandler }[type]
  return handler? handler(action): new Error('the handler is not defined')
}

worker.onMessage(action => {
  workerSolution(action)
})
