import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Platform,
  StyleSheet,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "./Button";
import * as colors from "../styles/colors";

export default function FormSeventhScreen({ animalName, setPage, navigation }) {
  function backHome() {
    navigation.navigate("Home");
    setPage(1);
  }

  return (
    <>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",

          padding: 10,
          backgroundColor: colors.primary,
        }}
      >
        <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
          Félicitation !
        </Text>
        <FontAwesome
          name="heart"
          size={25}
          style={{ color: colors.tertiary }}
        />

        <Text style={{ fontSize: 24, textAlign: "center" }}>{animalName}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          margin: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            margin: 10,
            textAlign: "center",
          }}
        >
          Votre annonce a bien été prise en compte
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            margin: 10,
            textAlign: "center",
          }}
        >
          Elle sera validée dans un délai de 24h
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            margin: 10,
            textAlign: "center",
          }}
        >
          Vous recevrez une notification après acceptation
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            margin: 10,
            textAlign: "center",
          }}
        >
          N'hésitez pas à aller voir nos amis à poil dans le besoin
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            margin: 10,
            textAlign: "center",
          }}
        >
          Toutes les aides sont bienvenues
        </Text>
        <Button onPress={() => backHome()} value="Retour aux cagnottes" />
      </View>
    </>
  );
}
