import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CFilterItem(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            <TouchableOpacity onPress={() => { props.filterItemPress(props.filterKey) }}>
                <Text style={styles.filterItemKey}>{props.filterKey}</Text>
                <Text style={styles.filterItemValue}>{props.filterValue}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'indigo'
    },
})