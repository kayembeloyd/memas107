import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default function CScanButton(props) {
    return (
        <View style={ [styles.scanButtonContainer, {...props.style}] }>
            <TouchableOpacity onPress={ props.onPress }>
                <Image source={require('../assets/sample-qr-code.png')}
                    style={[styles.profileImage, {borderColor:'black',borderWidth: 5, width: 60, height: 60}]} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 66, 
        height: 66,
        borderRadius: 400/ 2
    },

    scanButtonContainer:{
        position: 'absolute',
        end: 0,
        right: 0,
        bottom: 0,
        alignItems:'flex-end',
        backgroundColor: 'indigo',
        marginRight: 30,
        marginEnd: 30,
        marginBottom: 30,
    },
})