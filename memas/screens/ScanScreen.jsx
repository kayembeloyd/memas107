import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Alert, View, Platform } from 'react-native';

import CTextInput from '../components/CTextInput';

import { BarCodeScanner } from 'expo-barcode-scanner';
import Equipment from '../database/models/Equipment';

export default function ScanScreen({ navigation }){

    const [hasPermission, setHasPermission] = useState(true);
    const [scanned, setScanned] = useState(false);

    const [manualCode, setManualCode] = useState('')
    /*
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []); */
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        if (data.startsWith("MEMASCODE:")){
            const codes = data.split(':');
            const equipment_asset_tag = codes[1]
            const item = new Equipment()

            item.loadWithCode(equipment_asset_tag).then(() => {
                if (item.data){
                    navigation.navigate('Equipment', {item})
                } else {
                    alert('Equipment Not found')
                }
            }) 
        } else {
            alert('Invalid code!!!')
            navigation.goBack() 
        }
      };

    return (
        <View style={styles.container}>
            <View style={{ flex:1, margin: 10,}}>
                <View style={{alignSelf:'center', flex:1,  backgroundColor: 'grey', width: '100%', maxWidth: 700, borderRadius: 10,}}>
                    {/*
                        hasPermission ? 
                        (
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={[StyleSheet.absoluteFillObject, { margin: 5}]}/>
                        ) : (
                            <Text style={{ color: 'white'}}>No access to camera</Text>
                        )
                    */}
                </View>
            </View>

            <CTextInput style={{ alignSelf:'center', width: '100%', maxWidth: 700}} hint='Enter code manually' goButtonVisible={true} 
            onChangeText={(t) => {
                setManualCode(t)
            }}
            goButtonPress={() => {
                const item = new Equipment()

                item.loadWithCode(manualCode).then(() => {
                    if (item.data){
                        navigation.navigate('Equipment', {item})
                    } else {
                        switch (Platform.OS) {
                            case 'android':
                            case 'ios':
                            case 'macos':
                            case 'windows':
                                Alert.alert(
                                    'Info', 'Equipment not found',
                                    [
                                        {
                                            text: 'Okay',
                                            onPress: () => {
                                                setScanned(false)
                                            }
                                        }
                                    ]
                                )                            
                                break;
                            case 'web':
                                alert('Equipment Not Found')
                            default:
                                break;
                        }
                    }
                })  
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 0,
        justifyContent: 'center',
    }, 

    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },
})
