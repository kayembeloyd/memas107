import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CListModal from '../components/CListModal';
import CMaintenanceLogItem from '../components/CMaintenanceLogItem';
import MaintenanceLog from '../database/models/MaintenanceLog';

export default function MaintenanceLogs({ route, navigation }){

    const { filtering, filterEquipment } = route.params;

    const [maintenanceLogs, setMaintenanceLogs] = useState([])
    
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

    const [maintenanceTypes, setMaintenanceTypes] = useState([
        {id: 0, name:'All'},
        {id: 1, name:'Maintenance Type 1'},
        {id: 2, name:'Maintenance Type 2'}
    ])
    const [selectedMaintenanceType, setSelectedMaintenanceType] = useState('All')

    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)
    const [selectMaintenanceTypeModalVisibility, setSelectMaintenanceTypeModalVisibility] = useState(false)

    const filterItemPressHandler = (filterItem) => {
        switch (filterItem) {
            case 'Department':
                setSelectDepartmentModalVisibility(true)
                break;
            case 'MaintenanceType':
                setSelectMaintenanceTypeModalVisibility(true)
                break;
            default:
                break;
        }
    } 

    const [iIsLoading, setIIsLoading] = useState(false)
    const [iMore, setIMore] = useState(true)
    const [iLastIndex, setILastIndex] = useState(0)    
    const loadMaintenanceLogs = () => {
        if (iMore){
            setIIsLoading(true)

            MaintenanceLog.getMaintenanceLogs(iLastIndex + 1, 5).then((results) => {
                setIIsLoading(false)

                const mlogs = results.data
                setMaintenanceLogs((prevMaintenanceLogs) => {
                    prevMaintenanceLogs.push(...mlogs)
                    return prevMaintenanceLogs
                })

                results.meta.lastIndex ? setILastIndex(results.meta.lastIndex) : setILastIndex(0)
                setIMore(results.meta.more)
            })
        } else {
            setIIsLoading(false)
        }
    }

    useEffect(() => {
        if (filtering === 'on'){
        }

        const unsubscribe = navigation.addListener('focus', () => { 
            setMaintenanceLogs([])
            loadMaintenanceLogs()
        });

        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.container}>
            {/** Here goes the filterSelectModal modal */}
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=>{
                    setSelectDepartmentModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <CListModal visible={selectMaintenanceTypeModalVisibility} title='Select maintenance type' list={maintenanceTypes} 
                onCancelPress={()=>{
                    setSelectMaintenanceTypeModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedMaintenanceType(selectedItem)
                    setSelectMaintenanceTypeModalVisibility(false)
                }}/>

            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'black'}}>
                            <View style={ styles.searchBarContainer }>
                                <CSearchBar 
                                    style={{ width: '100%', maxWidth: 700 }} 
                                    searchbar_hint={'Filtering(' + filtering + ')' + (filterEquipment ? '(' + filterEquipment.data.name + ')' : '')}
                                    onBackPress={() => navigation.goBack()}/>
                            </View>
                            
                            <View style={ styles.filterBarContainer }>
                                <CFilterBar style={{alignItems: 'flex-start',}}>
                                    { filterEquipment ? <></> : (
                                        <CFilterItem style={{ marginRight: 20}} filterKey='Department' filterValue={selectedDepartment} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)} />
                                    )}
                                    
                                    <CFilterItem style={{ marginRight: 20}} filterKey='MaintenanceType' filterValue={selectedMaintenanceType} 
                                        filterItemPress={(fkey) => filterItemPressHandler(fkey)}/>
                                    
                                </CFilterBar>
                            </View>
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                data={maintenanceLogs}
                keyExtractor={(item) => item.data.ml_id}
                renderItem={({ item }) => (
                    <CMaintenanceLogItem equipment_id={item.data.equipment_id} type={item.data.type} date={item.data.date} onPress={() => {
                        navigation.navigate('MaintenanceLog',  { item })
                    }}/>
                )}
            />
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