import * as ImagePicker from "expo-image-picker";
import CameraPicker from "../components/CameraPicker";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import ModalComponent from "./ModalComponent";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as colors from "../styles/colors";
import ImageSelector from "./ImageSelector";
import Button from "./Button";

export default function FormSecondScreen({
  setImages,
  images,
  setIsOn,
  modalVisible,
  setModalVisible,
  animalName,
  handleError,
  isOn,
  step,
  message,
  double,
  setDouble,
  fetcher,
  setMessage,
}) {
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
  const takePicture = (picture) =>
    images.length >= 4
      ? alert("Delete a picture before to add new ones")
      : setImages([...images, picture.uri]);

  return isOn ? (
    <CameraPicker active={true} takePicture={takePicture} isOn={handleCamera} />
  ) : (
    <SafeAreaView style={styles.container}>
      <ModalComponent
        modalVisible={modalVisible}
        setModal={setModalVisible}
        message={message}
        double={double}
        setDouble={setDouble}
        fetcher={fetcher}
      />

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "80%",
          margin: 10,
          backgroundColor: colors.light,
          borderRadius: 8,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 32 }}>{animalName}</Text>
        <FontAwesome
          name="close"
          size={25}
          style={{
            color: colors.danger,
            borderColor: colors.danger,
            textAlign: "right",
          }}
          onPress={() => {
            setMessage("Voulez-vous saugegarder votre cagnotte ?");
            setDouble(true);
            setModalVisible(true);
          }}
        />
      </View>

      <Text>Ajouter au minimum 3 photos de votre animal</Text>
      <ImageSelector
        title="Pick an image from camera roll"
        pickImage={pickImage}
        images={images}
        deleteImage={deleteImage}
      />
      <CameraPicker isOn={handleCamera} active={false} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 10,
        }}
      >
        <Button value={"Retour"} step={step} number={-1} />
        <Button
          value="Suivant"
          step={step}
          number={1}
          images={images[2]}
          error={handleError}
          message="Merci de compléter tous les champs"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
