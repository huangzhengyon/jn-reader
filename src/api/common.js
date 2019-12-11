/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/12/24      1.0     First version
 *
 */
import {fetch} from './fetch-utils'

/**
 * 公共接口
 */
export default {
    /**
     * 登录获取openID
     * @param code: [String] 微信登录返回的code
     * @param source: [String] 渠道来源code
     * @param sceneName: [String] 渠道来源名称
     * @param json: [Object] 设备信息
     */
    getLogin(params) {
        return fetch({method: 'post', url: 'user/login', params: params})
    },
    /**
     * 提交授权的用户信息
     * @param jsonObject: [Object] 用户的信息
     */
    getUserInfo(params) {
        return fetch({method: 'post', url: 'user/sendUserInfo', params: params})
    },
    /**
     * 提交授权的用户信息
     * @param jsonObject: [Object] 用户的信息
     */
    getUserPhone(params) {
        return fetch({method: 'post', url: 'user/sendUserPhoneNumber2', params: params})
    },
    /**
     * 页面数据收集上报服务器
     *  @param
     *  pageLogs:{
     *      args: [Object] 【可选】 参数
     *      event: [String] 【可选】 事件
     *      msg: [String] 【可选】 备注
     *      openID: [String] 【可选】 用户openID
     *      previousUrl: [String] 【可选】 上一个页面路径
     *      source: [String] 【可选】 渠道来源
     *      url: [String] 【可选】 当前页面路径
     *  }
     */
    pageLogs(params) {
        return fetch({method: 'post', url: 'report/pageLogs', params: params, isVisitor: true})
    },
    commonValue(params) {
        return fetch({method: 'post', url: 'common/value', params: params, isVisitor: true})
    },
    // 通用图片功能
    commonImgUrl(params) {
        return fetch({method: 'post', url: 'common/imgUrl', params: params, isVisitor: true})
    },
    /**
     * study bar
     * @param params
     */
    getMyLearningSenceList(params) {
        return fetch({method: 'post', url: 'myLearning/v1/getMyLearningSenceList', params: params})
    },
    /**
     * 上报中台埋点
     * @param courseID: 课程ID
     * @param pageTime: 开始到结束的时间戳
     */
    sendCoursePageTime(params) {
        return fetch({method: 'post', url: 'report/sendCoursePageTime', params: params})
    },
    /**
     * 上报中台埋点
     * @param code: fromID
     */
    savePushCode(params) {
        return fetch({method: 'post', url: 'push/sendPushCode', params: params})
    },
    /**
     * 分享上报→全图卡热点卡生成分享图片
     * @param courseID: 课程ID
     * @param senceID: 微课ID
     */
    getCourseQrCode(params) {
        return fetch({method: 'post', url: 'common/getImageCodeByCourseID', params: params})
    },
    /**
     * 分享上报
     * @param teamID: 训练营ID
     */
    reportSharing(params) {
        return fetch({method: 'post', url: 'report/reportShare', params: params})
    },
    /**
     * 训练营分享→邀请好友
     * @param teamID: 训练营ID
     */
    getDetailOfShareCard(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/initTeamShareCardPage', params: params})
    },
    /**
     * 校验是否可加入训练营
     * @param teamID: 训练营ID
     * @param shareId: 分享标识
     */
    checkJoinPermission(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/checkJoinPermission', params: params})
    }
}
