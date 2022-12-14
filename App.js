<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
import CreatePotScreen from "./screens/CreatePotScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreatePotScreen" component={CreatePotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as colors from './styles/colors';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import PotsScreen from "./screens/PotsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const store = configureStore({
  reducer: { user },
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Home") iconName = "paw";
            if (route.name === "Message") iconName = "envelope";
            if (route.name === "Pots") iconName = "cat";
            if (route.name === "Profile") iconName = "user";

            return <FontAwesome name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.shade,
          tabBarStyle: {backgroundColor: colors.primary},
          headerShown: false,
        })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Message" component={MessageScreen} />
          <Tab.Screen name="Pots" component={PotsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
>>>>>>> 9f3828877ae30e2df86534de9e23c078e6335c1d
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


