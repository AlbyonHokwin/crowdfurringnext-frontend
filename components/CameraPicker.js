import { Camera, CameraType, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as colors from "../styles/colors";

export default function CameraPicker({ isOn, active, takePicture }) {
  const [hasPermission, setHasPermission] = useState(active);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const handlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    isOn(status === "granted");
  };

  let cameraRef = useRef(null);

  const handlePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    isOn(false);
    takePicture(photo);
  };

  if (!hasPermission) {
    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: 300,
          height: 100,
          borderRadius: 8,

          backgroundColor: colors.shade,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => handlePermission()}
      >
        <Text>Prendre une photo</Text>
        <FontAwesome name="camera" size={62} style={{ opacity: 0.5 }} />
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
        onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
        }}
      />
      <FontAwesome
        name="circle-thin"
        size={25}
        onPress={() => handlePicture()}
      />
      <FontAwesome
        name="flash"
        size={25}
        onPress={() => {
          setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off);
        }}
      />
    </Camera>
  );
}
