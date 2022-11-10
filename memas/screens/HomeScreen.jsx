import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CCard from '../components/CCard';
import CButton from '../components/CButton';
import CScanButton from '../components/CScanButton';

import Equipment from '../database/models/Equipment';

export default function HomeScreen({ navigation }){
    return (
        <View style={styles.container}>
            <View style={styles.containerHomeHeader}>
                <View style={styles.homeHeader}>
                    <Text style={styles.homeHeaderText}>MEMAS107</Text>
                    <Ionicons name="settings-outline" size={28} color="black" />
                </View>
            </View>

            <ScrollView>            
                <View style={styles.containerProfile}>
                    <Image source={require('../assets/profile.jpeg')} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoName}>Lloyd Kayembe</Text>
                        <Text style={styles.profileInfoPosition}>Biomedical Engineer</Text>
                    </View>
                </View>

                <View style={styles.cardsContainer}>
                    <CCard style={ styles.cardAdditionalStyle } titleShown={false}>
                        <CButton text="Equipments" onPress={() => { 
                            navigation.navigate('Equipments')
                        }}/>
 
                        <CButton style={{ marginTop:10 }} text="Add Equipment" 
                            onPress={() => { 
                                navigation.navigate('EquipmentEntry')
                            }}/>
 
                        <CButton style={{ marginTop:10 }} text="Maintenance Logs" 
                            onPress={() => { 
                                navigation.navigate('MaintenanceLogs') 
                            }}/>
 
                        <CButton style={{ marginTop:10 }} text="Maintenance Schedule" 
                            onPress={() => { 
                                Equipment.getEquipments(0, 6).then((results) => {
                                    console.log(results)
                                })                              
                            }}/>
                    </CCard>
                </View>

                <View style={{ height: 90 }}></View>
            </ScrollView>

            <CScanButton onPress={() => {
                navigation.navigate('Scan')
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    containerHomeHeader: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 20,
    },

    homeHeader: {
        marginTop: 35,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'center',
    },

    homeHeaderText: {
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Roboto',
        flex: 1,
    },

    containerProfile: {
        marginTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },  

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