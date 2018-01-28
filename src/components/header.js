import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

import { SearchBar } from './index'
import * as colors from '../styles/colors'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { query: props.query || '' }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.query !== nextProps.query) {
            this.setState({ query: nextProps.query })
        }
    }
    
    getCurrentRoute() {
        const navState = this.props.navigation.state
        return navState.routeName || navState.routes[navState.index].routeName
    }
    
    handleQueryChange(query) {
        this.setState({ query })
        this.props.onQueryChange(query)
    }
    
    renderHeader() {
        const { goBack, navigate } = this.props.navigation
        const route = this.getCurrentRoute()
        return <View style={[styles.content, (route == 'Show' || route == 'Shows') && { backgroundColor: colors.grayLight }]}>
            <TouchableHighlight onPress={() => goBack()}>
                <Icon style={styles.icon} name="keyboard-arrow-left" size={24} />
            </TouchableHighlight>
            {this.props.content || <Text style={styles.text}>{this.props.title || 'HEADER'}</Text>}
            <TouchableHighlight onPress={() => navigate('Search')}>
                <Icon style={styles.icon} name="search" size={24} />
            </TouchableHighlight>
        </View>
    }
    
    renderSearchHeader() {
        const { goBack } = this.props.navigation
        return <View style={styles.content}>
            <TouchableHighlight onPress={() => goBack()}>
                <Icon style={styles.icon} name="keyboard-arrow-left" size={24} />
            </TouchableHighlight>
            <SearchBar
                value={this.state.query}
                onTextChange={this.handleQueryChange.bind(this)}
            />
        </View>
    }
    
    render() {
        return <View>
            <View style={styles.statusBar}></View>
            {this.getCurrentRoute() == 'Search' ? this.renderSearchHeader() : this.renderHeader()}
        </View>
    }
}

Header.propTypes = {
    navigation: PropTypes.any,
    onQueryChange: PropTypes.func,
    query: PropTypes.string,
    title: PropTypes.string,
}

const styles = StyleSheet.create({
    statusBar: {
        height: 20,
        backgroundColor: colors.tealDark,
    },
    content: {
        height: 60,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: colors.tealDark,
    },
    text: {
        fontFamily: 'RobotoMono-Medium',
        fontSize: 18,
        color: 'black'
    },
    icon: {
        color: 'black',
        marginRight: 12,
    },
})