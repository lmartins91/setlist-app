import { Artist } from '../utils/models.utils'

export class ArtistService {
    
    static getArtists = ({ name, page = 1 }) => {
        return fetch(`https://api.setlist.fm/rest/0.1/search/artists.json?artistName=${name}&p=${page}`)
        .then(response => response.json())
        .then(json => json.artists.artist.map(artist => new Artist(artist)))
        .catch(err => {
            console.warn('Error fetching artists', err)
            return [];
        })
    }
    
}