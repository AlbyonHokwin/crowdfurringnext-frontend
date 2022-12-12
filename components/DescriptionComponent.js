import { TextInput, Keyboard } from "react-native";

export default function DescriptionComponent({ placeholder }) {
  return (
    <TextInput
      style={{
        flexDirection: "column",
        width: "80%",
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "1F6F78",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#FAFAFA",

        padding: 10,
        margin: 6,
      }}
      multiline={true}
      placeholder={placeholder}
      blurOnSubmit={true}
    />
  );
}
