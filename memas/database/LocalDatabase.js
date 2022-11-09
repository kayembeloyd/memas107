import { Platform } from 'react-native';

import { Storage } from 'expo-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalDatabase {
    // This is going the determine the platform and write accordingly 

    static async setItem(dkey, dvalue){
        switch (Platform.OS) {
            case 'ios':
            case 'windows':
            case 'macos':
            case 'android':
                return await Storage.setItem({
                    key: dkey,
                    value: dvalue
                })
            case 'web':
                try {
                    return await AsyncStorage.setItem(dkey, dvalue)
                } catch (e) {
                    return
                }
            default:
                break;
        }
    }

    static async getItem(dkey){
        switch (Platform.OS) {
            case 'ios':
            case 'windows':
            case 'macos':
            case 'android':
                return await Storage.getItem({ key: dkey })
            case 'web':
                return await AsyncStorage.getItem(dkey)
            default:
                break;
        }
    }
}