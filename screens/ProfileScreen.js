import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from "../reducers/user";
import { removeAll } from "../reducers/pots";
import { colors } from "../styles/colors";

export default function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();

    const pressOnLogout = () => {
        dispatch(removeAll());
        dispatch(logout());
        navigation.navigate('Main', { screen: 'Home' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion du compte</Text>
            <View style={styles.menu} >
                <TouchableOpacity style={styles.button} activeOpacity={0.8} title="Go to modify your info"
                    onPress={() => navigation.navigate('ModifyInfo')}>
                    <Text style={styles.textButton} >Modifier ses informations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} title="Go to add payment"
                    onPress={() => navigation.navigate('PaymentManagement')}>
                    <Text style={styles.textButton} >Gestion des moyens de paiements</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.menu1} activeOpacity={0.8} title="Go to send news"
                        onPress={() => navigation.navigate('send news')}>
                        <Text style={styles.text3} >Gestion des notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu1} activeOpacity={0.8} title="Go to settings"
                        onPress={() => navigation.navigate('settings')}>
                        <Text style={styles.text3} >Réglages</Text>
                    </TouchableOpacity> */}
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.secondary, marginTop: 100 }]} activeOpacity={0.8} title="Disconnected"
                    onPress={() => pressOnLogout()}>
                    <Text style={styles.textButton} >Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight + 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.dark,
        marginVertical: 30,
    },
    menu: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: colors.accent,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.light,
    },
});