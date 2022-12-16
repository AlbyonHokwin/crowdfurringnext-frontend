import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "./Button";
import ModalComponent from "./ModalComponent";
import SocialMedia from "./SocialMedia";
import * as colors from "../styles/colors";
import InputComponent from "./InputComponent";
import DescriptionComponent from "./DescriptionComponent";

export default function FirstScreen({
  modalVisible,
  setModalVisible,
  message,
  double,
  setDouble,
  fetcher,
  setMessage,
  input,
  animalName,
  infos,
  description,
  socialNetworks,
  setSocialNetworks,
  step,
  handleError,
}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.light,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ModalComponent
        modalVisible={modalVisible}
        setModal={setModalVisible}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={fetcher}
      />
      <KeyboardAvoidingView
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "80%",
            margin: 10,
            backgroundColor: colors.light,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 32 }}>Cagnotte</Text>
          <FontAwesome
            name="close"
            size={25}
            style={{
              color: colors.danger,
              borderColor: colors.danger,
              textAlign: "right",
            }}
            onPress={() => {
              setMessage("Voulez-vous saugegarder votre cagnotte ?");
              setDouble(true);
              setModalVisible(true);
            }}
          />
        </View>
        <InputComponent
          placeholder="Nom de l'animal*"
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
        <View style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
          <Button
            value="Suivant"
            step={step}
            number={1}
            animalName={animalName}
            infos={infos}
            description={description}
            error={handleError}
            message="Merci de compléter tous les champs"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
