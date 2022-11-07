import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CTextInput(props) {
    return (
        <View style={[{backgroundColor:'indigo', flexDirection: 'row'}, {...props.style}]}>
            <View style= {{ margin: 10, flex: 1}}>
                <Text style={{ margin: 5, paddingLeft: 10, }}>{props.hint}</Text>

                <View style={{ flexDirection: 'row'}}>
                    <TextInput style={{ borderWidth: 0, flex: 1, paddingHorizontal: 20, outlineWidth:0,
                        fontSize: 18, fontWeight: '400', fontFamily: 'Roboto', backgroundColor:'cyan', 
                        height: 53, borderRadius: 10,}}/>
                        
                    {props.goButtonVisible ? (
                        <TouchableOpacity style={{backgroundColor: 'green', paddingHorizontal: 20, marginHorizontal: 10, 
                            borderRadius: 10, justifyContent:'center', elevation: 10}}>
                            <Ionicons name="arrow-forward" size={24} color="black" />
                        </TouchableOpacity>
                    ): <></>}
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
})