import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'

export const getSenceList = ({ courseID = 'courseIDa1eb2733845484aa21b810f0b6f2', token = '' }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                // url: `${config.baseUrl}courseV2/getSenceList?token=${token}&courseID=${courseID}`,
                url: `${config.baseUrl}MVP3/getSenceList?token=${token}&courseID=${courseID}`,
                method: 'POST'
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end getCourseList

export const prepareEvaluation = ({ courseID, senceID, token }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}MVP8/getScoreLabel?token=${token}&courseID=${courseID}&senceID=${senceID}`,
                method: 'POST'
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })

    } // end prepareEvaluation

export const sendEvaluation = ({ token, body }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}MVP8/sendComment?token=${token}`,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                }, // end header
                data: {...body }
            })
            .then(({ data: { data, status, message } }) => {
                if (500 == status) {
                    wepy.showToast({
                        icon: 'none',
                        title: message
                    })
                    throw new Error(message)
                }
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end sendEvaluation

export const sencePayInitPage = ({ token, senceID }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}sencePay/sencePayInitPage?token=${token}&senceID=${senceID}`,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                } // end header
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end sencePayInitPage

export const sencePayInitPageByBonus = ({ token, senceID }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}sencePay/sencePayInitPageByBonus?token=${token}&senceID=${senceID}`,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                } // end header
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end sencePayInitPageByBonus 

export const CoursePayInitPageByBonus = ({ token, courseID }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}coursePay/CoursePayInitPageByBonus?token=${token}&courseID=${courseID}`,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                } // end header
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end CoursePayInitPageByBonus 

export const sencePayByCoupon = ({ token, senceID }) => {
        if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
        return wepy.request({
                url: `${config.baseUrl}sencePay/sencePayByCoupon?token=${token}&senceID=${senceID}`,
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                } // end header
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new Error(message)
                return data
            })
    } // end sencePayByCoupon

export const getTestFinishPage = ({ token, senceID, requestFlag }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}practice/getTestFinishPage?token=${token}&senceID=${senceID}&requestFlag=${requestFlag}`,
            method: 'POST',
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

//已完成微课列表 POST /api/myLearning/v1/myFinishSenceList
export const myFinishSenceList = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myLearning/v1/myFinishSenceList?token=${token}`,
            method: 'POST',
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const getNewSenceFinishInitPage = ({ token, senceID, courseID, teamID, requestFlag = '' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/getSenceFinishInitPage?token=${token}&teamID=${teamID}&courseID=${courseID}&senceID=${senceID}&requestFlag=${requestFlag}`,
            method: 'POST',
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}