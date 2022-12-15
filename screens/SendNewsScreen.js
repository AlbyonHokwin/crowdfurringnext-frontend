import { View, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function SendNewsScreen({ navigation }) {
    return (

        
        <View style={styles.container}>  
            <Text>Send notifications</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}title="Go to Profile"
             onPress={() => navigation.navigate('Profile')}>
             <Text style={styles.text2} >retour</Text></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
    }
})