import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CMaintenanceScheduleTask(props) {
    return (
        <TouchableOpacity style={[{...props.style}]}>
            <View style={[styles.container]}>
                <Text>Oxygen Concentrator (M001-001)</Text>
                <Text style={{fontSize:12,}}>Preventive maintenance</Text>
                <Text style={{fontSize:12,}}>Labour ward</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#D9D9D9',
        flex:1,
        margin:5,
        padding:10,
        borderRadius:10,
    },
})