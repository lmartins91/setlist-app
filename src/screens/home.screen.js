import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import moment from 'moment'

import { addLocation, loadUser, loadShows } from '../actions/'
import * as colors from '../styles/colors'

const SectionHeader = ({ title }) => (
    <View className={styles.sectionHeader}>
        <Text>{title}</Text>
    </View>
)

class HomeScreen extends React.Component {

    static navigationOptions = { title: 'Home' }
    
    componentDidMount() {
        this.props.loadUser()
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return <View style={styles.container}>
            <Text style={styles.text}>Favorite Artists</Text>
            {this.props.favArtists && this.props.favArtists.map(artist => (
                <Text
                    key={artist.name}
                    onPress={() => navigate('Shows', { artist, type: 'artist' })}>
                    {artist.name}
                </Text>
            ))}
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
        backgroundColor: 'white'
    },
    text: {
        fontFamily: 'RobotoMono-Regular',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    blurView: {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0
    },
    showsContainer: {
        flexDirection: 'row'
    },
    sectionHeader: {
        borderBottomColor: colors.gray,
        borderBottomWidth: 1
    },
    
    recentShow: {
        height: 150, width: 150,
        backgroundColor: colors.tealDark,
        marginRight: 20,
    }
});