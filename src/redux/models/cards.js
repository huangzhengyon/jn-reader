import {fetch} from '../../api'
import {setCurrentCourseID} from './courses'
import {parsePercentageForPoll} from '../../utils'

// Contents
const CARDS_GAP = 5
export const SET_CARDS = 'SET_CARDS'
export const GET_CARDS = 'GET_CARDS'
export const DROP_CARDS = 'DROP_CARDS'
export const SET_CURRENT_SECTION_OFFSET = 'SET_CURRENT_SECTION_OFFSET'
export const UPDATE_APPOINTED_CARD_BY_OFFSET = 'UPDATE_APPOINTED_CARD_BY_OFFSET'
export const SET_APPOINTED_CARD_FRAGMENT = 'SET_APPOINTED_CARD_FRAGMENT'
export const DROP_APPOINTED_CARD_ANIMATION = 'DROP_APPOINTED_CARD_ANIMATION'
export const RESET_ALL_CARD_ANIMATION = 'RESET_ALL_CARD_ANIMATION'
export const SET_REQUEST_FLAG = 'SET_REQUEST_FLAG'
export const SET_RELOAD_IMAGE = 'SET_RELOAD_IMAGE'
export const SET_IMAGE_LOAD_ERROR = 'SET_IMAGE_LOAD_ERROR'
export const FAILURE = 'FAILURE'
export const SET_APPOINTED_CARD_FRAGMENT_ANIMATION = 'SET_APPOINTED_CARD_FRAGMENT_ANIMATION'
export const REORDER_TEXT_SELECTIONS = 'REORDER_TEXT_SELECTIONS'
export const REVERSE_FOLDER_SELECTION = 'REVERSE_FOLDER_SELECTION'
export const UNLOCK_REJECTED_CARD = 'UNLOCK_REJECTED_CARD'
export const SET_ASSOCICATION_LOCATION = 'SET_ASSOCICATION_LOCATION'
export const SET_ASSOCICATION_HIDDEN = 'SET_ASSOCICATION_HIDDEN'
export const SET_ASSOCICATION_MATCH_OPTION_STATU = 'SET_ASSOCICATION_MATCH_OPTION_STATU'
export const SHUFFLE_ASSOCICATION_CARD = 'SHUFFLE_ASSOCICATION_CARD'
export const SET_PRACTICE_INPUTS_FOR_COLLECTIONS = 'SET_PRACTICE_INPUTS_FOR_COLLECTIONS'
export const CLEAR_CARDS_SECTIONS = 'CLEAR_CARDS_SECTIONS'
export const UPDATE_ORDER_CARD = 'UPDATE_ORDER_CARD'
export const SHUFFLE_ORDER_CARD = 'SHUFFLE_ORDER_CARD'
export const TOGGLE_BLANK_BUTTON = 'TOGGLE_BLANK_BUTTON'
export const SHUFFLE_BLANK_CARD = 'SHUFFLE_BLANK_CARD'
export const SET_HOT_AREA_SELECTED_OFFSET = 'SET_HOT_AREA_SELECTED_OFFSET'
export const SET_SLIDER_STEP = 'SET_SLIDER_STEP'
export const SET_COMBINATION_STEP = 'SET_COMBINATION_STEP'
export const SHOW_ANCHOR_FOOTER = 'SHOW_ANCHOR_FOOTER'
export const HIDE_ANCHOR_FOOTER = 'HIDE_ANCHOR_FOOTER'
export const WIND_UP_SCORE_FOR_SENCE = 'WIND_UP_SCORE_FOR_SENCE'
export const SET_CONCLUSION_FOR_SENCE = 'SET_CONCLUSION_FOR_SENCE'
export const SHUFFLE_COMBINATION = 'SHUFFLE_COMBINATION'
export const SINGLE_POLL = 'SINGLE_POLL'
export const MULTIPLE_POLL_SELECT = 'MULTIPLE_POLL_SELECT'
export const MULTIPLE_POLL_SUBMIT = 'MULTIPLE_POLL_SUBMIT'

const customErrActionBundle = {
    type: FAILURE,
    payload: {
        status: 'failure',
        response: {},
        error: {message: '错误'}
    }
}

export const setCards = ({status = 'pending', response = {}, error = {message: 'Oops'}}) => 'success' === status ? ({
    type: SET_CARDS,
    payload: {cards: response}
}) : customErrActionBundle
export const updateAppointedCardByOffset = ({offset, type, bundle}) => ({
    type: UPDATE_APPOINTED_CARD_BY_OFFSET,
    payload: {
        offset,
        type,
        bundle
    }
})

export const setImageLoadError = ({componentOffset}) => ({
    type: SET_IMAGE_LOAD_ERROR,
    payload: {
        componentOffset
    }
})

