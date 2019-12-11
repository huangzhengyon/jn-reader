import wepy from 'wepy'
import config from './config'
import {NetworkError, UnAuthenticationError} from '../errors'
import {fetch} from './fetch-utils'

export default {
    /**
     * 系列页
     * @param  seriesID: 系列ID
     */
    getSeriesPage(params) {
        return fetch({method: 'post', url: 'discover/v1/getSeriesPage', params: params})
    },
    /**
     * 系列详情
     * @param  courseSeriesID: 系列ID
     * @param  seriesName: 系列的名称
     */
    getDiscoverPageByCourseSeriesByLinkByDetailNew(params) {
        return fetch({method: 'post', url: 'discover/v1/getDiscoverPageByCourseSeriesByLinkByDetailNew', params: params})
    },
    /*--------------------微课-----------------------*/
    // 课程页
    coursePageList(parmas) {
        return fetch({method: 'post', url: 'discover/v1/getDiscoverPageByCourseSeriesByLink', params: parmas})
    },
    // 课程详情
    courseDetail(params) {
        return fetch({method: 'post', url: 'MVP5/getCourseDetail', params: params})
    },
    // 赠送者→生成赠一得一
    createGiftID(params) {
        return fetch({method: 'post', url: 'gift/getGiftID', params: params})
    },
    // 受赠者→接受赠一得一
    receiveCourseGift(params) {
        return fetch({method: 'post', url: 'gift/receiveCourseGift', params: params, isUnFilter: true})
    },
    // 受赠者→保存giftID的接口
    saveGiftID(params) {
        return fetch({method: 'post', url: 'gift/saveGiftId', params: params, isUnFilter: true})
    },
    /**
     * 赠送者→创建一个普通分享的id
     * @param courseID String 课程ID
     * @param shareID String 分享ID
     */
    createShareID(params) {
        return fetch({method: 'post', url: 'gift/getShareID', params: params})
    },
    /**
     * 受赠者→接受一个普通分享
     * @param courseID String 课程ID
     */
    saveShareID(params) {
        return fetch({method: 'post', url: 'gift/saveShareID', params: params, isUnFilter: true})
    },
    /**
     * 受赠者→发起送即能币
     * @param courseID String 课程ID
     * @param shareID String 分享ID
     */
    receiveCourseShare(params) {
        return fetch({method: 'post', url: 'gift/receiveCourseShare', params: params, isUnFilter: true})
    },
    // 课程详情
    courseShareCount(params) {
        return fetch({method: 'post', url: 'sence/senceShareRecord', params: params, isVisitor: true})
    },
    /*--------------------购买课程、微课-----------------------*/

    /**
     * 购买微课
     * @param senceID String 微课ID
     */
    sencePayInitPageByJiNengBin(params) {
        return fetch({method: 'post', url: 'sencePay/sencePayInitPageByJiNengBin', params: params})
    },
    /**
     * 购买课程
     * @param courseID String 微课ID
     */
    coursePayInitPage(params) {
        return fetch({method: 'post', url: 'weixinPay/coursePayInitPage', params: params})
    },
    /**
     * 微信支付
     * @param courseID String [可选] 课程ID
     * @param senceID String [可选] 微课ID
     * @param payMoney Number 支付的金额
     * @param paySign String 支付的秘钥
     * @param code
     */
    payByPaySignByJinengBin(params) {
        return fetch({method: 'post', url: 'weixinPay/payByPaySignByJinengBin', params: params})
    },
    /**
     * 即能币支付
     * @param courseID String 课程ID
     * @param senceID String  微课ID
     * @param payMoney Number 支付的金额
     * @param paySign String 支付的秘钥
     * @param code
     */
    payByJinengBin(params) {
        return fetch({method: 'post', url: 'weixinPay/payByJinengBin', params: params})
    },
    /*--------------------微课-----------------------*/
    /**
     * 提交反馈信息
     * @param courseID String 课程ID
     * @param senceID String  微课ID
     * @param cardID String 卡片ID
     * @param type String 卡片类型
     */
    sendFeedBackSelect(params) {
        return fetch({method: 'post', url: 'MVP5/sendFeedBackSelect', params: params})
    },
    /**
     * 提交投票答案结果
     * @param cardID String 卡片ID
     * @param optionList String 选中的ID
     */
    sendPollSelection(params) {
        return fetch({method: 'post', url: 'report/reportUserPollOption', params: params})
    },
    // 重点卡
    collectionRecord(params) {
        return fetch({method: 'post', url: 'sence/cardCollectionRecord', params: params})
    },
    // 想法详情
    viewsDetails(params) {
        return fetch({method: 'post', url: 'senceViews/viewsDetails', params: params})
    },
    // 想法列表
    senceViewList(params) {
        return fetch({method: 'post', url: 'senceViews/senceViews', params: params})
    },
    // 发表一个想法
    publishSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/saveSenceViews', params: params})
    },
    // 回复一个想法
    replySenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/replySenceViews', params: params})
    },
    /**
     * 微课想法→对一个想法的点赞
     * @param viewID String 想法ID
     */
    likeSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/likeSenceViews', params: params, isUnFilter: true})
    },
    /**
     * 微课想法→取消对一个想法的点赞
     * @param viewID String 想法ID
     */
    dislikeSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/dislikeSenceViews', params: params, isUnFilter: true})
    },
    // 删除一个想法
    deleteSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/deleteSenceViews', params: params})
    },
    /**
     * 微课想法→课程回顾页删除想法
     * @param viewID String 想法ID
     */
    deleteSenceViews(params) {
        return fetch({method: 'post', url: 'senceViews/deleteSenceViews', params: params})
    },
    /**
     * 课程回顾页
     * @param params
     */
    getReview(params) {
        return fetch({method: 'post', url: 'MVP3/getReview', params: params})
    },
    /*--------------------课后练习-----------------------*/
    /**
     * 评论列表数据
     * @param  senceID: String 微课id
     * @param  practiceCardID: String 卡片id
     */
    discussList(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postList', params: params})
    },
    /**
     * 评论列表点赞
     * @param postID: String 想法id,
     * @param clickType: String {'cancelLike': 取消, 'like': 点赞}
     */
    discussLink(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/postLike', params: params})
    },
    /**
     * 发送评论
     * @param senceID: Sting 微课id
     * @param practiceCardID: String 卡片id
     * @param content: String 留言的内容，最多200字符
     */
    discussLeaveMessage(params) {
        return fetch({method: 'post', url: 'reviewTestPost/v1/post', params: params})
    },
    /*--------------------微课完成-----------------------*/
    /**
     * 第一次完成微课学习的，奖励即能币
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     * @param requestFlag: Number
     * @param teamID: String 训练营id
     */
    sendFinish(params) {
        return fetch({method: 'post', url: 'course/sendFinish', params: params})
    },
    /**
     * 第一次完成微课练习的，奖励即能币
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     * @param teamID: String 训练营id
     * @param practiceId: String 题目id
     */
    sendPracticeFinish(params) {
        return fetch({method: 'post', url: 'sence/doPracticeFinish', params: params})
    },
    /**
     * 完成微课的信息
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     * @param requestFlag: Number
     * @param teamID: String 训练营id
     */
    sendFinishResults(params) {
        return fetch({method: 'post', url: 'MVP3/finishLessonPage', params: params})
    },
    /**
     * 完成练习的信息
     * @param token: String token
     * @param courseID: String 课程id
     * @param senceID: String 微课id
     */
    sendPracticeFinishResults(params) {
        return fetch({method: 'post', url: 'MVP3/finishPracticePage', params: params})
    },
    /**
     * 课程大厅
     * 关闭广告条
     */
    closeGiveBar(params) {
        return fetch({method: 'post', url: 'discover/v1/closeGiveBar', params: params})
    },
    /**
     * 预览
     * 注册成体验会员
     */
    registerByPreview(params) {
        return fetch({method: 'post', url: 'sence/registerByPreview', params: params})
    }
}
