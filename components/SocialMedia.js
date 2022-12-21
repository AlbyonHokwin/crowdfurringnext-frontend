import { StyleSheet, Image, View, TextInput } from "react-native";
import * as colors from "../styles/colors";

export default function SocialMedia({
  name,
  socialNetworks,
  setSocialNetworks,
}) {
  return (
    <View style={styles.container}>
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
        style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    minWidth: '80%',
    maxWidth: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    marginLeft: 10,
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.shade,
    color: colors.dark,
    marginVertical: 5,
  },
});