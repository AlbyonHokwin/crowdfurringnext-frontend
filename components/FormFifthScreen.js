import { Text, View, StyleSheet } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as colors from "../styles/colors";
import FileSelector from "./FileSelector";

export default function FormFifthScreen({ files, setFiles }) {
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
    <>
      <Text style={{ fontSize: 24 }}>Justificatifs</Text>
      <Text style={{ fontSize: 16, margin: 10, color: colors.icon }}>
        Ils vont nous aider à valider votre annonce (carnet de santé de
        l'animal, facture du vétérinaire, etc..)
      </Text>
      <View
        style={{
          width: "100%",
          justifyContent: "space-around",
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
      </View>
    </>
  );
}
