import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import * as colors from "../styles/colors";
import DisplayPots from "../components/DisplayPots";
import { useSelector } from "react-redux";

export default function PotsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pots, setPots] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      const token = user.token;
      const url = `/pots/user`;
      fetch(`http://192.168.1.14:3000${url}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPots(data);
        });
    })();
  }, []);
  //   const draft = pots.filter((pot) => pot.draft === true);
  //   const validated = pots.filter((pot) => pot.isValidate === true);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Cagnottes</Text>
        <Switch
          trackColor={{ false: colors.shade, true: colors.secondary }}
          thumbColor={isEnabled ? colors.background : colors.background}
          ios_backgroundColor={colors.shade}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ margin: 10 }}
        />
        <Text>Participations</Text>
      </View>
      <View
        style={{
          width: "80%",
          borderBottomWidth: 1,
          borderColor: colors.shade,
        }}
      />
      <View style={{ width: "100%", margin: 20 }}>
        {/* <Text style={{ fontSize: 18, fontWeight: "600" }}>Drafts</Text>
        {DisplayPots(draft)} */}
      </View>
      {/* <View style={{ width: "100%", margin: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Validées</Text>
        {DisplayPots(pots.data.contributor)}
      </View> */}
      <View style={{ width: "100%", margin: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Contributions</Text>
        {DisplayPots(pots.data.contributor)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },
});
