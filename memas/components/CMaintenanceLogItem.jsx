import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Equipment from '../database/models/Equipment'

export default function CMaintenanceLogItem (props) {
    
    const [equipment, setEquipment] = useState({data:{}})

    useEffect(() => {
        let eq = new Equipment()
        eq.load(props.equipment_id).then(() => {
            setEquipment(eq)
        })
    }, [props])

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}> 
                <View style={{ marginLeft:5 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700',}}>
                        {equipment.data.name} </Text>
                    <Text style={styles.attentionText}>Maintenance Type: {props.type} </Text>
                    <Text style={styles.attentionText}>Date: {props.date} </Text>
                    <Text style={styles.attentionText}>Serial: {equipment.data.serial_number} </Text>
                    
                    <Text style={styles.noneAttentionText}>Make: {equipment.data.make} </Text>
                    <Text style={styles.noneAttentionText}>Model: {equipment.data.model} </Text>
                    <Text style={styles.noneAttentionText}>Dept: {equipment.data.department} </Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#CBCBCB', width: '100%'}}></View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 1,
        padding:11,
        justifyContent: 'center',
    },

    attentionText: {
        fontWeight: '500',
        fontSize: 18,
    }, 

    noneAttentionText: {
        fontSize: 16
    },
})