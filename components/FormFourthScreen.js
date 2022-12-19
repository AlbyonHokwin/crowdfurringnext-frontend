import { Text, View } from "react-native";

import { Picker } from "@react-native-picker/picker";
import DescriptionComponent from "./DescriptionComponent";

export default function FormFourthScreen({
  urgent,
  setUrgent,
  input,
  explanation,
}) {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
        }}
      >
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Votre cagnotte est-elle urgente ?
        </Text>
        <Picker
          style={{ width: 200, height: 180 }}
          selectedValue={urgent}
          onValueChange={(itemValue, itemIndex) => setUrgent(itemValue)}
        >
          <Picker.Item label="Oui" value={true} />
          <Picker.Item label="Non" value={false} />
        </Picker>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text>Dites nous pourquoi ?</Text>
        <DescriptionComponent
          placeholder={`Mon chat est entre la vie et la mort`}
          name="explanation"
          input={input}
          value={explanation}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      ></View>
    </>
  );
}
