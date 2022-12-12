import { Text, TouchableOpacity } from "react-native";

export default function Button({ value, navigation, path }) {
  return (
    <TouchableOpacity
      style={{
        width: "35%",
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#1F6F78",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 6,
      }}
      onPress={() => navigation.navigate(path)}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}
