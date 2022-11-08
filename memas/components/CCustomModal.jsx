import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

import CButton from './CButton';

export default function CCustomModal(props) {
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.4)', 
                flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,}}>

                <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, 
                    marginVertical: 60, maxWidth: 800 }}>
                    
                    {props.children}

                    {props.actionButtonsComponent()}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({  })