import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Platform,
} from "react-native";
import SocialMedia from "./SocialMedia";
import InputComponent from "./InputComponent";
import DescriptionComponent from "./DescriptionComponent";
import * as colors from "../styles/colors";


export default function FirstScreen({
  input,
  animalName,
  infos,
  description,
  socialNetworks,
  setSocialNetworks,
}) {
  return (
    <View style={styles.container}>
      <View>
        <InputComponent
          placeholder="Nom de l'animal"
          name="animalName"
          input={input}
          value={animalName}
        />
        <InputComponent
          placeholder="Espèce"
          name="specie"
          input={input}
          value={infos.specie}
        />
        <InputComponent
          placeholder="Race"
          name="breed"
          input={input}
          value={infos.breed}
        />
        <InputComponent
          placeholder="Age"
          name="age"
          input={input}
          value={infos.age}
        />
        <InputComponent
          placeholder="Sexe"
          name="sex"
          input={input}
          value={infos.sex}
        />
        <DescriptionComponent
          placeholder="Description"
          name="description"
          input={input}
          value={description}
        />
      </View>

      <View style={styles.divider} />

      <View>
        <SocialMedia
          name={"instagram"}
          socialNetworks={socialNetworks}
          setSocialNetworks={setSocialNetworks}
        />
        <SocialMedia
          name={"twitter"}
          socialNetworks={socialNetworks}
          setSocialNetworks={setSocialNetworks}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
});