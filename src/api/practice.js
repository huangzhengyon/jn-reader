/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2019/1/25      1.0     First version
 *
 */

import {fetch} from './fetch-utils'

/**
 * 测评
 */
export default {
    /**
     * 上报中台埋点
     * @param examID: 测评ID
     * @param wxPushType: 中台服务通知上报
     */
    getExamFront(params) {
        return fetch({method: 'post', url: 'userExam/getExamFront', params: params, isVisitor: true})
    },
    /**
     * 获取测评卷题目列表
     * @param  examID: 测评ID
     */
    getExamPracticeList(params) {
        return fetch({method: 'post', url: 'userExam/getExamPracticeList', params: params, isVisitor: true})
    },
    /**
     * 提交测评答题信息
     * @param  examID: 测评ID
     */
    sendUserDoExam(params) {
        return fetch({method: 'post', url: 'userExam/sendUserDoExam', params: params, isVisitor: true})
    },
    /**
     * 获取测评卷结果
     * @param  examID: 测评ID
     */
    getUserExamScore(params) {
        return fetch({method: 'post', url: 'userExam/getUserExamScore', params: params, isVisitor: true})
    },
    /**
     * 获取会员优惠倒计时
     * @param token: String token
     */
    getRemainingTime(params) {
        return fetch({method: 'get', url: 'user/limitedTimeOffer/remainingTime', params: params})
    },
    /**
     * 取消优惠倒计时
     * @param token: String token
     */
    cancleRemainingTime(params){
        return fetch({method: 'post', url: 'user/limitedTimeOffer/cancel', params: params})
    },
    /**
     * 获取训练营feed列表
     * @param token:  用户token
     * @param teamID: 训练营id
     * @param pageNum: 页数
     * @param pageSize: 每页请求条数
     */
    getFeedList(params){
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/feed/list', params: params})
    },
    /**
     * 获取单个feed详情
     * @param token:  用户token
     * @param teamID: 训练营id
     * @param postID: feed postID
     */
    getOneFeed(params){
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/feed', params: params})
    },
    /**
     * feed完成发起的请求 针对link类型 
     * @param token:  用户token
     * @param postID: postID
     * @param flag:0 未完成 1已完成
     */
    saveTeamPostFinish(params){
        return fetch({method: 'post', url: 'teamByTaskOneDate/saveTeamPostFinish', params: params})
    },
    /**
     * 共享某条feed
     * @param token:  用户token
     * @param postID: feedID
     * @param action: 1 共享 0 取消共享
     */
    doShareFeed(params){
        return fetch({method: 'post', url: 'team/feed/Share', params: params})
    },
    /**
     * 获取训练营总评价
     * @param token:  用户token
     * @param teamID: 训练营id
     */
    getTeamCommentDetailForAdmin(params){
        return fetch({method: 'post', url: 'teamByTaskOneDate/getTeamCommentDetailForAdmin', params: params})
    },
    /**
     * 获取学员评价详情
     * @param token:  用户token
     * @param teamID: 训练营id
     * @param userID: 用户id
     */
    getTeamMemberCommentDetail(params){
        return fetch({method: 'post', url: 'teamByTaskOneDate/getTeamMemberCommentDetail', params: params})
    }
}
