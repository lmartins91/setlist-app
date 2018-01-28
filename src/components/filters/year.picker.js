import React from 'react'
import { Picker, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export const YearPicker = ({ filter, onChange }) => {
    let years = [null]
    for (let i = new Date().getFullYear(); years.length <= 101; i--) {
        years.push(i.toString())
    }
    return <Picker
        style={styles.yearPicker}
        selectedValue={filter.value}
        onValueChange={(value) => onChange({ title: value, value })}>
        {years.map(year => (
            <Picker.Item color="white" key={year}
                label={year || ' '}
                value={year}
            />
        ))}
    </Picker>
}

YearPicker.propTypes = {
    filter: PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string
    }),
    onChange: PropTypes.func,
}

const styles = StyleSheet.create({
    yearPicker: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    }
})