import { AsyncStorage } from 'react-native'
import * as _ from 'lodash'

import * as actionTypes from '../constants/action.types'

const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.warn('Error getting user', error)
    }
}

export const user = (state = null, action) => {
    let user
    switch (action.type) {
        
        case actionTypes.ADD_FAV_ARTIST:
            user = {
                ...state,
                favArtists: _.uniq(_.concat(_.get(state, 'favArtists', []), action.favArtist))
            }
            saveUser(user)
            return user
        
        case actionTypes.REMOVE_FAV_ARTIST:
            user = {
                ...state,
                favArtists: _.filter(state.favArtists, (a) => a.id !== action.favArtist.id)
            }
            saveUser(user)
            return user
        
        case actionTypes.ADD_LOCATION:
            user = { ...state, location: action.location }
            saveUser(user)
            return user
        
        case actionTypes.RECEIVE_USER:
            saveUser(action.user)
            return action.user
        
        default:
            return state
    }
}