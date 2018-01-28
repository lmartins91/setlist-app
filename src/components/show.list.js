import React from 'react'
import { Text, View, SectionList, StyleSheet } from 'react-native'
import * as _ from 'lodash'
import PropTypes from 'prop-types'

import { NoResults, ShowItem } from './index'
import * as colors from '../styles/colors'
import { globalStyles } from '../styles/global.styles'

export class ShowList extends React.Component {
    
    splitShowsByYear(shows) {
        let showsByYearMap = shows.reduce((acc, show) => {
            let year = show.date.year()
            let showsThisYear = acc.get(year) || []
            showsThisYear.push(show)
            return acc.set(year, showsThisYear)
        }, new Map())
        
        let showsSplitByYear = []
        showsByYearMap.forEach((shows, year) => showsSplitByYear.push({ key: year, data: shows }))
        return showsSplitByYear
    }
    
    renderSectionHeader(section) {
        return <View style={styles.sectionHeader}>
            <Text style={styles.text}>{section.key}</Text>
        </View>
    }
    
    renderShow(show) {
        const { artist, date, venue } = show
        const title = (this.props.searchType == 'artist') ? [
                <Text key={'venue'} style={globalStyles.h2}>{venue.name}</Text>,
                <Text key={'city'} style={styles.city}>{`${venue.city.name}, ${venue.city.stateCode}`}</Text>
            ] :
                <Text>{_.startCase(artist.name)}</Text>
        return <ShowItem title={title} date={date} goToShow={() => this.props.goToShow(show)} />
    }
    
    render() {
        return _.size(this.props.shows) ?
            <SectionList
                style={styles.container}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => this.renderShow(item)}
                sections={this.splitShowsByYear.bind(this)(this.props.shows)}
                renderSectionHeader={({ section }) => this.renderSectionHeader.bind(this)(section)}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
                onEndReached={this.props.getMoreShows}
                onEndReachedThreshold={0.2}
            /> :
            <NoResults text="No Shows"/>
    }
}

ShowList.propTypes = {
    getMoreShows: PropTypes.func,
    goToShow: PropTypes.func,
    searchType: PropTypes.oneOf(['artist', 'city', 'venue']),
    shows: PropTypes.array
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        marginLeft: 16,
        height: 24,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        backgroundColor: colors.grayLight
    },
    text: {
        fontFamily: 'RobotoMono-Regular',
        color: colors.grayDarker
    },
    itemSeparator: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginLeft: 77
    },
    city: {
        fontFamily: 'Roboto-Light',
        fontSize: 13
    }
})