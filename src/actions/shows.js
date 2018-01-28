import * as actionTypes from '../constants/action.types'
import { ShowService } from '../services/show.service'

const requestShows = (criteria) => ({
    type: actionTypes.REQUEST_SHOWS,
    criteria
})

const receiveShows = (criteria, shows) => ({
    type: actionTypes.RECEIVE_SHOWS,
    criteria,
    shows
})

const fetchShows = (criteria) => (dispatch) => {
    dispatch(requestShows(criteria))
    return ShowService.getShows(criteria).then(shows => {
        return dispatch(receiveShows(criteria, shows))
    })
}

export const loadShows = (criteria) => (dispatch, getState) => {
    const shows = getState().entities.shows.byCriteria.get(criteria)
    return !shows ? dispatch(fetchShows(criteria)) : null
}