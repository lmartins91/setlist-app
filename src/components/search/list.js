import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { Item, NoResults } from '../'

export const List = ({ items, loadMore, goTo }) => (
    <View style={styles.container}>
        {items.length ?
            <FlatList
                data={items}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <Item item={item} goTo={goTo} />}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
                ListFooterComponent={() => <View style={styles.itemSeparator}></View>}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
            /> :
            <NoResults />
        }
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemSeparator: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
})