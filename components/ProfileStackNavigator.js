import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import ModifyInfoScreen from '../screens/ModifyInfoScreen';
import PaymentManagementScreen from "../screens/PaymentManagementScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ModifyInfo" component={ModifyInfoScreen} />
      <ProfileStack.Screen name="PaymentManagement" component={PaymentManagementScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({});
