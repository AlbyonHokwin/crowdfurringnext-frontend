import { Text, View, StyleSheet, ScrollView } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
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

  const displayedFiles = files.map((file, i) => {
    return (
      <FileSelector
        key={i}
        value={i + 1}
        pickFile={pickFile}
        file={file}
        deleteFile={deleteFile}
        name={file.name}
      />
    );
  })

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Justificatifs</Text>
      <Text style={{ fontSize: 16, marginVertical: 10, color: colors.icon }}>
        Ils vont nous aider à valider votre annonce (carnet de santé de
        l'animal, facture du vétérinaire, etc..)
      </Text>
        <ScrollView contentContainerStyle={styles.selectFilesContainer} showsVerticalScrollIndicator={false}>
          {displayedFiles}
          <FileSelector
            value="Nouveau"
            pickFile={pickFile}
          />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectFilesContainer: {
    minWidth: '100%',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    ...fonts.baseSmall.bold,
    color: colors.dark,
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
});