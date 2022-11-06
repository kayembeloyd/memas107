import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function MaintenanceLogScreen(){
    return (
        <View style={styles.container}>
            <Text>MaintenanceLogScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
    }
})