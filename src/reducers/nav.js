import { AppNavigator } from '../navigator'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'))

export const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state)
    return nextState || state
}