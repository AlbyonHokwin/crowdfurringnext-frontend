import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import * as colors from "../styles/colors";
import DisplayPots from "../components/DisplayPots";
import { useSelector, useDispatch } from "react-redux";
import { addPots, replacePots } from "../reducers/pots";
import ModalComponent from "../components/ModalComponent";

export default function PotsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [double, setDouble] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const pots = useSelector((state) => state.pots.value);

  const draft = pots.request.filter((pot) => pot.draft);
  const validated = pots.request.filter((pot) => pot.isValidate);
  const notValidated = pots.request.filter((pot) => !pot.isValidate && !pot.draft);

  let boolean = true;

  const BACKEND_URL = 'http://192.168.158.89:3000';

  function handleSubmit(id) {
    fetch(`${BACKEND_URL}/pots/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(replacePots(data.data));
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ModalComponent
        modalVisible={modalVisible}
        setModal={setModalVisible}
        message="Souhaitez-vous clôturer votre cagnotte ?"
        double={double}
        setDouble={setDouble}
        fetcher={() => handleSubmit(id)}
        navigation={navigation}
        id={id}
      />
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

      <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center" }} showsVerticalScrollIndicator={false}>
        {(isEnabled && !pots.contributor.length) && (
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Vous n'avez pas encore participé à des cagnottes
            </Text>
          </View>
        )}
        {isEnabled && (
          <View style={{ width: "100%", margin: 10 }}>
            {DisplayPots(
              pots.contributor,
              navigation,
              setModalVisible,
              setId,
              setDouble
            )}
          </View>
        )}

        {!isEnabled && !draft.length && !validated.length && (
          <View style={{ margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Vous n'avez pas encore de cagnottes
            </Text>
          </View>
        )}
        {!isEnabled && notValidated.length ? (
          <View style={{ width: "100%", margin: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>En attente de validation</Text>
            {DisplayPots(
              notValidated,
              navigation,
              setModalVisible,
              setId,
              setDouble,
              boolean
            )}
          </View>
        ) : null}

        {!isEnabled && draft.length ? (
          <View style={{ width: "100%", margin: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Brouillons</Text>
            {DisplayPots(
              draft,
              navigation,
              setModalVisible,
              setId,
              setDouble,
              boolean
            )}
          </View>
        ) : null}

        {!isEnabled && validated.length ? (
          <View style={{ width: "100%", margin: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Validées</Text>
            {DisplayPots(
              validated,
              navigation,
              setModalVisible,
              setId,
              setDouble,
              boolean
            )}
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight + 20,
  },
});
