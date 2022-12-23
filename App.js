import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import pots from './reducers/pots';

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./components/TabNavigator";

import * as NavigationBar from 'expo-navigation-bar';
import * as colors from "./styles/colors";

import {LogBox} from 'react-native';

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const store = configureStore({
  reducer: { user, pots },
});



export default function App() {
  if (Platform.OS === 'android') NavigationBar.setBackgroundColorAsync(colors.primary);

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
