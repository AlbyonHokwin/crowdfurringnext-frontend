import { TextInput, Keyboard } from "react-native";
import * as colors from "../styles/colors";

export default function DescriptionComponent({
  placeholder,
  input,
  name,
  value,
}) {
  return (
    <TextInput
      style={{
        flexDirection: "column",
        width: "80%",
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.accent,
        backgroundColor: colors.shade,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: colors.shade,

        padding: 10,
        margin: 6,
      }}
      multiline={true}
      placeholder={placeholder}
      blurOnSubmit={true}
      onChangeText={(value) => input(value, name)}
      value={value}
    />
  );
}
