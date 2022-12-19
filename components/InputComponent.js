import { Text, TextInput, View } from "react-native";
import * as colors from "../styles/colors";

export default function InputComponent({ placeholder, name, input, value }) {
  return (
    <TextInput
      style={{
        flexDirection: "column",
        width: "80%",
        height: 40,
        borderRadius: 8,
        backgroundColor: colors.shade,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        margin: 6,
      }}
      placeholder={placeholder}
      onChangeText={(value) => input(value, name)}
      value={value}
    />
  );
}
