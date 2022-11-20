import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";

import CMaintenanceScheduleTask from "./CMaintenanceScheduleTask";

export default function CMaintenanceScheduleItem(props) {

    const [maintenaceScheduleTaskItems, setMaintenaceScheduleTaskItems] = useState([])

    const [taskDate, setTaskDate] = useState(new Date())
    
    useEffect(() => {
        setMaintenaceScheduleTaskItems((msts) => [...msts, ...props.item.data.msts])
        setTaskDate(new Date(props.item.data.msi_id))
    }, [])

    return (
        <View style={[styles.container, {...props.style}]}>
            <View style={{ height:1, backgroundColor:'#E2E2E2'}} ></View>
            <View style={{ flexDirection:'row'}}>
                <View style={{ marginTop: 5, marginRight: 15,}}>
                    <Text>{taskDate.getDate()}</Text>
                    <Text>{taskDate.toLocaleString('default', { month: 'short' })}</Text>
                    <Text>{taskDate.getFullYear()}</Text>
                </View>

                <View style={{ flex:1}}>
                    <FlatList
                        ListEmptyComponent={() => (
                            <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center',height:50}}>
                                <View style={{height:2,backgroundColor:'grey',width:'70%'}}></View>
                            </View>
                        )}
                        data={maintenaceScheduleTaskItems}
                        keyExtractor={(item) => item.equipment_id}
                        renderItem={({ item }) => (
                            <CMaintenanceScheduleTask item={item} onTaskItemPress={props.onTaskItemPress}/>
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