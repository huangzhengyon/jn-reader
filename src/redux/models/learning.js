// Contents
import wepy from 'wepy'
import { getStorageAsync, setStorageAsync } from './helper'
export const SET_TEAM_ANNOUNCEMENT = 'SET_TEAM_ANNOUNCEMENT'
export const DROP_TEAM_ANNOUNCEMENT = 'DROP_CURRENT_COURSE_ID'
export const CLEAR_TEAM_ANNOUNCEMENT = 'CLEAR_TEAM_ANNOUNCEMENT'
export const REFRESH_LEARNINGS = 'REFRESH_LEARNINGS'
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
export const setTeamAnnouncementRead = (id, timestamp) => {
  return {
    type: SET_TEAM_ANNOUNCEMENT,
    payload: {
      id,
      timestamp
    }
  } // end payload
} // end setTeamAnnouncementRead

export const setTeamAnnouncementUnRead = id => {
  return {
    type: SET_TEAM_ANNOUNCEMENT,
    payload: {
      id,
      timestamp: 0
    }
  } // end payload
} // end setTeamAnnouncementUnRead

export const clearTeamAnnouncement = () => {
  return {
    type: CLEAR_TEAM_ANNOUNCEMENT,
    payload: {}
  }
}

export const dropTeamAnnouncement = id => {
  return {
    type: DROP_TEAM_ANNOUNCEMENT,
    payload: {
      id
    } // end payload
  }
}

export const refreshLearnings = learnings => ({
  type: REFRESH_LEARNINGS,
  payload: learnings
})

// handlers
const ACTIONS_HANDLERS = {
  [SET_TEAM_ANNOUNCEMENT]: (learning, { payload: { id, timestamp } }) => {
    let tmp = {...learning, [id]: timestamp}
    setStorageAsync({
      key: 'learning',
      value: tmp
    })
      .catch(error => console.log('设置 announcement失败', error))
    return tmp
  },
  [DROP_TEAM_ANNOUNCEMENT]: (learning, { payload: { id } }) => {
    console.log('tend to assign', id, timestamp)
    let tmp = learning
    delete tmp[id]
    setStorageAsync({
      key: 'learning',
      value: tmp
    })
      .catch(error => console.log('设置 announcement失败', error))
    return tmp
  },
  [CLEAR_TEAM_ANNOUNCEMENT]: (learning, action) => {
    let tmp = { 'teamIDForTest': 1526626753087 }
    setStorageAsync({
      key: 'learning',
      value: tmp
    })
      .catch(error => console.log('清除 announcement失败', error))
    return tmp
  },
  [REFRESH_LEARNINGS]: (learning, { payload }) => {
    setStorageAsync({
      key: 'learning',
      value: { ...payload }
    })
    return { ...payload }
  }
} // end handlers

export const learningReducer = (learning = {
  'teamIDForTest': 1526626753087
}, action) => {
  const handler = ACTIONS_HANDLERS[action.type]
  return handler ? handler(learning, action) : learning
}