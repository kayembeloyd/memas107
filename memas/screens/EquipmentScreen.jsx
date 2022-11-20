import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DateSelectionCalendar } from 'react-native-easy-calendar'

import CCard from '../components/CCard';
import CButton from '../components/CButton';
import CCustomModal from '../components/CCustomModal';

import TechnicalSpecification from '../database/models/TechnicalSpecification';
import Equipment from '../database/models/Equipment';
import DatesHelper from '../helper_classes/DatesHelper';
import Status from '../database/models/Status';
import MaintenanceScheduleItem from '../database/models/MaintenanceScheduleItem';


export default function EquipmentScreen({ route, navigation }){

    const {item} = route.params;

    const [technicalSpecification, setTechnicalSpecification] = useState([])

    const [nextServiceDate, setNextServiceDate] = useState('')
    const [selectedNextServiceDate, setSelectedNextServiceDate] = useState('2020-02-01');

    const [statuses, setStatuses] = useState([])

    const [currentStatusIndex, setCurrentStatusIndex] = useState(-1)
    const [equipmentStatus, setEquipmentStatus] = useState('Working')

    const [statusModalVisibility, setStatusModalVisibility] = useState(false)
    const [selectNextServiceModalVisibility, setSelectNextServiceModalVisibility] = useState(false)

    useEffect(() => {
        setCurrentStatusIndex(0)
    }, [ statuses ])

    useEffect(() => {
        Status.getStatuses({with_all: false}).then((sts) => setStatuses(sts))

        const technical_specification = new TechnicalSpecification()
        technical_specification.load(item.data.technical_specification_id).then(() => {
            setTechnicalSpecification(technical_specification.data.technical_specification)
        })

        setEquipmentStatus(item.data.status ? item.data.status : '(not set)')
        setNextServiceDate(item.data.next_service_date ? item.data.next_service_date : '(not set)')
    }, [])

    useEffect(() => {
        return navigation.addListener('focus', () => { 
            navigation.setOptions({
                headerTitle: item.data.name,
            })
        });
    }, [navigation])

    return (
        <View style={{flex: 1, backgroundColor: 'white', marginTop: 0,}}>
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
                                    if (currentStatusIndex >= 0 && statuses.length > 0) {
                                        if (item.data.status !== statuses[currentStatusIndex].name){
                                            item.data.updated_at = DatesHelper.getSQLCompatibleDate(new Date())
                                            item.data.update_status = 'pending'
                                        }                           
                                        
                                        item.data.status = statuses[currentStatusIndex].name
                                        
                                        var eq = new Equipment();
                                        eq.data = item.data
                                        eq.save()

                                        setEquipmentStatus(statuses[currentStatusIndex].name)
                                        setStatusModalVisibility(false)
                                    }
                                }}/>
                        </View>
                    )}}>

                <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 10, marginTop: 10}}>Click to change</Text>
                <TouchableOpacity onPress={() => {
                    if (currentStatusIndex >= 0 && statuses.length > 0)
                        currentStatusIndex + 1 >= statuses.length ? setCurrentStatusIndex(0) : setCurrentStatusIndex(currentStatusIndex + 1)
                    }}>

                    <View style={{ margin:10, paddingVertical: 15, backgroundColor:'#D9D9D9', borderRadius: 5}}>
                        <Text style={{paddingHorizontal: 10, fontSize: 18, fontWeight: '400'}}>
                            { (currentStatusIndex >= 0 && statuses.length > 0) ? statuses[currentStatusIndex].name : 'loading...' }
                        </Text>
                    </View>
                </TouchableOpacity>
            </CCustomModal>

            <CCustomModal visible={selectNextServiceModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => setSelectNextServiceModalVisibility(false) }/>

                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    // Save MaintenanceScheduleItem 

                                    if (item.data.next_service_date !== selectedNextServiceDate){
                                        item.data.updated_at = DatesHelper.getSQLCompatibleDate(new Date())
                                        item.data.update_status = 'pending'

                                        var lastNextServiceDate = item.data.next_service_date
                                        var tMsi = new MaintenanceScheduleItem();
                                        if (lastNextServiceDate){
                                            lastNextServiceDate = lastNextServiceDate.substring(0, 10)

                                            console.log('lastNextServiceDate', lastNextServiceDate)

                                            tMsi.load(lastNextServiceDate).then(() => {
                                                if (tMsi.data && tMsi.data.msts ){
                                                    var modifiedMsts = []

                                                    for (const mst of tMsi.data.msts) {
                                                        if (mst.equipment_id !== item.data.e_id) {
                                                            modifiedMsts.push(mst)
                                                        }
                                                    }

                                                    tMsi.data.msts = modifiedMsts
                                                    
                                                    if (tMsi.data.msts.length === 0) tMsi.delete().then(() => saveNewMsi())
                                                    else tMsi.save().then(() => saveNewMsi())
                                                    
                                                } else saveNewMsi()
                                            })

                                            const saveNewMsi = () => {
                                                var msi = new MaintenanceScheduleItem();
                                                msi.load(selectedNextServiceDate).then(() => {
                                                    if (msi.data && msi.data.msts) {
                                                        var canPush = true
                                                        for (const mst of msi.data.msts) {
                                                            if (mst.equipment_id === item.data.e_id){
                                                                canPush = false
                                                                break
                                                            } 
                                                        }

                                                        if (canPush){
                                                            msi.data.msts.push({
                                                                equipment_id: item.data.e_id,
                                                                equipment_e_oid: item.data.e_oid,
                                                            })
                                                        }
                                                    } else {
                                                        msi.data = {}
                                                        msi.data.msi_id = selectedNextServiceDate
                                                        msi.data.msts = [{
                                                            equipment_id: item.data.e_id,
                                                            equipment_e_oid: item.data.e_oid,
                                                        }]
                                                    }

                                                    msi.save()    
                                                }) 
                                            }
                                        }
                                    }                                        
                                    
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
                    
                    <DateSelectionCalendar allowYearView={true} showExtraDates={true} onSelectDate={(date) => setSelectedNextServiceDate(date) }
                        selectedDate={selectedNextServiceDate} /> 
            </CCustomModal>

            <ScrollView>
                <CCard style={{ marginTop: 10, }} titleShown={true} title='General Info'>
                    <Text style={ styles.infoText }>
                        Name: <Text style={ styles.infoValueText }>{item.data.name}</Text>
                    </Text>

                    <Text style={ styles.infoText }>
                        Department: <Text style={ styles.infoValueText }>{item.data.department}</Text>
                    </Text>

                    <Text style={ styles.infoText}>
                        Make: <Text style={ styles.infoValueText }>{item.data.make}</Text>
                    </Text>

                    <Text style={ styles.infoText }>
                        Model: <Text style={ styles.infoValueText }>{item.data.model}</Text>
                    </Text>

                    <Text style={ styles.infoText }>
                        Serial number: <Text style={ styles.infoValueText }>{item.data.serial_number}</Text>
                    </Text>
                </CCard>

                <CCard style={{ marginTop: 20}} titleShown={false}>
                    <Text style={ styles.infoText }>
                        Equipment status: <Text style={ styles.infoValueText }>{equipmentStatus}</Text>
                    </Text>
                    
                    <Text style={ styles.infoText }>
                        Last maintenance date: <Text style={ styles.infoValueText }>{item.data.last_maintenance_date ? item.data.last_maintenance_date : '(not set)'}</Text>
                    </Text>
                    
                    <Text style={ styles.infoText }>
                        Next Service: <Text style={ styles.infoValueText }>{nextServiceDate}</Text>
                    </Text>
                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} titleShown={false}>
                    <CButton style={ styles.buttonsAdditionalStyles} text='Maintenance Logs' onPress={() => {
                        navigation.navigate('MaintenanceLogs', { filtering: 'on', filterEquipment: item })}}/>

                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='#CCCCCC' text='Corrective Maintenance'
                        onPress={() => { navigation.navigate('MaintenanceLogEntry', {item: item, maintenanceType: 'Corrective Maintenance'})}}/>

                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='#CCCCCC' text='Preventive Maitenance'
                        onPress={() => { navigation.navigate('MaintenanceLogEntry', {item: item, maintenanceType: 'Preventive Maintenance'})}}/>
                    
                    <CButton style={ styles.buttonsAdditionalStyles} text='Set Next Service date'onPress={() => {
                        setSelectNextServiceModalVisibility(true)}}/>

                    <CButton style={ styles.buttonsAdditionalStyles} text='Change Status' onPress={() => setStatusModalVisibility(true)}/>
                </CCard>

                <CCard style={{ marginTop: 20}} titleShown={true} title='Technical Specification'>
                    {
                        technicalSpecification.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>
                                    {element.tsKey}: <Text style={ styles.infoValueText }>{element.tsValue}</Text>
                                </Text>            
                            )
                        })
                    }
                </CCard>

                <CCard style={{ marginTop: 20}} titleShown={true} title='Other Info'>
                    <Text style={ styles.infoText }>
                        Supplied by: <Text style={ styles.infoValueText }>{item.data.supplied_by}</Text>
                    </Text>

                    <Text style={ styles.infoText }>
                        Commision date: <Text style={ styles.infoValueText }>{item.data.commission_date}</Text>
                    </Text>
                </CCard>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    infoText: {
        marginBottom: 5,
        fontSize: 18, 
        fontWeight: '500'
    },

    infoValueText: { fontWeight: '300' },

    buttonsAdditionalStyles:{ marginTop:10 },
})