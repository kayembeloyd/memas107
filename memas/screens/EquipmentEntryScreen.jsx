import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { DateSelectionCalendar } from 'react-native-easy-calendar'

import CButton from '../components/CButton';
import CCard from '../components/CCard';
import CCustomModal from '../components/CCustomModal';
import CListModal from '../components/CListModal';
import CTextInput from '../components/CTextInput';
import Department from '../database/models/Department';
import Equipment from '../database/models/Equipment';
import TechnicalSpecification from '../database/models/TechnicalSpecification';

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

    const getSQLCompatibleDate = (d) => {
        return (
            d.getFullYear() + '-' + 
            (d.getMonth() + 1) + '-' + 
            d.getDate() + ' ' + 
            (d.getHours() < 10 ? (
                '0' + d.getHours()) 
                : d.getHours()) + ':' + 
            (d.getMinutes() < 10 ? 
                '0' + d.getMinutes() 
                : d.getMinutes()) + ':' + 
            (d.getMilliseconds() < 10 ? 
                '00' + d.getMilliseconds() : 
                (d.getMilliseconds() < 100 ? 
                    '0' + d.getMilliseconds(): 
                    d.getMilliseconds()))
        )
    }

    
    useEffect(() => {
        Department.getDepartments({ with_all: false }).then((dpt) => {
            setDepartments(dpt)
        })
    }, [])

    return (
        <View style={styles.container}>
            <CListModal visible={selectDepartmentModalVisibility} title='Select department' list={departments} 
                onCancelPress={()=>{
                    setSelectDepartmentModalVisibility(false)
                }}
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
                                onPress={() => {
                                    setSelectCommissionDateModalVisibility(false)
                                }}/>
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
                                    setTechnicalSpecifications((prevTechnicalSpecifications) => {
                                        let last = 0
                                        if (prevTechnicalSpecifications.length >= 1){                       
                                            last = prevTechnicalSpecifications[prevTechnicalSpecifications.length - 1].id
                                        }
                                        prevTechnicalSpecifications.push({id:(last + 1), tsKey: tsKeyInEdit, tsValue: tsValueInEdit })
                                        return prevTechnicalSpecifications
                                    })
                                    setAddTechnicalSpecificationModalVisibility(false)
                                }}/>
                        </View>
                    )}}>
                    <Text style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, fontWeight: '500'}}>Add Technical Specification</Text>
                    <CTextInput hint='Specification name' onChangeText={(t) => {
                        setTsKeyInEdit(t)
                    }}/>

                    <CTextInput style={{ marginBottom: 10, }} hint='Specification value' onChangeText={(t) => {
                        setTsValueInEdit(t)
                    }}/>
            </CCustomModal>


            <ScrollView>
                {/*<View style={ styles.searchBarContainer }>
                    <CToolbar style={{ width: '100%' }} text='Add Equipment'
                        onBackPress={() => navigation.goBack()}/>
                </View>*/}

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} titleShown={true} title='General Info.'>
                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.name = t
                                return prevEquipmentData
                            })
                        }} 
                        hint='Name'/>

                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.asset_tag = t
                                return prevEquipmentData
                            })
                        }}
                        hint='Asset tag'/>
                    
                    <CTextInput isFrozen={true} ivalue={selectedDepartment} hint='Select Department' onFrozenPress={() => {
                        setSelectDepartmentModalVisibility(true)
                    }}/>

                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.make = t
                                return prevEquipmentData
                            })
                        }} 
                        hint='Make'/>
                    
                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.model = t
                                return prevEquipmentData
                            })
                        }}  
                        hint='Model'/>

                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.serial_number = t
                                return prevEquipmentData
                            })
                        }} 
                        hint='Serial Number'/>
                    
                    <CTextInput isFrozen={true} ivalue={selectedCommissionDate} hint='Commission date' onFrozenPress={() => {
                        setSelectCommissionDateModalVisibility(true)
                    }}/>
                    <CTextInput onChangeText={t => {
                            setEquipmentData((prevEquipmentData) => {
                                prevEquipmentData.supplied_by = t
                                return prevEquipmentData
                            })
                        }} 
                        hint='Supplied by'/>
                </CCard>

                <CCard style={{ width: '100%', alignSelf:'center', maxWidth: 700, marginTop: 20}} titleShown={true} title='Technical specifications'>
                    {technicalSpecifications.map((element) => {
                        return (
                            <Text key={element.id} style={ styles.infoText }>{element.tsKey}: <Text style={ styles.infoValueText }>{element.tsValue}</Text>
                            </Text>
                        )
                    })}
                    
                    <CButton text='Add technical specification' onPress={() => {
                        setAddTechnicalSpecificationModalVisibility(true)
                    }}/>
                </CCard>

                <CButton style={{width: '80%', alignSelf:'center', maxWidth: 400, marginVertical: 20}} 
                    text='Done' onPress={() => {
                        const tss = new TechnicalSpecification()
                        tss.data.technical_specification = technicalSpecifications
                        tss.save().then((new_tss_id) => {
                            equipmentData.technical_specification_id = new_tss_id

                            equipmentData.created_at = getSQLCompatibleDate(new Date())
                            equipmentData.updated_at = getSQLCompatibleDate(new Date())

                            const eq = new Equipment()
                            eq.data = equipmentData
                            eq.save().then((new_e_id) => {
                                alert('Equipment saved ID: e_id' + new_e_id)
                                setEquipmentData([])
                                navigation.goBack()
                            })
                        })
                    }}/>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        backgroundColor: 'white',
    }, 

    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
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