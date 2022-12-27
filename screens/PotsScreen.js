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
import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";
import DisplayPots from "../components/DisplayPots";
import { useSelector, useDispatch } from "react-redux";
import { addPots, replacePots } from "../reducers/pots";
import ModalComponent from "../components/ModalComponent";

import { BACKEND_URL } from "../global";

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
      <View style={styles.switchContainer}>
        <Text style={isEnabled ? styles.switchName : styles.switchNameAccent}>Cagnottes</Text>
        <Switch
          trackColor={{ false: colors.shade, true: colors.secondary }}
          thumbColor={isEnabled ? colors.background : colors.background}
          ios_backgroundColor={colors.shade}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
        <Text style={isEnabled ? styles.switchNameAccent : styles.switchName}>Participations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {(isEnabled && !pots.contributor.length) && (
          <View>
            <Text style={styles.categoryName}>
              Vous n'avez pas encore participé à des cagnottes
            </Text>
          </View>
        )}
        {isEnabled && (
          <View style={styles.potsContainer}>
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
          <View>
            <Text style={styles.categoryName}>
              Vous n'avez pas encore de cagnottes
            </Text>
          </View>
        )}
        {!isEnabled && notValidated.length ? (
          <View style={styles.potsContainer}>
            <Text style={styles.categoryName}>En attente de validation</Text>
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
          <View style={styles.potsContainer}>
            <Text style={styles.categoryName}>Brouillons</Text>
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
          <View style={styles.potsContainer}>
            <Text style={styles.categoryName}>Validées</Text>
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
  switchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: colors.light,
    borderRadius: 10,
    borderColor: colors.shade,
    borderWidth: 1,
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
  switchName: {
    ...fonts.baseSmall.bold,
    color: `${colors.dark}55`,
},
  switchNameAccent: {
    ...fonts.baseSmall.bold,
    color: colors.accent,
  },
  switch: {
    marginHorizontal: 10,
  },
  scrollContainer: {
    width: "100%",
    alignItems: "center",
  },
  categoryName: {
    ...fonts.base.bold,
    color: colors.dark,
  },
  potsContainer: {
    width: '100%',
    marginVertical: 10,
  },
});
