import wepy from 'wepy'
import config from './config'
import { UnAuthenticationError, CustomError } from '../errors'

export const vote = ({ token, pollID, optionList }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == pollID) throw new CustomError(`illegal pollID: ${pollID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/sendUserPoll?token=${token}&pollID=${pollID}&optionList=${optionList}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamRecord = ({ token, teamID, myTeamScore }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if (null == teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/getTeamCompletePageBySkillScore?token=${token}&teamID=${teamID}&myTeamScore=${myTeamScore}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getExtraList = ({ token, teamID, wxPushType }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultTeamID' === teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/getActivityfeedList?token=${token}&teamID=${teamID}&wxPushType=${wxPushType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const signUpTeamLearning = ({ token, teamID, buttonStatus, roleType }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultTeamID' === teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/doSignUpInitPageButton?token=${token}&teamID=${teamID}&buttonStatus=${buttonStatus}&roleType=${roleType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

// 报名训练营 新接口
export const signUpNewTeamLearning = ({ token, teamID, buttonStatus, name, phoneNum, roleType, shareId }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultTeamID' === teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/v1/updateOrSaveTeamSignUp?token=${token}&teamID=${teamID}&buttonStatus=${buttonStatus}&name=${name}&phoneNum=${phoneNum}&roleType=${roleType}&shareId=${shareId}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

// 报名训练营 填充账号手机号
export const getTeamLearningInfo = ({ token, teamID, buttonStatus, roleType }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultTeamID' === teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/v1/getTeamSignUpInfo?token=${token}&teamID=${teamID}&buttonStatus=${buttonStatus}&roleType=${roleType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}
// 获得已报名的训练营的列表 /api/myTeam/getMyTeamSignupList
export const getMyTeamSignupList = ({ token = 'defaultToken'}) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
        url: `${config.baseUrl}myTeam/getMyTeamSignupList?token=${token}`,
        method: 'POST'
    })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


// 获得微课列表 /api/myLearning/v1/myFinishSenceList
export const myFinishSenceList = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myLearning/v1/myFinishSenceList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

// 训练营 全列表 /api/myTeam/getMyTeamListByTabByCommend
export const getMyTeamListByTabByCommend = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myTeam/getMyTeamListByTabByCommend?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

//为你推荐 /api/discover/v1/getAnotherRecommendCourse
export const getAnotherRecommendCourse = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}discover/v1/getAnotherRecommendCourse?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamDetail = ({ token, teamID }) => { // 详情页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    if ('defaultTeamID' === teamID) throw new CustomError(`illegal teamID: ${teamID}`)
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/getTeamDetail?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const confirmTeamLearning = ({ token, teamID, roleType }) => { // 评价页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/sendTeamTeacherManagerConfirm?token=${token}&teamID=${teamID}&roleType=${roleType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            return 200 === status
        })
}

export const releaseTeamLearning = ({ token, data }) => { // 评价页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/releaseTeamLearning?token=${token}`,
            method: 'POST',
            data: data
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}

