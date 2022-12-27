import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "./Button";
import { colors } from "../styles/colors";

export default function FormSeventhScreen({ animalName, setPage, navigation }) {
  function backHome() {
    navigation.navigate("Home");
    setPage(1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Votre annonce pour </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome
              name="heart"
              size={20}
              style={{ color: colors.tertiary }}
            />
            <Text style={styles.headerText}> {animalName} </Text>
          </View>
          <Text style={styles.headerText}>a bien été prise en compte</Text>
        </View>

        <Text style={styles.text}>
          Elle sera validée dans un délai de 48h
        </Text>
        <Text style={styles.text}>
          Vous recevrez une notification après acceptation
        </Text>
        <Text style={styles.text}>
          N'hésitez pas à aller voir nos amis à poil dans le besoin
        </Text>
        <Text style={styles.text}>
          Toutes les aides sont bienvenues
        </Text>


        {/* <Button onPress={() => backHome()} value="Retour aux cagnottes" /> */}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => backHome()}>
        <Text style={styles.textButton}>Retour aux cagnottes</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: "100%",
  },
  header: {
    minWidth: '80%',
    maxWidth: '80%',
    marginBottom: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    marginVertical: 3,
    color: colors.dark,
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginVertical: 5,
  },
  button: {
    minWidth: '80%',
    maxWidth: '80%',
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    width: "70%",
  },
  textButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.light,
  },
});