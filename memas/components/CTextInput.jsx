import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function CTextInput(props) {
    return (
        <View style={[{ flexDirection: 'row'}, {...props.style}]}>
            <View style= {{ margin: 10, flex: 1}}>
                <Text style={{ margin: 5, paddingLeft: 10, }}>{props.hint}</Text>

                <View style={{ flexDirection: 'row'}}>
                    {props.isFrozen ? (
                        <TouchableOpacity style={{ flex: 1 }} onPress={props.onFrozenPress}>
                            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15, backgroundColor:'#E8E8E8', 
                                height: 53, borderRadius: 10, justifyContent: 'center'}}>
                                    <Text style={{fontSize: 18, fontWeight: '400', fontFamily: 'Roboto',}}>{props.ivalue}</Text>
                            </View>
                        </TouchableOpacity>
                        ) : (
                        <TextInput style={{ borderWidth: 0, flex: 1, paddingHorizontal: 20, outlineWidth:0,
                            fontSize: 18, fontWeight: '400', fontFamily: 'Roboto', backgroundColor:'#E8E8E8', 
                            height: 53, borderRadius: 10,}} onChangeText={props.onChangeText}/>
                    )}
            
                    {props.goButtonVisible ? (
                        <TouchableOpacity style={{backgroundColor: 'green', paddingHorizontal: 20, marginHorizontal: 10, 
                            borderRadius: 10, justifyContent:'center', elevation: 10}} 
                            onPress={props.goButtonPress}>
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