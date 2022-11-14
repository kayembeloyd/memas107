import React from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CSearchBar(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            <TouchableOpacity style={{ borderRadius: 10, justifyContent:'center', 
                    paddingHorizontal: 15, height: '100%'}} onPress={props.onBackPress}>
                <Ionicons 
                    name={props.iconName ? props.iconName : 'arrow-back'} size={28} color="black"/>
            </TouchableOpacity>

            <View style={{flex: 1, flexDirection: 'row', width: '100%', 
                    paddingHorizontal: 10, alignItems:'center',}}>
                <TextInput style={ styles.input } 
                    placeholder={(props.hValue ? (props.hValue === '' ? props.searchbar_hint : props.hValue) : (props.searchbar_hint))} 
                    onChangeText={(t) => {
                        if (props.onChangeText)
                            props.onChangeText(t)
                    }} 
                    onSubmitEditing={props.onSubmitEditing ? props.onSubmitEditing : () => {}}/>
            </View>
            
            {
                Platform.OS === 'web' ? (
                    !props.isSearchIconVisible ? (
                        <TouchableOpacity style={{ paddingHorizontal: 15,
                            borderRadius: 10, justifyContent:'center', height: '100%'}} 
                            onPress={props.onSearchPress}>
                            <Ionicons name="search" size={24} color="black" />
                        </TouchableOpacity>
                    ) : <></>
                ) : <></>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#F5F5F5',
        borderRadius: 10,
        flexDirection: 'row',
        height: 48,
        alignItems:'stretch',
        justifyContent: 'space-evenly',
        marginVertical: 5,
        elevation: 2,
    },

    input:{
        flex: 1,
        height: '100%',
        borderWidth: 0,
        paddingHorizontal: 10,
        outlineWidth:0,
        fontSize: 18, fontWeight: '400', fontFamily: 'Roboto', 
    },
})