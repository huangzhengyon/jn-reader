import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError } from '../errors'

export const getUserBonusList = ({ token }) => {
    // console.log(token)
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}bonus/getUserBonusList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })

}

export const getBonusDescriptionList = ({ token }) => {
    // console.log(token)
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}bonus/getBonusDescriptionList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })

}