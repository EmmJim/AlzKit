import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants'
import AppContainer from './src';


const isAndroid = Platform.OS === 'android';

export default function App() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isAndroid ? Constants.statusBarHeight : 0,
  },
});
