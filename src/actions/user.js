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

export const addLocation = (location) => ({
    type: actionTypes.ADD_LOCATION,
    location
})

const requestUser = () => ({
    type: actionTypes.REQUEST_USER
})

const receiveUser = (user) => ({
    type: actionTypes.RECEIVE_USER,
    user
})

const fetchUser = () => (dispatch) => {
    dispatch(requestUser())
    return AsyncStorage.getItem('user').then(user => {
        dispatch(receiveUser(JSON.parse(user)))
    })
}

export const loadUser = () => (dispatch, getState) => {
    return getState().user ? null : dispatch(fetchUser())
}