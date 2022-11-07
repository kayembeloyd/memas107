import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CCard from '../components/CCard';
import CButton from '../components/CButton';

export default function HomeScreen({ navigation }){
    return (
        <View style={styles.container}>
            <View style={styles.containerHomeHeader}>
                <View style={styles.homeHeader}>
                    <Text style={styles.homeHeaderText}>MEMAS107</Text>
                    <Ionicons name="settings-outline" size={32} color="black" />
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
                            console.log('Equipments button pressed')
                            console.log('Opening the Equipments screen')
                            
                            navigation.navigate('Equipments')
                        }}/>
 
                        <CButton style={{ marginTop:10 }} text="Add Equipment" 
                            onPress={() => { console.log('Add Equipment button pressed') }}/>
 
                        <CButton style={{ marginTop:10 }} text="Maintenance Logs" 
                            onPress={() => { console.log('Maintenance Logs button pressed') }}/>
 
                        <CButton style={{ marginTop:10 }} text="Maintenance Schedule" 
                            onPress={() => { console.log('Maintenance Schedule pressed') }}/>
                    </CCard>

                    {/* You can always add more cards here
                    TIP: dont forget to add width:'100%', maxWidth: 700 attributes */}
                </View>

                {/* This is a dummy View to create space for the scan button */}
                <View style={{ height: 90, backgroundColor:'red' }}></View>
            </ScrollView>

            <View style={ styles.scanButtonContainer }>
                <Image source={require('../assets/sample-qr-code.png')}
                    style={[styles.profileImage, {borderColor:'black',borderWidth: 5, width: 60, height: 60}]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },

    containerHomeHeader: {
        backgroundColor:'yellow',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 20,
    },

    homeHeader: {
        marginTop: 58,
        width: '100%',
        maxWidth: 500,
        flexDirection: 'row',
        backgroundColor: 'brown',
        alignItems: 'center',
        maxWidth: 600,
        alignSelf:'center',
    },

    homeHeaderText: {
        backgroundColor: 'green',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Roboto',
        flex: 1,
    },

    containerProfile: {
        backgroundColor: 'violet',
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
        color:'grey'
    },

    cardsContainer: {
        backgroundColor: 'gold',
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

    scanButtonContainer:{
        position: 'absolute',
        end: 0,
        right: 0,
        bottom: 0,
        alignItems:'flex-end',
        backgroundColor: 'indigo',
        marginRight: 30,
        marginEnd: 30,
        marginBottom: 30,
    },
    
})