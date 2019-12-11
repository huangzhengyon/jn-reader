/**
 * @file
 * @author: lzb
 * @params: 参数说明
 * @history:
 * Date      Version Remarks
 * ========= ======= ==================================
 * 2018/9/25      1.0     First version
 *
 */
/**
 * 路由字典
 * @private screenName 路由名称
 * @private pageType 落地页名称
 * @private isLevel 是否是一级路由，底部的4个tab
 * @private isVisitor 是否是游客接口
 * @private sence 渠道来源的默认值
 */
export const ROUTERS = {
    /*-------------------今日-----------------------*/
    'pages/tabPages/home': {screenName: '今日页', isLevel: true, isVisitor: true},
    
    /*-------------------课程-----------------------*/
    'pages/tabPages/course': {screenName: '课程页', isLevel: true, isVisitor: true},
    'pages/course-module/course-details': {screenName: '课程详情页', sence: 'CourseShare', pageType:'CourseDetail', isVisitor: true}, // 需要记录哪门子课程详情
    'pages/course-module/course-series': {screenName: '系列详情页', sence: 'seriesShare', isVisitor: true}, // 需要记录哪门子的系列课程
    'pages/course-module/course-learning': {screenName: '微课学习', sence: 'CardsShare', pageType: 'Lesson'}, // 需要记录哪门子的微课
    'pages/course-module/course-learning-discuss': {screenName: '微课学习想法详情'}, // 需要记录哪门子的微课
    'pages/course-module/course-first-learning': {screenName: '微课学习加载页'}, // 需要记录哪门子的微课
    'pages/course-module/course-series-list': {screenName: '微课全部系列页'},
    'pages/course-module/course-discuss': {screenName: '微课即练评论'}, // 需要记录哪门子的微课
    'pages/course-module/course-learn-complete': {screenName: '微课学习完成页'}, // 需要记录哪门子的微课
    'pages/course-module/course-practice-complete': {screenName: '微课练习完成页'}, // 需要记录哪门子的微课
    'pages/course-module/course-level-instructions': {screenName: '技能等级说明'},
    'pages/course-module/course-exercises': {screenName: '微课练习'}, // 需要记录哪门子的微课
    'pages/course-module/course-evaluation': {screenName: '微课评价'}, // 需要记录哪门子的微课
    'pages/course-module/course-evaluation-complete': {screenName: '微课评价成功页'}, // 需要记录哪门子的微课
    'pages/course-module/course-subscribe': {screenName: '订阅页'}, //
    'pages/course-module/course-search': {screenName: '课程搜索页'}, //
    'pages/course-module/course-search-result-more': {screenName: '课程搜索结果页'}, //
    'pages/course-module/course-cover': {screenName: '微课封面页'}, //
    'pages/course-module/course-cover': {screenName: '新微课封面页'}, //
    /*-------------------欢迎模版-----------------------*/
    'pages/registered-module/weclome': {screenName: 'onboarding/欢迎页'},
    'pages/registered-module/interest-select': {screenName: 'onboarding/角色选择页'},
    'pages/registered-module/recommend': {screenName: 'onboarding/推荐课程'},
    'pages/registered-module/author': {screenName: '手机授权页'},
    /*-------------------其他模版-----------------------*/
    'pages/other-module/work-template':  {screenName: '精练工作模板', isVisitor: true},
    'pages/other-module/job-skills':  {screenName: '核心工作技能', isVisitor: true},
    'pages/other-module/community':  {screenName: '专属社群', isVisitor: true},
    'pages/other-module/first-exprience':  {screenName: '初体验动画'},
    'pages/other-module/exprience-over':  {screenName: '初体验完毕'},
    'pages/other-module/view-link':  {screenName: '查看外链'},
    /*-------------------训练营-----------------------*/
    'pages/training-camp-module/index': {screenName: '训练营', isVisitor: true},
    'pages/training-camp-module/release-discuss': {screenName: '发布谈论'},
    'pages/training-camp-module/my/release-discuss': {screenName: '我管理-发布谈论'},


    'pages/training-camp-module/all-training': {screenName: '训练营-查看全部训练营'},
    'pages/training-camp-module/introduce': {screenName: '训练营-训练营介绍'},
    'pages/training-camp-module/registration': {screenName: '训练营-报名', sence: 'teamLearnShare'},
    'pages/training-camp-module/registration-info': {screenName: '训练营-报名信息', sence: 'teamLearnShare',isVisitor: true},
    'pages/training-camp-module/training-detail': {screenName: '训练营-课程列表', sence: 'teamLearnShare'},
    'pages/training-camp-module/release-message': {screenName: '训练营-发布消息'},
    'pages/training-camp-module/add-task': {screenName: '训练营-添加任务'},
    'pages/training-camp-module/invite-friends': {screenName: '训练营-邀请好友'},
    'pages/training-camp-module/feed-list': {screenName: '训练营-feed列表'},
    'pages/training-camp-module/skill-levels': {screenName: '训练营-技能水平'},
    'pages/training-camp-module/evaluation': {screenName: '训练营-评价'},
    'pages/training-camp-module/overview-evaluation': {screenName: '训练营-评价总览'},
    'pages/training-camp-module/feed-detail': {screenName: '训练营-feed详情'},
    'pages/training-camp-module/ranking-list': {screenName: '训练营-排行榜'},
    'pages/training-camp-module/transcript': {screenName: '训练营-成绩单'},
    'pages/training-camp-module/learning-result': {screenName: '训练营-学习成果'},
    'pages/training-camp-module/task-list': {screenName: '训练营-全部任务'},
    'pages/training-camp-module/my/main': {screenName: '我管理-管理'},
    'pages/training-camp-module/my/edit': {screenName: '我管理-编辑训练营'},
    'pages/training-camp-module/my/students-list': {screenName: '我管理-学员列表'},
    'pages/training-camp-module/my/students-management': {screenName: '我管理-学员管理'},
    'pages/training-camp-module/my/release-task': {screenName: '我管理-发布任务'},
    'pages/training-camp-module/my/share-link': {screenName: '我管理-分享链接'},
    'pages/training-camp-module/my/course-evaluation': {screenName: '我管理-课程评价'},
    'pages/training-camp-module/my/release-poll': {screenName: '我管理-发布投票'},
    'pages/training-camp-module/my/learning-goals': {screenName: '我管理-学习目标'},

    /*-------------------活动-----------------------*/
    'pages/SpecialCourse/index': {screenName: '专题页', sence: 'SpecialCourseShare', pageType: 'SpecialCourse', isVisitor: true},  // 需要记录哪个专题
    'pages/SpecialCourse/special-discuss': {screenName: '专题页/专题想法', sence: 'SpecialCourseDiscussShare', pageType: 'specialDiscuss'},  // 需要记录哪个专题

    'pages/activity-module/appraisal-start': {screenName: '测评/测评封面', sence: 'preTestShare', isVisitor: true},
    'pages/activity-module/appraisal-questions': {screenName: '测评/测评答题'},
    'pages/activity-module/appraisal-results': {screenName: '测评/测评结果'},
    'pages/activity-module/new-appraisal-cover': {screenName: '测评/测评封面', sence: 'preTestShare', isVisitor: true},
    'pages/activity-module/new-appraisal-subject': {screenName: '测评/测评答题'},
    'pages/activity-module/new-appraisal-results': {screenName: '测评/测评结果'},
    'pages/activity-module/new-user-gift': {screenName: '首课/新人礼包'},
    'pages/activity-module/team-learning': {screenName: '组队抽会员活动页',sence:'teamDraw'},
    'pages/activity-module/team-draw-record': {screenName: '抽奖记录'},
    



    /*-------------------我的-----------------------*/
    'pages/tabPages/userCenter': {screenName: '我的' ,isLevel: true,isVisitor: true},
    'pages/user-module/mine-edit': {screenName: '我的-个人信息'},
    'pages/user-module/mine-edit-status': {screenName: '我的-更改职能'},
    'pages/user-module/mine-edit-interest': {screenName: '我的-更改兴趣'},
    'pages/user-module/mine-edit-target': {screenName: '我的-更改目标'},
    'pages/user-module/mine-edit-phone': {screenName: '我的-更改手机号码'},
    'pages/user-module/mine-edit-email': {screenName: '我的-更改邮箱'},
    'pages/user-module/skill-board': {screenName: '我的-技能看板', sence: 'skillBoard'},
    'pages/user-module/mine-course': {screenName: '我的-已完成微课'},
    'pages/user-module/score-detail': {screenName: '我的-即能币明细'},
    'pages/user-module/score-rules': {screenName: '我的-即能币规则'},
    'pages/user-module/apply-for-test': {screenName: '我的-申请成为内测用户'},
    'pages/user-module/mine-feedback': {screenName: '我的-意见反馈'},
    'pages/user-module/mine-special': {screenName: '我的-个性化推荐'},
    /*-------------------异常-----------------------*/
    'pages/Mistake/index': {screenName: '异常-报错页面'}, // 某个接口不通、服务器挂了、用户网络超时等
}

