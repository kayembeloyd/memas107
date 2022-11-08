import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CMaintenanceLogItem (props) {
    
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}> 
                <View style={{ marginLeft:5 }}>
                    <Text style={{color:'#444444', fontSize: 20, fontWeight: '700',}}>
                        props.equipment.name</Text>
                    <Text style={styles.attentionText}>Maintenance Type: props.maintenanceType </Text>
                    <Text style={styles.attentionText}>Date: props.date </Text>
                    <Text style={styles.attentionText}>Serial: props.equipment.serial_number </Text>
                    
                    <Text style={styles.noneAttentionText}>Make: props.equipment.make </Text>
                    <Text>Model: props.equipment.model </Text>
                    <Text>Dept: props.equipment.department </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'green',
        marginVertical: 1,
        padding:11,
        justifyContent: 'center',
    },

    attentionText: {
        color:'#444444',
        fontWeight: '500',
        fontSize: 18,
    }, 

    noneAttentionText: {
        fontSize: 16
    },
})