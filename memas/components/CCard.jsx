import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CCard(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            {props.titleShown ? <Text style={{ fontSize: 18, marginBottom: 13, }}>{props.title}</Text> : <></>}

            <View style={styles.content}>
                { props.children }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth:300,
        backgroundColor: '#EFEFEF',
        padding: 20,
    }
})