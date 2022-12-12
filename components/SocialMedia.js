import { Image, View, TextInput } from "react-native";

export default function SocialMedia({ value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          maxHeight: 60,
          maxWidth: 60,
        }}
        source={
          value === "instagram"
            ? require("../assets/images/instagram.png")
            : require("../assets/images/twitter.png")
        }
      />
      <TextInput
        placeholder={
          value === "instagram"
            ? "Compte instagram de l'animal"
            : "Compte twitter de l'animal"
        }
      />
    </View>
  );
}
