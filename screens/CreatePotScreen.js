import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import InputComponent from "../components/InputComponent";
import DescriptionComponent from "../components/DescriptionComponent";
import SocialMedia from "../components/SocialMedia";
import Button from "../components/Button";

import * as colors from "../styles/colors";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import ImageSelector from "../components/ImageSelector";

import CameraPicker from "../components/CameraPicker";

import { Picker } from "@react-native-picker/picker";

import FileSelector from "../components/FileSelector";

import * as DocumentPicker from "expo-document-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CreatePotScreen({ navigation }) {
  const [isOn, setIsOn] = useState(false);
  const [membership, setMembership] = useState();

  // ***************FORM STATE*******************//

  const [animalName, setAnimalName] = useState("");
  const [city, setCity] = useState("");
  const [infos, setInfos] = useState("");
  const [description, setDescription] = useState("");
  const [compensation, setCompensation] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(1);

  //*********************************************//

  //  This function increment the state count to switch page
  const step = (value) => setCount(count + value);

  // This logic is here to set sthe state for each onChangeText prop from TextInput
  const input = (value, name) => {
    if (name === "animalName") return setAnimalName(value);
    if (name === "city") return setCity(value);
    if (name === "infos") return setInfos(value);
    if (name === "description") return setDescription(value);
    if (name === "compensation") return setCompensation(value);
  };

  // *****************First Screen************************ //

  if (count === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ width: "100%", alignItems: "center" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <InputComponent
            placeholder="Nom de l'animal*"
            name="animalName"
            input={input}
            value={animalName}
          />
          <InputComponent
            placeholder="Ville*"
            name="city"
            input={input}
            value={city}
          />
          <InputComponent
            placeholder="Infos diverses*"
            name="infos"
            input={input}
            value={infos}
          />
          <DescriptionComponent
            placeholder="Description"
            name="description"
            input={input}
            value={description}
          />
          <View style={{ width: "80%" }}>
            <SocialMedia value={"instagram"} />
            <SocialMedia value={"twitter"} />
          </View>
          <View style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
            <Button value="Suivant" step={step} number={1} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ****************************************************** //

  // *****************Second Screen************************ //

  if (count === 2) {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (images.length === 4) return;
        setImages([...images, result.assets[0].uri]);
      }
    };

    function deleteImage(props) {
      const imageToDelete = images.findIndex((image) => props === image);
      const arr = images.filter((image, i) => i !== imageToDelete);
      setImages(arr);
    }

    const handleCamera = (isOn) => setIsOn(isOn);
    const takePicture = (picture) =>
      images.length >= 4
        ? alert("Delete a picture before to add new ones")
        : setImages([...images, picture.uri]);

    return isOn ? (
      <CameraPicker
        active={true}
        takePicture={takePicture}
        isOn={handleCamera}
      />
    ) : (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            margin: 10,
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 32 }}>General Miaou</Text>
        </View>

        <Text>Ajouter au minimum 3 photos de votre animal</Text>
        <ImageSelector
          title="Pick an image from camera roll"
          pickImage={pickImage}
          images={images}
          deleteImage={deleteImage}
        />
        <CameraPicker isOn={handleCamera} active={false} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 10,
          }}
        >
          <Button value={"Retour"} step={step} number={-1} />
          <Button value="Suivant" step={step} number={1} />
        </View>
      </SafeAreaView>
    );
  }

  // ***************************************************** //

  // *****************Third Screen************************ //

  if (count === 3) {
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
              width: "80%",
              margin: 20,
              backgroundColor: colors.primary,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 32 }}>General Miaou</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
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
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text>Qu'offrez-vous en contrepartie ?</Text>
            <DescriptionComponent
              placeholder={`J'offre en contrepartie`}
              name="compensation"
              input={input}
              value={compensation}
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

  // ***************************************************** //

  // *****************Fourth Screen************************ //

  if (count === 4) {
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
              width: "80%",
              margin: 10,
              backgroundColor: colors.primary,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 32 }}>General Miaou</Text>
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
              <Button value="Suivant" step={step} number={1} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ***************************************************** //

  // *****************Fifth Screen************************ //

  if (count === 5) {
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
              alignItems: "center",
              margin: 10,
              borderRadius: 8,
              padding: 10,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              Récapitulatif de la demande de la cagnotte
            </Text>
          </View>
          <View style={{ alignItems: "left", width: "80%", margin: 30 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Nom de l'animal : General Miaou
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Ville : Paris{" "}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Photos de l'animal :{" "}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("../assets/images/instagram.png")}
                style={{ width: 80, height: 80, margin: 10 }}
                resizeMode="stretch"
              />
              <Image
                source={require("../assets/images/instagram.png")}
                style={{ width: 80, height: 80, margin: 10 }}
                resizeMode="stretch"
              />
              <Image
                source={require("../assets/images/instagram.png")}
                style={{ width: 80, height: 80, margin: 10 }}
                resizeMode="stretch"
              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Informations diverses :
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Description :
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Contrepartie :
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", margin: 10 }}>
              Justificatif :
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("../assets/images/instagram.png")}
                style={{ width: 80, height: 80, margin: 5 }}
                resizeMode="stretch"
              />
              <Image
                source={require("../assets/images/instagram.png")}
                style={{ width: 80, height: 80, margin: 5 }}
                resizeMode="stretch"
              />
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
            <Button value="Valider" step={step} number={1} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ***************************************************** //

  // *****************Sixth Screen************************ //

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
            General Miaou
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
            path={"CreatePotScreen1"}
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
    justifyContent: "space-around",
  },
});