export const reverseFolderSelection = ({componentOffset, selectionOffset}) => ({
    type: REVERSE_FOLDER_SELECTION,
    payload: {componentOffset, selectionOffset}
})

export const shuffleTextSelections = offset => ({
    type: REORDER_TEXT_SELECTIONS,
    payload: {offset}
})

export const setAppointedCardFragmentAnimation = ({offset, animation}) => {
    return {
        type: SET_APPOINTED_CARD_FRAGMENT_ANIMATION,
        payload: {offset, animation}
    }
}

export const setRequestFlag = timestamp => ({
    type: SET_REQUEST_FLAG,
    payload: {timestamp}
})

export const toggleAppointedCardFragment = ({offset, type = '', data = {}}) => {
    return {
        type: SET_APPOINTED_CARD_FRAGMENT,
        payload: {offset, type, data}
    }
}

export const setCurrentCardOffset = pOffset => {
    return {
        type: SET_CURRENT_SECTION_OFFSET,
        payload: {offset: pOffset}
    }
}

export const resetCurrentCardOffset = () => {
    return {
        type: SET_CURRENT_SECTION_OFFSET,
        payload: {
            offset: 0
        }
    }
}

export const dropAppointedCardAnimation = offset => {
    return {
        type: DROP_APPOINTED_CARD_ANIMATION,
        payload: {offset}
    }
}

export const setSliderStep = ({componentOffset, score}) => ({
    type: SET_SLIDER_STEP,
    payload: {componentOffset, score}
})

export const setCombinationStep = ({componentOffset, score}) => ({
    type: SET_COMBINATION_STEP,
    payload: {componentOffset, score}
})

export const shuffleCombination = offset => ({
    type: SHUFFLE_COMBINATION,
    payload: {componentOffset: offset}
})

export const setLoadedImage = ({componentOffset, image}) => ({
    type: SET_RELOAD_IMAGE,
    payload: {componentOffset, image}
})

export const reloadImage = ({componentOffset}) => (dispatch, getState) => {
    const {cards: {sections}} = getState()
    let mUrl = sections[componentOffset]['bigimage'].replace('http://image.runwise.cn/', 'https://wx-small.runwise.cn/')
    return new Promise((resolve, reject) => {
        return wx.downloadFile({
            url: mUrl,
            success: ({tempFilePath, statusCode}) => {
                if (200 !== statusCode) return reject('load image error is not equal to 200, http error')
                dispatch(setLoadedImage({componentOffset, image: tempFilePath}))
                return resolve(tempFilePath)
            },
            fail: error => reject(error)
        })
    })
}

export const fetchCards = ({token, senceID, courseID, teamID}) => (dispatch, getState) => {
    const requestFlag = Date.now()
    dispatch(setCards({status: 'pending'}))
    dispatch(setRequestFlag(requestFlag))
    return fetch.getCardList({token, senceID, courseID, requestFlag, teamID}).then(({description, list, name, target, lastCardID, senceIndex, senceCount, minute, subtitle, isSwitchTipsShow, lessonType}) => {
        const mArr = list && list.map(item => formatAppointedItem({item, senceIndex, senceCount}))
        dispatch(setCards({
            status: 'success',
            response: mArr
        }))
        dispatch(setCurrentCourseID(courseID))
        return {
            senceID,
            senceName: name,
            courseID,
            lastCardID,
            requestFlag,
            minute,
            subtitle,
            isSwitchTipsShow,
            lessonType,
            cards: mArr
        }
    }).catch(error => {
        dispatch(setCards({status: 'failure', error}))
        throw error
    })
}

export const fetchCardsWithPreview = ({token, senceID, courseID, teamID, source,preview}) => (dispatch, getState) => {
    // console.log('sence id', senceID)
    // console.log('course id', courseID)
    const requestFlag = Date.now()
    dispatch(setCards({status: 'pending'}))
    dispatch(setRequestFlag(requestFlag))

    return fetch.getCardListWithPreview({token, senceID, courseID, requestFlag, teamID, source,preview})
        .then(({description, isTryAllowStatus, isTryAllow, listTry, list, name, imageUrl, target, lastCardID, senceIndex, senceCount, minute, subtitle, isSwitchTipsShow, lessonType, isOpenScene, isHasPracticeLink}) => {
            const mArr = list && list.map(item => formatAppointedItem({item, senceIndex, senceCount}))
            const mArrPreview = listTry && listTry.map(item => formatAppointedItem({item, senceIndex, senceCount}))
            dispatch(setCards({
                status: 'success',
                response: mArr
            }))
            dispatch(setCurrentCourseID(courseID))
            return {
                isTryAllowStatus,
                isTryAllow,
                mArrPreview,
                senceID,
                senceName: name,
                imageUrl,
                courseID,
                source,
                lastCardID,
                requestFlag,
                minute,
                subtitle,
                isSwitchTipsShow,
                lessonType,
                cards: mArr,
                isOpenScene,
                isHasPracticeLink
            }
        })
        .catch(error => {
            dispatch(setCards({status: 'failure', error}))
            throw error
        })
}

