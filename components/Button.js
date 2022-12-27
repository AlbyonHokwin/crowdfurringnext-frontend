import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

export default function Button({ value, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={styles.textButton}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    height: 60,
    width: '35%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textButton: {
    ...fonts.base.bold,
    color: colors.light,
  },
});