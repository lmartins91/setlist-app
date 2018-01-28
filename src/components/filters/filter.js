import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, DatePickerIOS } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import moment from 'moment'

import { DatePicker, VenuePicker, YearPicker } from '../'
import * as colors from '../../styles/colors'

const FilterSelector = (props) => {
    switch (props.type) {
        case 'date': return <DatePicker { ...props } />
        case 'year': return <YearPicker { ...props } />
        case 'venue': return <VenuePicker { ...props } />
        default: return <Text style={styles.text}>wot</Text>
    }
}

export const Filter = ({ filter = { title: '', value: null }, isActive, onChange, onToggle, type }) => (
    <View style={isActive && styles.activeFilter}>
        <TouchableHighlight onPress={() => onToggle()}>
            <View style={[styles.filterToggle, styles.bottomBorder]}>
                <Text style={[styles.text, filter.value && styles.activeTitle]}>
                    {(filter.value ? filter.title : type).toUpperCase()}
                </Text>
                {filter.value
                    ? <Icon style={styles.icon} name="close" onPress={() => onChange(undefined)} />
                    : <Icon style={styles.icon} name={`keyboard-arrow-${isActive ? 'up' : 'down'}`} />
                }
            </View>
        </TouchableHighlight>
        {isActive && (
            <View style={[styles.filterContent, (type !== 'venue') && styles.bottomBorder]}>
                <FilterSelector
                    filter={filter}
                    onChange={onChange}
                    type={type}
                />
            </View>
        )}
    </View>
)

Filter.propTypes = {
    filter: PropTypes.shape({ title: PropTypes.string, value: PropTypes.any }),
    isActive: PropTypes.bool,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
    type: PropTypes.string,
}

const styles = StyleSheet.create({
    activeFilter: {
        flex: 1
    },
    filterToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
    },
    filterContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBorder: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    text: {
        color: 'white',
        fontFamily: 'RobotoMono-Regular',
    },
    activeTitle: {
        color: colors.tealPrimary,
    },
    icon: {
        color: 'white',
        fontSize: 16
    },
})