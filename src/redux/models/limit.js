export const HIDE_LIMIT_MEMBER = 'HIDE_LIMIT_MEMBER';
export const OPEN_LIMIT_MEMBER = 'OPEN_LIMIT_MEMBER';

export const openLimitMember = date => {
    return {
        type:'OPEN_LIMIT_MEMBER',
        payload:{
            date
        }
    }
}

export const hideLimitMember = () => {
    return {
        type:'HIDE_LIMIT_MEMBER'
    }
}

const ACTIONS_HANDLERS = {
    [OPEN_LIMIT_MEMBER]: (activity,{payload: {date}}) => {
        let tmp = {...activity, isMemberLimitedOn: date > 0 ? true : false, memberLimitedDate:date}
        return tmp
    },
    [HIDE_LIMIT_MEMBER]:(activity) => {
        let tmp = {...activity, isMemberLimitedOn:false}
        return tmp
    }
}

export const limitedReducer = (activity = {
    isMemberLimitedOn:false,//是否在会员优惠期间内
    memberLimitedDate:'',//会员优惠剩余时间
}, action) => {
    const handler = ACTIONS_HANDLERS[action.type]
    return handler ? handler(activity, action) : activity
}