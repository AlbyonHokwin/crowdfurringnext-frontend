import { Text, View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

import { Picker } from "@react-native-picker/picker";
import DescriptionComponent from "./DescriptionComponent";

export default function FormFourthScreen({
  urgent,
  setUrgent,
  input,
  explanation,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Votre cagnotte est-elle urgente ?
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={urgent}
          onValueChange={(itemValue, itemIndex) => setUrgent(itemValue)}
        >
          <Picker.Item style={styles.label} label="Oui" value={true} />
          <Picker.Item style={styles.label} label="Non" value={false} />
        </Picker>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.text}>Dites nous pourquoi ?</Text>
        <DescriptionComponent
          placeholder={`Ex : Mon chat est entre la vie et la mort...`}
          name="explanation"
          input={input}
          value={explanation}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minWidth: '100%',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    minWidth: '100%',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    ...fonts.baseBig.normal,
    color: colors.dark,
    marginBottom: 10,
  },
  picker: {
    minWidth: '25%',
    maxWidth: '25%',
    height: 50,
    backgroundColor: colors.light,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    ...fonts.base.bold,
    color: colors.dark,
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 40,
  },
});