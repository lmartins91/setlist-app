import React, { Component } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BlurView } from 'react-native-blur'
import * as _ from 'lodash'
import PropTypes from 'prop-types'

import { Filter } from '../'
import * as colors from '../../styles/colors'

export class FiltersModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeFilterType: null,
            filters: props.filters,
        }
    }
    
    onToggle(filterType) {
        this.setState(({ activeFilterType }) => ({
            activeFilterType: activeFilterType !== filterType ? filterType : null
        }))
    }
    
    onFilterChange(filter, type) {
        if (!_.isEqual(this.state.filters[type], filter)) {
            this.setState(({ filters }) => ({
                filters: { ...filters, [type]: filter }
            }))
        }
    }
    
    clearFilters() {
        this.setState(({ filters }) => ({
            filters: _.mapValues(filters, (f) => undefined)
        }))
    }
    
    render() {
        const { activeFilterType, filters } = this.state
        const showClearAll = _.some(filters, (f) => !!f)
        return <Modal transparent={true} visible={true}>
            <BlurView style={styles.blurView} blurAmount={5} />
            <Icon name="close"
                style={styles.closeIcon}
                onPress={() => this.props.onClose()}
            />
            <View style={[styles.container, !activeFilterType && { paddingBottom: 50 }]}>
                {Object.keys(filters).map((filterType, i) => (
                    <Filter key={i}
                        isActive={activeFilterType == filterType}
                        filter={filters[filterType]}
                        onToggle={() => this.onToggle(filterType)}
                        onChange={(filter) => this.onFilterChange(filter, filterType)}
                        type={filterType}
                    />
                ))}
            </View>
            {!activeFilterType && (
                <View style={styles.actions}>
                    {showClearAll && [
                        <Text style={styles.text}
                            onPress={() => this.clearFilters()}>
                            CLEAR ALL
                        </Text>,
                    ]}
                    <Text style={[styles.text, styles.submit]}
                        onPress={() => this.props.onSubmit(filters)}>
                        SEARCH
                    </Text>
                </View>
            )}
        </Modal>
    }
}

FiltersModal.propTypes = {
    filters: PropTypes.shape({
        date: PropTypes.shape({ title: PropTypes.string, value: PropTypes.instanceOf(Date) }),
        venue: PropTypes.shape({ title: PropTypes.string, value: PropTypes.string }),
        year: PropTypes.shape({ title: PropTypes.string, value: PropTypes.string }),
    }),
    onClose: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
        paddingTop: 50,
        paddingHorizontal: 50,
    },
    blurView: {
        position: 'absolute', top: 0, left: 0, bottom: 0, right: 0
    },
    closeIcon: {
        position: 'absolute', top: 20, left: 20,
        fontSize: 20,
        color: 'white',
        zIndex: 1
    },
    text: {
        color: 'white',
        fontFamily: 'RobotoMono-Regular',
        textAlign: 'center',
        marginBottom: 10,
    },
    actions: {
        position: 'absolute', left: 50, right: 50, bottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    submit: {
        color: colors.tealPrimary,
        fontFamily: 'RobotoMono-Bold',
    },
})