import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Platform,
} from "react-native";
import SocialMedia from "./SocialMedia";
import InputComponent from "./InputComponent";
import DescriptionComponent from "./DescriptionComponent";

export default function FirstScreen({
  input,
  animalName,
  infos,
  description,
  socialNetworks,
  setSocialNetworks,
}) {
  return (
    <>
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
      <View style={{ width: "80%" }}>
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
    </>
  );
}
