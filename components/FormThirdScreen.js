import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ModalComponent from "./ModalComponent";
import * as colors from "../styles/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import InputComponent from "./InputComponent";
import DescriptionComponent from "./DescriptionComponent";
import Button from "./Button";

export default function FormThirdScreen({
  modalVisible,
  setModalVisible,
  animalName,
  input,
  amount,
  compensation,
  step,
  handleError,
  message,
  double,
  setDouble,
  fetcher,
  setMessage,
}) {
  return (
    <SafeAreaView style={styles.container}>
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
          width: "100%",
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
          <Text style={{ fontSize: 32 }}>{animalName}</Text>
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <Button value={"Retour"} step={step} number={-1} />
          <Button
            value="Suivant"
            step={step}
            number={1}
            amount={amount}
            error={handleError}
            message="Merci de renseigner un montant"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
