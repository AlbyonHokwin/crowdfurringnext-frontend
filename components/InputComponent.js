import { StyleSheet, Text, TextInput, View } from "react-native";
import * as colors from "../styles/colors";

export default function InputComponent({ placeholder, name, input, value }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(value) => input(value, name)}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minWidth: "80%",
    maxWidth: "80%",
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