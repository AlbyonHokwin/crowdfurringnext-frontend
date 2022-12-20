import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import PotScreen from "../screens/PotScreen";
import PaymentScreen from "../screens/PaymentScreen";
import CreatePotScreen from "../screens/CreatePotScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Pot" component={PotScreen} />
      <MainStack.Screen name="Payment" component={PaymentScreen} />
      <MainStack.Screen
        name="CreatePot"
        component={user.token ? CreatePotScreen : CreatePotScreen}
      />
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="SignUp" component={SignUpScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
