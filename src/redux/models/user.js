/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2019/2/13      1.0     First version
 *
 */
import wepy from 'wepy'
import {store} from '../store'
import {ROUTERS, SCENE} from '../../utils/dictionary'
import {fetch, report as reportApi} from '../../api'
import {CustomError} from '../../errors'
import {setSceneID, setSceneName, setPath, setQuery} from './entrance'
import {getStorageAsync, setStorageAsync} from './helper'
import _ from 'underscore'

const initialState = {
    firstAccess: 0,
    nickName: null,
    avatarUrl: 'https://wx-small.runwise.cn/image/imageID8b18e68a72944eb37b948cee005c.png',
    model: '未知',
    pixelRatio: 2,
    platform: 'defaultPlatform',
    phone: '',
    code: null,
    token: 'defaultToken',
    role: '普通用户',
    unionID: null,
    windowHeight: 0,
    windowWidth: 0,
    screenHeight: 0
}
/**
 * 写入缓存
 * @param storeInfo 需要合并的对象
 */
const setStorage = (storeInfo) => {
    
    getStorageAsync({key: 'account'}).then((response) => {
        var tmp = _.extend(response, storeInfo)
        
        setStorageAsync({
            key: 'account',
            value: _.extend(response, storeInfo)
        })
    }).catch(error => {
        setStorageAsync({
            key: 'account',
            value: storeInfo
        })
    })
    _.extend(initialState, storeInfo)
}

/**
 * 一进入小程序就获取微信的登录，拿到code，交给后端获取tokenID
 * @returns {function(*, *)}
 */
export const getLoginToken = () => (dispatch, getState) => {
    let sourceName = ''
    let LaunchOptions = wx.getLaunchOptionsSync()
    console.log('LaunchOptions',LaunchOptions)
    let entr = LaunchOptions.scene
    let path = LaunchOptions.path
    let query = LaunchOptions.query

    // 渠道来源 的获取；
    let rounterPath = ROUTERS[path]
    if (query.source) { // 地址栏的source有带直接给
        sourceName = query.source
    } else if (SCENE[entr]) { // 是否又在场景值中
        sourceName = SCENE[entr]
    } else if (rounterPath) { // 匹配路由中的sence
        sourceName = rounterPath.sence
    }

    sourceName = sourceName || 'other'
    let urlEnd = '&source=' + sourceName

    store.dispatch(setSceneID(entr))
    store.dispatch(setSceneName(sourceName))
    store.dispatch(setPath(path))
    store.dispatch(setQuery(query))

    const storeInfo = {}
    return new Promise((resolve, reject) => {
        return wepy.login().then(response => {
            if ('login:ok' !== response.errMsg) throw new CustomError('登录失败')
            storeInfo.code = response.code
            return wepy.getSystemInfo()
        }).then(response => {
            // 记录设备信息
            if ('getSystemInfo:ok' !== response.errMsg) {
                throw new CustomError('获取用户设备失败')
            }
            _.extend(storeInfo, response)
            delete storeInfo.errMsg

            wepy.$instance.globalData.getShareHuilder(entr, sourceName) // ga统计
            let postData = {
                code: storeInfo.code,
                source: sourceName,
                sceneName: entr,
                body: {json: response}
            }
            return fetch.getLogin(postData)
        }).then(response => {
            // 查看来源是否有freeCourse开头的，有就去授权手机号页面
            let share = {
                img:response.tabShareImg ? response.tabShareImg : '',
                title : response.tabShareTitle ? response.tabShareTitle : ''
            }
            setStorageAsync({
                key: 'tabShare',
                value: share
            })
            
            let reg = /^(freeCourse)/
            if (query && query.source && reg.test(query.source) && !response.phone) {
                let str = ''
                _.mapObject(query, (val, key) => {
                    if ('source' !== key) {
                        str += `${key}=${val}`
                    }
                })
                response.hasGift = true // 后端会自动帮对应的课程购买，这边强制变成true，不再显示首课免费领
                wepy.$instance.globalData.freeCourseRounter = `/${path}${str ? '?'+str : ''}`
                wx.redirectTo({ url: `/pages/tabPages/home`})
            }
            _.extend(storeInfo, response)
            setStorage(storeInfo)
            return getState()['user']
        }).then( () => {
            let postData = {
                token: storeInfo.token,
                body: {
                    json: {
                        pageType: sourceName || rounterPath.pageType,
                        eventType: `${sourceName}/${entr}`,
                        componentName: rounterPath.screenName || '',
                        cpnPresentName: query.pageName || query.giftID,
                        courseID: query.courseID || query.id || query.courseSeriesID || null,
                        senceID: query.senceID || null
                    }
                }
            }
            reportApi.doUserBehaviourLog(postData)
        }).then(() => {
            return resolve(storeInfo)
        })
    })
}

/**
 * 获取用户微信信息
 * @returns {function(*, *)}
 */
