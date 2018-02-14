import moment from 'moment'

import { Show } from '../utils/models.utils'

export class ShowService {
    
    static getShows({ artistId, cityId, date, page = 1, venueId, year }) {
        let url =`https://api.setlist.fm/rest/0.1/search/setlists.json?p=${page}`
        if (artistId) url += `&artistMbid=${artistId}`
        if (cityId) url += `&cityId=${cityId}`
        if (date) url += `&date=${moment(date).format('DD-MM-YYYY')}`
        if (year) url += `&year=${year}`
        if (venueId) url += `&venueId=${venueId}`
        
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                return Array.isArray(json.setlists.setlist) ?
                    json.setlists.setlist.map(show => new Show(show)) :
                    [new Show(json.setlists.setlist)]
            })
            .catch(err => {
                console.warn('Error fetching shows', err)
                return [];
            }); 
    }

    static getNumOfShowsByArtistId = (id) => {
        return fetch(`https://api.setlist.fm/rest/0.1/search/setlists.json?artistMbid=${id}&p=1`)
        .then(response => response.json())
        .then(json => json.setlists['@total'])
        .catch(err => {
            console.warn('Error getting number of shows by artist', err)
            return null;
        });
    }
    
}