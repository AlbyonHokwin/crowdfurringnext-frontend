import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import FontAwesome from "react-native-vector-icons/FontAwesome";

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

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = "";

        if (route.name === "Home") iconName = "home";
        if (route.name === "Message") iconName = "envelope-o";
        if (route.name === "Pots") iconName = "paw";
        if (route.name === "Profile") iconName = "user";

        return <FontAwesome name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'black',
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Pots" component={PotsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Message" component={MessageScreen} />
          <Tab.Screen name="Pots" component={PotsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </TabNavigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


