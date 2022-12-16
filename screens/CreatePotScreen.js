import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import InputComponent from "../components/InputComponent";
import DescriptionComponent from "../components/DescriptionComponent";
import SocialMedia from "../components/SocialMedia";
import Button from "../components/Button";

import * as colors from "../styles/colors";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import ImageSelector from "../components/ImageSelector";

import CameraPicker from "../components/CameraPicker";

import { Picker } from "@react-native-picker/picker";

import FileSelector from "../components/FileSelector";

import * as DocumentPicker from "expo-document-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import ModalComponent from "../components/ModalComponent";
import FormFirstScreen from "../components/FormFirstScreen";
import FormSecondScreen from "../components/FormSecondScreen";
import FormThirdScreen from "../components/FormThirdScreen";

export default function CreatePotScreen({ navigation }) {
  const [isOn, setIsOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [double, setDouble] = useState(false);

  // ***************FORM STATE*******************//

  const [animalName, setAnimalName] = useState("");
  const [infos, setInfos] = useState({});
  const [description, setDescription] = useState("");
  const [compensation, setCompensation] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [socialNetworks, setSocialNetworks] = useState({
    instagram: "",
    twitter: "",
  });

  const [status, setStatus] = useState(false);
  //*********************************************//
  //  This function increment the state count to switch page
  const step = (value) => {
    setCount(count + value);
  };

  const reset = (value) => setCount(value);
  const handleError = (message) => {
    setMessage(message);
    setModalVisible(true);
  };

  const fetcher = (boolean = "false") => {
    setStatus("isLoading");
    const data = new FormData();

    for (const file of files) {
      data.append("documents", {
        uri: file.file,
        name: "document.jpg",
        type: "image/jpeg",
      });
    }

    for (const image of images) {
      data.append("images", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }

    data.append("animalName", animalName);
    data.append("infos", JSON.stringify(infos));
    data.append("socialNetworks", JSON.stringify(socialNetworks));
    data.append("description", description);
    data.append("compensation", compensation);
    data.append("amount", amount);
    data.append("urgent", urgent);
    data.append("explanation", explanation);
    fetch(`http://192.168.10.147:3000/pots/create/${boolean}`, {
      method: "POST",
      headers: {
        // 'Authorization':'Bearer' + token il sera dans le store reduce
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setStatus(false);
          if (count !== 6) {
            setCount(1);
            navigation.navigate("Home");
          } else {
            setCount(count + 1);
          }
          setAnimalName("");
          setInfos({});
          setDescription("");
          setCompensation("");
          setImages([]);
          setFiles([]);
          setAmount("");
          setUrgent(false);
          setExplanation("");
          setSocialNetworks({
            instagram: "",
            twitter: "",
          });
        } else {
          setStatus("error");
        }
      });
  };

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
        <Text style={{ textAlign: "center" }} fontSize={18}>
          Votre demande est en cours de traitement
        </Text>
        <Text style={{ textAlign: "center" }} fontSize={18}>
          Merci de bien vouloir patienter
        </Text>
        <ActivityIndicator size="large" color={colors.primary} />
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
        <TouchableOpacity
          style={{
            width: "35%",
            height: 60,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => fetcher()}
        >
          <Text>Envoyer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // *****************First Screen************************ //
  if (count === 1) {
    return (
      <FormFirstScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={fetcher}
        setMessage={setMessage}
        input={input}
        animalName={animalName}
        infos={infos}
        description={description}
        socialNetworks={socialNetworks}
        setSocialNetworks={setSocialNetworks}
        step={step}
        handleError={handleError}
      />
    );
  }
  // *****************Second Screen************************ //
  if (count === 2) {
    return (
      <FormSecondScreen
        setImages={setImages}
        images={images}
        setIsOn={setIsOn}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animalName={animalName}
        handleError={handleError}
        isOn={isOn}
        step={step}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={fetcher}
        setMessage={setMessage}
      />
    );
  }

  // *****************Third Screen************************ //

  if (count === 3) {
    return (
      <FormThirdScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animalName={animalName}
        input={input}
        amount={amount}
        compensation={compensation}
        step={step}
        handleError={handleError}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={fetcher}
        setMessage={setMessage}
      />
    );
  }

  // *****************Fourth Screen************************ //

  if (count === 4) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{
            alignItems: "center",
            width: "100%",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "80%",
              margin: 10,
              backgroundColor: colors.light,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 32 }}>{animalName}</Text>
            <FontAwesome
              name="close"
              size={25}
              style={{
                color: colors.danger,
                borderColor: colors.danger,
                textAlign: "right",
              }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              Votre cagnotte est-elle urgente ?
            </Text>
            <Picker
              style={{ width: 200, height: 180 }}
              selectedValue={urgent}
              onValueChange={(itemValue, itemIndex) => setUrgent(itemValue)}
            >
              <Picker.Item label="Oui" value={true} />
              <Picker.Item label="Non" value={false} />
            </Picker>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text>Dites nous pourquoi ?</Text>
            <DescriptionComponent
              placeholder={`Mon chat est entre la vie et la mort`}
              name="explanation"
              input={input}
              value={explanation}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            <Button value={"Retour"} step={step} number={-1} />
            <Button value="Suivant" step={step} number={1} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // *****************Fifth Screen************************ //

  if (count === 5) {
    const pickFile = async () => {
      // No permissions request is necessary for launching the image library
      let result = await DocumentPicker.getDocumentAsync({
        multiple: false,
      });

      if (result.type === "success") {
        setFiles([...files, { file: result.uri, name: result.name }]);
      }
    };

    function deleteFile(props) {
      const fileTODelete = files.findIndex((file) => props === file);
      const arr = files.filter((image, i) => i !== fileTODelete);
      setFiles(arr);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ModalComponent
          modalVisible={modalVisible}
          setModal={setModalVisible}
          error="Please add one evidence"
        />
        <KeyboardAvoidingView
          style={{
            alignItems: "center",
            width: "100%",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "80%",
              margin: 10,
              backgroundColor: colors.light,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 32 }}>{animalName}</Text>
            <FontAwesome
              name="close"
              size={25}
              style={{
                color: colors.danger,
                borderColor: colors.danger,
                textAlign: "right",
              }}
            />
          </View>
          <Text style={{ fontSize: 24 }}>Justificatifs</Text>
          <View
            style={{
              width: "100%",
              height: "83%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FileSelector
              value="1"
              pickFile={pickFile}
              file={files[0]}
              deleteFile={deleteFile}
              name={files[0]?.name}
            />
            {files.length ? (
              <FileSelector
                value="2"
                pickFile={pickFile}
                file={files[1]}
                deleteFile={deleteFile}
                name={files[1]?.name}
              />
            ) : null}

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 20,
              }}
            >
              <Button value="Retour" step={step} number={-1} />
              <Button
                value="Suivant"
                step={step}
                number={1}
                files={files[0]}
                error={handleError}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ***************************************************** //

  // *****************Sixth Screen************************ //

  if (count === 6) {
    const pictures = images.map((image, i) => {
      return (
        <Image
          key={i}
          source={{ uri: image }}
          style={{ width: 80, height: 80, margin: 10 }}
          resizeMode="stretch"
        />
      );
    });

    const documents = files.map((file, i) => {
      return (
        <View
          key={i}
          style={{
            alignItems: "center",
            width: "35%",
            height: 50,
            borderRadius: 8,
            borderWidth: 1,
            margin: 5,
            backgroundColor: colors.shade,
            borderColor: colors.tertiary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>{file.name}</Text>
        </View>
      );
    });

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            alignItems: "center",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "80%",
              margin: 10,
              backgroundColor: colors.light,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 32 }}>Cagnootte {animalName}</Text>
            <FontAwesome
              name="close"
              size={25}
              style={{
                color: colors.danger,
                borderColor: colors.danger,
                textAlign: "right",
              }}
            />
          </View>
          <View style={{ alignItems: "left", width: "80%", margin: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Nom de l'animal : {animalName}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Photos de l'animal :{" "}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {pictures}
            </View>
            {infos.specie && (
              <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
                Espèce : {infos.specie}
              </Text>
            )}
            {infos.breed && (
              <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
                Race : {infos.breed}
              </Text>
            )}
            {infos.age && (
              <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
                Age : {infos.age}
              </Text>
            )}
            {infos.sex && (
              <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
                Sexe : {infos.sex}
              </Text>
            )}
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Description : {description}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Cagnotte : {amount}€
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Contrepartie : {compensation}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Urgent : {urgent}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 4 }}>
              Justificatif :
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {documents}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button value="Retour" step={step} number={-1} />
            <TouchableOpacity
              style={{
                width: "35%",
                height: 60,
                borderRadius: 8,
                borderWidth: 1,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => fetcher()}
            >
              <Text>Valider</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ***************************************************** //

  // *****************Seventh Screen************************ //

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            margin: 10,
            borderRadius: 8,
            padding: 10,
            backgroundColor: colors.primary,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              borderRadius: 8,
              padding: 10,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
              Félicitation !
            </Text>
            <FontAwesome
              name="heart"
              size={25}
              style={{ color: colors.tertiary }}
            />
          </View>
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            {animalName}
          </Text>
        </View>
        <View
          style={{
            alignItems: "left",
            width: "80%",
            margin: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              margin: 10,
              textAlign: "center",
            }}
          >
            Votre annonce a bien été prise en compte
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              margin: 10,
              textAlign: "center",
            }}
          >
            Elle sera validée dans un délai de 24h
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              margin: 10,
              textAlign: "center",
            }}
          >
            Vous recevrez une notification après acceptation
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              margin: 10,
              textAlign: "center",
            }}
          >
            N'hésitez pas à aller voir nos amis à poil dans le besoin
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              margin: 10,
              textAlign: "center",
            }}
          >
            Toutes les aides sont bienvenues
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            value="Retour à l'accueil"
            navigation={navigation}
            path={"Home"}
            reset={reset}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
