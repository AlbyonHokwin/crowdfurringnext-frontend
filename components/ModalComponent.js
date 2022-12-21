import { Modal, Text, TouchableOpacity, View } from "react-native";
import * as colors from "../styles/colors";

export default function ModalComponent({
  modalVisible,
  setModal,
  setDouble,
  message,
  double,
  fetcher,
  navigation,
  id,
}) {
  let text;
  double ? (text = { oui: "Oui", non: "Non" }) : (text = { oui: "Compléter" });

  return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.backgroundModal,
          }}
        >
          <View
            style={{
              height: 200,
              width: "70%",
              borderRadius: 20,
              backgroundColor: colors.background,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontSize: 24, color: colors.icon, textAlign: "center" }}
            >
              {message}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
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
                onPress={() => {
                  setDouble(false);
                  setModal(false);
                  if (double) {
                    if (id) {
                      fetcher(id);
                    } else {
                      fetcher(true);
                    }
                  }
                }}
              >
                <Text style={{ color: "white" }}>{text.oui}</Text>
              </TouchableOpacity>
              {double && (
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
                  onPress={() => {
                    setModal(false);
                    setDouble(false);
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={{ color: "white" }}>{text.non}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
  );
}
