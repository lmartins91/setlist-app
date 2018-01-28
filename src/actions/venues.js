import * as actionTypes from '../constants/action.types'
import { VenueService } from '../services/venue.service'

const requestVenues = (criteria) => ({
    type: actionTypes.REQUEST_VENUES,
    criteria
})

const receiveVenues = (criteria, venues) => ({
    type: actionTypes.RECEIVE_VENUES,
    criteria,
    venues
})

const fetchVenues = (criteria) => (dispatch) => {
    dispatch(requestVenues(criteria))
    return VenueService.getVenues(criteria).then(venues => {
        return dispatch(receiveVenues(criteria, venues))
    })
}

export const loadVenues = (criteria) => (dispatch, getState) => {
    const venues = getState().entities.venues.byCriteria.get(criteria)
    return !venues ? dispatch(fetchVenues(criteria)) : null
}