import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import CameraPicker from "../components/CameraPicker";
import CustomTextInput from "../components/CustomTextInput";
import { login } from '../reducers/user';
import ImageProfileSelector from '../components/ImageProfileSelector';
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

import { BACKEND_URL } from "../global";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [isOn, setIsOn] = useState(false);

  const [formStep, setFormStep] = useState(0);
  const maxStep = 8;

  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
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
    } else setPasswordError(false);

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
    } else setZipCodeError(false);

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

  // *************************************************** //

  const takePicture = (picture) => setImage(picture.uri);

  const handleCamera = (isOn) => setIsOn(isOn);

  //******************** Display pages ******************* //

  if (isOn) return <CameraPicker active={true} takePicture={takePicture} isOn={handleCamera} />

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Créer votre profil </Text>
        <ImageProfileSelector
          image={image}
          setImage={setImage}
          setIsOn={setIsOn}
          size='15%'
        />

        <ScrollView contentContainerStyle={styles.content}>
          {/* <View style={{ height: 200 }}></View> */}
          <View style={styles.inputContainer}>
            <CustomTextInput
              step={1}
              currentStep={formStep}
              maxStep={maxStep}
              label='E-mail'
              width='90%'
              isError={emailError}
              placeholder="Adresse e-mail"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              autoCapitalize="none"
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
              placeholder={"Mot de passe"}
              keyboardType="default"
              textContentType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(2)}
              onSubmitEditing={() => setFormStep(3)}
            />

            <CustomTextInput
              step={3}
              currentStep={formStep}
              maxStep={maxStep}
              label='Nom de famille'
              width='90%'
              isError={lastnameError}
              placeholder="Nom"
              autoComplete='name'
              textContentType='name'
              onChangeText={(value) => setLastname(value)}
              value={lastname}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(3)}
              onSubmitEditing={() => {
                setLastname(lastname.trim());
                setFormStep(4)
              }}
            />

            <CustomTextInput
              step={4}
              currentStep={formStep}
              maxStep={maxStep}
              label='Prénom'
              width='90%'
              isError={firstnameError}
              placeholder="Prénom"
              autoComplete='name'
              textContentType='name'
              onChangeText={(value) => setFirstname(value)}
              value={firstname}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(4)}
              onSubmitEditing={() => {
                setFirstname(firstname.trim());
                setFormStep(5)
              }}
            />

            <CustomTextInput
              step={5}
              currentStep={formStep}
              maxStep={maxStep}
              label='Adresse'
              width='90%'
              isError={streetError}
              placeholder="Adresse"
              autoComplete='postal-address'
              textContentType='fullStreetAddress'
              onChangeText={(value) => setStreet(value)}
              value={street}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(5)}
              onSubmitEditing={() => {
                setStreet(street.trim());
                setFormStep(6)
              }}
            />

            <CustomTextInput
              step={6}
              currentStep={formStep}
              maxStep={maxStep}
              label="Complément d'adresse"
              width='90%'
              isError={false}
              placeholder="Complément d'adresse"
              onChangeText={(value) => setAdditionnal(value)}
              value={additionnal}
              blurOnSubmit={false}
              onBlur={() => setFormStep(0)}
              onFocus={() => setFormStep(6)}
              onSubmitEditing={() => {
                setAdditionnal(additionnal.trim());
                setFormStep(7)
              }}
            />

            <View style={styles.city}>
              <CustomTextInput
                step={7}
                currentStep={formStep}
                maxStep={maxStep}
                label="Code postal"
                width='30%'
                isError={zipCodeError}
                placeholder="C. P."
                keyboardType="numeric"
                textContentType="postalCode"
                onChangeText={(value) => setZipCode(value)}
                value={zipCode}
                blurOnSubmit={false}
                onBlur={() => setFormStep(0)}
                onFocus={() => setFormStep(7)}
                onSubmitEditing={() => setFormStep(8)}
              />

              <CustomTextInput
                step={8}
                currentStep={formStep}
                maxStep={maxStep}
                label="Ville"
                width='68%'
                isError={cityError}
                placeholder="Ville"
                textContentType="addressCity"
                onChangeText={(value) => setCity(value)}
                value={city}
                blurOnSubmit={false}
                onBlur={() => setFormStep(0)}
                onFocus={() => setFormStep(8)}
                onSubmitEditing={() => {
                  setCity(city.trim());
                  setFormStep(0);
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>créer un compte</Text>
          </TouchableOpacity>
        </View>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight + 20,
    alignItems: 'center',
  },
  content: {
    paddingTop: 10,
    minWidth: '100%',
    maxWidth: '100%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  title: {
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
  city: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 5,
  },
  error: {
    color: colors.light,
    backgroundColor: colors.backgroundError,
    borderColor: colors.borderError,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 20,
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
  buttonText: {
    ...fonts.baseBig.bold,
    color: colors.light,
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

