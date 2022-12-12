import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import { login } from '../reducers/user';


  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  export default function SignUp() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname ] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
  
    const handleSubmit = () => {
        fetch('http://localhost:3000/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }).then(response => response.json())
          .then(data => {
            data.result && dispatch(login({ token: data.token, email }));
          });
        // if (EMAIL_REGEX.test(email)) {
        //     dispatch(updateEmail(email));
        
        //   } else {
        //     setEmailError(true);
        //   }
        
    };
  
    return (
        <>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none" 
            keyboardType="email-address" 
            textContentType="emailAddress" 
            autoComplete="email" 
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
          />
          {/* {emailError && <Text style={styles.error}>Invalid email address</Text>} */}
        <TextInput type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>Sign up</TouchableOpacity>
        </View>
        </>
    );
  }
  const styles = StyleSheet.create({

  })
  
  