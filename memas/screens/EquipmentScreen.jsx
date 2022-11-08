import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CToolbar from '../components/CToolbar';
import CCard from '../components/CCard';
import CButton from '../components/CButton';


export default function EquipmentScreen({ route, navigation}){

    const {item} = route.params;

    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]} >
                <View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%', maxWidth: 700 }} text={ 'Equipment ' + item.id }
                        onBackPress={() => navigation.goBack()}/>
                </View>

                <CCard style={{ backgroundColor: 'purple' }} titleShown={true} title='General Info'>
                    <Text style={ styles.infoText }>Name: <Text style={ styles.infoValueText }>Oxygen concentrator</Text>
                    </Text>

                    <Text style={ styles.infoText }>Department: <Text style={ styles.infoValueText }>Labour Ward</Text>
                    </Text>

                    <Text style={ styles.infoText}>Make: <Text style={ styles.infoValueText }>Canta</Text>
                    </Text>

                    <Text style={ styles.infoText }>Model: <Text style={ styles.infoValueText }>VN-WS-08</Text>
                    </Text>

                    <Text style={ styles.infoText }>Serial number: <Text style={ styles.infoValueText }>AED2DD213</Text>
                    </Text>
                </CCard>

                <CCard style={{ backgroundColor: 'blue', marginTop: 20}} titleShown={false}>
                    
                    <Text style={ styles.infoText }>Equipment status: <Text style={ styles.infoValueText }>Working</Text>
                    </Text>
                    
                    <Text style={ styles.infoText }>Last maintenance date: <Text style={ styles.infoValueText }>08/11/2022</Text>
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={ styles.infoText }>Next Service: <Text style={ styles.infoValueText }>08/11/2022</Text>
                        </Text>

                        <CButton style={{ marginLeft: 10}} text='Edit' />
                    </View>
                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, backgroundColor: 'blue', marginTop: 20}} titleShown={false}>
                    <CButton style={ styles.buttonsAdditionalStyles} text='Maintenance Logs'/>
                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='green' text='Corrective Maintenance'/>
                    <CButton style={ styles.buttonsAdditionalStyles} backgroundColor='green' text='Preventive Maitenance'/>
                    <CButton style={ styles.buttonsAdditionalStyles} text='Set Next Service date'/>
                    <CButton style={ styles.buttonsAdditionalStyles} text='Change Status'/>
                </CCard>

                <CCard style={{ backgroundColor: 'purple',  marginTop: 20}} titleShown={true} title='Technical Specification'>
                    <Text style={ styles.infoText }>Rated Voltage: <Text style={ styles.infoValueText }>220VAC</Text>
                    </Text>

                    <Text style={ styles.infoText }>Capacity: <Text style={ styles.infoValueText }>10lpm</Text>
                    </Text>
                </CCard>

                <CCard style={{ backgroundColor: 'purple',  marginTop: 20}} titleShown={true} title='Other Info'>
                    <Text style={ styles.infoText }>Supplied by: <Text style={ styles.infoValueText }>Ministry of Health</Text>
                    </Text>

                    <Text style={ styles.infoText }>Commision date: <Text style={ styles.infoValueText }>06/11/2022</Text>
                    </Text>
                </CCard>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        marginTop: 36,
    }, 

    searchBarContainer: {
        backgroundColor: 'gold',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        marginTop: 5,
    },

    infoText: {
        marginBottom: 5,
        fontSize: 18, fontWeight: '500'
    },

    infoValueText: {
        fontWeight: '300'
    },

    buttonsAdditionalStyles:{
        marginTop:10
    },
})