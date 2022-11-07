import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from "react-native";

import CButton from '../components/CButton';

export default function CListModal(props) {
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.4)', 
                flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,}}>

                <View style={{ flex: 1, width: '100%', backgroundColor: 'white', borderRadius: 10, marginVertical: 60 }}>
                    <FlatList 
                        data={props.list}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => {
                            return (
                                <Text style={{ paddingHorizontal: 10, backgroundColor:'green', height: 46, 
                                    marginBottom: 10, borderTopLeftRadius:10, borderTopRightRadius: 10, 
                                    fontSize: 18, textAlignVertical:'center' }}> 
                                        {props.title}
                                </Text>
                            )
                        }}
                        stickyHeaderIndices={[0]}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 10, marginVertical: 10}} 
                                onPress={() => {
                                    props.onItemPress( item.name )
                                }}>
                                <Text>{ item.name }</Text>
                            </TouchableOpacity>
                        )}/>
            

                        <View style={{ width: '100%', alignItems: 'flex-end'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' onPress={props.onCancelPress}/>
                        </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container:{
    },
})