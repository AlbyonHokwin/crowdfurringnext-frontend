import { Camera, CameraType, FlashMode } from "expo-camera";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function CameraPicker({ isOn, active }) {
  const [hasPermission, setHasPermission] = useState(active);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);

  const handlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    isOn(status === "granted");
    setHasPermission(status === "granted");
  };

  let cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log(photo);
  };

  if (!hasPermission) {
    return (
      <TouchableOpacity
        style={{
          width: "70%",
          height: 100,
          borderRadius: 8,
          borderWidth: 2,
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
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={(ref) => (cameraRef = ref)}
      type={type}
      flashMode={flash}
    >
      <FontAwesome
        name="circle-thin"
        size={25}
        onPress={() => takePicture()}
      ></FontAwesome>
      <FontAwesome
        name="rotate-right"
        size={25}
        onPress={() => {
          setType(
            type === CameraType.back ? CameraType.front : CameraType.back
          );
        }}
      ></FontAwesome>
      <FontAwesome
        name="flash"
        size={25}
        onPress={() => {
          setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off);
        }}
      ></FontAwesome>
    </Camera>
  );
}
