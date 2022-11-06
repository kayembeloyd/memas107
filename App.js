import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigationStack from './memas/navigation/MainNavigationStack';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainNavigationStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
