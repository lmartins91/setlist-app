import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import * as colors from '../styles/colors'

export const ShowDate = ({ date, size = 'small' }) => {
    const showDateSmall = <View style={[styles.container, styles.smallContainer]}>
        <Text style={[styles.text, styles.largeText]}>{date.format('DD')}</Text>
        <Text style={[styles.text, styles.smallText]}>{date.format('MMM').toUpperCase()}</Text>
    </View>
    
    const showDateLarge = <View style={[styles.container, styles.largeContainer]}>
        <Text style={[styles.text, styles.smallText]}>{date.format('MMM').toUpperCase()}</Text>
        <Text style={[styles.text, styles.largerText]}>{date.format('DD')}</Text>
        <Text style={[styles.text, styles.smallText]}>{date.format('YYYY')}</Text>
    </View>
    
    return size == 'small' ? showDateSmall : showDateLarge
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.tealDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallContainer: {
        height: 45,
        width: 45
    },
    largeContainer: {
        height: 70,
        width: 70
    },
    text: {
        fontFamily: 'RobotoMono-Bold',
        color: 'white',
        lineHeight: 14
    },
    smallText: {
        fontSize: 12,
    },
    largeText: {
        fontSize: 18,
        lineHeight: 18
    },
    largerText: {
        fontSize: 32,
        lineHeight: 34,
        height: 30
    }
})