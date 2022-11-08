import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CButton(props) {
    return (
        <TouchableOpacity style={ props.style } onPress={ props.onPress }>
            <View style={ [styles.container, { backgroundColor: props.backgroundColor === undefined ? '#E3E3E3' : props.backgroundColor }] }>
                <Text style={ styles.text }>
                    { props.text }
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E3E3E3',
        paddingVertical: 13,
        paddingHorizontal: 15,
        marginHorizontal: 2,
        alignItems: 'center',
        borderRadius: 10,
    }, 

    text: {
        fontSize: 15
    }
})