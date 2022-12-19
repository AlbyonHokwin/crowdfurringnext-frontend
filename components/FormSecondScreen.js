import * as ImagePicker from "expo-image-picker";
import CameraPicker from "./CameraPicker";
import { Text, View } from "react-native";

import ImageSelector from "./ImageSelector";

export default function FormSecondScreen({ setImages, images, setIsOn }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (images.length === 4) return;
      setImages([...images, result.assets[0].uri]);
    }
  };

  function deleteImage(props) {
    const imageToDelete = images.findIndex((image) => props === image);
    const arr = images.filter((image, i) => i !== imageToDelete);
    setImages(arr);
  }

  const handleCamera = (isOn) => setIsOn(isOn);

  return (
    <>
      <View style={{ margin: 10 }}>
        <Text style={{ fontWeight: "600" }}>
          Ajouter au minimum 3 photos de votre animal
        </Text>
      </View>
      <ImageSelector
        title="Pick an image from camera roll"
        pickImage={pickImage}
        images={images}
        deleteImage={deleteImage}
      />
      <CameraPicker isOn={handleCamera} active={false} />
    </>
  );
}
