import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../styles/colors";

export default function InputComponent({ placeholder, name, input, value, flexGrow }) {
  return (
    <TextInput
      style={[styles.input, flexGrow ? { flexGrow: flexGrow } : { minWidth: "80%", maxWidth: "80%" }]}
      placeholder={placeholder}
      onChangeText={(value) => input(value, name)}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    marginVertical: 5,
  },
  error: {
    color: colors.light,
    backgroundColor: colors.backgroundError,
    borderColor: colors.borderError,
  },
});