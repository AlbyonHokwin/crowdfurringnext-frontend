import { TextInput } from "react-native";
import * as colors from "../styles/colors";

export default function InputComponent({ placeholder, name, input, value }) {
  return (
    <TextInput
      style={{
        flexDirection: "column",
        width: "80%",
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.accent,
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
