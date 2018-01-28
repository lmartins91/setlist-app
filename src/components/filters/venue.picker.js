import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

import { SearchBar } from '../'
import { loadVenues } from '../../actions/venues'
import { VenueService } from '../../services/venue.service'

export class VenuePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: props.filter ? props.filter.title : '',
            venues: []
        }
    }
    
    loadVenues(criteria) {
        VenueService.getVenues(criteria).then(venues => {
            this.setState({ venues })
        })
    }
    
    componentDidMount() {
        if (this.state.query) {
            this.loadVenues({ name: this.state.query })
        }
    }
    
    handleTextChange(query) {
        this.setState(prevState => {
            if (prevState.query !== query) {
                this.loadVenues({ name: query })
            }
            return { query }
        })
    }
    
    selectVenue(venue) {
        const filter = { title: venue.name, value: venue.id }
        this.props.onChange(filter)
    }
    
    renderVenue(venue) {
        return <View style={styles.venue}>
            <Text style={styles.text} numberOfLines={1}
                onPress={() => this.selectVenue(venue)}>
                {venue.name}
            </Text>
            <Icon style={styles.icon} name="keyboard-arrow-right" size={16} />
        </View>
    }
    
    render() {
        return <View style={styles.container}>
            <SearchBar
                value={this.state.query}
                onTextChange={(query) => this.handleTextChange(query)}
                theme='dark'
                placeholder='Venue'
            />
            <FlatList
                style={styles.list}
                data={this.state.venues}
                renderItem={({item}) => this.renderVenue(item)}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 20,
    },
    list: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    venue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: 'white',
        fontFamily: 'RobotoMono-Regular',
        flex: 1
    },
    icon: {
        color: 'white',
        paddingLeft: 5
    }
})