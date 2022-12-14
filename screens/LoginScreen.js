import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
    const { onPress } = '';
    return (
        <View style={styles.container}>
            <View>
                <Text>Nouvel utilisateur ? Créez votre compte !</Text>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.text}>Créer un compte !</Text>
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Text>Vous avez déjà un compte ? Connectez-vous !</Text>
                <TextInput style={styles.input} placeholder="Adresse E-mail" />
                <TextInput style={styles.input} placeholder="Mot de passe" />
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.text}>Se connecter</Text>
                </Pressable>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                <Text style={styles.textLine}>OU</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "orange",
        paddingTop: '5%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    input: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginVertical: 5,
    },
    lineContainer: {
        width: '100%',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: "center",
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
    },
    textLine: {
        backgroundColor: 'orange',
        textAlign: 'center',
        fontSize: 26,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.50,
        position: "relative",    
        bottom: 6, 
    },
})
