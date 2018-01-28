import { City } from '../utils/models.utils'

export class CityService {
    
    static getCitiesByName = (name, page = 1) => {
        return fetch(`https://api.setlist.fm/rest/0.1/search/cities.json?name=${encodeURIComponent(name)}&p=${page}`)
        .then(response => response.json())
        .then(json => {
            const { cities } = json.cities;
            return Array.isArray(cities) ?
                cities.map(city => new City(city)) :
                [new City(cities)];
        })
        .catch(err => {
            console.warn('Error fetching cities', err)
            return [];
        })
    }
    
}