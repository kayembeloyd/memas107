import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function CScanButton(props) {
    return (
        <View style={ [styles.scanButtonContainer, {...props.style}] }>
            <TouchableOpacity onPress={ props.onPress }>
                <View style={{borderRadius: 30, elevation: 3, backgroundColor: '#D9D9D9', shadowColor: '#000',}}>
                    <Image source={require('../assets/scan-button-image.png')}
                        style={[styles.profileImage, {
                            borderWidth: 1,
                            borderColor: '#C0C0C0',
                            backgroundColor: '#D9D9D9',
                            width: 60, 
                            height: 60,}]} />
                </View>
                
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
        marginRight: 30,
        marginEnd: 30,
        marginBottom: 30,
    },
})