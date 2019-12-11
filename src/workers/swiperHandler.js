// swiperHandler.js
export const THREADED_SET_CURRENT_CARD = 'THREADED_SET_CURRENT_CARD'

export const ACTIONS_HANDLERS = {
  [THREADED_SET_CURRENT_CARD]: ({ type, payload }) => {
    console.log('THREADED_SET_CURRENT_CARD')
  } // end THREADED_SET_CURRENT_CARD
}