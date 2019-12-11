/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/9/19      1.0     First version
 *
 */
import {fetch} from './fetch-utils'

export default {
    /**
     * 获取职能跟对应的兴趣
     * @param imageType: 'useronboarding' 写死
     */
    weclomeSwiper(params) {
        return fetch({method: 'post', url: 'common/v1/getImage', params: params})
    },
    /**
     * 获取职能跟对应的兴趣
     * @param params
     */
    userInfo(params) {
        return fetch({method: 'post', url: 'userprofile/v1/userInfo', params: params})
    },
    /**
     * 获取职能跟对应的兴趣
     * @param params
     */
    profileList(params) {
        return fetch({method: 'post', url: 'userprofile/v2/profileList', params: params})
    },
    /**
     * 提交兴趣
     * @param positionList: Array 提交选中的智能信息
     */
    userProfile(params) {
        return fetch({method: 'post', url: 'userprofile/v2/userProfile', params: params})
    },
    /**
     * 为你推荐的轮番图
     * @param params
     */
    recommendCourse(params) {
        return fetch({method: 'post', url: 'userprofile/v1/recommendCourse', params: params})
    },
    /**
     * 发送验证码
     * @param mobile: Number 电话号码
     */
    setVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/getVerCode', params: params})
    },
    /**
     * 校验短信验证码（没用了）
     * @param params
     */
    checkVerCode(params) {
        return fetch({method: 'post', url: 'userprofile/v1/checkVerCode', params: params})
    },
    /**
     * 保存手机号码
     * @param mobile: Number 手机号码,
     * @param verCode: Number || null 验证码,
     * @param courseID: String 课程id
     */
    savePhone(params) {
        return fetch({method: 'post', url: 'userprofile/v1/mobile', params: params})
    },

    /*--------------------发现页-----------------------*/
    // 发现页列表
    discoverPage(params) {
        return fetch({method: 'post', url: 'discover/v1/discoverPage', params: params, isVisitor: true})
    },


    // 获得专题详情
    getNewSpecialCourse(params) {
        return fetch({method: 'post', url: 'course/getNewSpecialCourse', params: params, isVisitor: true})
    },
    // 专题评论点赞
    likeSenceView(params) {
        return fetch({method: 'post', url: 'senceViews/likeSenceView', params: params, isVisitor: true})
    },
    // 专题投票
    sendUserPoll(params) {
        return fetch({method: 'post', url: 'course/sendUserPoll', params: params})
    },
    /*--------------------其他公共-----------------------*/
    // 获取staff的openid
    allOpenIDHash(params) {
        return fetch({method: 'post', url: 'common/getAllOpenIDHash', params: params, isVisitor: true})
    },
    // 训练营 提问
    sendTeamPost(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/sendTeamPost', params: params, isVisitor: true})
    },
    //获取今日任务
    todayTaskList(params) {
        return fetch({method: 'post', url: 'todayTask/tasks', params: params, isVisitor: true})
    },
    //获取今日页状态
    todayStatus(params) {
        return fetch({method: 'post', url: 'todayTask/todayStatus', params: params, isVisitor: true})
    },
    /**
     * 今日任务Tab→在学课程
     * @param isFull Boolean 是否获得全部课程，默认为五个 false
     * 
     */
    todaySkills(params) {
        return fetch({method: 'post', url: 'todayTask/skills', params: params})
    },
    //获取全部未学课程
    todayToLearnCourses(params) {
        return fetch({method: 'post', url: 'todayTask/toLearnCourses', params: params, isVisitor: true})
    },
    /**
     * 我的列表
     * @param params
     */
    getMyCenterNew(params) {
        return fetch({method: 'post', url: 'userCenter/userCenterInitPage', params: params})
    },
    /**
     * 测试用户
     * @param otherLink
     */
    addTestUser(params) {
        return fetch({method: 'post', url: 'MVP3/addTester', params: params})
    },
    /**
     * 内测申请
     * @param params
     */
    sendApplyData(params) {
        return fetch({method: 'post', url: 'user/betaTestApply', params: params})
    },
    /**
     * 即能看板
     * @param  courseSeriesID: 系列ID
     * @param  seriesName: 系列的名称
     */
    getMyLearningPageBySkillgetDetail(params) {
        return fetch({method: 'post', url: 'myLearning/getMyLearningPageBySkillgetDetail', params: params})
    },
    /**
     * 团队学习
     * @param  queryText: 搜索的名字
     */
    querySenceList(params) {
        return fetch({method: 'post', url: 'team/querySenceList', params: params})
    },
    /**
     * 团队学习
     * @param  queryText: 搜索的名字
     */
    queryPracticeList(params) {
        return fetch({method: 'post', url: 'team/queryPracticeList', params: params})
    },
    /**
     * 团读书学习→发起讨论
     * @param  teamID: 团队ID
     */
    saveTeamPost(params) {
        return fetch({method: 'post', url: 'team/saveTeamPost', params: params})
    },
    /**
     * 团读书学习→发起讨论
     * @param  teamID: 团队ID
     */
    getActivityfeedList(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getActivityfeedList', params: params})
    },
    /**
     * 团队学习→获取训练营详情
     * @param  teamID: 团队ID
     */
    getTeamDetail(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getTeamDetail', params: params})
    },
    /**
     * 团队学习→单选题提交答案
     * @param  teamID: 团队ID
     * @param  senceID: 微课ID
     * @param  cardID: 练习卡片ID
     * @param  score: 练习卡片总分
     * @param  weight: 权重
     * @param  questionIndex: 选题选项权重
     * @param  message: 选项文本内容
     * @param  skillID: 练习所属技能
     * @param  json: 记录JSON格式
     */
    sendTeamPractice(params) {
        let data = Object.assign({
            message: 'defaultMessage',
            json: 'defaultJson'
        }, params)
        return fetch({method: 'post', url: 'teamByTaskOneDate/sendTeamPractice', params: data})
    },
    /**
     * 团队学习→导师，管理员设置置顶
     * @param  teamID: 团队ID
     * @param  postID: 排名任务id
     * @param  type: {top: 置顶, notTop: 取消置顶}
     */
    teamSetTop(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/setTop', params: params, isUnFilter: true})
    },
    /**
     * 团队学习→导师，点赞
     * @param  teamID: 团队ID
     * @param  postID: 排名任务id
     */
    teamTickLike(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/tickLike', params: params, isUnFilter: true})
    },
    /**
     * 团队学习→对评论点赞
     * @param  replyID: 评论id
     * @param  UserID: 用户id
     */
    setTeamPostReplyLike(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/setTeamPostRelyLike', params: params, isUnFilter: true})
    },
    /**
     * 团队学习→排名列表
     * @param  teamID: 团队ID
     */
    getTeamRankList(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/getTeamRankList', params: params})
    },
    /**
     * 团队学习→排名列表→喜欢
     * @param  teamID: 团队ID
     * @param  rankUserID: 排名任务id
     */
    tickTeamRankLike(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/tickTeamRankLike', params: params})
    },
    /**
     * 团队学习→发表留言
     * @param  postID: 排名任务id
     * @param  replyContent: 留言的内容
     */
    sendTeamPostReply(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/sendTeamPostReply', params: params})
    },
    /**
     * 今日任务页
     */
    tasksPage(params) {
        return fetch({method: 'post', url: 'todayTask/tasksPage', params: params})
    },
    /**
     * 用户角色 保存
     * @param  userProfileInfo: 信息
     */
    v3UserProfile(params) {
        return fetch({method: 'post', url: 'userprofile/v3/userProfile', params: params})
    },
    /**
     * 用户角色 获取
     */
    v3ProfileList(params) {
        return fetch({method: 'post', url: 'userprofile/v3/profileList', params: params})
    },
    /**
     * 今日tab / 获取训练营列表
     */
    doingTeamList(params) {
        return fetch({method: 'post', url: 'todayTask/doingTeamList', params: params})
    },
    /**
     * 获取今日课程任务列表
     */
    getCourseLists(params) {
        return fetch({method: 'post', url: 'todayTask/courseTask', params: params})
    },
    /**
     * 获取今日训练营任务列表
     */
    getcampLists(params) {
        return fetch({method: 'post', url: 'todayTask/teamTask', params: params})
    },
    /**
     * 管理训练营
     */
    showAdminPage(params) {
        return fetch({method: 'post', url: 'team/showAdminPage', params: params})
    },
    /**
     * feed List
     * @param  teamID
     */
    teamByTaskOneDate(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/toBeReleasedList', params: params})
    },
    /**
     * 更新feed List 的状态
     * @param  postID
     * @param  flag : 0-> 撤回  1-> 发布
     */
    updateReleasedList(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/v1/updateReleasedList', params: params})
    },
    /**
     * 我的/收藏
     */
    getCardCollections(params) {
        return fetch({method: 'post', url: 'userCenter/getCardCollections', params: params})
    },
    /**
     * 我的/全部课程
     */
    getAllMyCourse(params) {
        return fetch({method: 'post', url: 'userCenter/getAllMyCourse', params: params})
    },
    /**
     * 我的 获取数据
     */
    myDataCenter(params) {
        return fetch({method: 'post', url: 'userprofile/v1/myDataCenter', params: params})
    },
    /**
     * 专题关注
     */
    courseWatch(params) {
        return fetch({method: 'post', url: 'senceViews/courseWatch', params: params})
    },
    /**
     * 专题点赞
     */
    courseLike(params) {
        return fetch({method: 'post', url: 'senceViews/courseLike', params: params})
    },
    /**
     * 专题收藏
     */
    courseCollect(params) {
        return fetch({method: 'post', url: 'senceViews/courseCollect', params: params})
    },
    /**
     * 我的 / 专题收藏
     */
    getEditorCollections(params) {
        return fetch({method: 'post', url: 'userCenter/getEditorCollections', params: params})
    },
    /**
     * 专题 发表想法
     * @param  courseID 专题id
     * @param  content 发表的内容
     */
    courseViews(params) {
        return fetch({method: 'post', url: 'senceViews/courseViews', params: params})
    },
    /**
     * 专题 想法列表
     * @param  id 专题id
     */
    courseViewsList(params) {
        return fetch({method: 'post', url: 'senceViews/courseViewsList', params: params})
    },
    /**
     * 更新接口
     * @param  platform
     */
    updateLogin(params) {
        return fetch({method: 'post', url: 'user/updateUserLogin', params: params})
    },
    /**
     * 订阅接口
     * @param  subscriptionType ：订阅类型 'monthlySubscription' // 'annualSubscription'
     */
    subscriptionUpskill(params) {
        return fetch({method: 'post', url: 'weixinPay/subscriptionUpskill', params: params})
    },
    /**
     * 订阅接口 二维码支付
     * @param  subscriptionType 
     */
    payCodeUpskill(params) {
        return fetch({method: 'post', url: 'weixinPay/QRcode/subscriptionUpskill', params: params})
    },
    /**
     * 订阅页/图片
     */
    myDetails(params) {
        return fetch({method: 'post', url: 'subscription/details', params: params})
    },
    /**
     * 推荐页
     */
    getPushDailyEditorList(params) {
        return fetch({method: 'post', url: 'myLearning/getPushDailyEditorList', params: params})
    },
    /**
     * 更新 投票结果
     * @param pollID :id
     */
    updatePollData(params) {
        return fetch({method: 'post', url: 'teamByTaskOneDate/updatePollData', params: params})
    },
    /**
     * 保存用户档案
     * @param json
     */
    saveUserProfile(params) {
        return fetch({method: 'post', url: 'userprofile/v4/userProfile', params: params})
    },
    /**
     * 即能币兑换天数
     * @param days 天数
     */
    subscriptionCoinUpskill(params) {
        return fetch({method: 'post', url: 'weixinPay/jinengBin/subscriptionUpskill', params: params})
    },
    /**
     * 获得即能币余额
     */
    subscriptionDetails(params) {
        return fetch({method: 'post', url: 'weixinPay/jinengBin/subscriptionDetails', params: params})
    },
    /**
     * 搜索课程 初始化
     */
    searchConfig(params) {
        return fetch({method: 'post', url: 'search/searchConfig', params: params})
    },
    /**
     * 搜索课程 10-29之前
     * @param content 搜索内容
     */
    courseSearch(params) {
        return fetch({method: 'post', url: 'search/courseSearch', params: params})
    },
    /**
     * 搜索课程 10-29之前
     * @param content 搜索内容
     */
    fullSearch(params) {
        return fetch({method: 'post', url: 'search/fullSearch', params: params})
    },
    /**
     * 封面页详情
     * @param senceID
     */
    sencePreviewInfo(params) {
        return fetch({method: 'post', url: 'sence/sencePreviewInfo', params: params})
    },
    /**
     * 订阅详情
     * @param 
     */
    mixedPaymentInfo(params) {
        return fetch({method: 'post', url: 'weixinPay/mixedPaymentInfo', params: params})
    },
    /**
     * 订阅付款
     * @param 
     */
    mixedPayment(params) {
        return fetch({method: 'post', url: 'weixinPay/mixedPayment', params: params})
    },
    /**
     * 运营限免课程
     * @param source
     */
    todayActivity(params) {
        return fetch({method: 'post', url: 'todayTask/activity', params: params})
    },
    /**
     * 运营限免课程 领取
     * @param source
     */
    receiveActivityCourse(params) {
        return fetch({method: 'post', url: 'todayTask/receiveActivityCourse', params: params})
    },
    /**
     * 领取一门课程
     * @param token token
     * @param courseId 课程id
     */
    userGetCourse(params) {
        return fetch({method: 'post', url: 'course/userGetCourse', params: params})
    },
    /**
     * 获取可选即能体系列表
     * @param token token
     */
    getRoleAndSkillsList(params) {
        return fetch({method: 'post', url: 'userprofile/roleAndSkillInfo', params: params})
    },
    /**
     * 查询新人礼包领取状态
     * @param token token
     */
    getNewUserGiftbagStatus(params) {
        return fetch({method: 'post', url: 'user/giftStatus', params: params})
    },
    /**
     * 领取新人礼包
     * @param token token
     */
    getNewUserGiftbag(params) {
        return fetch({method: 'post', url: 'user/receiveGift', params: params})
    },
    /**
     * 领取新人礼包
     * @param token token
     * @param examID 测评id
     */
    shareExamScore(params) {
        return fetch({method: 'post', url: 'userExam/shareExamScore', params: params})
    },
    /**
     * 创建组队(组队领会员活动)
     * @param token token
     * @param examID 测评id
     */
    buildGroup(params) {
        return fetch({method: 'post', url: 'groupDraw/buildGroupDraw', params: params})
    },
    /**
     * 加入组队(组队领会员活动)
     * @param token token
     * @param examID 测评id
     */
    joinGroup(params) {
        return fetch({method: 'post', url: 'groupDraw/addGroupDraw', params: params})
    },
    /**
     * 查询组队信息(组队领会员活动)
     * @param token token
     * @param examID 测评id
     */
    getGroupData(params) {
        return fetch({method: 'post', url: 'groupDraw/groupDrawData', params: params})
    },
    /**
     * 领取奖励(组队领会员活动)
     * @param token token
     * @param examID 测评id
     */
    receiveGroupGift(params) {
        return fetch({method: 'post', url: 'groupDraw/giveDraw', params: params})
    },
    /**
     * 查询抽奖记录(组队领会员活动)
     * @param token token
     * @param pageNum 页数
     * @param pageSize 每页查询数量
     */
    getResultsList(params) {
        return fetch({method: 'get', url: 'groupDraw/drawResultList', params: params})
    },
}
