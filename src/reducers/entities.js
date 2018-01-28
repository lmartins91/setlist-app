import * as actionTypes from '../constants/action.types'

const initialState = {
    artists: { byId: {}, byCriteria: new Map() },
    shows: { byId: {}, byCriteria: new Map() },
    venues: { byId: {}, byCriteria: new Map() },
}

const mergeEntities = (entities, results, criteria) => {
    const byId = results.reduce((acc, r) => ({ ...acc, [r.id]: r }), entities.byId)
    
    const byCriteria = new Map(entities.byCriteria)
    byCriteria.set(criteria, {
        page: criteria.page,
        results: results.map(result => result.id)
    })
    
    return { byId, byCriteria }
}

export const entities = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.RECEIVE_ARTISTS:
            return {
                ...state,
                artists: mergeEntities(state.artists, action.artists, action.criteria)
            }
        
        case actionTypes.RECEIVE_SHOWS:
            return {
                ...state,
                shows: mergeEntities(state.shows, action.shows, action.criteria)
            }
        
        case actionTypes.RECEIVE_VENUES:
            return {
                ...state,
                venues: mergeEntities(state.venues, action.venues, action.criteria)
            }
        
        default:
            return state
        
    }
}