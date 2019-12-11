import { combineReducers } from 'redux'

import { userReducer } from './models/user'
import { cardsReducer } from './models/cards'
import { coursesReducer } from './models/courses'
import { sencesReducer } from './models/sences'
import { learningReducer } from './models/learning'
import { entranceReducer } from './models/entrance'
import { activityReducer } from './models/activity'
import { limitedReducer } from './models/limit'

export const rootReducer = combineReducers({
    user: userReducer,
    courses: coursesReducer,
    sences: sencesReducer,
    cards: cardsReducer,
    learning: learningReducer,
    entrance: entranceReducer,
    activity: activityReducer,
    limited: limitedReducer
})
