import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import InputComponent from "./InputComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as colors from "../styles/colors";

export default function FormThirdScreen({ input, amount, newCompensation, compensations, addCompensation, deleteCompensation }) {
  const displayCompensations = compensations.map((compensation, i) => {
    return (
      <View key={i} style={styles.compensationContainer}>
        <Feather name="check" size={20} color={colors.dark} />
        <Text style={styles.compensationText}>{compensation}</Text>
        <FontAwesome name="close" size={30} color={colors.danger} onPress={() => deleteCompensation(compensation)}/>
      </View>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Montant de votre cagnotte</Text>
        <InputComponent
          placeholder="Valeur"
          name="amount"
          input={input}
          value={amount}
          flexGrow={1}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.text}>Qu'offrez-vous en contrepartie ?</Text>
        {displayCompensations}
        <View style={styles.smallDivider} />
        <View style={styles.newCompensation}>
          <InputComponent
            placeholder="Contrepartie"
            name="compensation"
            input={input}
            value={newCompensation}
            flexGrow={1}
          />
          <FontAwesome name="plus-circle" size={30} color={colors.secondary} style={styles.buttonAdd} onPress={addCompensation} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    minWidth: '80%',
    maxWidth: '80%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 10,
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 40,
  },
  smallDivider: {
    minWidth: '60%',
    maxWidth: '60%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: colors.shade,
    marginVertical: 10,
  },
  compensationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.tertiary,
    borderColor: colors.shade,
    borderWidth: 1,
    borderRadius: 10,
  },
  compensationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    marginLeft: 10,
    marginVertical: 10,
    flexGrow: 1,
  },
  newCompensation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonAdd: {
    marginLeft: 10,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});