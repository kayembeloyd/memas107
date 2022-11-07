import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CToolbar(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            <TouchableOpacity onPress={props.onBackPress}>
                <Ionicons style={{ paddingHorizontal: 10 }} 
                    name="arrow-back" size={28} color="black"/>
            </TouchableOpacity>
            
            <View style={ styles.titleContainer }>
                <Text style={{ fontSize: 18, fontWeight: '400', fontFamily: 'Roboto', }}>
                    {props.text} 
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'green',
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 48,
        alignItems:'center'
    },

    titleContainer:{
        backgroundColor: 'red',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
})