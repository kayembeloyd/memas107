import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';

import CSearchBar from '../components/CSearchBar';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CListModal from '../components/CListModal';
import CMaintenanceLogItem from '../components/CMaintenanceLogItem';
import MaintenanceLog from '../database/models/MaintenanceLog';
import Department from '../database/models/Department';

export default function MaintenanceLogs({ route, navigation }){

    const { filtering, filterEquipment } = route.params;

    const [maintenanceLogs, setMaintenanceLogs] = useState([])
    
    // For the FilterBar
    const [departments, setDepartments] = useState([])
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
            case 'Maint... Type':
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
            Department.getDepartments({with_all: true}).then((dpts) => {
                setDepartments(dpts)
            })

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
                        <View style={{ backgroundColor: 'white'}}>
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
                                    
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Maint... Type' filterValue={selectedMaintenanceType} 
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
        marginTop: 10,
    },
    
})