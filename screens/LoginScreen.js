import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../reducers/user";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginScreen() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const [signInEmail, setSignInEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [signInPassword, setSignInPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const { onPress } = '';
    const token = useSelector(state => state.user.value);
    console.log(token);

    const handleConnection = () => {
        let signinOk = true;

        if (!EMAIL_REGEX.test(signInEmail)) { setEmailError(true); signinOk = false }
        if (signInPassword.trim().length === 0) { setPasswordError(true); signinOk = false }

        if (signinOk) {

            fetch("http://192.168.10.136:3000/users/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: signInEmail, password: signInPassword })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.result) {
                        dispatch(login({ token: data.token }));
                        setSignInEmail("");
                        setSignInPassword("");
                    }


                });
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>Nouvel utilisateur ? Créez votre compte !</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Créer un compte !</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text>Vous avez déjà un compte ? Connectez-vous !</Text>
                <TextInput style={styles.input} placeholder="Adresse E-mail" onChangeText={value => setSignInEmail(value)} value={signInEmail} />
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Mot de passe" onChangeText={value => setSignInPassword(value)} value={signInPassword} />
                <TouchableOpacity style={styles.button} onPress={() => handleConnection()}>
                    <Text style={styles.text}>Se connecter</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                <Text style={styles.textLine}>OU</Text>
                <TouchableOpacity style={styles.menu1} activeOpacity={0.8} title="Disconnected" onPress={() => handleLogout()}>
                    <Text style={styles.text3} >Se déconnecter</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "orange",
        paddingTop: StatusBar.currentHeight + 20,
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

