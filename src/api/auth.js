import wepy from 'wepy'
import { getStore, connect } from "wepy-redux"
import config from './config'
import {ROUTERS, SCENE} from '../utils/dictionary'
import {CancelAuthenticationError, RejectAuthenticationError, CustomError, UnAuthenticationError} from '../errors'
import _ from 'underscore'

export const getUserInfo = () => {
    let sourceName = ''
    let entr = getStore().getState().entrance.scenceID
    let path = getStore().getState().entrance.path
    let query = getStore().getState().entrance.query // 二维码进来的参数

    if (query.source) { // 地址栏的source有带直接给
        sourceName = query.source
    } else if (SCENE[entr]) { // 是否又在场景值中
        sourceName = SCENE[entr]
    } else if (ROUTERS[path]) { // 匹配路由中的sence
        sourceName = ROUTERS[path].sence
    }

    console.log(sourceName,'sourceName')

    sourceName = sourceName || 'other'
    let urlEnd = '&source=' + sourceName
    let scope = {}
    return new Promise((resolve, reject) => {
        return wepy.login()
            .then(({ errMsg, code }) => {
                scope.code = code
                if ('login:ok' !== errMsg) throw new CustomError('登录失败')
                return wepy.getSystemInfo()
            })
            .then(({ errMsg, system: equipmentSystem, version: equipmentVersion, model: equipmentModel, windowWidth, windowHeight, screenHeight, platform, statusBarHeight: statusHeight }) => {
                if ('getSystemInfo:ok' !== errMsg) throw new CustomError('获取用户设备失败')
                Object.assign(scope, { equipmentSystem, equipmentModel, equipmentVersion, windowWidth, windowHeight, screenHeight, platform, statusHeight })

                wepy.$instance.globalData.getShareHuilder(entr, sourceName) // ga统计
                console.log('scope.code', scope.code)
                return wepy.request({
                    url: `${config.baseUrl}user/login?code=${scope.code}${urlEnd}&sceneName=${entr}`,
                    method: 'POST',
                })
            })
            .then(({ data: { data, message, status } }) => {
                if (200 !== status) throw new CustomError(message)
                Object.assign(scope, {...data })
                return wepy.getUserInfo()
            })
            .then(res => {
                let bundle = {...res, ...scope, ...config }
                Object.assign(scope, {...res })
                return wepy.request({
                    url: `${config.baseUrl}user/sendUserInfo?token=${scope.token}`,
                    method: 'POST',
                    data: JSON.stringify({ jsonObject: bundle })
                })
            })
            .then(({ data: { data, status, message } }) => {
                if (200 !== status) throw new CustomError(message)
                return wepy.showToast({
                    title: '登录成功',
                    icon: 'fail'
                })
            })
            .then(() => {
                return resolve(scope)
            })
            .catch(err => {
                console.log(err)
                throw new CustomError(err.toString())
            })
    })
}

export const checkAuthorizationOfUserInfo = () => {
    return wepy.getUserInfo()
        .then(({ errMsg }) => {
            console.log('res 第一次微信自动校验', errMsg)
            if (errMsg && 'getUserInfo:ok' === errMsg) return true
                // deny
            throw new RejectAuthenticationError()
        })
        .catch(error => {
            throw new RejectAuthenticationError(error.errMsg)
        })
}

export const doAuthorization = () => {
    return wepy.showModal({
            title: '提示',
            content: '必须授权登录才能即学即用，是否重新授权?',
            showCancel: false,
            cancelText: '否',
            confirmText: '去授权'
        })
        .then(({ confirm }) => {
            throw new CancelAuthenticationError()
        })
}

export const setOnlineStatu = (userInfo) => {
    return wepy.request({
        url: `${config.baseUrl}user/updateUserLogin?token=${userInfo.token}&platform=${userInfo.platform}`,
        method: 'POST'
    }).then(({ data: { data, status, message } }) => data)
}

export const sendPhoneNumber = ({ token, code, encryptedData, iv }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}user/sendUserPhoneNumber2?token=${token}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: { token, code, encryptedData, iv }
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new CustomError('decryptError')
            return data
        })
}

export const doPermitTester = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP3/doPermitTester?token=${token}`,
            method: 'POST',
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new CustomError('decryptError')
            return data
        })
}
