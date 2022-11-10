import React from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CSearchBar(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            <TouchableOpacity onPress={props.onBackPress}>
                <Ionicons style={{ paddingHorizontal: 10 }} 
                    name="arrow-back" size={28} color="black"/>
            </TouchableOpacity>
            
            <TextInput style={ styles.input } placeholder={props.searchbar_hint}>
                
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#F5F5F5',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 48,
        alignItems:'center',
        marginVertical: 5
    },

    input:{
        flex: 1,
        height: '100%',
        borderWidth: 0,
        paddingHorizontal: 20,
        outlineWidth:0,
        fontSize: 18, fontWeight: '400', fontFamily: 'Roboto', 
    },
})