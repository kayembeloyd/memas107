import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CListModal from '../components/CListModal';
import CMaintenanceLogItem from '../components/CMaintenanceLogItem';
import MaintenanceLog from '../database/models/MaintenanceLog';
import Department from '../database/models/Department';
import CButton from '../components/CButton';
import MaintenanceType from '../database/models/MaintenanceType';

export default function MaintenanceLogs({ route, navigation }){

    const {filtering, filterEquipment } = route.params;
    const [maintenanceLogs, setMaintenanceLogs] = useState([])
    const [maintenanceLogsFilterOptions, setMaintenanceLogsOptions] = useState({asset_tag: filterEquipment ? filterEquipment.data.asset_tag : 'All'})
    
    // For the search 
    const searchTerm = useRef('')
    const iconName = useRef('arrow-back')
    
    // For the FilterBar
    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState('All')

    const [maintenanceTypes, setMaintenanceTypes] = useState([])
    const [selectedMaintenanceType, setSelectedMaintenanceType] = useState('All')

    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)
    const [selectMaintenanceTypeModalVisibility, setSelectMaintenanceTypeModalVisibility] = useState(false)

    const startSearchProcess = () => {
        iconName.current = 'close'

        setMaintenanceLogsOptions(mlo => ({
            department: mlo.department ? mlo.department : undefined, 
            type: mlo.type ? mlo.type : undefined,
            searchTerm: filterEquipment ? undefined : (searchTerm.current !== '' ? searchTerm.current : undefined)
        }))
    }

    const filterItemPressHandler = (filterItem) => {
        switch (filterItem) {
            case 'Department':
                setSelectDepartmentModalVisibility(true)
                break;
            case 'Maint... Type':
                setSelectMaintenanceTypeModalVisibility(true)
                break;
            default:
                break;
        }
    } 

    const iIsLoading = useRef(false)
    const iMore = useRef(true)
    const iLastIndex = useRef(0)   
    const loadMaintenanceLogs = () => {
        if (iMore.current){
            iIsLoading.current = true

            MaintenanceLog.getMaintenanceLogs(iLastIndex.current + 1, 10, maintenanceLogsFilterOptions).then((results) => {
                iIsLoading.current = false

                results.meta.lastIndex ? iLastIndex.current = results.meta.lastIndex : iLastIndex.current = 0
                iMore.current = results.meta.more

                setMaintenanceLogs(ml => [...ml, ...results.data])
            })
        } else {
            iIsLoading.current = false
        }
    }

    const isFirstRun = useRef(true)
    // Run once hook
    useEffect(() => {
        Department.getDepartments({with_all: true}).then((dpts) => setDepartments(dpts))
        MaintenanceType.getMaintenanceTypes({with_all : true}).then((mtypes) => setMaintenanceTypes(mtypes))

        setMaintenanceLogs(ml => [])
        loadMaintenanceLogs()
    }, [])

    // Screen focused hook
    useEffect(() => {
        return navigation.addListener('focus', () => {

        });
    }, [navigation])

    // maintenanceLogsFilterOptions tracker Hook
    useEffect(() => {
        if (isFirstRun.current){
            isFirstRun.current = false
            return
        }

        // Resetting the Load refs
        iIsLoading.current = false
        iMore.current = true
        iLastIndex.current = 0

        setMaintenanceLogs(ml => [])
        loadMaintenanceLogs()
    }, [maintenanceLogsFilterOptions])

    return (
        <View style={styles.container}>
            {/** Here goes the filterSelectModal modal */}
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=> setSelectDepartmentModalVisibility(false) }
                onItemPress={(selectedItem)=>{
                    setMaintenanceLogsOptions(mlo => ({
                        department: selectedItem,
                        type: selectedMaintenanceType,
                        asset_tag: filterEquipment ? filterEquipment.data.asset_tag : 'All',
                        searchTerm: filterEquipment ? undefined : (mlo.searchTerm ? mlo.searchTerm : undefined)
                    }))

                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <CListModal visible={selectMaintenanceTypeModalVisibility} title='Select maintenance type' list={maintenanceTypes} 
                onCancelPress={() => setSelectMaintenanceTypeModalVisibility(false) }
                onItemPress={(selectedItem)=>{
                    setMaintenanceLogsOptions(mlo => ({
                        department: selectedDepartment,
                        type: selectedItem,
                        asset_tag: filterEquipment ? filterEquipment.data.asset_tag : 'All',
                        searchTerm: filterEquipment ? undefined : (mlo.searchTerm ? mlo.searchTerm : undefined)
                    }))

                    setSelectedMaintenanceType(selectedItem)
                    setSelectMaintenanceTypeModalVisibility(false)
                }}/>

            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'white'}}>
                            <View style={ styles.searchBarContainer }>
                                <CSearchBar 
                                    style={{ width: '100%', maxWidth: 700 }} 
                                    searchbar_hint={'Filtering(' + filtering + ')' + (filterEquipment ? '(' + filterEquipment.data.name + ')' : '')}
                                    onBackPress={() => {
                                        if (iconName.current === 'arrow-back') navigation.goBack()
                                        else {
                                            iconName.current = 'arrow-back'
                                            searchTerm.current = ''
                                            
                                            setMaintenanceLogsOptions(mlo => ({
                                                department: mlo.department ? mlo.department : 'All',
                                                type: mlo.type ? mlo.type : 'All',
                                                asset_tag: filterEquipment ? filterEquipment.data.asset_tag : 'All',
                                                searchTerm: undefined
                                            }))
                                        }
                                    }}
                                    hValue={searchTerm.current}
                                    iconName={iconName.current}
                                    onChangeText={(t) => searchTerm.current = t} 
                                    onSearchPress={() => startSearchProcess()}
                                    onSubmitEditing={() => startSearchProcess()}/>
                            </View>
                            
                            <View style={{marginTop: 10,}}>
                                <CFilterBar style={{alignItems: 'flex-start',}}>
                                    {
                                        filterEquipment ? <></> : (
                                            <CFilterItem style={{ marginRight: 20}} filterKey='Department' filterValue={selectedDepartment} 
                                            filterItemPress={(fkey) => filterItemPressHandler(fkey)} />
                                        )
                                    }
                                    
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Maint... Type' filterValue={selectedMaintenanceType} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)}/>
                                </CFilterBar>
                            </View>
                        </View>
                    )
                }}
                ListFooterComponent= { () => {
                    return (
                        <View style={{ margin: 10, alignItems: 'center'}}>
                            {
                                iMore.current ? (
                                    <CButton 
                                        style={{ width: '100%', maxWidth: 700 }} 
                                        text="Load More" 
                                        onPress={() => {
                                            // Load more indeed
                                            loadMaintenanceLogs()
                                        }}/> ) : (
                                    iIsLoading.current ? <CButton style={{ width: '100%', maxWidth: 700 }} text="Loading..."/> : (
                                        <Text> No More logs</Text>
                                    )
                                )
                            }
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                data={maintenanceLogs}
                keyExtractor={(item) => item.data.ml_id}
                renderItem={({ item }) => (
                    <CMaintenanceLogItem equipment_id={item.data.equipment_id} log_id={item.data.ml_id} type={item.data.type} date={item.data.date} 
                    onPress={() => navigation.navigate('MaintenanceLog',  { item }) }/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        marginTop: 0,
    },

    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },
})