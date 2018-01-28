import { AsyncStorage } from 'react-native'

import * as actionTypes from '../constants/action.types'

export const addFavArtist = (favArtist) => ({
    type: actionTypes.ADD_FAV_ARTIST,
    favArtist
})

export const removeFavArtist = (favArtist) => ({
    type: actionTypes.REMOVE_FAV_ARTIST,
    favArtist
})

const requestFavArtists = () => ({
    type: actionTypes.REQUEST_FAV_ARTISTS
})

const receiveFavArtists = (favArtists) => ({
    type: actionTypes.RECEIVE_FAV_ARTISTS,
    favArtists
})

const fetchFavArtists = () => (dispatch) => {
    dispatch(requestFavArtists())
    return AsyncStorage.getItem('fav_artists').then(favArtists => {
        dispatch(receiveFavArtists(JSON.parse(favArtists) || []))
    })
}

export const loadFavArtists = () => (dispatch, getState) => {
    return getState().favArtists ? null : dispatch(fetchFavArtists())
}