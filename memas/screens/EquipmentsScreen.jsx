import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList, Image, Modal, Text, TouchableOpacity } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CEquipmentItem from '../components/CEquipmentItem'
import CScanButton from '../components/CScanButton';
import CButton from '../components/CButton';
import CListModal from '../components/CListModal';
import Equipment from '../database/models/Equipment';

export default function EquipmentsScreen({ navigation }){

    const [equipments, setEquipments] = useState([])
    
    // For the FilterBar
    const [departments, setDepartments] = useState([
        {id: 0, name:'All'}, 
        {id: 1, name:'Department 1'}, 
        {id: 2, name:'Department 2'}, 
        {id: 3, name:'Department 3'}, 
        {id: 4, name:'Department 4'}, 
        {id: 5, name:'Department 5'}, 
        {id: 6, name:'Department 6'}, 
        {id: 7, name:'Department 7'}, 
        {id: 8, name:'Department 8'}, 
        {id: 9, name:'Department 9'},
        {id: 10, name:'Department 10'}, 
        {id: 11, name:'Department 11'}, 
        {id: 12, name:'Department 12'}, 
        {id: 13, name:'Department 13'}, 
        {id: 14, name:'Department 14'}, 
        {id: 15, name:'Department 15'}, 
        {id: 16, name:'Department 16'}, 
        {id: 17, name:'Department 17'}, 
    ])
    const [selectedDepartment, setSelectedDepartment] = useState('All')

    const [makes, setMakes] = useState([
        {id: 0, name:'All'},
        {id: 1, name:'Make 1'},
        {id: 2, name:'Make 2'},
        {id: 3, name:'Make 3'},
        {id: 4, name:'Make 4'},
        {id: 5, name:'Make 5'},
        {id: 6, name:'Make 6'},
    ])
    const [selectedMake, setSelectedMake] = useState('All')

    const [statuses, setStatuses] = useState([
        {id: 0, name:'All'},
        {id: 1, name:'Status 1'},
        {id: 2, name:'Status 2'},
        {id: 3, name:'Status 3'},
    ])
    const [selectedStatus, setSelectedStatus] = useState('All')

    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)
    const [selectMakeModalVisibility, setSelectMakeModalVisibility] = useState(false)
    const [selectStatusModalVisibility, setSelectStatusModalVisibility] = useState(false)

    const filterItemPressHandler = (filterItem) => {
        switch (filterItem) {
            case 'Department':
                setSelectDepartmentModalVisibility(true)
                break;
            case 'Make':
                setSelectMakeModalVisibility(true)
                break;
            case 'Status':
                setSelectStatusModalVisibility(true)
                break
            default:
                break;
        }
    }

    const [iIsLoading, setIIsLoading] = useState(false)
    const [iMore, setIMore] = useState(true)
    const [iLastIndex, setILastIndex] = useState(0)    
    const loadEquipments = () => {
        if (iMore){
            setIIsLoading(true)

            Equipment.getEquipments(iLastIndex + 1, 5).then((results) => {
                setIIsLoading(false)

                const eqs = results.data
                setEquipments((prevEquipments) => {
                    prevEquipments.push(...eqs)
                    return prevEquipments
                })

                results.meta.lastIndex ? setILastIndex(results.meta.lastIndex) : setILastIndex(0)
                setIMore(results.meta.more)
            })
        } else {
            setIIsLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEquipments([])
            loadEquipments()
        });

        return unsubscribe;
    }, [ navigation ]);

    return (
        <View style={styles.container}>
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=>{
                    setSelectDepartmentModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <CListModal visible={selectMakeModalVisibility} title='Select make' list={makes} 
                onCancelPress={()=>{
                    setSelectMakeModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedMake(selectedItem)
                    setSelectMakeModalVisibility(false)
                }}/>

            <CListModal visible={selectStatusModalVisibility} title='Select status' list={statuses} 
                onCancelPress={()=>{
                    setSelectStatusModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedStatus(selectedItem)
                    setSelectStatusModalVisibility(false)
                }}/>

            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'black'}}>
                            <View style={ styles.searchBarContainer }>
                                <CSearchBar style={{ width: '100%', maxWidth: 700 }} searchbar_hint="search equipments"
                                    onBackPress={() => navigation.goBack()}/>
                            </View>
                            
                            <View style={ styles.filterBarContainer }>
                                <CFilterBar style={{alignItems: 'flex-start',}}>
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Department' filterValue={selectedDepartment} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)} />
                                    
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Make' filterValue={selectedMake} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)}/>
                                    
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Status' filterValue={selectedStatus} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)}/>
                                </CFilterBar>
                            </View>
                        </View>
                    )
                }}
                ListFooterComponent= { () => {
                    return (
                        <View style={{alignItems: 'center'}}>
                            {
                                iMore ? <CButton  style={{ marginVertical: 20, width:'100%', maxWidth: 300}} text={'Load more'} onPress={() => {
                                    loadEquipments()
                                }}/> : iIsLoading ? <CButton  style={{ marginVertical: 20, width:'100%', maxWidth: 300}} text={'Loading...'} /> : <></>
                            }
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                data={equipments}
                keyExtractor={(item) => item.data.e_id}
                renderItem={({ item }) => (
                    <CEquipmentItem name={item.data.name} department={item.data.department} 
                        model={item.data.model} make={item.data.make} asset_tag={item.data.asset_tag} status='not set'
                        onPress={() => {
                            navigation.navigate('Equipment', { item })
                        }} />
                )}
            />

            <CScanButton onPress={() => {
                navigation.navigate('Scan')
            }}/>

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