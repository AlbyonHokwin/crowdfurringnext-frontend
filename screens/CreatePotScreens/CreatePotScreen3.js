import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../../components/Button";
import { Picker } from "@react-native-picker/picker";
import DescriptionComponent from "../../components/DescriptionComponent";

export default function PotScreen3({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          alignItems: "center",
          width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            alignItems: "center",
            width: "80%",
            margin: 20,
            backgroundColor: "#1F6F78",
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 32 }}>General Miaou</Text>
        </View>
        <View
          style={{ alignItems: "center", justifyContent: "center", padding: 1 }}
        >
          <Text style={{ fontSize: 24, textAlign: "center" }}>
            Faites-vous partie d'une association ?
          </Text>
          <Picker
            style={{ width: 200 }}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Oui" value="Oui" />
            <Picker.Item label="Non" value="Non" />
          </Picker>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text>Qu'offrez-vous en contrepartie ?</Text>
          <DescriptionComponent placeholder={`J'offre en contrepartie`} />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <Button
            value={"Retour"}
            navigation={navigation}
            path="CreatePotScreen2"
          />
          <Button
            value="Suivant"
            navigation={navigation}
            path="CreatePotScreen4"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
