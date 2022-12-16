import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import * as colors from "../styles/colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStackNavigator from "./MainStackNavigator";
import MessageScreen from "../screens/MessageScreen";
import PotsScreen from "../screens/PotsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const user = useSelector(state => state.user.value);

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName = "";

                if (route.name === "Main") iconName = "paw";
                if (route.name === "Message") iconName = "envelope";
                if (route.name === "Pots") iconName = "cat";
                if (route.name === "Profile") iconName = "user";

                return <FontAwesome name={iconName} size={size} color={color} />
            },
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            tabBarItemStyle: { marginVertical: 10, marginHorizontal: 10, borderRadius: 10 },
            tabBarActiveTintColor: colors.accent,
            tabBarActiveBackgroundColor: colors.secondary,
            tabBarInactiveTintColor: colors.shade,
            tabBarStyle: { backgroundColor: colors.primary, height: 70, borderTopWidth: 0 },
            tabBarHideOnKeyboard: true,
            headerShown: false,
        })}>
            <Tab.Screen name="Main" component={MainStackNavigator} options={{ title: 'Home' }} />
            <Tab.Screen name="Message" component={MessageScreen} />
            <Tab.Screen name="Pots" component={PotsScreen} />
            <Tab.Screen name="Profile" component={user.token ? ProfileScreen : LoginScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({});