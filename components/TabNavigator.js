import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import * as colors from "../styles/colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStackNavigator from "./MainStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import MessageScreen from "../screens/MessageScreen";
import PotsScreen from "../screens/PotsScreen";
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
                if (route.name === "ProfileStack") iconName = "user";

                return <FontAwesome name={iconName} size={size} color={color} />
            },
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
            tabBarItemStyle: { marginVertical: 10, marginHorizontal: 10, borderRadius: 10 },
            tabBarActiveTintColor: colors.accent,
            tabBarActiveBackgroundColor: colors.secondary,
            tabBarInactiveTintColor: colors.shade,
            tabBarStyle: { backgroundColor: colors.primary, height: Platform.OS === "ios" ? 100 : 70, borderTopWidth: 0 },
            tabBarHideOnKeyboard: true,
            headerShown: false,
        })}>
            <Tab.Screen name="Main" component={MainStackNavigator} options={{ title: 'Accueil' }} />
            {/* <Tab.Screen name="Message" component={MessageScreen} /> */}
            <Tab.Screen name="Pots" component={user.token ? PotsScreen : LoginScreen} options={{ title: 'Cagnottes' }}/>
            <Tab.Screen name="ProfileStack" component={user.token ? ProfileStackNavigator : LoginScreen} options={{ title: 'Profil' }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({});