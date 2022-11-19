import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CFilterBar from '../components/CFilterBar';
import CFilterItem from '../components/CFilterItem';
import CListModal from '../components/CListModal';
import CMaintenanceScheduleItem from '../components/CMaintenanceScheduleItem';
import CSearchBar from '../components/CSearchBar';
import Department from '../database/models/Department';

export default function MaintenanceScheduleScreen({ navigation }) {
    const [maintenanceScheduleItemsFilterOptions, setMaintenanceScheduleItemsFilterOptions] = useState({})

    const [maintenaceScheduleItems, setMaintenanceScheduleItems] = useState([
        {data:{equipment_id:1}},
        {data:{equipment_id:2}},
        {data:{equipment_id:3}},
        {data:{equipment_id:4}},
        {data:{equipment_id:5}},
    ])

    // For the search 
    const searchTerm = useRef('')
    const iconName = useRef('arrow-back')

    // For the FilterBar
    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState('All')

    // For the Modals
    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)

    const startSearchProcess = () => {
        iconName.current = 'close'

        setMaintenanceScheduleItemsFilterOptions(msifo => ({
            department: msifo.department ? msifo.department : undefined, 
            searchTerm: searchTerm.current !== '' ? searchTerm.current : undefined 
        }))
    }
    
    const filterItemPressHandler = (filterItem) => {
        switch (filterItem) {
            case 'Department':
                setSelectDepartmentModalVisibility(true)
                break;
            default:
                break;
        }
    } 

    const isFirstRun = useRef(true)
    // Run once hook
    useEffect(() => {
        Department.getDepartments({with_all: true}).then((dpt) => setDepartments(dpt))
    }, []);

    return (
        <View style={styles.container}>
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={() => setSelectDepartmentModalVisibility(false)}
                onItemPress={(selectedItem) => {
                    setMaintenanceScheduleItemsFilterOptions(msifo => ({
                        department: selectedItem, 
                        searchTerm: msifo.searchTerm ? msifo.searchTerm : undefined
                    }))

                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <FlatList ListHeaderComponent = {() => {
                    return (
                        <View style={{ backgroundColor: 'white'}}>
                            <View style={ styles.searchBarContainer }>
                                <CSearchBar 
                                    searchbar_hint="search equipments in schedule"
                                    style={{ width: '100%', maxWidth: 700 }} 
                                    onBackPress={() => {
                                        if (iconName.current === 'arrow-back') navigation.goBack()
                                        else {
                                            iconName.current = 'arrow-back'
                                            searchTerm.current = ''

                                            setMaintenanceScheduleItemsFilterOptions(msifo => ({
                                                department: msifo.department ? msifo.department : 'All', 
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
                                    <CFilterItem style={{ marginRight: 20}} filterKey='Department' filterValue={selectedDepartment} 
                                            filterItemPress={(fkey) => filterItemPressHandler(fkey)} />
                                </CFilterBar>
                            </View>
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
                data={maintenaceScheduleItems}
                keyExtractor={(item) => item.data.equipment_id}
                renderItem={({ item }) => (
                    <CMaintenanceScheduleItem style={{width:'90%'}}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
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