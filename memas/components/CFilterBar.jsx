import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

export default function CFilterBar(props) {

    return (
        <View style={[styles.container, {...props.style}]}>
            <ScrollView style={styles.scrollView} horizontal={true} 
                showsHorizontalScrollIndicator={false}>
                
                <View style={styles.filterItemsContainer}>
                    { props.children }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'magenta',
        height:52,
    },

    filterItemsContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems:'center',
        paddingLeft: 10,
    },
})