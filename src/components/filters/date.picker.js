import React from 'react'
import { DatePickerIOS, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

export const DatePicker = ({ filter, onChange }) => (
    <DatePickerIOS
        style={styles.datePicker}
        date={filter.value || new Date()}
        onDateChange={(value) => onChange({ title: moment(value).format('MMMM Do YYYY'), value })}
        mode="date"
    />
)

DatePicker.propTypes = {
    filter: PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.instanceOf(Date)
    }),
    onChange: PropTypes.func,
}

const styles = StyleSheet.create({
    datePicker: {
        alignSelf: 'stretch',
        justifyContent: 'center',
    }
})