export const getLoginInfo = (response) => (dispatch, getState) => {
    let rounter = getCurrentPages()
    let page = rounter[rounter.length ? rounter.length - 1 : 1].route
    let rounterPath = ROUTERS[page].screenName || '未知页面'
    let userInfo = response
    let errMsg = response.errMsg

    // 有用户名说明已经授权过用户信息了
    if (initialState.nickName) {
        return new Promise((resolve, reject) => {
            return resolve(userInfo)
        })
    }

    if (!errMsg) {
        return new Promise((resolve, reject) => {
            return reject(false)
        })
    }

    return new Promise((resolve, reject) => {
        if ('getUserInfo:ok' !== errMsg) {
            console.log('授权用户信息失败')
            wepy.$instance.globalData.getHuilder(`${rounterPath}/授权昵称/拒绝`, 'click', rounterPath)
            return reject(errMsg) // 授权失败
        } else {
            wepy.$instance.globalData.getHuilder(`${rounterPath}/授权昵称/接受`, 'click', rounterPath)
            return resolve(userInfo) // 授权成功
        }
    }).then((user) => { // 确定授权
        let postData = {
            token: initialState.token,
            body: {jsonObject: {...initialState, errMsg, ...userInfo}}
        }
        console.log('获取用户信息请求参数', postData)
        return fetch.getUserInfo(postData)
    }).then(response => {
        return setStorage(userInfo.userInfo)
    })
}

/**
 * 更新当前用户的手机号码
 * @param role
 * @returns {function(*, *)}
 */
export const getUserPhone = (encryptedData, errMsg, iv) => (dispatch, getState) => {
    let rounter = getCurrentPages()
    let page = ''
    if(rounter.length < 2 ) {
        page = rounter[rounter.length ? rounter.length - 1 : 1].route
    }else {
        page = rounter[rounter.length - 2].route
    }
    let rounterPath = ROUTERS[page].screenName || '未知页面'
    // 已有手机号码不需要再次授权
    if (initialState.phone) {
        return new Promise((resolve, reject) => {
            return resolve(initialState.phone)
        })
    }

    if (!errMsg) {
        return new Promise((resolve, reject) => {
            return reject(false)
        })
    }

    return new Promise((resolve, reject) => {
        if ('getPhoneNumber:ok' !== errMsg) {
            wepy.$instance.globalData.getHuilder(`${rounterPath}/授权手机号/拒绝`, 'click', rounterPath)
            return reject(errMsg)
        } else {
            return resolve(encryptedData, iv)
        }
    }).then((response) => {
        console.log(response,'response-phone')
        wepy.$instance.globalData.getHuilder(`${rounterPath}/授权手机号/接受`, 'click', rounterPath)
        wepy.$instance.globalData.getReportFlow('register')

        let postData = {
            token: initialState.token,
            body: {
                token: initialState.token,
                code: initialState.code,
                encryptedData,
                iv
            }
        }
        // 拿到手机加密的号码跟私钥，由后台解密
        return fetch.getUserPhone(postData)
    }).then(response => {
        let {phone} = response
        renewWechatCode(store.dispatch) // 更新登录code
        setStorage({phone: phone})
        return phone
    }).catch(error => {
        throw new Error(error)
    })
}

/**
 * 更新当前用户的code
 * @param dispatch
 * @returns {Promise<{errMsg: *, code?: *}>}
 */
export const renewWechatCode = dispatch => {
    return wepy.login().then(({ errMsg, code }) => {
        code && setStorage({code: code}) || new Error(false)
        return { errMsg, code }
    }).catch(error => Promise.reject(error))
}

/**
 * 更新当前用户的角色身份
 * @param role
 * @returns {function(*, *)}
 */
export const renewUserRole = role => (dispatch, getState) => {
    return role && setStorage({role: role})
}

/**
 * 验证微信登陆session是否还有效
 * @returns {function(*, *=)}
 */
export const checkLoginStatus = () => (dispatch, getState) => {
    let { name, avatar, code, phone, token, windowWidth, windowHeight, screenHeight } = getState && getState().user
    // wx.clearStorage()
    return wepy.checkSession().then(({ errMsg }) => {
            if ('checkSession:ok' !== errMsg) {
                throw errMsg // session失效
            } else {
                return true // session有效
            }
        }).catch(errMsg => {
            return wepy.login().catch(err => {
                setStorage({token: 'defaultToken'})
                throw 'login:no'
            })
        }).then(flag => {
            return 'login:online' // cb通知外层已经登陆
        }).catch(response => {
            setStorage({token: 'defaultToken'})
            if (response && JSON.stringify(response).includes('session time out')) throw 'login:no'
            if (response && JSON.stringify(response).includes('cgi response is empty')) throw 'login:no'
            throw response
        }).catch(response => {
            throw response
        })
}

/**
 * 更新当前用户的信息
 * @param response
 * @returns {function(*, *)}
 */
export const refreshUserInformations = (response) => (dispatch, getState) => {
    return setStorage(response)
}

export const userReducer = (user = initialState, action) => {
    return initialState
}
