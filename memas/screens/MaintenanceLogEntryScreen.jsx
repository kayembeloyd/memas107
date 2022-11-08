import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import CToolbar from '../components/CToolbar';
import CCard from '../components/CCard';
import CTextInput from '../components/CTextInput';
import CButton from '../components/CButton';
import CCustomModal from '../components/CCustomModal';

export default function MaintenanceLogEntryScreen({ route, navigation }){
    
    const {item, maintenanceType} = route.params;

    const [maintenanceInfo, setMaintenanceInfo] = useState([
        {id: 1, miKey: 'maintenace info 1', miValue: 'maintenance value'},
        {id: 2, miKey: 'maintenace info 2', miValue: 'maintenance value'},
        {id: 3, miKey: 'maintenace info 3', miValue: 'maintenance value'},
        {id: 4, miKey: 'maintenace info 4', miValue: 'maintenance value'},
    ])

    const [addMaintenanceInfoModalVisibility, setAddMaintenanceInfoModalVisibility] = useState(false)

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
                                    setAddMaintenanceInfoModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Add Maintenance Info</Text>
                    <CTextInput hint='Maintenance info name'/>
                    <CTextInput style={{ marginBottom: 10, }} hint='Maintenance info name'/>
            </CCustomModal>

            <ScrollView stickyHeaderIndices={[0]} >
                <View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%', maxWidth: 700 }} text={ 'Add Maintenance Log'}
                        onBackPress={() => navigation.goBack()}/>
                </View>

                <View style={{ margin: 10, backgroundColor: 'gold' }}>
                    <Text style={{fontWeight: '500', fontSize: 22, marginBottom: 30}}>Date: 06/11/2022 </Text>
                    <Text style={{fontWeight: '500', fontSize: 20,}}>Equipment {item.id}</Text>
                    <Text style={styles.attentionText}>Maintenance Type: {maintenanceType} </Text>
                    <Text style={styles.attentionText}>Serial: props.equipment.serial_number </Text>
                    <Text style={styles.noneAttentionText}>Make: props.equipment.make </Text>
                    <Text style={styles.noneAttentionText}>Model: props.equipment.model </Text>
                    <Text style={styles.noneAttentionText}>Dept: props.equipment.department </Text>
                    
                    <CTextInput style={{width: '100%', alignSelf:'flex-start', maxWidth: 700,}} hint='Maintenance description'/>
                </View>
                
                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, backgroundColor: 'blue', marginTop: 20}} titleShown={true} title='Other info' >    
                    {
                        maintenanceInfo.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>{element.miKey}: <Text style={ styles.infoValueText }>{element.miValue}</Text>
                                </Text>
                            )
                        })
                    }

                    <CButton style={{ marginTop: 10 }} text='Add info' onPress={() => {
                        setAddMaintenanceInfoModalVisibility(true)
                    }}/>
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