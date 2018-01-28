import * as _ from 'lodash'

import * as actionTypes from '../constants/action.types'

const initialState = {
    criteria: null,
    isFetching: false,
    showIds: [],
}

export const showsScreen = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.REQUEST_SHOWS:
            const criteriaChanged = !_.isEqual(_.omit(action.criteria, 'page'), _.omit(state.criteria, 'page'))
            return {
                ...state,
                criteria: action.criteria,
                isFetching: true,
                showIds: criteriaChanged ? [] : state.showIds
            }
        
        case actionTypes.RECEIVE_SHOWS:
            return {
                ...state,
                criteria: action.criteria,
                isFetching: false,
                showIds: [ ...state.showIds, ...action.shows.map(show => show.id) ]
            }
        
        default:
            return state;
    }
}