export const unlockRejectedCard = ({componentOffset, flag}) => ({
    type: UNLOCK_REJECTED_CARD,
    payload: {componentOffset, flag}
})

export const setAssocicationLocation = ({componentOffset, associationOffset, x, y}) => ({
    type: SET_ASSOCICATION_LOCATION,
    payload: {componentOffset, associationOffset, x, y}
})

export const setAssocicationHidden = ({componentOffset, associationOffset, to}) => ({
    type: SET_ASSOCICATION_HIDDEN,
    payload: {componentOffset, associationOffset, to}
})

export const setAssocicationMatchOptionStatu = ({componentOffset, associationOffset, flag}) => ({
    type: SET_ASSOCICATION_MATCH_OPTION_STATU,
    payload: {componentOffset, associationOffset, flag}
})

export const shuffleAssocicationCard = ({componentOffset}) => ({
    type: SHUFFLE_ASSOCICATION_CARD,
    payload: {componentOffset}
})

export const setPracticeInputsForCollections = ({inputs}) => ({
    type: SET_PRACTICE_INPUTS_FOR_COLLECTIONS,
    payload: {inputs}
})

export const clearCardsSections = () => ({
    type: CLEAR_CARDS_SECTIONS
})

export const resetAllCardAnimation = () => ({
    type: RESET_ALL_CARD_ANIMATION
})

export const updateOrderCard = ({componentOffset, orderList, mapper}) => ({
    type: UPDATE_ORDER_CARD,
    payload: {componentOffset, orderList, mapper}
})

export const shuffleOrderCard = ({componentOffset}) => ({
    type: SHUFFLE_ORDER_CARD,
    payload: {componentOffset}
})

export const toggleBlankButton = ({componentOffset, optionID}) => ({
    type: TOGGLE_BLANK_BUTTON,
    payload: {componentOffset, optionID}
})

export const shuffleBlankCard = ({componentOffset}) => ({
    type: SHUFFLE_BLANK_CARD,
    payload: {componentOffset}
})

export const setHotArea = ({componentOffset, areaOffset}) => ({
    type: SET_HOT_AREA_SELECTED_OFFSET,
    payload: {componentOffset, areaOffset}
})

export const setAnchorFooterShown = ({componentOffset}) => ({
    type: SHOW_ANCHOR_FOOTER,
    payload: {componentOffset}
})

export const setAnchorFooterHidden = ({componentOffset}) => ({
    type: HIDE_ANCHOR_FOOTER,
    payload: {componentOffset}
})

export const setConclusionForSence = ({status, cardID, correctRate, correctRateAll, correctRateProgress, skillGradeText, skillName, skillProgress, skillScore, skillScoreProgress}) => ({
    type: SET_CONCLUSION_FOR_SENCE,
    payload: {
        status,
        cardID,
        correctRate,
        correctRateProgress,
        correctRateAll,
        skillGradeText,
        skillName,
        skillProgress,
        skillScore,
        skillScoreProgress
    }
})

export const setSinglePoll = ({componentOffset, optionID}) => ({
    type: SINGLE_POLL,
    payload: {componentOffset, optionID}
})

export const setMultiplePollSelect = ({componentOffset, optionID}) => ({
    type: MULTIPLE_POLL_SELECT,
    payload: {componentOffset, optionID}
})

export const setMultiplePollSubmit = ({componentOffset}) => ({
    type: MULTIPLE_POLL_SUBMIT,
    payload: {componentOffset}
})

