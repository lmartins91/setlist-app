import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import * as _ from 'lodash'

import { ShowDate } from './'

const windowWidth = Dimensions.get('window').width
const itemWidth = windowWidth / 2.5

const Show = ({ goTo, show }) => (
    <TouchableHighlight style={styles.item} onPress={() => goTo()}>
        <View>
            <View style={styles.dateContainer}>
                <ShowDate date={show.date} size="large" />
            </View>
            <Text style={styles.artistName}>{show.artist.name}</Text>
            <Text>{show.venue.name}</Text>
        </View>
    </TouchableHighlight>
)

export const ShowCarousel = ({ goToShow, shows }) => (
    _.size(shows) ? <View>
        <FlatList
            style={styles.list}
            keyExtractor={(item, index) => index}
            data={shows}
            renderItem={({ item }) => <Show show={item} goTo={() => goToShow(item)} />}
            ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
            horizontal
        />
    </View> : null
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        marginHorizontal: -15,
        paddingLeft: 15,
    },
    item: {
        width: itemWidth,
    },
    dateContainer: {
        height: itemWidth, width: itemWidth,
        marginVertical: 10,
    },
    artistName: {
        fontFamily: 'RobotoMono-Bold',
    },
})