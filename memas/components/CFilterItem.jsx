import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CFilterItem(props) {
    return (
        <View style={[styles.container, {...props.style}]}>
            <TouchableOpacity onPress={() => { props.filterItemPress(props.filterKey) }}>
                <Text style={styles.filterItemKey}>{props.filterKey}</Text>
                <Text style={{color:'#7B7B7B', fontSize: 14}}>{props.filterValue}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
    },
})