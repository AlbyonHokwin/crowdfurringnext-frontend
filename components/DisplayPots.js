import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import * as colors from "../styles/colors";

export default function DisplayPots(pots) {
  return pots.map((pot, i) => {
    return (
      <View
        key={i}
        style={{
          width: "90%",
          height: 120,
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ width: "30%", height: "100%", marginRight: 10 }}>
          <Image
            source={{
              uri: pot.pictures[0],
              width: "100%",
              height: "100%",
            }}
            style={{ borderRadius: 10 }}
          />
        </View>
        <View style={{ width: "60%", alignItems: "center" }}>
          <Text>{pot.animalName}</Text>
          <Text>
            {pot.currentAmount} / {pot.targetAmount}€
          </Text>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              marginTop: 10,
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
                  width: `${(pot.currentAmount / pot.targetAmount) * 100}%`,
                })
              }
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                width: "30%",
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <Text style={{ color: "white" }}>Voir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.secondary,
                width: "30%",
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <Text style={{ color: "white" }}>Gérer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  });
}
