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
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import CustomTextInput from "../components/CustomTextInput";
import { login } from '../reducers/user';
// import ImageProfileSelector from '../components/ImageProfileSelector';
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

import { BACKEND_URL } from "../global";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [formStep, setFormStep] = useState(0);
  const maxStep = 2;

  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    } else setEmailError(false);

    if (!(password.trim().length !== 0)) {
      setPasswordError(true);
      isOk = false;
    } else setPassword(false);

    if (!(lastname.trim().length !== 0)) {
      setLastnameError(true);
      isOk = false;
    } else setLastnameError(false);

    if (!(firstname.trim().length !== 0)) {
      setFirstnameError(true);
      isOk = false;
    } else setFirstnameError(false);

    if (!(street.trim().length !== 0)) {
      setStreetError(true);
      isOk = false;
    } else setStreetError(false);

    if (!(zipCode.trim().length !== 0) || !+zipCode) {
      setZipCodeError(true);
      isOk = false;
    } else setZipCode(false);

    if (!(city.trim().length !== 0)) {
      setCityError(true);
      isOk = false;
    } else setCityError(false);

    if (isOk) {
      setIsLoading(true);
      fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          lastname: lastname.trim(),
          firstname: firstname.trim(),
          street: street.trim(),
          zipCode,
          city: city.trim(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.result) {
            dispatch(
              login({
                token: data.token,
                email: data.email,
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
          } else {
            setModalVisible(true);
            setErrorText('L\'Email est déjà utilisé !');
          }
        })
        .catch(error => {
          setModalVisible(true);
          setErrorText('Une erreur est apparu durant la requête, veuillez Réessayer');
          console.log(error)
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.text}>Créer votre profil </Text>
          {/* <View style={{ height: 200 }}></View> */}
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
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.text2}>créer un compte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight + 20,
  },
  inputContainer: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  text: {
    ...fonts.baseBig.bold,
    color: colors.dark,
  },
  input: {
    flexDirection: "row",
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    ...fonts.base.normal,
    color: colors.dark,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
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
    ...fonts.baseBig.bold,
    color: colors.light,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 20,
  },
  input1: {
    flexDirection: "row",
    width: "30%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    ...fonts.base.normal,
    color: colors.dark,
    borderRadius: 5,
  },
  input2: {
    flexDirection: "row",
    width: "68%",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    ...fonts.base.normal,
    color: colors.dark,
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

