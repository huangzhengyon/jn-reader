import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'


export const sendUserEventLog = ({ token = 'defaultToken', body }) => {
    let mUrl = `${config.baseUrl}report/sendUserEventLog?token=${token}`
        // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()

    return wepy.request({
        url: mUrl,
        data: body,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}


export const doUserBehaviourLog = ({ token = 'defaultToken', body }) => {
    let mUrl = `${config.baseUrl}report/doUserBehaviourLog?token=${token}`
        // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()

    return wepy.request({
        url: mUrl,
        data: body,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}

export const profileList = ({ token = 'defaultToken' }) => {
    let mUrl = `${config.baseUrl}userprofile/v1/profileList?token=${token}&userID=userIDeb41db7f6ab4b1b0c762b757d5cd`
        // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()

    return wepy.request({
        url: mUrl,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}
//用户中心 
export const userCenterInfo = ({ token }) => { 
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userprofile/v1/userCenterInfo?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

//存储用户中心
export const saveUserCenterInfo = ({ token = 'defaultToken', json,flag='defaultFlag' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultFlag' === flag || null == flag) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}userprofile/v1/saveUserCenterInfo?token=${token}&flag=${flag}`,
            data: json,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const userProfile = ({ token = 'defaultToken', status, series, goals }) => {
    let mUrl = `${config.baseUrl}userprofile/v1/userProfile?token=${token}&userID=userIDeb41db7f6ab4b1b0c762b757d5cd&status=${status}&series=${series}&goals=${goals}`
        // if ('defaultToken' === token || null == token) throw new UnAuthenticationError()

    return wepy.request({
        url: mUrl,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
    }).then(({ data: { data, status, message } }) => {

        if (200 !== status) throw new NetworkError(message)
        return data
    })
}