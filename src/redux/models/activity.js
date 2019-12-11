// Contents
import wepy from 'wepy'
import {getStorageAsync, setStorageAsync} from './helper'
import {deepCopy} from '../../utils'


export const OPEN_ACTIVITY = 'OPEN_ACTIVITY'
export const CLOSE_ACTIVITY = 'CLOSE_ACTIVITY'
export const SET_PARTICIPATION_TIMES = 'SET_PARTICIPATION_TIMES'
export const CLEAR_PARTICIPATION_TIMES = 'CLEAR_PARTICIPATION_TIMES'
export const SET_BEGIN_DATE = 'SET_BEGIN_DATE'
export const CLEAR_BEGIN_DATE = 'CLEAR_BEGIN_DATE'
export const SET_TERMINAL_DATE = 'SET_TERMINAL_DATE'
export const CLEAR_TERMINAL_DATE = 'CLEAR_TERMINAL_DATE'
export const SET_PARTICIPATION_DATE = 'SET_PARTICIPATION_DATE'
export const CLEAR_PARTICIPATION_DATE = 'CLEAR_PARTICIPATION_DATE'
export const REFRESH_ACTIVITY = 'REFRESH_ACTIVITY'
export const SET_POSTER = 'SET_POSTER'


export const FAILURE = 'FAILURE'

const customErrActionBundle = {
    type: FAILURE,
    payload: {
        status: 'failure',
        response: {},
        error: {message: '错误'}
    }
}

export const openActivity = () => {
    return {
        type: OPEN_ACTIVITY
    }
}

export const closeActivity = () => {
    return {
        type: CLOSE_ACTIVITY
    }
}

export const setParticipationTimes = times => {
    return {
        type: SET_PARTICIPATION_TIMES,
        payload: {
            times
        }
    }
}

export const clearParticipationTimes = () => {
    return {
        type: CLEAR_PARTICIPATION_TIMES
    }
}

export const setParticipationDate = date => {
    return {
        type: SET_PARTICIPATION_DATE,
        payload: {
            date
        }
    }
}

export const setPoster = poster => {
    return {
        type: SET_POSTER,
        payload: {
            poster
        }
    }
}

export const refreshActivity = ({participationTimes, participationDate, beginDate, terminalDate, isActivityOn, poster}) => ({
    type: REFRESH_ACTIVITY,
    payload: {participationTimes, participationDate, beginDate, terminalDate, isActivityOn, poster}
})



const ACTIONS_HANDLERS = {
    [OPEN_ACTIVITY]: (activity) => {
        let tmp = {...activity, isActivityOn: true}
        // console.log('准备设置activity storage', tmp)
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('设置 isActivityOn失败', error))
        return tmp
    },
    [CLOSE_ACTIVITY]: (activity) => {
        let tmp = {...activity, isActivityOn: false}
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('设置 isActivityOn失败', error))
        return tmp
    },
    [SET_PARTICIPATION_TIMES]: (activity, {payload: {times}}) => {
        let tmp = {...activity, participationTimes: times}
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('设置 times失败', error))
        return tmp
    },
    [CLEAR_PARTICIPATION_TIMES]: (activity) => {
        let tmp = {...activity, participationTimes: 0}
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('清除 times失败', error))
        return tmp
    },
    [SET_PARTICIPATION_DATE]: (activity, {payload: {date}}) => {
        let tmp = {...activity, participationDate: date}
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('设置 date失败', error))
        return tmp
    },
    [SET_POSTER]: (activity, {payload: {poster}}) => {
        let tmp = {...activity, poster}
        setStorageAsync({
            key: 'activity',
            value: tmp
        }).catch(error => console.log('设置 poster失败', error))
        return tmp
    },
    [REFRESH_ACTIVITY]: (activity, {payload}) => {
        setStorageAsync({
            key: 'activity',
            value: {...payload}
        }).catch(error => console.log('fail to setting activity storage', error))
        return {...payload}
    }
}

export const activityReducer = (activity = {
    participationTimes: 0, // 用户参与次数
    participationDate: -1, // 用户参与时间 时间戳
    beginDate: -1, // 活动开始时间 时间戳
    terminalDate: -1, // 活动结束时间 时间戳
    isActivityOn: false, // 是否开启活动
    poster: 'http://wx-small.runwise.cn/image/imageIDd48efe7053f43db7f5fe023ae523.png' // 海报
}, action) => {
    const handler = ACTIONS_HANDLERS[action.type]
    return handler ? handler(activity, action) : activity
}