import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,

        flex: 1,
        backgroundColor: 'blue'
    }
})