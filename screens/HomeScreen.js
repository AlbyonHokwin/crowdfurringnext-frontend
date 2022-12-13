import { View, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SignUpScreen from './SignUpScreen';

export default function HomeScreen() {
    return (
            <SignUpScreen />
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