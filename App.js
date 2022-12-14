import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';

const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


