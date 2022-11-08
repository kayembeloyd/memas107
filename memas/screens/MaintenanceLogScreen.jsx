import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import CToolbar from '../components/CToolbar';
import CCard from '../components/CCard';

export default function MaintenanceLogScreen({ route, navigation }){
    
    const {item} = route.params;

    const [maintenanceInfo, setMaintenanceInfo] = useState([
        {id: 1, miKey: 'maintenace info 1', miValue: 'maintenance value'},
        {id: 2, miKey: 'maintenace info 2', miValue: 'maintenance value'},
        {id: 3, miKey: 'maintenace info 3', miValue: 'maintenance value'},
        {id: 4, miKey: 'maintenace info 4', miValue: 'maintenance value'},
    ])

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]} >
                <View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%', maxWidth: 700 }} text={ 'Maintenance Log ' + item.id }
                        onBackPress={() => navigation.goBack()}/>
                </View>

                <View style={{ margin: 10, backgroundColor: 'gold' }}>
                    <Text style={{fontWeight: '500', fontSize: 22, marginBottom: 30}}>Date: 06/11/2022 </Text>
                    <Text style={{fontWeight: '500', fontSize: 20,}}>Oxygen Concentrator </Text>
                    <Text style={styles.attentionText}>Maintenance Type: props.maintenanceType </Text>
                    <Text style={styles.attentionText}>Serial: props.equipment.serial_number </Text>
                    <Text style={styles.noneAttentionText}>Make: props.equipment.make </Text>
                    <Text style={styles.noneAttentionText}>Model: props.equipment.model </Text>
                    <Text style={styles.noneAttentionText}>Dept: props.equipment.department </Text>
                    
                    <Text style={{fontWeight: '500', fontSize: 18, marginTop: 20, marginBottom: 10}}> Maintenance description</Text>
                    <Text style={{fontWeight: '300', fontSize: 18,}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</Text>
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