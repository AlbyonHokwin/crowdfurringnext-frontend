import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as colors from "../styles/colors";

export default function ImageSelector({ pickImage, images, deleteImage }) {
  const image = images.map((image, i) => {
    return (
      <View key={i}>
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 80, margin: 8 }}
        />
        <FontAwesome
          name="trash-o"
          size={20}
          onPress={() => deleteImage(image)}
          style={{ opacity: 0.5 }}
        />
      </View>
    );
  });

  const handleNewPicture = () => {
    if (image.length >= 4)
      return alert(
        "Merci de supprimer une photo avant d'en ajouter une nouvelle"
      );
    pickImage();
  };

  return (
    <TouchableOpacity
      style={{
        width: "80%",
        height: "55%",
        borderRadius: 8,
        backgroundColor: colors.shade,
        alignItems: "center",
      }}
      onPress={() => handleNewPicture()}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, textAlign: "center", margin: 20 }}>
          Appuyer pour ajouter vos photos
        </Text>
        {images.length ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {image}
          </View>
        ) : (
          <FontAwesome name="image" size={84} style={{ opacity: 0.5 }} />
        )}
      </View>
    </TouchableOpacity>
  );
}
