import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CEquipmentItem from '../components/CEquipmentItem'
import CScanButton from '../components/CScanButton';
import CListModal from '../components/CListModal';
import Equipment from '../database/models/Equipment';
import Department from '../database/models/Department';
import CButton from '../components/CButton';

export default function EquipmentsScreen({ navigation }){
    const [equipments, setEquipments] = useState([])
    const [equipmentFilterOptions, setEquipmentFilterOptions] = useState({})
    
    // For the FilterBar
    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState('All')

    // For the FilterBar
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

    // For the FilterBar
    const [statuses, setStatuses] = useState([
        {id: 0, name:'All'},
        {id: 1, name:'Operational'},
        {id: 2, name:'Idle'},
        {id: 3, name:'Broken'},
    ])
    const [selectedStatus, setSelectedStatus] = useState('All')

    // For the Modals
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

    const iIsLoading = useRef(false)
    const iMore = useRef(true)
    const iLastIndex = useRef(0)    
    const loadEquipments = () => {
        if (iMore.current){
            iIsLoading.current = true

            Equipment.getEquipments(iLastIndex.current + 1, 4, equipmentFilterOptions).then((results) => {
                iIsLoading.current = false

                results.meta.lastIndex ? iLastIndex.current = results.meta.lastIndex : iLastIndex.current = 0
                iMore.current = results.meta.more

                setEquipments(e => [...e, ...results.data])
            })
        } else {
            iIsLoading.current = false
        }
    }

    const isFirstRun = useRef(true)
    // Run once hook
    useEffect(() => {
        Department.getDepartments({with_all: true}).then((dpt) => {
            setDepartments(dpt)
        })
    
        setEquipments(e => [])
        loadEquipments()
    }, []);

    // Screen focused hook
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        })

        return unsubscribe
    }, [navigation])

    // equipmentFilterOptions track hook
    useEffect(() => {
        if (isFirstRun.current){
            isFirstRun.current = false
            return
        }
            
        // Resetting the loadEquipment() refs
        iIsLoading.current = false
        iMore.current = true
        iLastIndex.current = 0
           
        setEquipments(e => [])
        loadEquipments()

    }, [equipmentFilterOptions]);
    
    return (
        <View style={styles.container}>
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=>{
                    setSelectDepartmentModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setEquipmentFilterOptions({
                        department: selectedItem, 
                        status: selectedStatus
                    })

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
                    setEquipmentFilterOptions({
                        department: selectedDepartment, 
                        status: selectedItem
                    })

                    setSelectedStatus(selectedItem)
                    setSelectStatusModalVisibility(false)
                }}/>

            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'white' }}>
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
                ListFooterComponent={() => {
                    return (
                        <View style={{ margin: 10, alignItems: 'center'}}>
                            {
                                iMore.current ? (
                                    <CButton 
                                        style={{ width: '100%', maxWidth: 700 }} 
                                        text="Load More" 
                                        onPress={() => {
                                            // Load more indeed
                                            loadEquipments()
                                        }}/> ) : (
                                    iIsLoading.current ? <CButton style={{ width: '100%', maxWidth: 700 }} text="Loading..."/> : (
                                        <Text> No More equipments</Text>
                                    )
                                )
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