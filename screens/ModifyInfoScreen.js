import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

import { BACKEND_URL } from "../global";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ModifyInfoScreen({ navigation }) {
    const token = useSelector((state) => state.user.value.token);

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [zipCodeError, setZipCodeError] = useState(false);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [additionnal, setAdditionnal] = useState('');

    useEffect(() => {
        fetch(`${BACKEND_URL}/users/information`, {
            headers: { 'authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setEmail(data.user.email);
                    setLastname(data.user.lastname);
                    setFirstname(data.user.firstname);
                    setStreet(data.user.street);
                    setAdditionnal(data.user.additionnal);
                    setZipCode(`${data.user.zipCode}`);
                    setCity(data.user.city);
                }
            });
    }, []);


    const handleConfirm = () => {
        let isOk = true;
        if (!EMAIL_REGEX.test(email)) { setEmailError(true); isOk = false }
        if (!(lastname.trim().length !== 0)) { setLastnameError(true); isOk = false }
        if (!(firstname.trim().length !== 0)) { setFirstnameError(true); isOk = false }
        if (!(street.trim().length !== 0)) { setStreetError(true); isOk = false }
        if (!(zipCode.trim().length !== 0)) { setZipCodeError(true); isOk = false }
        if (!(city.trim().length !== 0)) { setCityError(true); isOk = false }

        if (isOk) {
            fetch(`${BACKEND_URL}/users/modify`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}`, },
                body: JSON.stringify({ email, lastname, firstname, street, additionnal, zipCode, city }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ email, token }));
                        setEmail('');
                        setLastname('');
                        setFirstname('');
                        setStreet('');
                        setZipCode('');
                        setCity('');
                    }
                });
        }

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Modifier vos Informations </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    style={[styles.input, emailError && styles.error]}
                    placeholderTextColor={emailError ? colors.light : undefined}
                />

                <TextInput
                    type="lastname"
                    style={[styles.input, lastnameError && styles.error]}
                    placeholderTextColor={lastnameError ? colors.light : undefined}
                    onChangeText={(value) => setLastname(value)}
                    value={lastname}
                    placeholder="Nom" />
                <TextInput
                    type="firstname"
                    style={[styles.input, firstnameError && styles.error]}
                    placeholderTextColor={firstnameError ? colors.light : undefined}
                    onChangeText={(value) => setFirstname(value)}
                    value={firstname}
                    placeholder="Prénom" />
                <TextInput
                    textContentType="streetAddressLine1"
                    style={[styles.input, streetError && styles.error]}
                    placeholderTextColor={streetError ? colors.light : undefined}
                    onChangeText={(value) => setStreet(value)}
                    value={street}
                    placeholder="Adresse" />
                <TextInput
                    type="additionnal"
                    style={styles.input}
                    onChangeText={(value) => setAdditionnal(value)}
                    value={additionnal}
                    placeholder="Complément d'adresse" />
                <View style={styles.row}>
                    <TextInput
                        textContentType="postalCode"
                        keyboardType="numeric"
                        style={[styles.input1, zipCodeError && styles.error]}
                        placeholderTextColor={zipCodeError ? colors.light : undefined}
                        onChangeText={(value) => setZipCode(value)}
                        value={zipCode}
                        placeholder="C.P" />
                    <TextInput
                        textContentType="addressCity"
                        style={[styles.input2, cityError && styles.error]}
                        placeholderTextColor={cityError ? colors.light : undefined}
                        onChangeText={(value) => setCity(value)}
                        value={city}
                        placeholder="Ville" />
                </View>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} title="Go to Profile"
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.text2} >retour</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleConfirm()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.text2} >Valider</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: StatusBar.currentHeight + 20,
        paddingBottom: 20,
    },
    inputContainer: {
        width: '100%',
        borderRadius: 1,
        alignItems: "center",
    },
    input: {
        flexDirection: 'row',
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.shade,
        marginVertical: 5,
        borderRadius: 5,
        ...fonts.base.normal,
    },
    button: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    error: {
        color: colors.light,
        backgroundColor: colors.backgroundError,
        borderColor: colors.borderError,
    },
    text2: {
        color: colors.light,
        ...fonts.baseBig.bold,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginVertical: 5,
    },
    input1: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.shade,
        borderRadius: 5,
        flexGrow: 1,
        marginRight: 10,
        ...fonts.base.normal,
    },
    input2: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: colors.shade,
        borderRadius: 5,
        flexGrow: 2,
        ...fonts.base.normal,
    },
    asso: {
        flexDirection: 'row',
    },
    text: {
        ...fonts.baseBig.bold,
        color: colors.dark,
    },
})