import { Text, TouchableOpacity } from "react-native";
import * as colors from "../styles/colors";

export default function Button({
  value,
  step,
  number,
  navigation = "",
  path = "",
}) {
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
        if (navigation) {
          navigation.navigate(path);
        } else {
          step(number);
        }
      }}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}
