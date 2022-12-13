import { Text, TouchableOpacity } from "react-native";
import * as colors from "../styles/colors";

export default function Button({ value, navigation, path }) {
  return (
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
      onPress={() => {
        navigation.navigate(path);
      }}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}
