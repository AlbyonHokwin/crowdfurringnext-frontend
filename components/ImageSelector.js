import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ImageSelector({ pickImage, images, deleteImage }) {
  const image = images.map((image, i) => {
    return (
      <View key={i}>
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, margin: 8 }}
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
      return alert("Pease delete some pictures before to add new ones");
    pickImage();
  };

  return (
    <TouchableOpacity
      style={{
        width: "80%",
        height: "65%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#1F6F78",
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
