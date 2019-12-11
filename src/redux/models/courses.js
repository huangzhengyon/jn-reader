// Contents
export const SET_CURRENT_COURSE_ID = 'SET_CURRENT_COURSE_ID'
export const DROP_CURRENT_COURSE_ID = 'DROP_CURRENT_COURSE_ID'
export const SET_CURRENT_COURSE_NAME = 'SET_CURRENT_COURSE_NAME'
export const DROP_CURRENT_COURSE_NAME = 'DROP_CURRENT_COURSE_NAME'
export const FAILURE = 'FAILURE'

const customErrActionBundle = {
  type: FAILURE,
  payload: {
    status: 'failure',
    response: {},
    error: {message: '错误'}
  } // end payload
}

// async Actions Creaters

// sync Actions Creaters
export const setCurrentCourseID = id => {
  return {
    type: SET_CURRENT_COURSE_ID,
    payload: {
      id
    }
  } // end payload
} // end setCourseID

export const setCurrentCourseName = name => {
  return {
    type: SET_CURRENT_COURSE_NAME,
    payload: {
      name
    }
  } // end return 
} // end setCourseName

// handlers
const ACTIONS_HANDLERS = {
  [SET_CURRENT_COURSE_ID]: (courses, action) => {
    return Object.assign({}, courses, {currentID: action.payload.id})
  },
  [DROP_CURRENT_COURSE_ID]: (courses, action) => {
    let tmp = courses
    tmp.currentID = ''
    return tmp
  },
  [SET_CURRENT_COURSE_NAME]: (courses, action) => {
    return Object.assign({}, courses, {currentName: action.payload.name})
  },
  [DROP_CURRENT_COURSE_NAME]: (courses, action) => {
    let tmp = courses
    tmp.currentName = ''
    return tmp
  }
} // end handlers

export const coursesReducer = (courses = {
  currentID: '',
  currentName: ''
}, action) => {
  const handler = ACTIONS_HANDLERS[action.type]
  return handler ? handler(courses, action) : courses
}