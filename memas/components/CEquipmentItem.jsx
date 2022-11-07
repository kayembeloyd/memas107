import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CEquipmentItem ({ name, department, make, model, 
    tag, status, onPress }) {
    
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}> 
                <View style={{ marginLeft:5 }}>
                    <View style={{ flexDirection: 'row', paddingBottom: 5, }}>
                        <Text style={styles.equipmentHeaderText}>M001-PC1</Text>
                        <Text>Working</Text>
                    </View>

                    <Text style={{color:'#444444', fontSize: 18, fontWeight: '700',}}>
                        Oxygen Concentrator</Text>
                    <Text style={styles.equipmentDesc}>Maternity</Text>
                    <Text style={styles.equipmentDesc}>Canta</Text>
                    <Text style={styles.equipmentDesc}>VN-WS-08</Text>
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
        fontSize:16,
        fontWeight:'400',
        padding:0
    },

    equipmentDesc: {
        color:'#444444',
        fontSize: 16,
    }
})