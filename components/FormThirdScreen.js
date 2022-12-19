import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputComponent from "./InputComponent";
import DescriptionComponent from "./DescriptionComponent";

export default function FormThirdScreen({ input, amount, compensation }) {
  return (
    <>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text>Montant de votre cagnotte</Text>
        <InputComponent
          placeholder="200"
          name="amount"
          input={input}
          value={amount}
        />
        <Text>Qu'offrez-vous en contrepartie ?</Text>
        <DescriptionComponent
          placeholder={`J'offre en contrepartie`}
          name="compensation"
          input={input}
          value={compensation}
        />
      </View>
    </>
  );
}
