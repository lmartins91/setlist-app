import React from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { ShowDate } from './'

export const ShowItem = ({ date, goToShow, title }) => (
        <TouchableHighlight onPress={() => goToShow()}>
            <View style={styles.container}>
                <View style={styles.showDateContainer}>
                    <ShowDate date={date} size="small" />
                </View>
                <View style={styles.info}>
                    {title}
                </View>
            </View>
        </TouchableHighlight>
)

ShowItem.propTypes = {
    date: PropTypes.any,
    goToShow: PropTypes.func,
    title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    showDateContainer: {
        marginHorizontal: 16,
        height: 45, width: 45,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        height: 70,
    },
})