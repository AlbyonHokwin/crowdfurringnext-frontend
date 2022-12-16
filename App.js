<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as colors from "./styles/colors";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import PotsScreen from "./screens/PotsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePotScreen from "./screens/CreatePotScreen";
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
>>>>>>> b76af09ffb4a7d284e25381f4117043ac4be45c2

const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
<<<<<<< HEAD
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = "";

              if (route.name === "Home") iconName = "paw";
              if (route.name === "CreatePotScreen") iconName = "envelope";
              if (route.name === "Pots") iconName = "cat";
              if (route.name === "Profile") iconName = "user";

              return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.shade,
            tabBarStyle: { backgroundColor: colors.primary },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CreatePotScreen" component={CreatePotScreen} />
          <Tab.Screen name="Pots" component={PotsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
=======
        <TabNavigator />
>>>>>>> b76af09ffb4a7d284e25381f4117043ac4be45c2
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
