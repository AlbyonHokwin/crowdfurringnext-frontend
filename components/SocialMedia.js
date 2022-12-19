import { Image, View, TextInput } from "react-native";

export default function SocialMedia({
  name,
  socialNetworks,
  setSocialNetworks,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          maxHeight: 40,
          maxWidth: 40,
        }}
        source={
          name === "instagram"
            ? require("../assets/images/instagram.png")
            : require("../assets/images/twitter.png")
        }
      />
      <TextInput
        placeholder={
          name === "instagram"
            ? "Compte instagram de l'animal"
            : "Compte twitter de l'animal"
        }
        value={
          name === "instagram"
            ? socialNetworks.instagram
            : socialNetworks.twitter
        }
        onChangeText={(value) =>
          name === "instagram"
            ? setSocialNetworks({ ...socialNetworks, instagram: value })
            : setSocialNetworks({ ...socialNetworks, twitter: value })
        }
      />
    </View>
  );
}
