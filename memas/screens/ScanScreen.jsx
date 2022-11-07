import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CToolbar from '../components/CToolbar';

import { Ionicons } from '@expo/vector-icons';
import CTextInput from '../components/CTextInput';

export default function ScanScreen({ navigation }){
    return (
        <View style={styles.container}>
            <View style={ styles.searchBarContainer }>
                <CToolbar style={{ width: '100%', maxWidth: 700 }} text="Scan equipment"
                    onBackPress={() => navigation.goBack()}/>
            </View>

            <View style={{ flex:1, margin: 10,}}>
                <View style={{alignSelf:'center', flex:1,  backgroundColor: 'black', width: '100%', maxWidth: 700, borderRadius: 10,}}>

                </View>
            </View>

            <CTextInput style={{ alignSelf:'center', width: '100%', maxWidth: 700}} hint='Enter code manually' goButtonVisible={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        marginTop: 36,
        justifyContent: 'center',
    }, 

    searchBarContainer: {
        backgroundColor: 'gold',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },
})