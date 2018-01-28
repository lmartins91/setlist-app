import React from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import { loadArtists } from '../actions/artists'
import { loadVenues } from '../actions/venues'
import { Header, List } from '../components'
import * as colors from '../styles/colors'

class SearchScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            queries: { artist: '', venue: '' },
            searchType: 'artist'
        }
        this.searchTypes = ['artist', 'venue']
    }
    
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: <Header
                navigation={navigation}
                query={params.query}
                onQueryChange={(query) => params.handleQueryChange(query)}
            />
        }
    }
    
    componentDidMount() {
        this.props.navigation.setParams({
            handleQueryChange: (query) => this.handleQueryChange(query)
        })
    }
    
    handleQueryChange(query) {
        const { searchType } = this.state
        switch (searchType) {
            case 'artist': this.props.loadArtists({ name: query }); break;
            case 'venue': this.props.loadVenues({ name: query }); break;
        }
        this.setState({
            queries: { ...this.state.queries, [searchType]: query }
        })
        
    }
    
    switchSearchType(searchType) {
        this.props.navigation.setParams({
            query: this.state.queries[searchType]
        })
        this.setState({ searchType })
    }
    
    renderResults() {
        const { artistCriteria, loadArtists, venueCriteria, loadVenues } = this.props
        const type = this.state.searchType
        const { navigate } = this.props.navigation
        switch (type) {
            case 'artist':
                return <List
                    items={this.props.artists}
                    loadMore={() => loadArtists({ ...artistCriteria, page: artistCriteria.page + 1 })}
                    goTo={(artist) => navigate('Shows', { artist, type })}
                />
            case 'venue':
                return <List
                    items={this.props.venues}
                    loadMore={() => loadVenues({ ...venueCriteria, page: venueCriteria.page + 1 })}
                    goTo={(venue) => navigate('Shows', { venue, type })}
                />
        }
    }
    
    render() {
        return <View style={styles.container}>
            <View style={styles.searchTypes}>
                {this.searchTypes.map(searchType => (
                    <TouchableHighlight key={searchType}
                        style={[styles.searchType, this.state.searchType == searchType && styles.active]}
                        onPress={() => this.switchSearchType(searchType)}>
                        <Text>{searchType.toUpperCase()}</Text>
                    </TouchableHighlight>
                ))}
            </View>
            {this.renderResults()}
        </View>
    }
}

SearchScreen.propTypes = {
    artistCriteria: PropTypes.shape({
        name: PropTypes.string, page: PropTypes.number,
    }),
    artists: PropTypes.array,
    isFetchingArtist: PropTypes.bool,
    venueCriteria: PropTypes.shape({
        name: PropTypes.string, page: PropTypes.number,
    }),
    venues: PropTypes.array,
    isFetchingVenue: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    artistCriteria: state.searchScreen.artist.criteria,
    artists: state.searchScreen.artist.resultIds.map(id => state.entities.artists.byId[id]),
    isFetchingArtist: state.searchScreen.artist.isFetching,
    venueCriteria: state.searchScreen.venue.criteria,
    venues: state.searchScreen.venue.resultIds.map(id => state.entities.venues.byId[id]),
    isFetchingVenue: state.searchScreen.venue.isFetching
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadArtists: (criteria) => dispatch(loadArtists(criteria)),
    loadVenues: (criteria) => dispatch(loadVenues(criteria)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    loadArtists: (criteria) => {
        if (!stateProps.isFetchingArtist) dispatchProps.loadArtists(criteria)
    },
    loadVenues: (criteria) => {
        if (!stateProps.isFetchingVenue) dispatchProps.loadVenues(criteria)
    }
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight
    },
    text: {
        fontFamily: 'RobotoMono-Regular',
    },
    
    searchTypes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: colors.tealPrimary
    },
    searchType: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        borderBottomWidth: 4,
        borderBottomColor: colors.tealDark
    }
})