import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as colors from '../styles/colors'

export const NoResults = ({ text }) => (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="search" size={90} />
        </View>
        <Text style={styles.text}>{text || 'No Results'}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    iconContainer: {
        height: 140,
        width: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tealDark,
    },
    icon: {
        color: colors.grayLight
    },
    text: {
        marginTop: 16,
        fontFamily: 'Roboto-Bold',
        color: colors.grayDarker
    }
})