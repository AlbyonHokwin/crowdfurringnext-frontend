import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
  } from 'react-native';
  import { login } from '../reducers/user';


  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const BACKEND_ADDRESS = 'http://192.168.10.150:3000';

  export default function SignUpScreen() {
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
        
         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address" 
            textContentType="emailAddress" 
            autoComplete="email" 
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
            />
            {emailError && <Text style={styles.error}>Invalid email address</Text>}
        <TextInput keyboardType="default"
            placeholder={'Enter password'}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType={'password'}
            style={styles.input}
            onChangeText={(value) => setPassword(value)} 
            value={password} />
        {passwordError && <Text style={styles.error}>password empty</Text>}
        <TextInput 
        textContentType="lastname" 
        keyboardType=""
        style={styles.input} 
        onChangeText={(value) => setLastname(value)} 
        value={lastname} 
        placeholder="lastname" />
        {lastnameError && <Text style={styles.error}>lastname empty</Text>}
        <TextInput 
        textContentType="firstname" 
        keyboardType=""
        style={styles.input} 
        onChangeText={(value) => setFirstname(value)} 
        value={firstname} 
        placeholder="firstname" />
        {firstnameError && <Text style={styles.error}>firstname empty</Text>}
        <TextInput 
        textContentType="street" 
        keyboardType=""
        style={styles.input} 
        onChangeText={(value) => setStreet(value)} 
        value={street} 
        placeholder="street" />
        {streetError && <Text style={styles.error}>street empty</Text>}
        <TextInput 
        textContentType="zipCode"  
        keyboardType="numeric" 
        style={styles.input} 
        onChangeText={(value) => setZipCode(value)} 
        value={zipCode} 
        placeholder="zipCode" />
        {zipCodeError && <Text style={styles.error}>zipCode empty</Text>}
        <TextInput 
        textContentType="city" 
        keyboardType=""
        style={styles.input} 
        onChangeText={(value) => setCity(value)} 
        value={city} 
        placeholder="city" />
        {cityError && <Text style={styles.error}>city empty</Text>}
        <TextInput 
        textContentType="additionnal"
        keyboardType="" 
        style={styles.input} 
        onChangeText={(value) => setAdditionnal(value)} 
        value={additionnal} 
        placeholder="additionnal" />
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}><Text>Sign up</Text></TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
        
    );
  }
  const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(	255, 190, 11, 0.4)'
      },
      
      inputContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: "#ffffff",
        padding: 30,
        borderRadius: 1,
      },
      input: {
        width: '100%',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        fontSize: 16,
        margin: 10,
      },
      button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
        marginTop: 30,
        backgroundColor: '#fbe29c',
        borderRadius: 1,
      },
      textButton: {
        fontFamily: 'Futura',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
      },
      error: {
        marginTop: 10,
        color: 'red',
      },

  })
  
  