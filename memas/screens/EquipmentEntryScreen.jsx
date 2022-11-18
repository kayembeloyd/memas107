import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { DateSelectionCalendar } from 'react-native-easy-calendar'

import MiddleMan from '../database/MiddleMan';
import Department from '../database/models/Department';
import Equipment from '../database/models/Equipment';
import TechnicalSpecification from '../database/models/TechnicalSpecification';

import CButton from '../components/CButton';
import CCard from '../components/CCard';
import CCustomModal from '../components/CCustomModal';
import CListModal from '../components/CListModal';
import CTextInput from '../components/CTextInput';

import DatesHelper from '../helper_classes/DatesHelper';

export default function EquipmentEntryScreen({ navigation }){
    const [equipmentData, setEquipmentData] = useState({}) 

    const [tsKeyInEdit, setTsKeyInEdit] = useState('')
    const [tsValueInEdit, setTsValueInEdit] = useState('')

    const [technicalSpecifications, setTechnicalSpecifications] = useState([])

    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState('none')
    const [selectDepartmentModalVisibility, setSelectDepartmentModalVisibility] = useState(false)

    const [selectCommissionDateModalVisibility, setSelectCommissionDateModalVisibility] = useState(false)
    const [selectedCommissionDate, setSelectedCommissionDate] = useState('not set');

    const [addTechnicalSpecificationModalVisibility, setAddTechnicalSpecificationModalVisibility] = useState(false)
    
    useEffect(() => {
        Department.getDepartments({ with_all: false }).then((dpt) => setDepartments(dpt))
    }, [])

    const triggerSync = () => {
        console.log('syncing...')
        MiddleMan.sync().then(() => {
            console.log('sync complete')
        })
    }

    return (
        <View style={{flex: 1, marginTop: 0, backgroundColor: 'white',}}>
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=> setSelectDepartmentModalVisibility(false) }
                onItemPress={(selectedItem)=>{
                    setEquipmentData((prevEquipmentData) => {
                        prevEquipmentData.department = selectedItem
                        return prevEquipmentData
                    })

                    setSelectedDepartment(selectedItem)
                    setSelectDepartmentModalVisibility(false)
                }}/>

            <CCustomModal visible={selectCommissionDateModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() =>  setSelectCommissionDateModalVisibility(false)}/>

                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    setEquipmentData((prevEquipmentData) => {
                                        prevEquipmentData.commission_date = selectedCommissionDate
                                        return prevEquipmentData
                                    })

                                    setSelectCommissionDateModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>
                        Select Date of Commission</Text>
                    
                    <DateSelectionCalendar allowYearView={true} showExtraDates={true} 
                        onSelectDate={setSelectedCommissionDate}
                        selectedDate={selectedCommissionDate} /> 
            </CCustomModal>

            <CCustomModal visible={addTechnicalSpecificationModalVisibility}
                actionButtonsComponent={() => {
                    return (
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection:'row'}}>
                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Cancel' 
                                onPress={() => setAddTechnicalSpecificationModalVisibility(false) }/>

                            <CButton style={{ marginRight: 10, marginBottom: 10}} text='Save' 
                                onPress={() => {
                                    setTechnicalSpecifications((prevTechnicalSpecifications) => {
                                        let last = 0
                                        if (prevTechnicalSpecifications.length >= 1)                   
                                            last = prevTechnicalSpecifications[prevTechnicalSpecifications.length - 1].id
                                        
                                        prevTechnicalSpecifications.push({id:(last + 1), tsKey: tsKeyInEdit, tsValue: tsValueInEdit })
                                        return prevTechnicalSpecifications
                                    })

                                    setAddTechnicalSpecificationModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>
                        Add Technical Specification</Text>
                    
                    <CTextInput hint='Specification name' onChangeText={(t) =>  setTsKeyInEdit(t) }/>
                    <CTextInput style={{ marginBottom: 10, }} hint='Specification value' 
                        onChangeText={(t) => setTsValueInEdit(t) }/>
            </CCustomModal>


            <ScrollView>
                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} 
                    titleShown={true} title='General Info.'>
                    
                    <CTextInput hint='Name'
                        onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.name = t
                                return prevEquipmentData
                            })
                        }}/>

                    <CTextInput hint='Asset tag' 
                        onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.asset_tag = t
                                return prevEquipmentData
                            })
                        }}/>
                    
                    <CTextInput isFrozen={true} ivalue={selectedDepartment} hint='Select Department' 
                        onFrozenPress={() =>  setSelectDepartmentModalVisibility(true) }/>

                    <CTextInput hint='Make' onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.make = t
                                return prevEquipmentData
                            })
                        }}/>
                    
                    <CTextInput hint='Model' 
                        onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.model = t
                                return prevEquipmentData
                            })
                        }}/>

                    <CTextInput hint='Serial Number' 
                        onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.serial_number = t
                                return prevEquipmentData
                            })
                        }}/>
                    
                    <CTextInput isFrozen={true} ivalue={selectedCommissionDate} hint='Commission date' 
                        onFrozenPress={() =>  setSelectCommissionDateModalVisibility(true)}/>

                    <CTextInput hint='Supplied by' 
                        onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.supplied_by = t
                                return prevEquipmentData
                            })
                        }}/>

                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} titleShown={true} title='Technical specifications'>
                    {technicalSpecifications.map((element) => {
                        return (
                            <Text key={element.id} style={ {marginLeft: 10, marginBottom: 10, fontSize: 18, fontWeight: '500'}}>
                                {element.tsKey}: 
                                <Text style={{fontWeight: '300'}}>{element.tsValue}</Text>
                            </Text>
                        )
                    })}
                    
                    <CButton text='Add technical specification' onPress={() =>  setAddTechnicalSpecificationModalVisibility(true)}/>
                </CCard>

                <CButton style={{width: '80%', alignSelf:'center', maxWidth: 400, marginVertical: 20}} text='Done' 
                    onPress={() => {
                        const tss = new TechnicalSpecification()
                        tss.data.technical_specification = technicalSpecifications
                        tss.save().then((new_tss_id) => {
                            equipmentData.technical_specification_id = new_tss_id

                            equipmentData.e_oid = 0
                            equipmentData.created_at = DatesHelper.getSQLCompatibleDate(new Date())
                            equipmentData.updated_at = DatesHelper.getSQLCompatibleDate(new Date())
                            equipmentData.update_status = 'pending'

                            const eq = new Equipment()
                            eq.data = equipmentData
                            eq.save().then((new_e_id) => {
                                triggerSync()
                                alert('Equipment saved ')
                                setEquipmentData([])
                                navigation.goBack()
                            })
                        })
                    }}/>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})