import { Text, TouchableOpacity } from "react-native";

export default function Button({ value, navigation, path, color = "#1F6F78" }) {
  return (
    <TouchableOpacity
      style={{
        width: "35%",
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        navigation.navigate(path);
      }}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}
