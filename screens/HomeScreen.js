import { View, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginScreen from "./LoginScreen";

export default function HomeScreen() {
    return (
        <LoginScreen />
        // <View style={styles.container}>  
        //     <Text>HOME</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
    }
})