// 微信场景值
export const SCENE = {
    1001: null, // '发现栏小程序主入口'
    1005: 'search', // '顶部搜索框的搜索结果页'
    1006: 'search', // '发现栏小程序主入口搜索框的搜索结果页'
    1007: null, // '单人聊天会话中的小程序消息卡片',
    1008: null, // '群聊会话中的小程序消息卡片'
    1011: 'QRcode', // '扫描二维码'
    1012: 'QRcode', // '长按图片识别二维码'
    1013: 'QRcode', // '手机相册选取二维码'
    1014: null, // '服务通知', // '小程序模板消息'
    1017: null, // '前往体验版的入口页'
    1019: null, // '微信钱包'
    1020: 'officalAccount1020', // '公众号 profile 页相关小程序列表'
    1022: null, // '聊天顶部置顶小程序入口'
    1023: null, // '安卓系统桌面图标'
    1024: null, // '小程序 profile 页'
    1025: 'QRcode', // '扫描一维码'
    1026: null, // '附近小程序列表'
    1027: 'search', // '顶部搜索框搜索结果页「使用过的小程序」列表'
    1028: null, // '我的卡包'
    1029: null, // '卡券详情页'
    1030: null, // '自动化测试下打开小程序'
    1031: 'QRcode', // '长按图片识别一维码'
    1032: 'QRcode', // '手机相册选取一维码'
    1034: null, // '微信支付完成页'
    1035: 'officalAccount1035', // '公众号自定义菜单'
    1036: null, // 'App 分享消息卡片'
    1037: null, // '小程序打开小程序'
    1038: null, // '从另一个小程序返回'
    1039: null, // '摇电视',
    1042: 'search', // '添加好友搜索框的搜索结果页'
    1043: 'officalAccount1043', // '公众号模板消息'
    1044: null, // '带 shareTicket 的小程序消息卡片 详情'
    1045: null, // '朋友圈广告'
    1046: null, // '朋友圈广告详情页'
    1047: 'QRcode', // '扫描小程序码'
    1048: 'QRcode', // '长按图片识别小程序码'
    1049: 'QRcode', // '手机相册选取小程序码'
    1052: null, // '卡券的适用门店列表'
    1053: 'search', // '搜一搜的结果页'
    1054: 'search', // '顶部搜索框小程序快捷入口'
    1056: null, // '音乐播放器菜单'
    1057: null, // '钱包中的银行卡详情页'
    1058: 'officalAccount', // '公众号文章
    1059: null, // '体验版小程序绑定邀请页'
    1064: null, // '微信连Wi-Fi状态栏'
    1067: 'officalAccount1067', // '公众号文章广告'
    1068: null, // '附近小程序列表广告'
    1069: null, // '移动应用'
    1071: null, // '钱包中的银行卡列表页'
    1072: null, // '二维码收款页面'
    1073: null, // '客服消息列表下发的小程序消息卡片'
    1074: 'officalAccount1074', // '公众号会话下发的小程序消息卡片'
    1077: null, // '摇周边'
    1078: null, // '连Wi-Fi成功页'
    1079: null, // '微信游戏中心'
    1081: null, // '客服消息下发的文字链'
    1082: 'officalAccount1082', // '公众号会话下发的文字链'
    1084: null, // '朋友圈广告原生页'
    1089: 'Wechat_drop_down', // '微信聊天主界面下拉，「最近使用」栏（基础库2.2.4版本起包含「我的小程序」栏）'
    1090: null, // '长按小程序右上角菜单唤出最近使用历史'
    1091: null, // '公众号文章商品卡片'
    1092: null, // '城市服务入口'
    1095: null, // '小程序广告组件'
    1096: null, // '聊天记录'
    1097: null, // '微信支付签约页'
    1099: null, // '页面内嵌插件'
    1102: null, // '公众号 profile 页服务预览'
    1103: null, // '发现栏小程序主入口，「我的小程序」列表（基础库2.2.4版本起废弃）'
    1104: null // '微信聊天主界面下拉，「我的小程序」栏（基础库2.2.4版本起废弃）'
}
