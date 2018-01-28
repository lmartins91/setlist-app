import { combineReducers } from 'redux'

import { entities } from './entities'
import { favArtists } from './fav.artists'
import { navReducer } from './nav'
import { searchScreen } from './search.screen'
import { showsScreen } from './shows.screen'


const AppReducer = combineReducers({
    entities,
    favArtists,
    nav: navReducer,
    searchScreen,
    showsScreen,
})

export default AppReducer