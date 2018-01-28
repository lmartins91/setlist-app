import { AsyncStorage } from 'react-native'
import * as _ from 'lodash'

import * as actionTypes from '../constants/action.types'

const saveFavArtists = async (favArtists) => {
    try {
        await AsyncStorage.setItem('fav_artists', JSON.stringify(favArtists))
    } catch (error) {
    }
}

export const favArtists = (state = null, action) => {
    let artists
    switch (action.type) {
        
        case actionTypes.ADD_FAV_ARTIST:
            artists = _.uniq(_.concat(state, action.favArtist))
            saveFavArtists(artists)
            return artists
            
        case actionTypes.REMOVE_FAV_ARTIST:
            artists = _.filter(state, (a) => a.id !== action.favArtist.id)
            saveFavArtists(artists)
            return artists
            
        case actionTypes.RECEIVE_FAV_ARTISTS:
            saveFavArtists(action.favArtists)
            return action.favArtists
            
        default:
            return state
    }
}