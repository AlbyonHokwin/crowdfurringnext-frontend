import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as colors from "../styles/colors";

export default function FileSelector({
  value,
  pickFile,
  file,
  deleteFile,
  name,
}) {
  const handleNewFile = () => {
    pickFile();
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Justificatif : {value}</Text>
      <TouchableOpacity style={styles.fileContainer} onPress={!file ? () => handleNewFile() : undefined} activeOpacity={!file ? 0.8 : 1}>
        {file !== undefined ? (
          <>
            <Text style={styles.fileName}>{name}</Text>
            <FontAwesome
              name="trash"
              size={30}
              color={colors.accent}
              onPress={() => deleteFile(file)}
            />
          </>
        ) : (
          <Text style={styles.parcourir}>Parcourir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    maxWidth: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  fileContainer: {
    minWidth: "80%",
    maxWidth: "80%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.light,
    borderRadius: 10,
    borderColor: colors.shade,
    borderWidth: 1,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fileName: {
    fontSize: 16,
    color: colors.dark
  },
  parcourir: {
    fontSize: 20,
    color: colors.dark,
    flexGrow: 1,
    textAlign: 'center',
  },
});