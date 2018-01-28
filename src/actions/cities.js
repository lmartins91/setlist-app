import * as actionTypes from '../constants/action.types'
import { CityService } from '../services/city.service'

const requestCities = (query, page) => ({
    type: actionTypes.REQUEST_CITIES,
    query,
    page
})

const receiveCities = (query, cities, page) => {
    return {
        type: actionTypes.RECEIVE_CITIES,
        query,
        cities,
        page
    }
}

export const fetchCities = (query, page = 1) => {
    return (dispatch) => {
        dispatch(requestCities(query, page))
        return CityService.getCitiesByName(query, page).then(cities => {
            return dispatch(receiveCities(query, cities, page))
        })
    }
}