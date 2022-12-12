import { TextInput } from "react-native";

export default function InputComponent({ placeholder }) {
  return (
    <TextInput
      style={{
        flexDirection: "column",
        width: "80%",
        height: 60,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "1F6F78",
        backgroundColor: "#FAFAFA",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        margin: 6,
      }}
      placeholder={placeholder}
    />
  );
}
