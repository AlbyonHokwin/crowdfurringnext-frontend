import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRef, useState } from "react";
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

  const [formStep, setFormStep] = useState(0);
  const maxStep = 2;

  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleConnection = () => {
    let signinOk = true;

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      signinOk = false;
    } else setEmailError(false);

    if (!password.trim()) {
      setPasswordError(true);
      signinOk = false;
    } else setPasswordError(false);

    if (signinOk) {
      setIsLoading(true);
      fetch(`${BACKEND_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.result) {
            dispatch(login({ token: data.token, email: data.email }));
            dispatch(addPots(data.pots));
            dispatch(addContributors(data.contributor));
            setEmail("");
            setPassword("");
            setFormStep(0);
            navigation.goBack();
          } else {
            setModalVisible(true);
            setErrorText('Utilisateur introuvable ou mot de passe incorrect');
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
            <CustomTextInput
              step={1}
              currentStep={formStep}
              maxStep={maxStep}
              label='E-mail'
              width='90%'
              isError={emailError}
              placeholder="Adresse E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              onChangeText={(value) => setEmail(value)}
              value={email}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(1)}
              onSubmitEditing={() => {
                setEmail(email.trim());
                setFormStep(2)
              }}
            />
            <CustomTextInput
              step={2}
              currentStep={formStep}
              maxStep={maxStep}
              label='Mot de passe'
              width='90%'
              isError={passwordError}
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(2)}
              onSubmitEditing={() => {
                setFormStep(0)
                handleConnection()
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleConnection()}
            >
              <Text style={styles.textButton}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          statusBarTranslucent={true}
        >
          {isLoading &&
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <ActivityIndicator
                  style={{ margin: 10 }}
                  size="large"
                  color={colors.primary}
                />
              </View>
            </View>}
          {errorText &&
            <TouchableOpacity
              style={styles.modalView}
              onPress={() => setModalVisible(!modalVisible)}
              activeOpacity={1}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{errorText}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>}
        </Modal>

      </SafeAreaView>
    </KeyboardAvoidingView>
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundModal,
  },
  modalContent: {
    maxWidth: "70%",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    ...fonts.base.normal,
    color: colors.dark,
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  modalButtonText: {
    ...fonts.baseSmall.normal,
    color: colors.light,
  },
});
