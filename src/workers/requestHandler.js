// requestHandler.js

export const THREADED_REQUEST = 'THREADED_REQUEST'

export const ACTIONS_HANDLERS = {
  [THREADED_REQUEST]: ({ type, payload }) => {
    console.log('THREADED_REQUEST')
  } // end THREADED_REQUEST
}