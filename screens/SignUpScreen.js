import { useDispatch } from "react-redux";
import { useState } from "react";
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
// import ImageProfileSelector from '../components/ImageProfileSelector';
import * as colors from "../styles/colors";


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BACKEND_URL = 'http://192.168.10.122:3000';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState(false);
  const [street, setStreet] = useState("");
  const [streetError, setStreetError] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [additionnal, setAdditionnal] = useState("");

  const handleSubmit = () => {
    let isOk = true;
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      isOk = false;
    }
    if (!(password.trim().length !== 0)) {
      setPasswordError(true);
      isOk = false;
    }
    if (!(lastname.trim().length !== 0)) {
      setLastnameError(true);
      isOk = false;
    }
    if (!(firstname.trim().length !== 0)) {
      setFirstnameError(true);
      isOk = false;
    }
    if (!(street.trim().length !== 0)) {
      setStreetError(true);
      isOk = false;
    }
    if (!(zipCode.trim().length !== 0)) {
      setZipCodeError(true);
      isOk = false;
    }
    if (!(city.trim().length !== 0)) {
      setCityError(true);
      isOk = false;
    }

    if (isOk) {
      fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          lastname,
          firstname,
          street,
          zipCode,
          city,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              login({
                token: data.token,
                email,
              })
            );
            setEmail("");
            setPassword("");
            setLastname("");
            setFirstname("");
            setStreet("");
            setZipCode("");
            setCity("");
            navigation.goBack();
          }
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Créer votre profil </Text>
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
          keyboardType="default"
          placeholder={"Mot de passe"}
          autoCorrect={false}
          secureTextEntry={true}
          textContentType={"password"}
          onChangeText={(value) => setPassword(value)}
          value={password}
          style={[styles.input, passwordError && styles.error]}
          placeholderTextColor={passwordError ? colors.light : undefined}
        />
        
        <TextInput
          type="lastname"
          onChangeText={(value) => setLastname(value)}
          value={lastname}
          placeholder="Nom"
          style={[styles.input, lastnameError && styles.error]}
          placeholderTextColor={lastnameError ? colors.light : undefined}
        />
        
        <TextInput
          type="firstname"
          onChangeText={(value) => setFirstname(value)}
          value={firstname}
          placeholder="Prénom"
          style={[styles.input, firstnameError && styles.error]}
          placeholderTextColor={firstnameError ? colors.light : undefined}
        />
        
        <TextInput
          textContentType="streetAddressLine1"
          onChangeText={(value) => setStreet(value)}
          value={street}
          placeholder="Adresse"
          style={[styles.input, streetError && styles.error]}
          placeholderTextColor={streetError ? colors.light : undefined}
        />
        
        <TextInput
          type="additionnal"
          style={styles.input}
          onChangeText={(value) => setAdditionnal(value)}
          value={additionnal}
          placeholder="Complément d'adresse"
        />
        <View style={styles.city}>
          <TextInput
            textContentType="postalCode"
            keyboardType="numeric"
            onChangeText={(value) => setZipCode(value)}
            value={zipCode}
            placeholder="C.P"
            style={[styles.input1, zipCodeError && styles.error]}
            placeholderTextColor={zipCodeError ? colors.light : undefined}
          />
          
          <TextInput
            textContentType="addressCity"
            onChangeText={(value) => setCity(value)}
            value={city}
            placeholder="Ville"
            style={[styles.input2, cityError && styles.error]}
            placeholderTextColor={cityError ? colors.light : undefined}
          />
          
        </View>
        {/* <View>
          <ImageProfileSelector />
        </View> */}
      </View>

      <View style={styles.group}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.text2}>retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button2}
          activeOpacity={0.8}
        >
          <Text style={styles.text2}>créer un compte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 1,
    alignItems: "center",
  },
  text: { 
    fontSize: 28,
    fontWeight: "bold",
    color: colors.dark,
},
  input: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    padding: 8,
        width: '25%',
        backgroundColor: "#1F6F78",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        flexGrow:1,
        marginRight:10,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    padding: 8,
        width: '57%',
        backgroundColor: "#1F6F78",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  height: 47,
  },
  error: {
    color: colors.light,
    backgroundColor: colors.backgroundError,
    borderColor: colors.borderError,
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.light,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "90%",
  },
  input1: {
    flexDirection: "row",
    width: "30%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    fontSize: 20,
    borderRadius: 5,
  },
  input2: {
    flexDirection: "row",
    width: "68%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    fontSize: 20,
    borderRadius: 5,
  },
  city: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 5,
  },
  asso: {
    flexDirection: "row",
  },
});

