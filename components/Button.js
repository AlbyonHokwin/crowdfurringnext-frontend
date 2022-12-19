import { Text, TouchableOpacity } from "react-native";
import * as colors from "../styles/colors";

export default function Button({ value, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: "35%",
        height: 60,
        borderRadius: 8,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
      }}
      onPress={() => onPress()}
    >
      <Text style={{ color: colors.background }}>{value}</Text>
    </TouchableOpacity>
  );
}
