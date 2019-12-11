import { sence as senceApi } from '../../api'
// Contents
export const SET_CURRENT_SENCE_ID = 'SET_CURRENT_SENCE_ID'
export const DROP_CURRENT_SENCE_ID = 'DROP_CURRENT_SENCE_ID'
export const SET_CURRENT_SENCE_NAME = 'SET_CURRENT_SENCE_NAME'
export const DROP_CURRENT_SENCE_NAME = 'DROP_CURRENT_SENCE_NAME'
export const SET_SENCES = 'SET_SENCES'
export const FAILURE = 'FAILURE'

const customErrActionBundle = {
  type: FAILURE,
  payload: {
    status: 'failure',
    response: {},
    error: {message: '错误'}
  } // end payload
}

// Action Creaters

  // async creaters
  export const fetchSences = ({token, courseID}) => (dispatch, getState) => {
    dispatch(setSences({status: 'pending'}))
    return senceApi.getSenceList({token, courseID})
      .then(data => {
        let { senceList: sections } = data
        data.senceList.length && dispatch(setSences({status: 'success', sections})) || dispatch(setSences({status: 'failure', error: 'fetch empty'}))
        return data
      })
      .catch(error => dispatch(setSences({status: 'failure', error: 'fetch empty'})) && Promise.reject(error))
  } // end fetchSences

  // sync creaters
  export const setSences = ({status='pending', sections, error={message: 'Oops'}}) => 'success'===status ? ({type: SET_SENCES, payload: {sections}}) : customErrActionBundle

  export const setCurrentSenceID = id => {
    return {
      type: SET_CURRENT_SENCE_ID,
      payload: {
        id
      } // end payload
    } // end return
  }

  export const setCurrentSenceName = name => {
    return {
      type: SET_CURRENT_SENCE_NAME,
      payload: {
        name
      } // end payload
    } // end return
  }

// handlers 
const ACTIONS_HANDLERS = {
  [SET_CURRENT_SENCE_ID]: (sences, action) => {
    return Object.assign({}, sences, {currentID: action.payload.id})
  },
  [DROP_CURRENT_SENCE_ID]: (sences, action) => {
    let tmp = sences
    tmp.currentID = ''
    return tmp
  },
  [SET_CURRENT_SENCE_NAME]: (sences, action) => {
    return Object.assign({}, sences, {currentName: action.payload.name})
  },
  [DROP_CURRENT_SENCE_NAME]: (sences, action) => {
    let tmp = sences
    sences.currentName = ''
    return tmp
  },
  [SET_SENCES]: (sences, {payload: {sections}}) => {
    let tmp = Object.assign({}, sences, {sections})
    return tmp
  }
} // end handlers

export const sencesReducer = (sences = {
  currentID: '',
  currentName: '',
  sections: []
}, action) => {
  let handler = ACTIONS_HANDLERS[action.type]
  return handler ? handler(sences, action) : sences
}
