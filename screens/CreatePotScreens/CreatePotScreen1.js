import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import InputComponent from "../../components/InputComponent";
import DescriptionComponent from "../../components/DescriptionComponent";
import SocialMedia from "../../components/SocialMedia";
import Button from "../../components/Button";

export default function PotScreen1({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <InputComponent placeholder="Nom de l'animal*" />
      <InputComponent placeholder="Ville*" />
      <InputComponent placeholder="Infos diverses*" />
      <DescriptionComponent placeholder="Description" />
      <View style={{ width: "80%" }}>
        <SocialMedia value={"instagram"} />
        <SocialMedia value={"twitter"} />
      </View>
      <View style={{ width: "100%", alignItems: "flex-end", padding: 10 }}>
        <Button
          navigation={navigation}
          value="Suivant"
          path="CreatePotScreen2"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
