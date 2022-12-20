import { View, Text, StyleSheet, ScrollView,TextInput, TouchableOpacity, } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BACKEND_ADDRESS = 'http://192.168.10.126:3000';

export default function ModifyInfoScreen({ navigation }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [firstname, setFirstname ] = useState('');
    const [firstnameError, setFirstnameError ] = useState(false);
    const [street, setStreet] = useState('');
    const [streetError, setStreetError ] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [zipCodeError, setZipCodeError] = useState(false);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [additionnal, setAdditionnal] = useState('');
  
    const handleConfirm = () => {
        let isOk = true ; 
       if (!EMAIL_REGEX.test(email)) {setEmailError(true); isOk=false } 
       if (!(password.trim().length !==0)) {setPasswordError(true); isOk=false} 
       if (!(lastname.trim().length !==0)) {setLastnameError(true); isOk=false}
       if (!(firstname.trim().length !==0)) {setFirstnameError(true); isOk=false}
       if (!(street.trim().length !==0)) {setStreetError(true); isOk=false}
       if (!(zipCode.trim().length !==0)) {setZipCodeError(true); isOk=false}
       if (!(city.trim().length !==0)) {setCityError(true); isOk=false} 
  
       if (isOk) {
          fetch(`${BACKEND_ADDRESS}/users/modify`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            authorization:'Bearer token',
            body: JSON.stringify({ email: email, token: data.token, lastname: lastname, firstname: firstname, street: street, additionnal: additionnal, zipCode: zipCode, city:city}),
          }).then(response => response.json())

            .then(data => {
                if(data.result)
                {data.result && dispatch(login({ email: email, token: data.token,  lastname: lastname, firstname: firstname, street: street, additionnal: additionnal, zipCode: zipCode, city:city }));
                setEmail('');
                setPassword('');
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
            <Text>Modify your Informations </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address" 
            textContentType="emailAddress" 
            autoComplete="email" 
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
            />{emailError && <Text style={styles.error}>Invalid email address</Text>}
        <TextInput keyboardType="default"
            placeholder={'Mot de passe'}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType={'password'}
            style={styles.input}
            onChangeText={(value) => setPassword(value)} 
            value={password} />{passwordError && <Text style={styles.error}>password empty</Text>}
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
            <TouchableOpacity style={styles.button} activeOpacity={0.8} title="Go to Profile"
             onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.text2} >retour</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleConfirm()} style={styles.button2} activeOpacity={0.8}>
                <Text style={styles.text2} >Valider</Text></TouchableOpacity>
      </View>
   </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "yellow",
    },
    gestion: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '106%',
    },
    menu: {
        width: '100%',
        backgroundColor: "#ffffff",
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    title: {
        height: '30%',
        justifyContent: 'center',
    },
    endMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '90%',
    },
    button: {
        padding: 15,
        width: '45%',
        backgroundColor: "#1F6F78",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    menu1: {
        flexDirection: 'row',
        width: '90%',
        padding: 10,
        fontSize: 20,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#33BBAA",
        alignItems: "center",
        justifyContent: "center",
    },
    text2: {
        color: 'white',
        fontSize: 17,

    },
    text: {
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        paddingTop: 60,
    },
    text3: {
        width: '90%',
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 17,
    }
})