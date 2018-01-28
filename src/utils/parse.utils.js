const moment = require('moment')

export function convertSetlistToMap(setlist) {
    return setlist.map((set, i) => ({ key: i, name: set.name, data: set.songs }))
}

export function parseDate(dateString) {
    return moment(dateString.split('-').reverse().join('-'))
}

export function doesSongSegue(info) {
    return info.split(') (').includes('>')
}

export function parseSongInfo(info) {
    return info.split(') (').reduce((acc, curr) => {
        return curr == '>' ? acc : acc.concat(curr)
    }, []).join(', ') || null
}