import React from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as _ from 'lodash'

import { addFavArtist, removeFavArtist } from '../actions/fav.artists'
import * as colors from '../styles/colors'

class FavArtistToggler extends React.Component {
    render() {
        const { artist, isFavorite, toggleFavorite } = this.props
        return <View style={styles.container}>
            <Text style={styles.title}>
                {artist.name}
            </Text>
            <Icon
                style={[styles.favToggle, isFavorite && styles.isFavorite]}
                size={18} name="add"
                onPress={() => toggleFavorite()}
            />
        </View>
    }
}

const mapStateToProps = (state, ownProps) => ({
    favArtists: state.favArtists
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addFavArtist: () => dispatch(addFavArtist(ownProps.artist)),
    removeFavArtist: () => dispatch(removeFavArtist(ownProps.artist)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const artist = ownProps.artist
    const isFavorite = _.includes(stateProps.favArtists, artist)
    const toggleFavorite = isFavorite ? dispatchProps.removeFavArtist : dispatchProps.addFavArtist
    return { artist, isFavorite, toggleFavorite }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FavArtistToggler)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'RobotoMono-Medium',
        fontSize: 18,
        color: 'black'
    },
    favToggle: {
        color: 'rgba(0,0,0,0.2)',
        paddingLeft: 5
    },
    isFavorite: {
        color: colors.tealDark
    }
})