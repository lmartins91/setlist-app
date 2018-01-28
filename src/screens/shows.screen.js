import React from 'react'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as _ from 'lodash'

import { addFavArtist, removeFavArtist } from '../actions/fav.artists'
import { loadShows } from '../actions/shows'
import { FavArtistToggler, FiltersModal, Header, ShowList } from '../components'
import * as colors from '../styles/colors'

class ShowsScreen extends React.Component {
    constructor(props) {
        super(props)
        let filters
        switch (props.navigation.state.params.type) {
            case 'venue': filters = { date: undefined, year: undefined }; break;
            case 'artist': filters = { date: undefined, year: undefined, venue: undefined }; break;
        }
        this.state = { filters, showFiltersModal: false }
    }
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: <Header
                navigation={navigation}
                title={params.type == 'artist' ? params.artist.name : params.venue.name}
                content={params.content}
            />
        }
    }
    
    componentDidMount() {
        const { artist, loadShows, searchType, venue } = this.props
        switch (searchType) {
            case 'artist': loadShows({ artistId: artist.id, page: 1 }); break;
            case 'venue': loadShows({ venueId: venue.id, page: 1 }); break;
        }
        
        this.props.navigation.setParams({
            content: <FavArtistToggler artist={artist} />
        })
    }
    
    loadMoreShows() {
        const { criteria, isFetching, loadShows } = this.props
        if (!isFetching) loadShows({ ...criteria, page: criteria.page + 1 })
    }
    
    handleFiltersSubmit(filters) {
        if (!_.isEqual(this.state.filters, filters)) {
            const criteria = Object.keys(filters).reduce((acc, filterType) => {
                const value = _.get(filters[filterType], 'value')
                return value ?
                    { ...acc, [filterType == 'venue' ? 'venueId' : filterType]: value } :
                    acc
            }, this.props.criteria)
            this.props.loadShows({ ...criteria, page: 1 })
        }
        this.setState({ filters, showFiltersModal: false })
    }
    
    render() {
        const { navigate } = this.props.navigation
        return <View style={styles.container}>
            <View style={styles.filtersToggle}>
                <Icon name="filter-list"
                    onPress={() => this.setState(({ showFiltersModal }) => ({ showFiltersModal: !showFiltersModal }))}
                />
            </View>
            {this.state.showFiltersModal && (
                <FiltersModal
                    filters={this.state.filters}
                    onClose={() => this.setState({ showFiltersModal: false })}
                    onSubmit={(filters) => this.handleFiltersSubmit(filters)}
                />
            )}
            <ShowList
                searchType={this.props.searchType}
                shows={this.props.shows}
                getMoreShows={() => this.loadMoreShows()}
                goToShow={(show) => navigate('Show', { show })}
            />
        </View>
    }
}

const mapStateToProps = (state, ownProps) => ({
    artist: ownProps.navigation.state.params.artist,
    venue: ownProps.navigation.state.params.venue,
    criteria: state.showsScreen.criteria,
    isFetching: state.showsScreen.isFetching,
    searchType: ownProps.navigation.state.params.type,
    shows: state.showsScreen.showIds.map(showId => state.entities.shows.byId[showId])
})

const mapDispatchToProps = (dispatch) => ({
    addFavArtist: (artist) => dispatch(addFavArtist(artist)),
    loadShows: (criteria) => dispatch(loadShows(criteria)),
    removeFavArtist: (artist) => dispatch(removeFavArtist(artist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight
    },
    shows: {
        fontSize: 30
    },
    filtersToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    blurView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0
    },
})