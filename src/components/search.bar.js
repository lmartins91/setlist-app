import React from 'react'
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import * as colors from '../styles/colors'

export const SearchBar = ({ onTextChange, placeholder = 'Search', theme = 'default', value }) => {
    const styles = (theme == 'default') ? defaultStyles : darkThemeStyles
    return <View style={styles.container}>
        <TextInput style={styles.textInput}
            onChangeText={(query) => onTextChange(query)}
            value={value}
            autoFocus={true}
            placeholder={placeholder}
        />
        {!!value && (
            <TouchableHighlight onPress={() => onTextChange('')}>
                <Icon style={styles.icon} name="close" size={14} />
            </TouchableHighlight>
        )}
    </View>
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        maxHeight: 30,
        borderRadius: 15,
        backgroundColor: colors.grayLight,
        paddingHorizontal: 15
    },
})

const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        maxHeight: 30,
        
        borderRadius: 5,
        backgroundColor: colors.grayLight,
        paddingHorizontal: 10,
    },
    textInput: {
        flex: 1,
    }
})