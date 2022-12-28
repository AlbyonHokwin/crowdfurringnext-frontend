import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { addPots, addContributors } from "../reducers/pots";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
import CustomTextInput from "../components/CustomTextInput";

import { BACKEND_URL } from "../global";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleConnection = () => {
    let signinOk = true;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      signinOk = false;
    }
    if (!password.trim()) {
      setPasswordError(true);
      signinOk = false;
    }

    if (signinOk) {
      fetch(`${BACKEND_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login({ token: data.token, email: data.email }));
            dispatch(addPots(data.pots));
            dispatch(addContributors(data.contributor));
            setEmail("");
            setPassword("");
            navigation.goBack();
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>
          Nouvel utilisateur ? Créez votre compte !
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.textButton}>Créer un compte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.loginContainer}>
        <Text style={styles.text}>
          Vous avez déjà un compte ? Connectez-vous !
        </Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          style={[styles.input, emailError && styles.error]}
          placeholderTextColor={emailError ? colors.light : undefined}
          placeholder="Adresse E-mail"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <CustomTextInput
          label='E-mail'
          width='90%'
          isError={false}
          placeholder="Adresse E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          style={[styles.input, passwordError && styles.error]}
          placeholderTextColor={passwordError ? colors.light : undefined}
          secureTextEntry={true}
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleConnection()}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                <Text style={styles.textLine}>OU</Text>
            </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight + 10,
  },
  signUpContainer: {
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  loginContainer: {
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    marginVertical: 5,
    ...fonts.base.normal,
    color: colors.dark,
  },
  error: {
    color: colors.light,
    backgroundColor: colors.backgroundError,
    borderColor: colors.borderError,
  },
  divider: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: colors.dark,
    marginVertical: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    width: "70%",
  },
  textButton: {
    ...fonts.base.bold,
    color: colors.light,
  },
  text: {
    ...fonts.baseSmall.bold,
    color: colors.dark,
    textAlign: 'center',
  },
});
