import React from 'react'
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as colors from '../../styles/colors'

export const Item = ({ item, goTo }) => (
    <TouchableHighlight onPress={() => goTo(item)}>
        <View style={styles.container}>
            <View style={styles.letterIconContainer}>
                <Text style={styles.letterIconText}>
                    {item.name.charAt(0).toUpperCase()}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text} numberOfLines={1}>
                    {item.name}
                </Text>
                <Icon style={styles.icon} name="keyboard-arrow-right" size={16} />
            </View>
        </View>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginHorizontal: 16
    },
    letterIconContainer: {
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: colors.tealDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    letterIconText: {
        color: 'white'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Roboto-Regular',
    }
})