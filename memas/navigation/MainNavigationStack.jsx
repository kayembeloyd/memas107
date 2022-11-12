import React  from 'react';
import { Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen'
import EquipmentEntryScreen from '../screens/EquipmentEntryScreen'
import EquipmentScreen from '../screens/EquipmentScreen'
import EquipmentsScreen from '../screens/EquipmentsScreen'
import MaintenanceLogEntryScreen from '../screens/MaintenanceLogEntryScreen'
import MaintenanceLogScreen from '../screens/MaintenanceLogScreen'
import MaintenanceLogsScreen from '../screens/MaintenanceLogsScreen'
import ScanScreen from '../screens/ScanScreen'

const stack_navigator = createNativeStackNavigator();

export default function MainNavigationStack({ navigation }) {
    return (
        <stack_navigator.Navigator>
            <stack_navigator.Screen 
                name='Home'
                component={ HomeScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: false,
                        headerShadowVisible: false,
                    }
                }}/>

            <stack_navigator.Screen 
                name='EquipmentEntry'
                component={ EquipmentEntryScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: true,
                        headerShadowVisible: true,
                        headerTitle: 'Add Equipment',
                    }
                }}/>

            <stack_navigator.Screen 
                name='Equipment'
                component={ EquipmentScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: true,
                        headerShadowVisible: true,
                        headerTitle: 'Equipment',
                    }
                }}/>

            <stack_navigator.Screen 
                name='Equipments'
                component={ EquipmentsScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: false,
                        headerShadowVisible: false,
                    }
                }}/>

            <stack_navigator.Screen 
                name='MaintenanceLogEntry'
                component={ MaintenanceLogEntryScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: true,
                        headerShadowVisible: true,
                        headerTitle: 'Add Maintenance Log',
                    }
                }}/>
                
            <stack_navigator.Screen 
                name='MaintenanceLog'
                component={ MaintenanceLogScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: true,
                        headerShadowVisible: true,
                        headerTitle: 'Maintenance Log',
                    }
                }}/>
            
            <stack_navigator.Screen 
                name='MaintenanceLogs'
                component={ MaintenanceLogsScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: false,
                        headerShadowVisible: false,
                    }
                }}
                initialParams={{ filtering: 'off', filteringEquipment: null }}/>
            
            <stack_navigator.Screen 
                name='Scan'
                component={ ScanScreen }
                options={ ({ navigation }) => {
                    return {
                        headerShown: true,
                        headerShadowVisible: true,
                        headerTitle: 'Scan Equipment',
                    }
                }}/>
        </stack_navigator.Navigator>
    )
}
