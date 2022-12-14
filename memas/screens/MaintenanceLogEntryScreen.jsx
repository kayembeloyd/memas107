import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import MiddleMan from '../database/MiddleMan';
import MaintenanceLog from '../database/models/MaintenanceLog'
import MaintenanceLogInfo from '../database/models/MaintenanceLogInfo'
import Equipment from '../database/models/Equipment';

import CCard from '../components/CCard';
import CTextInput from '../components/CTextInput';
import CButton from '../components/CButton';
import CCustomModal from '../components/CCustomModal';

import DatesHelper from '../helper_classes/DatesHelper';

export default function MaintenanceLogEntryScreen({ route, navigation }){

    const [maintenanceData, setMaintenanceData] = useState({}) 

    const [mliKeyInEdit, setMliKeyInEdit] = useState('')
    const [mliValueInEdit, setMliValueInEdit] = useState('')

    const {item, maintenanceType} = route.params;

    const [maintenanceInfo, setMaintenanceInfo] = useState([])

    const [addMaintenanceInfoModalVisibility, setAddMaintenanceInfoModalVisibility] = useState(false)

    useEffect(() => {
        setMaintenanceData((prevMaintenanceData) => {
            prevMaintenanceData.type = maintenanceType
            prevMaintenanceData.equipment_id = item.data.e_id
            prevMaintenanceData.date = '06/11/2022'
            return prevMaintenanceData
        })
    }, [])

    const triggerSync = () => {
        console.log('syncing...')
        MiddleMan.sync().then(() => {
            console.log('sync complete')
        })
    }

    return (
        <View style={styles.container}>
            <CCustomModal visible={addMaintenanceInfoModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel'
                                onPress={() => {
                                    setAddMaintenanceInfoModalVisibility(false)
                                }}/>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save'
                                onPress={() => {
                                    setMaintenanceInfo((prevMaintenanceInfo) => {
                                        let last = 0
                                        if (prevMaintenanceInfo.length >= 1)
                                            last = prevMaintenanceInfo[prevMaintenanceInfo.length - 1].id
                                        
                                        prevMaintenanceInfo.push({id: (last + 1), mliKey: mliKeyInEdit, mliValue: mliValueInEdit})
                                        return prevMaintenanceInfo
                                    })

                                    setAddMaintenanceInfoModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Add Maintenance Info</Text>
                    <CTextInput hint='Maintenance info name' onChangeText={(t) => {
                        setMliKeyInEdit(t)
                    }}/>
                    <CTextInput style={{ marginBottom: 10, }} hint='Maintenance info value' onChangeText={(t) => {
                        setMliValueInEdit(t)
                    }}/>
            </CCustomModal>

            <ScrollView>
                <View style={{ margin: 10, backgroundColor: '#FAFAFA', paddingLeft: 10, borderRadius: 5, }}>
                    <Text style={{fontWeight: '500', fontSize: 22, marginBottom: 30}}>Date: 06/11/2022</Text>
                    <Text style={{fontWeight: '500', fontSize: 22,}}>{ item.data.name }</Text>
                    <Text style={styles.attentionText}>{maintenanceType} </Text>
                    <Text style={styles.noneAttentionText}>SN: {item.data.serial_number}</Text>
                    <Text style={styles.noneAttentionText}>Make: {item.data.make}</Text>
                    <Text style={styles.noneAttentionText}>Model: {item.data.model}</Text>
                    <Text style={styles.noneAttentionText}>Dept: {item.data.department}</Text>

                    <CTextInput style={{width: '100%', alignSelf:'center', maxWidth: 700,}} 
                        hint='Maintenance description' onChangeText={(t) => {
                            setMaintenanceData((prevMaintenanceData) => {
                                prevMaintenanceData.description = t
                                return prevMaintenanceData
                            })
                        }}/>
                </View>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} 
                    titleShown={true} title='Info (eg. O2 concentration)' >
                    {
                        maintenanceInfo.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>
                                    {element.mliKey}: <Text style={ styles.infoValueText }>{element.mliValue}</Text>
                                </Text>
                            )
                        })
                    }

                    <CButton style={{ marginTop: 10 }} text='Add info' onPress={() => {
                        setAddMaintenanceInfoModalVisibility(true)
                    }}/>
                </CCard>

                <View style={{alignItems: 'center',  marginHorizontal: 20}}>
                    <CButton style= {{ marginVertical: 20, width: '100%', maxWidth: 500 }} text="Done"
                        onPress={() => {
                            const mli = new MaintenanceLogInfo()
                            
                            mli.data.maintenance_log_info = maintenanceInfo
                            mli.save().then((new_mli_id) => {
                                maintenanceData.ml_oid = 0
                                maintenanceData.maintenance_log_info_id = new_mli_id
                                maintenanceData.created_at = DatesHelper.getSQLCompatibleDate(new Date())
                                maintenanceData.date = DatesHelper.getSQLCompatibleDate(new Date()) 
                                maintenanceData.update_status = 'pending'
                                maintenanceData.updated_at = DatesHelper.getSQLCompatibleDate(new Date())
                            
                                const ml = new MaintenanceLog()
                                ml.data = maintenanceData
                                ml.save().then((new_ml_id) => {                 
                                    const eq = new Equipment()
                                    eq.load(ml.data.equipment_id).then(() => {
                                        if (eq.data) {
                                            eq.data.updated_at = DatesHelper.getSQLCompatibleDate(new Date())
                                            eq.data.update_status = 'pending'
                                            eq.data.last_maintenance_date = DatesHelper.getSQLCompatibleDate(new Date())
                                            eq.save().then((new_e_id) => {
                                                triggerSync()
                                                alert('Maintenance Log saved')
                                                setMaintenanceData({})
                                                navigation.goBack()
                                            })
                                        }
                                    })
                                })
                            })
                        }} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    attentionText: {
        fontWeight: '500',
        fontSize: 18,
    },

    noneAttentionText: {
        fontSize: 16
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