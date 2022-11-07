import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList, Image } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CEquipmentItem from '../components/CEquipmentItem'
import CScanButton from '../components/CScanButton';

export default function EquipmentsScreen({ navigation }){

    const [equipments, setEquipments] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}])

    return (
        <View style={styles.container}>
            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'black'}}>
                            <View style={ styles.searchBarContainer }>
                                <CSearchBar style={{ width: '100%', maxWidth: 700 }} searchbar_hint="search equipments"
                                    onBackPress={() => navigation.goBack()}/>
                            </View>
                            
                            <View style={ styles.filterBarContainer }>
                                <CFilterBar style={{alignItems: 'flex-start',}}>
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Department' filterValue='all' />
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Make' filterValue='all' />
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Status' filterValue='all' />
                                </CFilterBar>
                            </View>
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                data={equipments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CEquipmentItem name={item.name} department='department' 
                        model='model' make='make' tag='asset-tag' status='To be determined'
                        onPress={() => {}} />
                )}
            />

            <CScanButton />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        marginTop: 36,
    },

    searchBarContainer: {
        backgroundColor: 'gold',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },

    filterBarContainer: {
        marginTop: 10,
    },
    
})