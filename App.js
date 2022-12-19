<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./components/TabNavigator";
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
>>>>>>> f2c3a8346b28ee2e792ab3352c772ef4dcd00cd7

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
