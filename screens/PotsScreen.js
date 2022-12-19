import { View, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModifyInfoScreen from './ModifyInfoScreen';


export default function PotsScreen() {
    return (
        <ModifyInfoScreen/>
          
        // <View style={styles.container}>  
        //     <Text>POTS</Text>
        // </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
    }
})