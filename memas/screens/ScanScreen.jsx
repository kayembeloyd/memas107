import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CToolbar from '../components/CToolbar';
import CTextInput from '../components/CTextInput';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanScreen({ navigation }){

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    // Temp
    const item = {id : 0}

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // navigation.navigate('Equipment', { item })
      };

    return (
        <View style={styles.container}>
            {/*<View style={ styles.searchBarContainer }>
                <CToolbar style={{ width: '100%', maxWidth: 700 }} text="Scan equipment"
                    onBackPress={() => navigation.goBack()}/>
            </View> */}

            <View style={{ flex:1, margin: 10,}}>
                <View style={{alignSelf:'center', flex:1,  backgroundColor: 'grey', width: '100%', maxWidth: 700, borderRadius: 10,}}>
                    {
                        hasPermission ? 
                        (
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={[StyleSheet.absoluteFillObject, { margin: 5}]}/>
                        ) : (
                            <Text style={{ color: 'white'}}>No access to camera</Text>
                        )
                    }
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
