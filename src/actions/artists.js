import * as actionTypes from '../constants/action.types'
import { ArtistService } from '../services/artist.service'


const requestArtists = (criteria) => ({
    type: actionTypes.REQUEST_ARTISTS,
    criteria
})

const receiveArtists = (criteria, artists) => ({
    type: actionTypes.RECEIVE_ARTISTS,
    criteria,
    artists
})

const fetchArtists = (criteria) => (dispatch) => {
    dispatch(requestArtists(criteria))
    return ArtistService.getArtists(criteria).then(artists => {
        return dispatch(receiveArtists(criteria, artists))
    })
}

export const loadArtists = (criteria) => (dispatch, getState) => {
    const artists = getState().entities.artists.byCriteria.get(criteria)
    return !artists ? dispatch(fetchArtists(criteria)) : null
}