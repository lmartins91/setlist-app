import { combineReducers } from 'redux'

import { entities } from './entities'
import { navReducer } from './nav'
import { searchScreen } from './search.screen'
import { showsScreen } from './shows.screen'
import { user } from './user'


const AppReducer = combineReducers({
    entities,
    nav: navReducer,
    searchScreen,
    showsScreen,
    user,
})

export default AppReducer