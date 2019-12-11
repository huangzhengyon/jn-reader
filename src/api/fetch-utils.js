import wepy from 'wepy'
import {getStore, connect} from "wepy-redux"
import config from './config'
import {UnAuthenticationError} from '../errors'
import _ from 'underscore'
import {ROUTERS} from "../utils/dictionary"
import {getStorageAsync, setStorageAsync} from '../utils'

/**
 * 参数分割
 * @param data
 * @returns {{string: {字符串的键值对}, array: {数组对象的键值对}}}
 */
export const paramsData = ((data) => {
    let result = {
        string: {},
        array: {},
        object: {}
    }
    let params = []
    _.mapObject(data, function (val, key) {
        if (_.isArray(val)) {
            result.array[key] = val
        } else if (_.isObject(val)) {
            result.object = val
        } else {
            params.push(`${key}=${val}`)
        }
    })
    result.string = '?' + params.join('&')
    return result
})

/**
 * 更新登录的用户信息，暂时后台今日tab list缓存使用
 * @param params mPlatform
 */
const updateUserLogin = (() => {
    let token = getStore().getState().user.token
    let platform = getStore().getState().user.platform
    if ('defaultToken' === token) {
        return
    }
    fetch({method: 'post', url: 'user/updateUserLogin', params: {token: token, platform: platform}
    }).then((res)=>{
        getStorageAsync({key: 'isIosClosed'}).then((response) => {
            setStorageAsync({
                key: 'isIosClosed',
                value: res.isIOSClosed
            })
        }).catch(error => {
            setStorageAsync({
                key: 'isIosClosed',
                value: res.isIOSClosed
            })
        });
    }).catch(error => {
    });
})

export const fetch = ((actionObj) => {
    let rounter = getCurrentPages()
    let size = rounter.length ? rounter.length : 1
    let page = rounter[size - 1]

    if (('defaultToken' === actionObj.params.token || !actionObj.params.token)
        && page && !(ROUTERS[page.route])) {
        throw new UnAuthenticationError()
    }

    if ('defaultToken' !== actionObj.params.token
        && page && wepy.$instance.globalData.oldRounter !== page.route) {
        wepy.$instance.globalData.oldRounter = page.route
        updateUserLogin()
    }

    let params = paramsData(actionObj.params)
    let requestData = {
        url: `${config.baseUrl + actionObj.url + params.string}`,
        method: actionObj.method,
        data: !_.isEmpty(params.object) ? params.object : params.array
    }

    return wepy.request(requestData).then((response) => {
        let data = response.data
        if (!_.isUndefined(data.success)) {
            if (actionObj.isUnFilter) {
                return data
            } else {
                if (1 === data.success) {
                    return data.data
                } else {
                    console.log('接口异常：', actionObj.url, data.message)
                    throw new Error(data)
                }
            }
        }else if(!_.isUndefined(data.errcode)) {
            if(0 === data.errcode) {
                return data.data
            } else if(1010 === data.errcode) {
                wepy.showToast({
                    icon: 'none',
                    title: data.errmsg
                })
                throw new Error(data)
            }else {
                console.log('接口异常：', actionObj.url, data.errmsg)
                throw new Error(data)
            }
        } else {
            if (200 !== data.status) {
                console.log('接口异常：', actionObj.url, data.message)
                throw new Error(data.message)
            } else {
                if (!_.isUndefined(data.data) &&  !_.isUndefined(data.data.success) && data.data.success != 1) {
                    wepy.showToast({
                        icon: 'none',
                        title: data.data.message
                    })
                    console.log('错误信息: ' + data.message)
                    throw new Error(data.message)
                } 
                return data.data
            }
        }
    })
})
