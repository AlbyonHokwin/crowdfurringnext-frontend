import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
    StatusBar,
  } from 'react-native';
  import { login } from '../reducers/user';
  import { Picker } from "@react-native-picker/picker";
  


  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const BACKEND_ADDRESS = 'http://192.168.10.150:3000';

  export default function SignUpScreen() {
    const dispatch = useDispatch();
    const [membership, setMembership] = useState();

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
  
    const handleSubmit = () => {
      let isOk = true ; 
     if (!EMAIL_REGEX.test(email)) {setEmailError(true); isOk=false } 
     if (!(password.trim().length !==0)) {setPasswordError(true); isOk=false} 
     if (!(lastname.trim().length !==0)) {setLastnameError(true); isOk=false}
     if (!(firstname.trim().length !==0)) {setFirstnameError(true); isOk=false}
     if (!(street.trim().length !==0)) {setStreetError(true); isOk=false}
     if (!(zipCode.trim().length !==0)) {setZipCodeError(true); isOk=false}
     if (!(city.trim().length !==0)) {setCityError(true); isOk=false} 

     if (isOk) {
        fetch(`${BACKEND_ADDRESS}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, lastname, firstname, street, zipCode, city }),
        }).then(response => response.json())
          .then(data => {
            if (data.result) {
              dispatch(login({ token: data.token, email, lastname, firstname, street, zipCode, city }));
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
        <Text style={{ fontSize: 24, textAlign: "center" }}>
              Faites-vous partie d'une association ?
            </Text>
         <Picker
              style={{ width: 200 }}
             selectedValue={membership}
              onValueChange={(itemValue, itemIndex) => setMembership(itemValue)}
            >
              <Picker.Item label="Oui" value="Oui" />
              <Picker.Item label="Non" value="Non" />
            </Picker>
        <View style={styles.group}>
          
        <TouchableOpacity style={styles.button} activeOpacity={0.8}><Text style={styles.text2} >retour</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button2} activeOpacity={0.8}><Text style={styles.text2} >créer un compte</Text></TouchableOpacity>
        </View>
      </ScrollView>
        
        
    );
  }
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: StatusBar.currentHeight+20,
        paddingBottom: 20,
      },
      inputContainer: {
        width: '100%',
        backgroundColor: "#ffffff",
        borderRadius: 1,
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

  })
  
  