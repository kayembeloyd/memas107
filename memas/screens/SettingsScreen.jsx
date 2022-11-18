import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Alert, View, Platform } from 'react-native';

import CButton from '../components/CButton';

import LocalDatabase from '../database/LocalDatabase';

export default function SettingsScreen({ navigation }) {
    const [settingStatus, setSettingStatus] = useState('')

    return (
        <View style={{ flex: 1, alignItems:'center'}}>
            <Text style={{ marginVertical:10, }} >{settingStatus}</Text>
            <CButton style={{ width: '80%', maxWidth: 700, marginVertical:20, marginHorizontal: 10, }} text='RESET DATA' 
                onPress={() => {
                    LocalDatabase.clearEverything().then(() => {
                        setSettingStatus('database cleared')
                    })
                }}/>
        </View>
    )
}