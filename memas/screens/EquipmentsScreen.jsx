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
import Department from '../database/models/Department';

export default function EquipmentsScreen({ navigation }){

    const [equipments, setEquipments] = useState([])
    
    // For the FilterBar
    const [departments, setDepartments] = useState([])
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
        {id: 1, name:'Operational'},
        {id: 2, name:'Idle'},
        {id: 3, name:'Broken'},
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
    const loadEquipments = (filterOptions) => {
        if (iMore){
            setIIsLoading(true)

            Equipment.getEquipments(iLastIndex + 1, 10).then((results) => {
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
        console.log('EquipmentScreen.useEffect()')

        setEquipments([])
        
        loadEquipments()

        Department.getDepartments({with_all: true}).then((dpt) => {
            setDepartments(dpt)
        })
    
        const unsubscribe = navigation.addListener('focus', () => {
            // EquipmentScreen Focused
            // Load filter
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
                        <View style={{ }}>
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
                        model={item.data.model} make={item.data.make} asset_tag={item.data.asset_tag} 
                        status={item.data.status ? item.data.status : 'not set'}
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
        backgroundColor: 'white',
        marginTop: 0,
    },

    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },

    filterBarContainer: {
        marginTop: 5,
    },  
})