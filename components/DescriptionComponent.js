import { StyleSheet, TextInput, Keyboard } from "react-native";
import { colors } from "../styles/colors";

export default function DescriptionComponent({
  placeholder,
  input,
  name,
  value,
}) {
  return (
    <TextInput
      style={styles.input}
      multiline={true}
      placeholder={placeholder}
      blurOnSubmit={true}
      onChangeText={(value) => input(value, name)}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minWidth: "80%",
    maxWidth: "80%",
    minHeight: 100,
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    marginVertical: 5,
    textAlignVertical: 'top',
  },
  error: {
    color: colors.light,
    backgroundColor: colors.backgroundError,
    borderColor: colors.borderError,
  },
});