import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CEquipmentItem (props) {
    
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}> 
                <View style={{ marginLeft:5 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.equipmentHeaderText}>{props.asset_tag}</Text>
                        <Text>Working</Text>
                    </View>

                    <Text style={{fontSize: 20, fontWeight: '700', paddingBottom: 5,}}>
                        {props.name}</Text>
                    <Text style={styles.equipmentDesc}>Department: {props.department}</Text>
                    <Text style={styles.equipmentDesc}>Make: {props.make}</Text>
                    <Text style={styles.equipmentDesc}>Model: {props.model}</Text>
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

    equipmentHeaderText: {
        flex: 1,
        fontSize:15,
        fontWeight:'400',
        padding:0
    },

    equipmentDesc: {
        fontSize: 16,
    }
})