import { Camera, CameraType, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/colors";

export default function CameraPicker({ isOn, active, takePicture }) {
  const [hasPermission, setHasPermission] = useState(active);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isLoading, setIsLoading] = useState(false);

  const handlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    isOn(status === "granted");
  };

  let cameraRef = useRef(null);

  const handlePicture = async () => {
    setIsLoading(true);
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    setIsLoading(false);
    isOn(false);
    takePicture(photo);
  };

  if (!hasPermission) {
    return (
      <TouchableOpacity style={styles.button}
        onPress={() => handlePermission()}
      >
        <Text>Prendre une photo</Text>
        <FontAwesome name="camera" size={62} color={colors.secondary} />
      </TouchableOpacity>
    );
  }

  return (
    <Camera
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingBottom: 50,
      }}
      ref={(ref) => (cameraRef = ref)}
      type={type}
      flashMode={flash}
      ratio="16:9"
    >
      <FontAwesome
        name="rotate-right"
        size={25}
        color={colors.light}
        onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
        }}
      />

      {!isLoading ?
        <FontAwesome
          name="circle-thin"
          size={50}
          color={colors.light}
          onPress={() => handlePicture()}
        /> :
        <ActivityIndicator
          style={{ margin: 10 }}
          size="large"
          color={colors.primary}
        />}

      <FontAwesome
        name="flash"
        size={25}
        color={colors.light}
        onPress={() => {
          setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off);
        }}
      />
    </Camera>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 100,
    marginVertical: 10,
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
})