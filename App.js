import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import MainNavigationStack from './memas/navigation/MainNavigationStack';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}> 
      <StatusBar backgroundColor='#D9D9D9'/>
        <NavigationContainer>
          <MainNavigationStack />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
