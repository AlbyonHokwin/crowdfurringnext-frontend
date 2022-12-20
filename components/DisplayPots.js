import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as colors from "../styles/colors";

export default function DisplayPots(
  pots,
  navigation,
  setModalVisible,
  setId,
  setDouble,
  boolean
) {
  return pots.map((pot, i) => {
    const slug = pot.slug;
    return (
      <View
        key={i}
        style={styles.potContainer}
      >
        <View style={{ width: "30%", height: "100%" }}>
          <Image
            source={{
              uri: pot.pictures[0],
              width: "100%",
              height: "100%",
            }}
            style={{ borderTopLeftRadius: 9, borderBottomLeftRadius: 9 }}
          />
        </View>
        <View style={{ width: "60%", justifyContent: "space-around", alignItems: "center" }}>
          <Text style={styles.animalName}>{pot.animalName}</Text>
          <Text style={styles.amount}>{pot.currentAmount} / {pot.targetAmount}€</Text>
          <View
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: colors.shade,
              height: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={
                ([StyleSheet.absoluteFill],
                {
                  backgroundColor: colors.secondary,
                  borderRadius: 10,
                  width: `${Math.min(1, (pot.currentAmount / pot.targetAmount)) * 100}%`,
                })
              }
            />
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: `${boolean ? "space-between" : "center"}`,
              paddingBottom: 5,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Pot", { slug })}
            >
              <Text style={styles.textButton}>Voir</Text>
            </TouchableOpacity>
            {boolean && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setId(pot._id);
                  setModalVisible(true);
                  setDouble(true);
                }}
              >
                <Text style={styles.textButton}>Clôturer</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  potContainer: {
    width: "90%",
    height: 120,
    margin: 10,
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  amount: {
    fontSize: 16,
    color: colors.dark,
  },
  button: {
    width: "30%",
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
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
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light,
  },
});