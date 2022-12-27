import * as ImagePicker from "expo-image-picker";
import CameraPicker from "./CameraPicker";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../styles/colors";

import ImageSelector from "./ImageSelector";

export default function FormSecondScreen({ setImages, images, setIsOn }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
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
    <View style={styles.container}>
      <View style={styles.selectImagesContainer}>
        <Text style={styles.text}>
          Ajouter au minimum 3 photos de votre animal
        </Text>
        <ImageSelector
          title="Pick an image from camera roll"
          pickImage={pickImage}
          images={images}
          deleteImage={deleteImage}
        />
      </View>

      <View style={styles.divider} />

      <CameraPicker isOn={handleCamera} active={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectImagesContainer: {
    flexGrow: 1,
    minWidth: '100%',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
});