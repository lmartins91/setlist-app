import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import * as colors from '../styles/colors'

export const ShowDate = ({ date, size = 'small' }) => {
    switch (size) {
        case 'small':
            return <View style={styles.container}>
                <Text style={[styles.text, styles.mediumText]}>{date.format('DD')}</Text>
                <Text style={[styles.text, styles.smallText]}>{date.format('MMM').toUpperCase()}</Text>
            </View>
            
        case 'medium':
            return <View style={styles.container}>
                <Text style={[styles.text, styles.smallText]}>{date.format('MMM').toUpperCase()}</Text>
                <Text style={[styles.text, styles.largeText]}>{date.format('DD')}</Text>
                <Text style={[styles.text, styles.smallText]}>{date.format('YYYY')}</Text>
            </View>
            
        case 'large':
            return <View style={styles.container}>
                <Text style={styles.text}>{date.format('MMM').toUpperCase()}</Text>
                <Text style={[styles.text, styles.largerText]}>{date.format('DD')}</Text>
                <Text style={styles.text}>{date.format('YYYY')}</Text>
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.tealDark,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    text: {
        fontFamily: 'RobotoMono-Bold',
        color: 'white',
        lineHeight: 14
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 18,
        lineHeight: 18
    },
    largeText: {
        fontSize: 32,
        lineHeight: 34,
        height: 30
    },
    largerText: {
        fontSize: 48,
        lineHeight: 50,
        height: 46
    }
})