import { Image, Text, TouchableOpacity, View } from "react-native";
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
    // if (image.length >= 4)
    //   return alert("Pease delete some pictures before to add new ones");
    pickFile();
  };
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={{ margin: 25, fontSize: 18 }}>Justificatif : {value}</Text>
      <TouchableOpacity
        style={{
          width: "35%",
          height: 150,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: colors.shade,
          borderColor: colors.tertiary,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => handleNewFile()}
      >
        {file !== undefined ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ textAlign: "center" }}>{name}</Text>
            <FontAwesome
              name="trash-o"
              size={20}
              onPress={() => deleteFile(file)}
              style={{ opacity: 0.5 }}
            />
          </View>
        ) : (
          <Text>Parcourir</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}