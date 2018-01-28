import { Venue } from '../utils/models.utils'

export class VenueService {
    
    static getVenues = ({ name, page = 1 }) => {
        return fetch(`https://api.setlist.fm/rest/0.1/search/venues.json?name=${name}&p=${page}`)
        .then(response => response.json())
        .then(json => json.venues.venue.map(venue => new Venue(venue)))
        .catch(err => {
            console.warn('Error fetching venues', err)
            return []
        })
    }
    
}