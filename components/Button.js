import { Text, TouchableOpacity } from "react-native";
import * as colors from "../styles/colors";

export default function Button({
  value,
  step,
  number,
  navigation = "",
  path = "",
  reset,
  error,
  ...rest
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
          reset(1);
        } else if (Object.keys(rest).every((key) => !!rest[key])) {
          step(number);
        } else {
          error();
        }
      }}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}
