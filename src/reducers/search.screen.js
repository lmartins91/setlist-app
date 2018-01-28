import * as _ from 'lodash'

import * as actionTypes from '../constants/action.types'
import { combineReducers } from 'redux'

const initialState = {
    criteria: null,
    isFetching: false,
    resultIds: [],
}

const artist = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.REQUEST_ARTISTS:
            const criteriaChanged = !_.isEqual(_.omit(action.criteria, 'page'), _.omit(state.criteria, 'page'))
            return {
                ...state,
                criteria: action.criteria,
                isFetching: true,
                resultIds: criteriaChanged ? [] : state.resultIds
            }
            
        case actionTypes.RECEIVE_ARTISTS:
            return {
                ...state,
                criteria: action.criteria,
                isFetching: false,
                resultIds: [ ...state.resultIds, ...action.artists.map(artist => artist.id) ]
            }
        
        default:
            return state
    }
}

const venue = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.REQUEST_VENUES:
            const criteriaChanged = !_.isEqual(_.omit(action.criteria, 'page'), _.omit(state.criteria, 'page'))
            return {
                ...state,
                criteria: action.criteria,
                isFetching: true,
                resultIds: criteriaChanged ? [] : state.resultIds
            }
        
        case actionTypes.RECEIVE_VENUES:
        return {
            ...state,
            criteria: action.criteria,
            isFetching: false,
            resultIds: [ ...state.resultIds, ...action.venues.map(venue => venue.id) ]
        }
        
        default:
            return state
    }
}

export const searchScreen = combineReducers({
    artist,
    venue,
})