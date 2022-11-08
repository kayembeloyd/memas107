import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { DateSelectionCalendar, DefaultTheme } from 'react-native-easy-calendar'

import CButton from '../components/CButton';
import CCard from '../components/CCard';
import CCustomModal from '../components/CCustomModal';
import CListModal from '../components/CListModal';
import CTextInput from '../components/CTextInput';
import CToolbar from '../components/CToolbar';

export default function EquipmentEntryScreen({ navigation }){

    const [technicalSpecifications, setTechnicalSpecifications] = useState([
        {id: 1, tsKey: 'spec 1', tsValue: 'spec value'},
        {id: 2, tsKey: 'spec 2', tsValue: 'spec value'},
        {id: 3, tsKey: 'spec 3', tsValue: 'spec value'},
        {id: 4, tsKey: 'spec 4', tsValue: 'spec value'}
    ])

    const [departments, setDepartments] = useState([
        {id: 1, name:'Department 1'}, 
        {id: 2, name:'Department 2'}, 
        {id: 3, name:'Department 3'}, 
        {id: 4, name:'Department 4'}, 
        {id: 5, name:'Department 5'}, 
        {id: 6, name:'Department 6'}, 
        {id: 7, name:'Department 7'}, 
        {id: 8, name:'Department 8'}, 
        {id: 9, name:'Department 9'},
        {id: 10, name:'Department 10'}, 
        {id: 11, name:'Department 11'}, 
        {id: 12, name:'Department 12'}, 
        {id: 13, name:'Department 13'}, 
        {id: 14, name:'Department 14'}, 
        {id: 15, name:'Department 15'}, 
        {id: 16, name:'Department 16'}, 
        {id: 17, name:'Department 17'}, 
    ])
    const [selectedDepartment, setSelectedDepartment] = useState('none')
    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)

    const [selectCommissionDateModalVisibility, setSelectCommissionDateModalVisibility] = useState(false)
    const [selectedCommissionDate, setSelectedCommissionDate] = React.useState('2020-02-01');

    const [addTechnicalSpecificationModalVisibility, setAddTechnicalSpecificationModalVisibility] = useState(false)

    return (
        <View style={styles.container}>

            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=>{
                    setSelectDepartmentModalVisibility(false)
                }}
                onItemPress={(selectedItem)=>{
                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <CCustomModal visible={selectCommissionDateModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => {
                                    setSelectCommissionDateModalVisibility(false)
                                }}/>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    setSelectCommissionDateModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Select Date of Commission</Text>
                    <DateSelectionCalendar
                        allowYearView={true}
                        showExtraDates={true}
                        onSelectDate={setSelectedCommissionDate}
                        selectedDate={selectedCommissionDate} /> 
            </CCustomModal>

            <CCustomModal visible={addTechnicalSpecificationModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => {
                                    setAddTechnicalSpecificationModalVisibility(false)
                                }}/>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    setAddTechnicalSpecificationModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Add Technical Specification</Text>
                    <CTextInput hint='Specification name'/>
                    <CTextInput style={{ marginBottom: 10, }} hint='Specification value'/>
            </CCustomModal>


            <ScrollView stickyHeaderIndices={[0]} >
                <View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%', maxWidth: 700 }} text='Add Equipment'
                        onBackPress={() => navigation.goBack()}/>
                </View>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, backgroundColor: 'blue', marginTop: 20}} titleShown={true} title='General Info.'>
                    <CTextInput hint='Name'/>
                    <CTextInput hint='Asset tag'/>
                    <CTextInput isFrozen={true} ivalue={selectedDepartment} hint='Select Department' onFrozenPress={() => {
                        setSelectDepartmentModalVisibility(true)
                    }}/>
                    <CTextInput hint='Make'/>
                    <CTextInput hint='Model'/>
                    <CTextInput hint='Serial Number'/>
                    <CTextInput isFrozen={true} ivalue={selectedCommissionDate} hint='Commission date' onFrozenPress={() => {
                        setSelectCommissionDateModalVisibility(true)
                    }}/>
                    <CTextInput hint='Supplied by'/>
                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, backgroundColor: 'blue', marginTop: 20}} titleShown={true} title='Technical specifications'>
                    {
                        technicalSpecifications.map((element) => {
                            return (
                                <Text key={element.id} style={ styles.infoText }>Rated Voltage: <Text style={ styles.infoValueText }>220VAC</Text>
                                </Text>
                            )
                        })
                    }
                    
                    <CButton text='Add technical specification' onPress={() => {
                        setAddTechnicalSpecificationModalVisibility(true)
                    }}/>
                </CCard>

                <CButton style={{width: '80%', alignSelf:'center', maxWidth: 400, marginVertical: 20}} text='Done'/>

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
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 18, fontWeight: '500'
    },

    infoValueText: {
        fontWeight: '300'
    },
})