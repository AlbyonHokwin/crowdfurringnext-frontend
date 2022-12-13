import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import Button from "../../components/Button";
import CameraPicker from "../../components/CameraPicker";

import FileSelector from "../../components/FileSelector";
import * as colors from "../../styles/colors";
import * as DocumentPicker from "expo-document-picker";

export default function PotScreen5({ navigation }) {
  const [files, setFiles] = useState([{}]);

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
    console.log(props);
    const fileTODelete = files.findIndex((file) => props === file);
    const arr = files.filter((image, i) => i !== fileTODelete);
    setFiles(arr);
  }

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
              source={require("../../assets/images/instagram.png")}
              style={{ width: 80, height: 80, margin: 10 }}
              resizeMode="stretch"
            />
            <Image
              source={require("../../assets/images/instagram.png")}
              style={{ width: 80, height: 80, margin: 10 }}
              resizeMode="stretch"
            />
            <Image
              source={require("../../assets/images/instagram.png")}
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
              source={require("../../assets/images/instagram.png")}
              style={{ width: 80, height: 80, margin: 5 }}
              resizeMode="stretch"
            />
            <Image
              source={require("../../assets/images/instagram.png")}
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
          <Button
            value="Retour"
            navigation={navigation}
            path="CreatePotScreen4"
          />
          <Button
            value="Valider"
            navigation={navigation}
            path="CreatePotScreen6"
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
    justifyContent: "flex-start",
  },
});
