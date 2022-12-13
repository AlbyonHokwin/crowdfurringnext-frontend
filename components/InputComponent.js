import { TextInput } from "react-native";
import * as colors from "../styles/colors";

export default function InputComponent({ placeholder }) {
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
    />
  );
}
