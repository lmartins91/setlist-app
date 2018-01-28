import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import { Header } from './components'
import { HomeScreen, SearchScreen, ShowScreen, ShowsScreen } from './screens'

const routeConfig = {
    Home: { screen: HomeScreen },
    Search: { screen: SearchScreen },
    Show: { screen: ShowScreen },
    Shows: { screen: ShowsScreen },
}

const stackNavigatorConfig = {
    initialRouteName: 'Home',
    navigationOptions: {
        header: ({ navigation }) => <Header navigation={navigation} />
    }
}

export const AppNavigator = StackNavigator(routeConfig, stackNavigatorConfig)

class App extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        )
    }
}

const mapStateToProps = (state) => { return state }

export const AppWithNavigationState = connect(mapStateToProps)(App)