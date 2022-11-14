import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Equipment from '../database/models/Equipment'
import MaintenanceLogInfo from '../database/models/MaintenanceLogInfo'

import CToolbar from '../components/CToolbar';
import CCard from '../components/CCard';

export default function MaintenanceLogScreen({ route, navigation }){
    
    const {item} = route.params;

    const [equipment, setEquipment] = useState({data:{}})

    const [maintenanceInfo, setMaintenanceInfo] = useState([])

    useEffect(() => {
        let mli = new MaintenanceLogInfo()
        mli.load(item.data.maintenance_log_info_id).then(() => {
            setMaintenanceInfo(mli.data.maintenance_log_info)
        })

        let eq = new Equipment()
        eq.load(item.data.equipment_id).then(() => {
            setEquipment(eq)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ margin: 10, backgroundColor: '#FAFAFA', paddingLeft: 10, borderRadius: 5, }}>
                    <Text style={{fontWeight: '500', fontSize: 22, marginBottom: 30}}>Date: { item.data.date }</Text>
                    <Text style={{fontWeight: '500', fontSize: 20,}}>{equipment.data.name}</Text>
                    <Text style={styles.attentionText}>Maintenance Type: {item.data.type}</Text>
                    <Text style={styles.attentionText}>SN: {equipment.data.serial_number}</Text>
                    <Text style={styles.noneAttentionText}>Make: {equipment.data.make}</Text>
                    <Text style={styles.noneAttentionText}>Model: {equipment.data.model}</Text>
                    <Text style={styles.noneAttentionText}>Dept: {equipment.data.department}</Text>
                    
                    <Text style={{fontWeight: '500', fontSize: 18, marginTop: 20, marginBottom: 10}}> Maintenance description</Text>
                    <Text style={{fontWeight: '300', fontSize: 18,}}>{ item.data.description }</Text>
                </View>
                
                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} titleShown={true} title='Other info' >    
                    {
                        maintenanceInfo.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>{element.mliKey}: <Text style={ styles.infoValueText }>{element.mliValue}</Text>
                                </Text>
                            )
                        })
                    }
                </CCard>
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