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
 * 卡片
 */
export default {
    /**
     * 课后练习题
     * @param senceID 微课ID
     * @param courseID 课程ID
     * @param cardID 微课卡片ID
     * @param requestFlag
     * @param teamID 训练营ID
     */
    getPracticeList(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceCardListByPractice', params: params, isVisitor: true})
    },
    /**
     * 微课即练卡片列表
     * @param params senceID 微课ID
     * @param params courseID 课程ID
     * @param params requestFlag
     * @param params teamID 训练营ID
     */
    getCardList(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceCardListByGoPracticeLink', params: params, isVisitor: true})
    },
    /**
     * 微课即练卡片列表
     * @param senceID 微课ID
     * @param courseID 课程ID
     * @param cardID 微课卡片ID
     * @param requestFlag
     * @param teamID 训练营ID
     * @param params source 渠道来源
     */
    getCardListWithPreview(params) {
        return fetch({method: 'post', url: 'MVP3/getSenceCardListByGoPracticeLinkByNeedPayToTry', params: params, isVisitor: true})
    },
    /**
     * 记录学习到第几张卡片
     * @param senceID 微课ID
     * @param courseID 课程ID
     * @param cardID 微课卡片ID
     * @param requestFlag
     * @param teamID 训练营ID
     */
    markCard(params) {
        return fetch({method: 'post', url: 'courseV2/sendCard', params: params, isVisitor: true})
    },
    /**
     * 提交做题答案
     * @param senceID 微课ID
     * @param cardID 微课卡片ID
     * @param score 选中答案的分值
     * @param weight 选中答案的权重比f
     * @param message 【可选】 选中答案的文案提示
     * @param abilityGroup 【可选】 技能标签组
     * @param abilitySkill 【可选】 技能标签
     * @param questionIndex 题目的索引
     * @param json 【可选】 多选，排序题目，等选中集合
     */
    sendCardScore(params) {
        let data = Object.assign({
            cardID: '',
            weight: 0,
            questionIndex: 0,
            message: 'defaultMessage',
            json: 'defaultJson'

        }, params)
        return fetch({method: 'post', url: 'practice/doPracticeCard', params: data, isVisitor: true})
    }
}

