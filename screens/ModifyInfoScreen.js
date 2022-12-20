import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BACKEND_ADDRESS = 'http://192.168.10.131:3000';


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
        fetch(`${BACKEND_ADDRESS}/users/information`, {
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
                    setCity(data.user.city);
                    setZipCode(`${data.user.zipCode}`);
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
            fetch(`${BACKEND_ADDRESS}/users/modify`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}`, },
                body: JSON.stringify({ email, lastname, firstname, street, additionnal, zipCode, city }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({ email, lastname, firstname, street, additionnal, zipCode, city }));
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
            <View style={styles.container}>
                <Text style={styles.text}>Modifier vos Informations </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.description1}>
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoComplete="email"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        style={styles.input}
                    />{emailError && <Text style={styles.error}>Invalid email address</Text>}

                    <TextInput
                        type="lastname"
                        style={styles.input}
                        onChangeText={(value) => setLastname(value)}
                        value={lastname}
                        placeholder="Nom" />{lastnameError && <Text style={styles.error}>lastname empty</Text>}
                    <TextInput
                        type="firstname"
                        style={styles.input}
                        onChangeText={(value) => setFirstname(value)}
                        value={firstname}
                        placeholder="Prénom" />{firstnameError && <Text style={styles.error}>firstname empty</Text>}
                    <TextInput
                        textContentType="streetAddressLine1"
                        style={styles.input}
                        onChangeText={(value) => setStreet(value)}
                        value={street}
                        placeholder="Adresse" />{streetError && <Text style={styles.error}>street empty</Text>}
                    <TextInput
                        type="additionnal"
                        style={styles.input}
                        onChangeText={(value) => setAdditionnal(value)}
                        value={additionnal}
                        placeholder="Complément d'adresse" />
                        </View>
                    <View style={styles.city}>
                        <TextInput
                            textContentType="postalCode"
                            keyboardType="numeric"
                            style={styles.input1}
                            onChangeText={(value) => setZipCode(value)}
                            value={zipCode}
                            placeholder="C.P" />{zipCodeError && <Text style={styles.error}>zipCode empty</Text>}
                        <TextInput
                            textContentType="addressCity"
                            style={styles.input2}
                            onChangeText={(value) => setCity(value)}
                            value={city}
                            placeholder="Ville" />{cityError && <Text style={styles.error}>city empty</Text>}
                    </View>
                        </View>
                    <View style={styles.group}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} title="Go to Profile"
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.text2} >retour</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => handleConfirm()} style={styles.button2} activeOpacity={0.8}>
                    <Text style={styles.text2} >Valider</Text></TouchableOpacity>
            </View>
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
        backgroundColor: "#ffffff",
        borderRadius: 1,
        alignItems: 'center',

    },
    description1: {
       width: '90%',
       alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginVertical: 5,
        borderRadius: 5,
    },
    button: {
        padding: 8,
        width: '25%',
        backgroundColor: "#1F6F78",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button2: {
        padding: 8,
        width: '57%',
        backgroundColor: "#1F6F78",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        marginTop: 10,
        color: 'red',
    },
    text2: {
        color: "white",
        alignContent: 'center',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '90%',
        padding : 30,
    },
    input1: {
        flexDirection: 'row',
        width: '30%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        borderRadius: 5,
    },
    input2: {
        flexDirection: 'row',
        width: '68%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        borderRadius: 5,
    },
    city: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 5,
    },
    asso: {
        flexDirection: 'row',
    },
    text: {
fontSize: 30,

    },

})