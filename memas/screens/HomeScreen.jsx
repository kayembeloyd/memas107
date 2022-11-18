import React, { useEffect, useRef } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CCard from '../components/CCard';
import CButton from '../components/CButton';
import CScanButton from '../components/CScanButton';

import MiddleMan from '../database/MiddleMan';
import LocalDatabase from '../database/LocalDatabase';

export default function HomeScreen({ navigation }){
    const isSyncing = useRef(false)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (!isSyncing.current){
                isSyncing.current = true
                console.log('syncing...')
                MiddleMan.sync().then(() => {
                    isSyncing.current = false
                    console.log('sync complete')
                })
            }
        })
    }, [navigation])

    return (
        <View style={{flex: 1, backgroundColor: 'white',}}>
            <View style={{justifyContent: 'center', alignContent: 'center', paddingHorizontal: 20,}}>
                <View style={{marginTop: 35, width: '100%', flexDirection: 'row', alignItems: 'center',alignSelf:'center',}}>
                    <Text style={{fontSize: 20, fontWeight: '400', fontFamily: 'Roboto', flex: 1,}}>
                        MEMAS107
                    </Text>
                    <Ionicons name="settings-outline" size={28} color="black" />
                </View>
            </View>

            <ScrollView>            
                <View style={{marginTop: 30, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center',}}>
                    <Image source={require('../assets/profile.jpeg')} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoName}>Lloyd Kayembe</Text>
                        <Text style={styles.profileInfoPosition}>Biomedical Engineer</Text>
                    </View>
                </View>

                <View style={styles.cardsContainer}>
                    <CCard style={ styles.cardAdditionalStyle } titleShown={false}>
                        <CButton text="Equipments" onPress={() => navigation.navigate('Equipments')}/>

                        <CButton style={{ marginTop:10 }} text="Add Equipment" onPress={() => navigation.navigate('EquipmentEntry')}/>
                        
                        <CButton style={{ marginTop:10 }} text="Maintenance Logs" onPress={() =>navigation.navigate('MaintenanceLogs') }/>
                        
                        <CButton style={{ marginTop:10 }} text="Maintenance Schedule" onPress={() => {
                            LocalDatabase.clearEverything().then(() => {
                                console.log('database cleared')
                            })
                        }}/>
                    </CCard>
                </View>

                <View style={{ height: 90 }}></View>
            </ScrollView>

            <CScanButton onPress={() => navigation.navigate('Scan') }/>
        </View>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 66, 
        height: 66,
        borderRadius: 400/ 2
    },

    profileInfo: {
        marginStart: 10,
        marginLeft: 10,
    }, 

    profileInfoName:{
        fontWeight: '400',
        fontSize: 16
    },

    profileInfoPosition:{
        color: '#737373'
    },

    cardsContainer: {
        justifyContent: 'center', 
        flexDirection:'row', 
        flexWrap: 'wrap',
        alignContent: 'center',  
    },

    cardAdditionalStyle: {
        marginTop:30, 
        marginBottom: 10, 
        width: '100%', 
        maxWidth: 700
    },
    
})