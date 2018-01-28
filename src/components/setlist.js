import React from 'react'
import { Text, View, SectionList, StyleSheet } from 'react-native'

import { Song } from './index'
import * as colors from '../styles/colors'

export const Setlist = ({ setlist }) => {
    if (!setlist) return null
    setlist = setlist.map(set => ({ name: set.name, data: set.songs }))
    return <SectionList
        style={styles.container}
        keyExtractor={(item, index) => index}
        sections={setlist}
        renderItem={({ item }) => <Song song={item}/>}
        renderSectionHeader={({ section }) => <View style={styles.sectionHeader}>
            <View style={styles.wrapper}>
                {section.name && <Text style={styles.text}>{section.name.toUpperCase()}</Text>}
            </View>
        </View>}
        stickySectionHeadersEnabled={false}
    />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 24
    },
    sectionHeader: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 8,
        backgroundColor: colors.grayLight,
    },
    wrapper: {
        backgroundColor: colors.tealDark,
    },
    text: {
        fontFamily: 'RobotoMono-Bold',
        fontSize: 12,
        color: 'white',
        paddingVertical: 2,
        paddingHorizontal: 12
    },
})