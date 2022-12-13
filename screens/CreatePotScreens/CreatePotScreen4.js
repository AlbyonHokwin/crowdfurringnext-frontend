import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../../components/Button";
import CameraPicker from "../../components/CameraPicker";

import FileSelector from "../../components/FileSelector";
import * as colors from "../../styles/colors";
import * as DocumentPicker from "expo-document-picker";

export default function PotScreen4({ navigation }) {
  const [files, setFiles] = useState([]);

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
            <Button
              value="Retour"
              navigation={navigation}
              path="CreatePotScreen3"
            />
            <Button
              value="Suivant"
              navigation={navigation}
              path="CreatePotScreen5"
            />
          </View>
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
