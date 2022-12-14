import { Modal, Text, TouchableOpacity, View } from "react-native";
import * as colors from "../styles/colors";

export default function ModalComponent({ modalVisible, setModal, error }) {
  return (
    <Modal visible={modalVisible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 200,
            width: "70%",
            borderRadius: 20,
            backgroundColor: colors.secondary,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 30, textAlign: "center" }}>{error}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                width: "50%",
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
              }}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ color: "white" }}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
