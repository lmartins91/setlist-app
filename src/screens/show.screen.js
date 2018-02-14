import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { Header, Setlist, ShowDate } from '../components'
import * as colors from '../styles/colors'

export default class ShowScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: <Header navigation={navigation} title={params.show.artist.name}/>
        }
    }
    
    render() {
        const { params } = this.props.navigation.state
        const city = `${params.show.venue.city.name}, ${params.show.venue.city.stateCode}`
        return <View style={styles.container}>
            <View style={styles.showDetails}>
                <View style={styles.showDateContainer}>
                    <ShowDate date={params.show.date} size='medium' />
                </View>
                <View style={styles.info}>
                    <Text style={styles.h1}>{params.show.venue.name}</Text>
                    <Text style={styles.h2}>{city}</Text>
                    <Text style={styles.h2}>{params.show.tour}</Text>
                </View>
            </View>
            <Setlist setlist={params.show.setlist} />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight
    },
    showDetails: {
        flexDirection: 'row',
    },
    showDateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 12,
        height: 70, width: 70,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    h1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16
    },
    h2: {
        fontFamily: 'Roboto-Light',
        fontSize: 13
    }
})