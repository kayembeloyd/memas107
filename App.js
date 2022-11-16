import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import MainNavigationStack from './memas/navigation/MainNavigationStack';
import { useEffect, useRef } from 'react';
import MiddleMan from './memas/database/MiddleMan';

export default function App() {

  const syncComplete = useRef(false)
  
  useEffect(() => {
    if (!syncComplete.current)
      MiddleMan.sync().then(() => syncComplete.current = true )

    return () => syncComplete.current = true 
  }, [])

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