export const teamSignUpInitPage = ({ token, teamID }) => { // 评价页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/teamSignUpInitPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const teamSignUp = ({ token, data }) => { // 评价页
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/teamSignUp?token=${token}`,
            method: 'POST',
            data: data
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamLearning = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/getTeamLearning?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}
export const getRaceCondition = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/showMemberPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const showAdminPage = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/showAdminPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const closeTeamLearning = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/closeTeamLearning?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}

export const closeTeamSignUp = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/closeTeamSignUp?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}

export const prepareInvitationPage = ({ token, teamID }) => {
    return wepy.request({
            // url: `${config.baseUrl}team/getTeamShareInfo?token=${token}&teamID=${teamID}`,
            url: `${config.baseUrl}team/initTeamSharePage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendInvitationFlag = ({ token, teamID, type, shareFlag }) => {
    return wepy.request({
            url: `${config.baseUrl}team/sendShareTeamLeaning?token=${token}&teamID=${teamID}&type=${type}&shareFlag=${shareFlag}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}

export const showAdminToMemberPage = ({ token, teamID, memberUserID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/showAdminToMemberPage?token=${token}&teamID=${teamID}&memberUserID=${memberUserID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const showAdminToSenceScorePage = ({ token, teamID, senceID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/showAdminToSenceScorePage?token=${token}&teamID=${teamID}&senceID=${senceID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamList = ({ token }) => {
    return wepy.request({
            url: `${config.baseUrl}team/getTeamListByGroup?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const tackLike = ({ token, rethinkID, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}team/tackLike?token=${token}&rethinkID=${rethinkID}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const prepareFeelingPage = ({ token = 'defaultToken', senceID = 'defaultSenceID', teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/initRethinkPage?token=${token}&senceID=${senceID}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendFeelingContent = ({ token = 'defaultToken', teamID = 'defaultTeamID', senceID = 'defaultSenceID', status = 'staff', rethinkText1, rethinkText2, rethinkText3 }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/sendRethink?token=${token}&teamID=${teamID}&senceID=${senceID}&status=${status}&rethinkText1=${rethinkText1}&rethinkText2=${rethinkText2}&rethinkText3=${rethinkText3}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return true
        })
}


export const sendPush_memberLoser = ({ token = 'defaultToken', teamID = 'defaultTeamID', taskID = 'defaultTaskID', memberUserIDList = [] }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    let mUrl = 0 === memberUserIDList.length ? `${config.baseUrl}team/sendPush_memberLoser?token=${token}&teamID=${teamID}&taskID=${taskID}` : `${config.baseUrl}team/sendPush_memberLoser?token=${token}&teamID=${teamID}&taskID=${taskID}&memberUserIDList=${memberUserIDList.join(',')}`
    return wepy.request({
            url: mUrl,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamScoreLabel = ({ token = 'defaultToken', teamID = 'defaultTeamID' }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP8/getTeamScoreLabel?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendTeamComment = ({ token, body }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}MVP8/sendTeamComment?token=${token}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }, // end header
            data: {...body }
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamComplete = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/getTeamComplete?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const initTeamCustomDetailPage = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamCustom/initTeamCustomDetailPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const initTeamCustomPayPage = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamCustom/initTeamCustomPayPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const createTeamCustom = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamCustom/createTeamCustom?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const cancelTeamCustom = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamCustom/cancelTeamCustom?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}



export const getTeamSenceFeedBackList = ({ token, teamID, orderByType }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamCustom/getTeamSenceFeedBackList?token=${token}&teamID=${teamID}&orderByType=${orderByType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamCompleteBySkillSet = ({ token, teamID }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}team/getTeamCompleteBySkillSet?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyTeamList = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myTeam/getMyTeamList?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyTeamListByTab = ({ token }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}myTeam/getMyTeamListByTab?token=${token}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyTeamIntroduction = ({ token, roleType, teamID, shareFlag, wxPushType }) => {
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/signUpInitPage?token=${token}&roleType=${roleType}&teamID=${teamID}&shareFlag=${shareFlag}&wxPushType=${wxPushType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamTaskAll = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/getTeamTaskHistoryList?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getMyTeamResult = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/getTeamCompletePage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const doTeamPoll = ({ token, teamID, data }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/doTeamPoll?token=${token}&teamID=${teamID}`,
            data: data,
            header: {
                'content-type': 'application/json'
            }, // end header
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const getTeamPoll = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/getTeamPoll?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendTeamPost = ({ token, teamID, senceID, postContent, action }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/sendTeamPost?token=${token}&teamID=${teamID}&senceID=${senceID}&postContent=${postContent}&action=${action}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const sendTeamPostReply = ({ token, postID, replyContent }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/sendTeamPostReply?token=${token}&postID=${postID}&replyContent=${replyContent}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const tickLike = ({ token, postID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/tickLike?token=${token}&postID=${postID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const setTop = ({ token, ID, type, topType }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/setTop?token=${token}&ID=${ID}&type=${type}&topType=${topType}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}



export const cancelTeamAdminUser = ({ token, teamID, adminUserID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/cancelTeamAdminUser?token=${token}&teamID=${teamID}&adminUserID=${adminUserID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}


export const sendTeamShareLinkPost = ({ token, teamID, shareTitle, shareLink }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/sendTeamShareLinkPost?token=${token}&teamID=${teamID}&shareTitle=${shareTitle}&shareLink=${shareLink}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const editTeamTaskInitPage = ({ token, date, taskID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/editTeamTaskInitPage?token=${token}&date=${date}&taskID=${taskID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const initTeamEditor = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/editTeamSettingInitPage?token=${token}&teamID=${teamID}`,
            method: 'POST'
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const postEditorContent = ({ token, teamID, beginDate, endDate, imageList, imageUrl, name, targetList, teacherShow, isOpenMemberShare }) => {
    if ('defaultToken' === token || null == token) throw new UnAuthenticationError()
    return wepy.request({
            url: `${config.baseUrl}teamByTaskOneDate/editTeamSettingDo?token=${token}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }, // end header
            data: { teamID, beginDate, endDate, imageList, imageUrl, name, targetList, teacherShow, isOpenMemberShare }
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new CustomError('fail to post teamLearning content')
            return data
        })

}

export const editTeamTaskDone = ({ token, date, taskID, teamID, list, taskDescription }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/editTeamTaskDone?token=${token}`,
            method: 'POST',
            data: { taskBaseDate: date, taskID, teamID, list, taskDescription },
            header: {
                'content-type': 'application/json'
            }, // end header
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const getTeamRankList = ({ token, teamID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/getTeamRankList?token=${token}&teamID=${teamID}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }, // end header
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}

export const tickTeamRankLike = ({ token, teamID, rankUserID }) => {
    return wepy.request({
            url: `${config.baseUrl}/teamByTaskOneDate/tickTeamRankLike?token=${token}&teamID=${teamID}&rankUserID=${rankUserID}`,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            }, // end header
        })
        .then(({ data: { data, status, message } }) => {
            if (200 !== status) throw new Error(message)
            return data
        })
}