const formatAppointedItem = ({item, senceIndex, senceCount}) => {
    const fragment = {orginalType: item.type, fragmentIsShown: false, data: null}
    const selectMappers = [false, false, false, false, false, false]
    let newItem = item
    let animation = null
    let allowSwitch = true

    //处理卡片描述式样标记-转为richText 节点内容
    let description = item.description ? item.description : '';
    let richTextNodeList = [];
    if ((description && description.indexOf('/*') >= 0 && description.indexOf('*/') >= 0) ||
        (description.indexOf('/&') >= 0 && description.indexOf('&/') >= 0) ||
        (description.indexOf('/#') >= 0 && description.indexOf('#/') >= 0) ||
        (description.indexOf('/%') >= 0 && description.indexOf('%/') >= 0)) {
        let list = description.split('/');
        for (var i in list) {
            if (list[i] === '') {
                continue;
            }
            let oneSplit = '/' + list[i] + '/';
            if (oneSplit.indexOf('/*') >= 0 && oneSplit.indexOf('*/') >= 0) {
                let text = list[i].replace(/\*/g, '');
                richTextNodeList.push({
                    name: 'label',
                    attrs: {style: 'font-weight:bold'},
                    children: [{type: 'text', text: text}]
                });
            } else if (oneSplit.indexOf('/&') >= 0 && oneSplit.indexOf('&/') >= 0) {
                let text = list[i].replace(/\&/g, '');
                richTextNodeList.push({
                    name: 'label',
                    attrs: {class: 'text-title-richText'},
                    children: [{type: 'text', text: text}]
                });
            } else if (oneSplit.indexOf('/#') >= 0 && oneSplit.indexOf('#/') >= 0) {
                let text = list[i].replace(/\#/g, '');
                richTextNodeList.push({
                    name: 'label',
                    attrs: {class: 'text-subtitle-richText'},
                    children: [{type: 'text', text: text}]
                });
            } else if (oneSplit.indexOf('/%') >= 0 && oneSplit.indexOf('%/') >= 0) {
                let text = list[i].replace(/\%/g, '');
                richTextNodeList.push({
                    name: 'label',
                    attrs: {class: 'text-subtitle-green-richText'},
                    children: [{type: 'text', text: text}]
                });
            } else {
                richTextNodeList.push({
                    name: 'label',
                    children: [{type: 'text', text: list[i]}]
                });
            }
        }
    } else {
        //添加整段
        richTextNodeList.push({
            name: 'label',
            children: [{type: 'text', text: description}]
        });
    }
    //处理卡片描述式样标记-转为richText 节点内容------结束
    if ('notView' === item.isView && ['session', 'textSelection', 'textSelectionVer2', 'transit', 'association', 'order', 'selectBlank', 'judgement', 'slider'].some(type => type === item.type) || 'front' === item.type) allowSwitch = false // 锁定卡片
    // if (['session', 'textSelection', 'transit', 'association', 'order', 'selectBlank', 'slider'].some(type => type===item.type)) allowSwitch = false
    if ('order' === item.type) {
        return {
            ...formatOrderItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false,
            richTextNodeList
        }
    }
    if ('selectBlank' === item.type) {
        return {
            ...formatBlankItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('association' === item.type) {
        return {
            ...formatAssocicationItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('hotArea' === item.type) {
        return {
            ...formatHotAreaItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('hotSpot' === item.type) {
        return {
            ...formatHotSpotItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('slider' === item.type) {
        return {
            ...formatSliderItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('combination' === item.type) {
        return {
            ...formatCombinationItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('textSelectionVer2' === item.type) {
        return {
            ...formatTextSelectionVer2Item({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    if ('poll' === item.type) {
        return {
            ...formatPollItem({item}),
            senceIndex,
            senceCount,
            fragment,
            animation,
            selectMappers,
            allowSwitch,
            isImageLoadError: false
        }
    }
    return {
        ...item,
        senceIndex,
        senceCount,
        fragment,
        animation,
        selectMappers,
        allowSwitch,
        isImageLoadError: false,
        richTextNodeList
    }
}

const formatOrderItem = ({item}) => {
    if ('order' !== item.type && 'order' !== item['fragment']['orginalType']) return item
    let sourceList = (function (aArr) {
        let iLength = aArr.length,
            i = iLength,
            mTemp,
            iRandom

        while (i--) {
            if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                mTemp = aArr[i]
                aArr[i] = aArr[iRandom]
                aArr[iRandom] = mTemp
            }
        }

        return aArr
    })(item.select)
    let orderList = sourceList.map(blob => ({optionID: blob.id, isAnswer: false, weight: blob.weight}))
    let mapper = {}
    for (let [index, blob] of orderList.entries()) {
        mapper[blob.optionID] = {order: index, isAnswer: blob.isAnswer}
    }
    return {...item, sourceList, orderList, mapper, isAnchorFooterShown: true}
}

const formatBlankItem = ({item, resetShown = true}) => {
    if ('selectBlank' !== item.type) return item
    let mString = item.title.replace(/[\（,\）]/g, '===')
    const mTextList = mString.split('===')
    // console.log('title', mString, mTextList)
    if (mTextList.length < 2) return item
    let richTextNodeList = []
    let mArr = resetShown && item.select.map(blob => ({...blob, isShown: true})) || item.select.map(blob => ({...blob}))
    let select = (function (aArr) {
        let iLength = aArr.length,
            i = iLength,
            mTemp,
            iRandom

        while (i--) {
            if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                mTemp = aArr[i]
                aArr[i] = aArr[iRandom]
                aArr[iRandom] = mTemp
            }
        }

        return aArr
    })(mArr)
    return {...item, richTextNodeList, select, sentences: mTextList}
}

const formatAssocicationItem = ({item}) => {
    if ('association' !== item.type && 'association' !== item['fragment']['orginalType']) return item
    let mAssociation = item.association.map(blob => ({
        ...blob,
        matchOptionStatu: 'waiting',
        hidden: false,
        x: 76,
        y: 0
    }))
    let mMatching = item.matching.map(blob => ({...blob, answer: ''}))
    return {...item, association: mAssociation, matching: mMatching}
}

const formatHotAreaItem = ({item}) => {
    if ('hotArea' !== item.type) return item
    return {...item, selectedAreaOffset: null}
}

const formatHotSpotItem = ({item}) => {
    if ('hotSpot' !== item.type) return item
    let arr = []
    for (let one of item.hotSpotFlag) {
        if (one) {
            let left = Number(100 / 7).toFixed(6) * ((one - 1) % 7)
            let top = Number(100 / 10).toFixed(6) * Math.floor((one - 1) / 7)
            let oneTemp = {
                index: one,
                left: left,
                top: top
            }
            arr.push(oneTemp)
        }

    }
    return {...item, hotSpotFlagCopy: arr}
}

const formatSliderItem = ({item}) => {
    if ('slider' !== item.type) return item
    let mSelect = item.select.map(blob => ({...blob, score: 0}))
    let mPerField = (100 / item.descriptionList.length).toFixed(4)
    return {...item, sliderFixedTipLeft: 0, select: mSelect, step: 0, stepsSum: item.select.length, perField: mPerField}
}

const formatCombinationItem = ({item}) => {
    if ('combination' !== item.type) return item
    let mSelect = item.select.map(blob => ({
        ...blob,
        scoreGotten: 0,
        combinationSelect: (function (aArr) {
            let iLength = aArr.length,
                i = iLength,
                mTemp,
                iRandom

            while (i--) {
                if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                    mTemp = aArr[i]
                    aArr[i] = aArr[iRandom]
                    aArr[iRandom] = mTemp
                }
            }

            return aArr
        })(blob.combinationSelect)
    }))
    return {...item, select: mSelect, step: 0, isAnchorFooterShown: true}
}

const formatTextSelectionVer2Item = ({item}) => {
    if ('textSelectionVer2' !== item.type) return item
    let select = (function (aArr) {
        let iLength = aArr.length,
            i = iLength,
            mTemp,
            iRandom

        while (i--) {
            if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                mTemp = aArr[i]
                aArr[i] = aArr[iRandom]
                aArr[iRandom] = mTemp
            }
        }
        return aArr
    })(item['select'])
    return {...item, select, isAnchorFooterShown: true}
}

const formatPollItem = ({item}) => {
    if ('poll' !== item.type) return item
    let totalBallots = item['select'].reduce((total, current) => total + current.ballot, 0)
    const selectArr = item.select.map((blob, index) => ({
        ...blob,
        percentage: Math.round(parseInt(blob.ballot / totalBallots * 100))
    }))
    const mFirstAmount = selectArr.reduce((total, current, index) => total - (0 === index ? 0 : current.percentage), 100)
    selectArr[0]['percentage'] = mFirstAmount
    const mType = 'single' === item.cardStatus ? 'poll' : 'multiplePoll'
    return {...item, select: selectArr, numberOfSelections: 0, type: mType}
}

const calculateCardsWhichShouldBeShown = ({length, gap, now}) => {
    if (gap < 5) return false
    if (0 === gap % 2) return false
    let mStep = (gap - 1) / 2
    let mAddition = (now + mStep > length) ? (length - now) : mStep // 临界点判断
    let mReduction = 0 === now ? 0 : (now - mStep < 0) ? (now - mStep) : -mStep // 临界点判断
    if (now < mStep) mAddition = mStep + Math.abs(now - mStep)
    if (now + mStep > length) mReduction = -mStep - (now + mStep - length)
    let mMax = now + mAddition
    let mMin = now + mReduction
    // console.log(`当前是第几页: ${now}, 当前往前需要补足页数: ${mReduction}, 当前往后需要补足页数: ${mAddition}, 取值范围: [${mMin} - ${mMax}]`)
    let mArr = []
    while (mMax - mMin >= 0) {
        mArr.push(mMax--)
    }
    return mArr
}

const ACTIONS_HANDLERS = {
    [SET_CARDS]: (card, action) => {
        let nextState = Object.assign({}, card, {sections: action.payload.cards})
        return nextState
    },
    [DROP_CARDS]: (card, action) => {
        return Object.assign({}, card, {sections: []})
    },
    [UPDATE_APPOINTED_CARD_BY_OFFSET]: (card, action) => {
        let {payload: {offset, type, bundle}} = action
        let nextState = card
        nextState.sections.splice(offset, 1, {...bundle, type})
        return nextState
    },
    [SET_APPOINTED_CARD_FRAGMENT]: (card, {payload: {offset, type, data}}) => {
        let nextState = card
        const flag = nextState['sections'][offset]['fragment']['fragmentIsShown']
        nextState['sections'][offset]['fragment']['fragmentIsShown'] = !flag
        if (!flag) { // 非反馈展示
            nextState['sections'][offset]['type'] = type // 切换反馈type
            nextState['sections'][offset]['fragment']['data'] = data
            console.log('after toggle card fragment, new type of nextState now', nextState['sections'][offset]['type'])
            return nextState
        }
        nextState['sections'][offset]['type'] = nextState['sections'][offset]['fragment']['orginalType']
        console.log('after toggle card fragment, new type of nextState now', nextState['sections'][offset]['type'])
        return nextState
    },
    [SET_IMAGE_LOAD_ERROR]: (card, {payload: {componentOffset}}) => {
        let nextState = card
        nextState.sections[componentOffset]['isImageLoadError'] = true
        return nextState
    },
    [SET_RELOAD_IMAGE]: (card, {payload: {componentOffset, image}}) => {
        let nextState = card
        nextState.sections[componentOffset]['bigimage'] = image
        nextState.sections[componentOffset]['isImageLoadError'] = false
        return nextState
    },
    [SET_APPOINTED_CARD_FRAGMENT_ANIMATION]: (card, {payload: {offset, animation}}) => {
        let nextState = card
        nextState.sections[offset]['animation'] = animation
        return nextState
    },
    [SET_CURRENT_SECTION_OFFSET]: (card, {payload: {offset}}) => {
        let nextState = card
        return Object.assign({}, card, {currentSectionOffset: offset})
    },
    [SET_REQUEST_FLAG]: (card, {payload: {timestamp}}) => {
        return Object.assign({}, card, {requestFlag: timestamp})
    },
    [REORDER_TEXT_SELECTIONS]: (card, {payload: {offset}}) => {
        let nextState = card
        if (!card.sections[offset]) return nextState
        if (!['textSelection', 'textSelectionVer2'].some(item => item === card.sections[offset]['type'])) return nextState
        let tmp = (function (aArr) {
            let iLength = aArr.length,
                i = iLength,
                mTemp,
                iRandom

            while (i--) {
                if (i !== (iRandom = Math.floor(Math.random() * iLength))) {
                    mTemp = aArr[i]
                    aArr[i] = aArr[iRandom]
                    aArr[iRandom] = mTemp
                }
            }

            return aArr
        })(nextState['sections'][offset]['select'])
        nextState['sections'][offset]['select'] = tmp
        return nextState
    },
    [REVERSE_FOLDER_SELECTION]: (card, {payload: {componentOffset, selectionOffset}}) => {
        let nextState = card
        if ('folder' !== card.sections[componentOffset]['type']) return nextState
        nextState.sections[componentOffset]['selectMappers'][selectionOffset] = !nextState.sections[componentOffset]['selectMappers'][selectionOffset]
        return nextState
    },
    [UNLOCK_REJECTED_CARD]: (card, {payload: {componentOffset, flag}}) => {
        let nextState = card
        if (null == card.sections[componentOffset]) return nextState
        nextState.sections[componentOffset]['allowSwitch'] = Boolean(flag)
        return nextState
    },
    [SET_ASSOCICATION_LOCATION]: (card, {payload: {componentOffset, associationOffset, x, y}}) => {
        let nextState = card
        if (!card.sections[componentOffset]) return nextState
        if ('association' !== card.sections[componentOffset]['type']) return nextState
        nextState.sections[componentOffset]['association'][associationOffset]['x'] = x
        nextState.sections[componentOffset]['association'][associationOffset]['y'] = y
        return nextState
    },
    [SET_ASSOCICATION_HIDDEN]: (card, {payload: {componentOffset, associationOffset, to}}) => {
        let nextState = card
        if (!card.sections[componentOffset]) return nextState
        if ('association' !== card.sections[componentOffset]['type']) return nextState
        nextState.sections[componentOffset]['association'][associationOffset]['hidden'] = true
        let mImageUrl = nextState.sections[componentOffset]['association'][associationOffset]['imageUrl']
        let mMatchingOffset = 'left' === to ? 0 : 1
        nextState.sections[componentOffset]['matching'][mMatchingOffset]['answer'] = mImageUrl
        return nextState
    },
    [SHUFFLE_ASSOCICATION_CARD]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        if ('association' !== nextState['sections'][componentOffset]['fragment']['orginalType']) return nextState
        let section = {...cards[componentOffset], ...formatAssocicationItem({item: cards['sections'][componentOffset]})}
        nextState.sections.splice(componentOffset, 1, section)
        return nextState
    },
    [SET_ASSOCICATION_MATCH_OPTION_STATU]: (card, {payload: {componentOffset, associationOffset, flag}}) => {
        let nextState = card
        if (!card.sections[componentOffset]) return nextState
        if ('association' !== card.sections[componentOffset]['type']) return nextState
        if ('waiting' === nextState.sections[componentOffset]['association'][associationOffset]['matchOptionStatu']) {
            let mValue = flag ? 'correct' : 'wrong'
            nextState.sections[componentOffset]['association'][associationOffset]['matchOptionStatu'] = mValue
        } else {
            nextState.sections[componentOffset]['association'][associationOffset]['matchOptionStatu'] = 'waiting'
        }
        return nextState
    },
    [SET_PRACTICE_INPUTS_FOR_COLLECTIONS]: (card, {payload: {inputs}}) => {
        let nextState = card
        nextState.collections.practiceInputs = inputs
        return nextState
    },
    [CLEAR_CARDS_SECTIONS]: cards => {
        return Object.assign({}, cards, {sections: []})
    },
    [RESET_ALL_CARD_ANIMATION]: cards => {
        let nextState = cards
        nextState.sections.forEach(item => {
            item.animation = null
        })
        return nextState
    },
    [DROP_APPOINTED_CARD_ANIMATION]: (cards, {payload: {offset}}) => {
        let nextState = cards
        nextState['sections'][offset]['animation'] = null
        return nextState
    },
    [UPDATE_ORDER_CARD]: (cards, {payload: {componentOffset, orderList, mapper}}) => {
        let nextState = cards
        if ('order' !== nextState['sections'][componentOffset]['type']) return nextState
        nextState['sections'][componentOffset]['orderList'] = orderList
        nextState['sections'][componentOffset]['mapper'] = mapper
        return nextState
    },
    [SHUFFLE_ORDER_CARD]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        if ('order' !== nextState['sections'][componentOffset]['fragment']['orginalType']) return nextState
        let section = {...cards[componentOffset], ...formatOrderItem({item: cards['sections'][componentOffset]})}
        nextState.sections.splice(componentOffset, 1, section)
        return nextState
    },
    [TOGGLE_BLANK_BUTTON]: (cards, {payload: {componentOffset, optionID}}) => {
        let nextState = cards
        if ('selectBlank' !== nextState['sections'][componentOffset]['type']) return nextState
        let mTargetIndex = nextState['sections'][componentOffset]['select'].findIndex(blob => optionID === blob.id)
        if (mTargetIndex === -1) return nextState
        let mNewIsShown = !nextState['sections'][componentOffset]['select'][mTargetIndex]['isShown']
        nextState['sections'][componentOffset]['select'][mTargetIndex]['isShown'] = mNewIsShown
        nextState['sections'][componentOffset]['sentences'][1] = nextState['sections'][componentOffset]['select'][mTargetIndex]['option']
        return nextState
    },
    [SHUFFLE_BLANK_CARD]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        if ('selectBlank' !== nextState['sections'][componentOffset]['type']) return nextState
        let section = {...cards[componentOffset], ...formatBlankItem({item: cards['sections'][componentOffset]})}
        nextState.sections.splice(componentOffset, 1, section)
        return nextState
    },
    [SET_HOT_AREA_SELECTED_OFFSET]: (cards, {payload: {componentOffset, areaOffset}}) => {
        let nextState = cards
        if ('hotArea' !== nextState['sections'][componentOffset]['type']) return nextState
        let section = nextState['sections'][componentOffset]
        section['selectedAreaOffset'] = areaOffset
        return nextState
    },
    [SET_SLIDER_STEP]: (cards, {payload: {componentOffset, score}}) => {
        let nextState = cards
        if ('slider' !== nextState['sections'][componentOffset]['fragment']['orginalType']) return nextState
        if (score < 1) return nextState
        let section = nextState['sections'][componentOffset]
        let mMax = section['select'].length - 1
        section['select'][section['step']]['score'] = Math.floor(score * section['select'][section['step']]['index'] / 100) // 计算该步骤分数
        let mStep = section['step'] - 0 === mMax ? 0 : ++section['step'] // 累加步骤
        section['step'] = mStep
        return nextState
    },
    [SET_COMBINATION_STEP]: (cards, {payload: {componentOffset, score}}) => {
        let nextState = cards
        if ('combination' !== nextState['sections'][componentOffset]['fragment']['orginalType']) return nextState
        let section = nextState['sections'][componentOffset]
        let mMax = section['select'].length - 1
        section['select'][section['step']]['scoreGotten'] = score // 计算该步骤分数
        let mStep = section['step'] - 0 === mMax ? 0 : ++section['step'] // 累加步骤
        section['step'] = mStep
        return nextState
    },
    [SHOW_ANCHOR_FOOTER]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        let section = nextState['sections'][componentOffset]
        let mPreviousFooterShown = section['isAnchorFooterShown']
        if (mPreviousFooterShown) return nextState
        section['isAnchorFooterShown'] = true
        return nextState
    },
    [HIDE_ANCHOR_FOOTER]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        let section = nextState['sections'][componentOffset]
        let mPreviousFooterShown = section['isAnchorFooterShown']
        if (!mPreviousFooterShown) return nextState
        section['isAnchorFooterShown'] = false
        return nextState
    },
    [SET_CONCLUSION_FOR_SENCE]: (cards, {payload: {status, cardID, correctRate, correctRateAll, skillGradeText, skillName, skillScore, skillScoreProgress, skillProgress, correctRateProgress}}) => {
        if ('pending' === status) return cards
        if ('failure' === status) return cards
        let nextState = cards
        let mIndex = cards.sections.findIndex(item => cardID && cardID === item.id)
        if (-1 === mIndex) return nextState
        Object.assign(nextState.sections[mIndex], {
            correctRate,
            correctRateAll,
            skillGradeText,
            skillName,
            skillScore,
            skillScoreProgress,
            skillProgress,
            correctRateProgress
        })
        return nextState
    },
    [SHUFFLE_COMBINATION]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        if ('combination' !== nextState['sections'][componentOffset]['fragment']['orginalType']) return nextState
        let section = {...cards[componentOffset], ...formatCombinationItem({item: cards['sections'][componentOffset]})}
        nextState.sections.splice(componentOffset, 1, section)
        return nextState
    },
    [SINGLE_POLL]: (cards, {payload: {componentOffset, optionID}}) => {
        let nextState = cards
        let totalBallots = cards['sections'][componentOffset]['select'].reduce((total, current) => total + current.ballot, 0)
        nextState['sections'][componentOffset]['select'] = cards['sections'][componentOffset]['select'].map(item => ({
            ...item,
            ballot: item.id === optionID ? item.ballot + 1 : item.ballot,
            percentage: item.id === optionID ? parsePercentageForPoll(item.ballot + 1, totalBallots)(1) : parsePercentageForPoll(item.ballot, totalBallots)(1),
            selected: false
        }))
        const mFirstAmount = nextState['sections'][componentOffset]['select'].reduce((total, current, index) => total - (0 === index ? 0 : current.percentage), 100)
        nextState['sections'][componentOffset]['select'][0]['percentage'] = mFirstAmount
        nextState['sections'][componentOffset]['select'].find(option => option.id === optionID)['selected'] = true
        nextState['sections'][componentOffset]['isDone'] = true
        return nextState
    },
    [MULTIPLE_POLL_SELECT]: (cards, {payload: {componentOffset, optionID}}) => {
        let nextState = cards
        nextState['sections'][componentOffset]['select'] = cards['sections'][componentOffset]['select'].map(item => ({
            ...item,
            ballot: item.id === optionID ? item.ballot + (item.selected ? -1 : 1) : item.ballot,
            selected: item.id === optionID ? !item.selected : item.selected
        }))
        nextState['sections'][componentOffset]['numberOfSelections'] = nextState['sections'][componentOffset]['select'].filter(item => item.selected).length
        return nextState
    },
    [MULTIPLE_POLL_SUBMIT]: (cards, {payload: {componentOffset}}) => {
        let nextState = cards
        let totalBallots = cards['sections'][componentOffset]['select'].reduce((total, current) => total + current.ballot, 0)
        console.log('total', totalBallots)
        nextState['sections'][componentOffset]['select'] = cards['sections'][componentOffset]['select'].map(item => ({
            ...item,
            percentage: Math.round(parseInt(item.ballot / totalBallots * 100))
        }))
        const mFirstAmount = nextState['sections'][componentOffset]['select'].reduce((total, current, index) => total - (0 === index ? 0 : current.percentage), 100)
        nextState['sections'][componentOffset]['select'][0]['percentage'] = mFirstAmount
        nextState['sections'][componentOffset]['isDone'] = true
        return nextState
    }
}

export const cardsReducer = (card = {
    requestFlag: '', // 进入课程请求时间戳
    currentSectionOffset: 0,
    sections: [],
    collections: {
        practiceInputs: [ //即学即练填空卡，初始化占位.共10组。最多10张即学即练填空卡
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {input1: '', input2: ''},
            {answer: []}
        ]
    }
}, action) => {
    const handler = ACTIONS_HANDLERS[action.type]
    return handler ? handler(card, action) : card
}
