import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DateSelectionCalendar, DefaultTheme } from 'react-native-easy-calendar'

import TechnicalSpecification from '../database/models/TechnicalSpecification';

import CToolbar from '../components/CToolbar';
import CCard from '../components/CCard';
import CButton from '../components/CButton';
import CCustomModal from '../components/CCustomModal';
import Equipment from '../database/models/Equipment';


export default function EquipmentScreen({ route, navigation }){

    const {item} = route.params;

    const [technicalSpecification, setTechnicalSpecification] = useState([])

    const [nextServiceDate, setNextServiceDate] = useState('')
    const [selectedNextServiceDate, setSelectedNextServiceDate] = useState('2020-02-01');

    const [statuses, setStatuses] = useState([
        {id: 1, name:'Operational'},
        {id: 2, name:'Idle'},
        {id: 3, name:'Broken'},
    ])

    const [currentStatusIndex, setCurrentStatusIndex] = useState(0)
    const [equipmentStatus, setEquipmentStatus] = useState('Working')

    const [statusModalVisibility, setStatusModalVisibility] = useState(false)
    const [selectNextServiceModalVisibility, setSelectNextServiceModalVisibility] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
            const technical_specification = new TechnicalSpecification()
            technical_specification.load(item.data.technical_specification_id).then(() => {
                setTechnicalSpecification(technical_specification.data.technical_specification)
            })

            setEquipmentStatus(item.data.status ? item.data.status : '(not set)')
            setNextServiceDate(item.data.next_service_date ? item.data.next_service_date : '(not set)')
        });

    }, [navigation])

    return (
        <View style={styles.container}>
            <CCustomModal visible={statusModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => {
                                    setStatusModalVisibility(false)
                                }}/>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    item.data.status = statuses[currentStatusIndex].name
                                    // save equipment
                                    var eq = new Equipment();
                                    eq.data = item.data
                                    eq.save()

                                    setEquipmentStatus(statuses[currentStatusIndex].name)
                                    setStatusModalVisibility(false)
                                }}/>
                        </View>
                    )}}>

                <Text style={{ marginLeft: 10, marginTop: 10}}>Click to change</Text>
                <TouchableOpacity onPress={() => {
                        currentStatusIndex + 1 > 2 ? setCurrentStatusIndex(0) : setCurrentStatusIndex(currentStatusIndex + 1)
                    }}>

                    <View style={{ margin:10, paddingVertical: 15, backgroundColor:'red'}}>
                        <Text style={{paddingHorizontal: 10, fontSize: 18, fontWeight: '400'}}>{ statuses[currentStatusIndex].name}</Text>
                    </View>
                </TouchableOpacity>
            </CCustomModal>

            <CCustomModal visible={selectNextServiceModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => {
                                    setSelectNextServiceModalVisibility(false)
                                }}/>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    item.data.next_service_date = selectedNextServiceDate
                                    var eq = new Equipment();
                                    eq.data = item.data
                                    eq.save()

                                    setNextServiceDate(selectedNextServiceDate)
                                    
                                    setSelectNextServiceModalVisibility(false)
                                }}/>
                        </View>
                    )}}> 
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Select Next Service Date</Text>
                    <DateSelectionCalendar
                        allowYearView={true}
                        showExtraDates={true}
                        onSelectDate={(date) => {
                            setSelectedNextServiceDate(date)
                        }}
                        selectedDate={selectedNextServiceDate} /> 

            </CCustomModal>

            <ScrollView stickyHeaderIndices={[0]} >
                <View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%', maxWidth: 700 }} text={ item.data.name }
                        onBackPress={() => navigation.goBack()}/>
                </View>

                <CCard style={{ backgroundColor: 'purple' }} titleShown={true} title='General Info'>
                    <Text style={ styles.infoText }>Name: <Text style={ styles.infoValueText }>{item.data.name}</Text>
                    </Text>

                    <Text style={ styles.infoText }>Department: <Text style={ styles.infoValueText }>{item.data.department}</Text>
                    </Text>

                    <Text style={ styles.infoText}>Make: <Text style={ styles.infoValueText }>{item.data.make}</Text>
                    </Text>

                    <Text style={ styles.infoText }>Model: <Text style={ styles.infoValueText }>{item.data.model}</Text>
                    </Text>

                    <Text style={ styles.infoText }>Serial number: <Text style={ styles.infoValueText }>{item.data.serial_number}</Text>
                    </Text>
                </CCard>

                <CCard style={{ backgroundColor: 'blue', marginTop: 20}} titleShown={false}>
                    
                    <Text style={ styles.infoText }>Equipment status: <Text style={ styles.infoValueText }>{equipmentStatus}</Text>
                    </Text>
                    
                    <Text style={ styles.infoText }>Last maintenance date: <Text style={ styles.infoValueText }>{item.data.last_maintenance_date ? item.data.last_maintenance_date : '(not set)'}</Text>
                    </Text>
                    
                    <Text style={ styles.infoText }>Next Service: <Text style={ styles.infoValueText }>{nextServiceDate}</Text>
                    </Text>

                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, backgroundColor: 'blue', marginTop: 20}} titleShown={false}>
                    <CButton style={ styles.buttonsAdditionalStyles} text='Maintenance Logs' onPress={() => {
                        navigation.navigate('MaintenanceLogs', { filtering: 'on', filterEquipment: item })
                    }}/>

                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='green' text='Corrective Maintenance'
                        onPress={() => {
                            navigation.navigate('MaintenanceLogEntry', {item: item, maintenanceType: 'Corrective Maintenance'})
                        }}/>
                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='green' text='Preventive Maitenance'
                        onPress={() => {
                            navigation.navigate('MaintenanceLogEntry', {item: item, maintenanceType: 'Preventive Maintenance'})
                        }}/>
                    
                    <CButton style={ styles.buttonsAdditionalStyles} text='Set Next Service date'onPress={() => {
                        setSelectNextServiceModalVisibility(true)
                    }}/>

                    <CButton style={ styles.buttonsAdditionalStyles} text='Change Status' onPress={() => {
                        setStatusModalVisibility(true)
                    }}/>
                </CCard>

                <CCard style={{ backgroundColor: 'purple',  marginTop: 20}} titleShown={true} title='Technical Specification'>
                    {
                        technicalSpecification.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>{element.tsKey}: <Text style={ styles.infoValueText }>{element.tsValue}</Text>
                                </Text>            
                            )
                        })
                    }
                </CCard>

                <CCard style={{ backgroundColor: 'purple',  marginTop: 20}} titleShown={true} title='Other Info'>
                    <Text style={ styles.infoText }>Supplied by: <Text style={ styles.infoValueText }>{item.data.supplied_by}</Text>
                    </Text>

                    <Text style={ styles.infoText }>Commision date: <Text style={ styles.infoValueText }>{item.data.commission_date}</Text>
                    </Text>
                </CCard>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
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

    infoText: {
        marginBottom: 5,
        fontSize: 18, fontWeight: '500'
    },

    infoValueText: {
        fontWeight: '300'
    },

    buttonsAdditionalStyles:{
        marginTop:10
    },
})