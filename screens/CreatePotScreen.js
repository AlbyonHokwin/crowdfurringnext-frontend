import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

import * as colors from "../styles/colors";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import FormFirstScreen from "../components/FormFirstScreen";
import FormSecondScreen from "../components/FormSecondScreen";
import FormThirdScreen from "../components/FormThirdScreen";
import FormFourthScreen from "../components/FormFourthScreen";
import FormFifthScreen from "../components/FormFifthScreen";
import FormSixthScreen from "../components/FormSixthScreen";
import FormSeventhScreen from "../components/FormSeventhScreen";
// import { SafeAreaView } from "react-native-safe-area-context";
import ModalComponent from "../components/ModalComponent";

import { checkFileds } from "../utils/checkFields";
import { fetcher } from "../api/fetch";
import CameraPicker from "../components/CameraPicker";
import Button from "../components/Button";
import { convertData } from "../utils/convertData";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPots } from "../reducers/pots";

export default function CreatePotScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [isOn, setIsOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [double, setDouble] = useState(false);

  const dispatch = useDispatch();

  // ***************FORM STATE*******************//

  const [animalName, setAnimalName] = useState("");
  const [infos, setInfos] = useState({
    specie: "",
    breed: "",
    age: "",
    sex: "",
  });
  const [description, setDescription] = useState("");
  const [compensation, setCompensation] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [socialNetworks, setSocialNetworks] = useState({
    instagram: "",
    twitter: "",
  });

  const [status, setStatus] = useState(false);

  //*********************************************//
  //  This function increment the state page to switch page

  const handleError = (message) => {
    setMessage(message);
    setModalVisible(true);
  };

  function handleNext() {
    const { result, message } = checkFileds(
      page,
      animalName,
      infos,
      socialNetworks,
      images,
      amount,
      files,
      description
    );
    if (result) {
      setPage(page + 1);
    } else {
      alert(message);
    }
  }

  async function handleSubmit(boolean = false) {
    setStatus("isLoading");
    const data = convertData({
      files,
      images,
      animalName,
      infos,
      socialNetworks,
      description,
      compensation,
      amount,
      urgent,
      explanation,
    });

    const url = `/pots/create/${boolean}`;

    const response = await fetcher(data, url, user.token);
    if (response.result) {
      dispatch(addPots(response.pot));
      setStatus(false);
      if (page !== 6) {
        setPage(1);
        navigation.navigate("Home");
      } else {
        setPage(page + 1);
      }
      // setAnimalName("");
      // setInfos({});
      // setDescription("");
      // setCompensation("");
      // setImages([]);
      // setFiles([]);
      // setAmount("");
      // setUrgent(false);
      // setExplanation("");
      // setSocialNetworks({
      //   instagram: "",
      //   twitter: "",
      // });
    } else {
      setStatus("error");
    }
  }

  // This logic is here to set sthe state for each onChangeText prop from TextInput
  const input = (value, name) => {
    if (name === "animalName") return setAnimalName(value);
    if (name === "specie") return setInfos({ ...infos, specie: value });
    if (name === "breed") return setInfos({ ...infos, breed: value });
    if (name === "age") return setInfos({ ...infos, age: value });
    if (name === "sex") return setInfos({ ...infos, sex: value });
    if (name === "description") return setDescription(value);
    if (name === "compensation") return setCompensation(value);
    if (name === "amount") return setAmount(value);
    if (name === "explanation") return setExplanation(value);
  };

  if (status === "isLoading") {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }} fontSize={24}>
          Votre demande est en cours de traitement
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "600" }} fontSize={24}>
          Merci de bien vouloir patienter
        </Text>
        <ActivityIndicator
          style={{ margin: 10 }}
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View>
        <Text style={{ textAlign: "center" }} fontSize={18}>
          Votre demande n'a pas pu être prise en compte
        </Text>
        <Text style={{ textAlign: "center" }} fontSize={18}>
          Nous sommes désolé pour ce désagrément.
        </Text>
        <Text style={{ textAlign: "center" }} fontSize={18}>
          Veuillez vérifier que vous êtes bien connecté à internet et cliqué de
          nouveau sur le bouton suivant
        </Text>
        <Button onPress={() => handleSubmit()} value="Envoyer" />
      </View>
    );
  }

  //**************** Switch to change page ********************//

  const conditionalComponent = () => {
    switch (page) {
      case 1:
        return (
          <FormFirstScreen
            input={input}
            animalName={animalName}
            infos={infos}
            description={description}
            socialNetworks={socialNetworks}
            setSocialNetworks={setSocialNetworks}
            handleError={handleError}
            navigation={navigation}
          />
        );
      case 2:
        return (
          <FormSecondScreen
            setImages={setImages}
            images={images}
            setIsOn={setIsOn}
            handleError={handleError}
          />
        );
      case 3:
        return (
          <FormThirdScreen
            input={input}
            amount={amount}
            compensation={compensation}
            handleError={handleError}
          />
        );
      case 4:
        return (
          <FormFourthScreen
            urgent={urgent}
            setUrgent={setUrgent}
            input={input}
            explanation={explanation}
          />
        );
      case 5:
        return (
          <FormFifthScreen
            handleError={handleError}
            files={files}
            setFiles={setFiles}
          />
        );
      case 6:
        return (
          <FormSixthScreen
            animalName={animalName}
            urgent={urgent}
            images={images}
            files={files}
            infos={infos}
            description={description}
            compensation={compensation}
            amount={amount}
          />
        );
      case 7:
        return (
          <FormSeventhScreen
            animalName={animalName}
            navigation={navigation}
            setPage={setPage}
          />
        );
      default:
        return (
          <FormFirstScreen
            input={input}
            animalName={animalName}
            infos={infos}
            description={description}
            socialNetworks={socialNetworks}
            setSocialNetworks={setSocialNetworks}
            handleError={handleError}
          />
        );
    }
  };

  // *************************************************** //

  const takePicture = (picture) => setImages([...images, picture.uri]);

  const handleCamera = (isOn) => setIsOn(isOn);

  //******************** Display pages ******************* //

  return isOn ? (
    <CameraPicker active={true} takePicture={takePicture} isOn={handleCamera} />
  ) : (
    <>
      <ModalComponent
        modalVisible={modalVisible}
        setModal={setModalVisible}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={() => handleSubmit()}
        navigation={navigation}
      />
      {/* <SafeAreaView
        style={{
          backgroundColor: colors.light,
          // opacity: `${modalVisible ? 0.3 : 1}`,
          flex: 1,
          justifyContent: "space-around",
          // paddingTop: StatusBar.currentHeight,
        }}
      >
        <KeyboardAvoidingView
          style={{
            alignItems: "center",
            height: "100%",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        > */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={styles.container}>

          {page < 2 && page !== 7 ? (
            <View style={styles.header}>
              <Text style={styles.headerText}>Création de cagnotte</Text>
              <FontAwesome
                name="close"
                size={25}
                style={{
                  color: colors.danger,
                  borderColor: colors.danger,
                  textAlign: "right",
                }}
                onPress={() => {
                  setMessage("Voulez-vous sauvegarder votre cagnotte ?");
                  setDouble(true);
                  setModalVisible(true);
                }}
              />
            </View>
          ) : (
            page !== 7 && (
              <View style={styles.header}>
                <Text style={styles.headerText}>{animalName}</Text>
                <FontAwesome
                  name="close"
                  size={25}
                  style={{
                    color: colors.danger,
                    borderColor: colors.danger,
                    textAlign: "right",
                  }}
                  onPress={() => {
                    setMessage("Voulez-vous saugegarder votre cagnotte ?");
                    setDouble(true);
                    setModalVisible(true);
                  }}
                />
              </View>
            )
          )}

          {conditionalComponent()}

          <View
            style={[styles.buttonsContainer, {
              flexDirection: `${page > 1 ? "row" : "column"}`,
              justifyContent: `${page > 1 ? "space-between" : "center"}`,
            }]}
          >
            {page > 1 && page < 7 && (
              <Button onPress={() => setPage(page - 1)} value="Retour" />
            )}

            {page < 6 ? (
              <Button onPress={() => handleNext()} value="Suivant" />
            ) : page < 7 ? (
              <Button onPress={() => handleSubmit()} value="Valider" />
            ) : null}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 5,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    margin: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 32,
    color: colors.light,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.light,
  },
})