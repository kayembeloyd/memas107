import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CFilterItem(props) {

    return (
        <View style={[styles.container, {...props.style}]}>
            <Text style={styles.filterItemKey}>{props.filterKey}</Text>
            <Text style={styles.filterItemValue}>{props.filterValue}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'indigo'
    },

    filterItemKey: {

    },

    filterItemValue: {

    },
})