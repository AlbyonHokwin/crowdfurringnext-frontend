import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import ImageSelector from "../../components/ImageSelector";

import Button from "../../components/Button";
import CameraPicker from "../../components/CameraPicker";

export default function PotScreen2({ navigation }) {
  const [images, setImages] = useState([]);

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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          width: "80%",
          margin: 20,
          backgroundColor: "#1F6F78",
          borderRadius: 8,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 32 }}>General Miaou</Text>
      </View>
      <View>
        <Text>Ajouter au minimum 3 photos de votre animal</Text>
        <ImageSelector
          title="Pick an image from camera roll"
          pickImage={pickImage}
          images={images}
          deleteImage={deleteImage}
        />
      </View>
      {/* <CameraPicker /> */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          value={"Retour"}
          navigation={navigation}
          path="CreatePotScreen1"
        />
        <Button
          value="Suivant"
          navigation={navigation}
          path="CreatePotScreen3"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
