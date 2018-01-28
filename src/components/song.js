import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import * as colors from '../styles/colors'

export const Song = ({ song }) => {
    return <View style={styles.container}>
        <Text style={styles.name}>{`${song.name}${song.segue ? ' >' : ''}`}</Text>
        {song.info && <Text style={styles.info}> ({song.info})</Text>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        paddingVertical: 2,
        paddingLeft: 12
    },
    name: {
        fontFamily: 'Roboto-Light',
    },
    info: {
        fontFamily: 'Roboto-Light',
        fontSize: 12,
        color: colors.grayDarker
    }
})