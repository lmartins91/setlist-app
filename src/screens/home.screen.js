import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import * as _ from 'lodash'

import { addLocation, loadUser, loadShows } from '../actions/'
import { ShowCarousel } from '../components'
import { ShowService } from '../services'
import * as colors from '../styles/colors'

const SectionHeader = ({ title }) => (
    <View className={styles.sectionHeader}>
        <Text>{title}</Text>
    </View>
)

class HomeScreen extends React.Component {
    state = { recentShows: [] }

    static navigationOptions = { title: 'Home' }
    
    componentDidMount() {
        this.props.loadUser()
        if (this.props.location) {
            this.loadRecentShows({ cityId: this.props.location, page: 1 })
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            this.loadRecentShows({ cityId: nextProps.location, page: 1 })
        }
    }
    
    loadRecentShows(criteria) {
        ShowService.getShows(criteria).then(shows => {
            this.setState({ recentShows: shows })
        })
    }
    
    goToShow(show) {
        this.props.navigation.navigate('Show', { show })
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return <View style={styles.container}>
            <Text style={styles.header}>Favorite Artists</Text>
            {this.props.favArtists && this.props.favArtists.map(artist => (
                <Text
                    key={artist.name}
                    onPress={() => navigate('Shows', { artist, type: 'artist' })}>
                    {artist.name}
                </Text>
            ))}
            <Text style={[styles.header, { marginTop: 30 }]}>Recent Shows in Whatever, NY</Text>
            <Text onPress={() => this.props.addLocation(5128581)}>Add Location</Text>
            <ShowCarousel
                shows={this.state.recentShows}
                goToShow={(show) => this.goToShow(show)}
            />
        </View>
    }
}

const mapStateToProps = (state, ownProps) => ({
    favArtists: _.get(state, 'user.favArtists', []),
    location: _.get(state, 'user.location', null)
})

const mapDispatchToProps = (dispatch) => ({
    addLocation: (location) => dispatch(addLocation(location)),
    loadShows: (criteria) => dispatch(loadShows(criteria)),
    loadUser: () => dispatch(loadUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingVertical: 30,
        backgroundColor: 'white'
    },
    text: {
        fontFamily: 'RobotoMono-Regular',
    },
    
    header: {
        fontFamily: 'RobotoMono-Medium',
        fontSize: 16
    },
    sectionHeader: {
        borderBottomColor: colors.gray,
        borderBottomWidth: 1
    },
    
    recentShow: {
        height: 150, width: 150,
        backgroundColor: colors.tealDark,
        marginRight: 20,
        borderRadius: 5,
    },
    date: {
        fontSize: 124,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        letterSpacing: -5,
    }
});