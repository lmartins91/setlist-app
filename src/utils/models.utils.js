import * as _ from 'lodash'

import { parseDate, doesSongSegue, parseSongInfo } from '../utils/parse.utils'

export function Artist(artist) {
    this.name = artist['@name']
    this.id = artist['@mbid']
}

export function City(city) {
    this.id = city['@id']
    this.name = city['@name']
    this.state = city['@state']
    this.stateCode = city['@stateCode'] == 'ROO' ? 'MEX' : city['@stateCode']
    this.coords = { lat: city.coords['@lat'], long: city.coords['@long'] }
    this.country = { code: city.country['@code'], name: city.country['@name'] }
}

export function Show(show) {
    this.date = parseDate(show['@eventDate'])
    this.id = show['@id']
    this.tour = show['@tour']
    this.artist = new Artist(show.artist)
    this.venue = new Venue(show.venue)
    this.setlist = !show.sets ? null : Array.isArray(show.sets.set) ?
        show.sets.set.map(set => new SetOfSongs(set)) :
        [new SetOfSongs({'@name': '', song: show.sets.set.song})]
}

export function SetOfSongs(set) {
    this.name = set['@encore'] ? 'Encore' : set['@name']
    this.name = this.name ? this.name.replace(':', '') : 'Set'
    this.songs = set.song.length ?
        set.song.map(song => new Song(song)) :
        [new Song(set.song)]
}

export function Song(song) {
    this.name = song['@name']
    this.info = song.info ? parseSongInfo(song.info) : null
    this.coverArtist = song.cover ? new Artist(song.cover) : null
    this.segue = song.info ? doesSongSegue(song.info) : false
}

export function Venue(venue) {
    this.id = venue['@id']
    this.name = venue['@name']
    this.city = new City(venue.city)
}