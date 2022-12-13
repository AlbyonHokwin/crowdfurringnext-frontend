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

import * as colors from "../../styles/colors";
import * as DocumentPicker from "expo-document-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";

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
            path="CreatePotScreen1"
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
