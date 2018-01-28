console.disableYellowBox = true;

import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { AppWithNavigationState } from './navigator'
import rootReducer from './reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}

export default class Root extends Component {
    store = configureStore()
    
    render() {
        return <Provider store={this.store}>
            <AppWithNavigationState/>
        </Provider>
    }
}