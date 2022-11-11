import React from "react";
import { StyleSheet, View, Modal, ScrollView } from "react-native";

export default function CCustomModal(props) {
    return (
        <Modal visible={props.visible} animationType='fade' transparent={true}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.7)', 
                flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,}}>

                <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 10, 
                    marginVertical: 60, maxWidth: 800,}}>
                    <ScrollView>
                        {props.children}
                    </ScrollView>

                    {props.actionButtonsComponent()}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({  })