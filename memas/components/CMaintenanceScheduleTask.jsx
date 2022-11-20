import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CMaintenanceScheduleTask(props) {

    useEffect(() => {
        
    }, [])

    return (
        <TouchableOpacity style={[{...props.style}]} onPress={() => props.onTaskItemPress(props.item.equipment_id)}>
            <View style={[styles.container]}>
                <Text>{props.item.equipment_name} ({props.item.equipment_asset_tag})</Text>
                <Text style={{fontSize:12,}}>Preventive maintenance</Text>
                <Text style={{fontSize:12,}}>{props.item.equipment_department}</Text>
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