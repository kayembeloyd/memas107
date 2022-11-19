import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";

import CMaintenanceScheduleTask from "./CMaintenanceScheduleTask";

export default function CMaintenanceScheduleItem(props) {

    const [maintenaceScheduleTaskItems, setMaintenaceScheduleTaskItems] = useState([
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
    ])

    return (
        <View style={[styles.container, {...props.style}]}>
            <View style={{ height:1, backgroundColor:'#E2E2E2'}} ></View>
            <View style={{ flexDirection:'row'}}>
                <View style={{ marginTop: 5, marginRight: 15,}}>
                    <Text>19</Text>
                    <Text>Nov</Text>
                    <Text>2022</Text>
                </View>

                <View style={{ flex:1}}>
                    <FlatList
                        ListEmptyComponent={() => (
                            <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center',height:50}}>
                                <View style={{height:2,backgroundColor:'grey',width:'70%'}}></View>
                            </View>
                        )}
                        data={maintenaceScheduleTaskItems}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CMaintenanceScheduleTask />
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        justifyContent: 'center',
        alignSelf:'center',
    },
})