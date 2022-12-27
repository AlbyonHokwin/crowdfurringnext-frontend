import { Image, Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/colors";

export default function ImageSelector({ pickImage, images, deleteImage }) {
  const displayedImages = images.map((image, i) => {
    return (
      <View key={i}>
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, margin: 8, borderRadius: 10 }}
        />
        <FontAwesome
          name="trash"
          size={30}
          color={colors.accent}
          onPress={() => deleteImage(image)}
          style={styles.trash}
        />
      </View>
    );
  });

  const handleNewPicture = () => {
    pickImage();
  };

  return (
    <View style={styles.container}>
      {
        displayedImages.length ? (
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {displayedImages}
          </ScrollView>
        ) : (
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => handleNewPicture()}>
            <FontAwesome name="image" size={84} color={colors.secondary} />
          </TouchableOpacity>
        )
      }

      <View style={styles.divider} />

      <FontAwesome name="plus-circle" size={50} color={colors.secondary} style={styles.buttonAdd} onPress={() => handleNewPicture()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: colors.light,
    borderColor: colors.shade,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
  button: {
    width: 50,
    height: 50,
    marginBottom: 10,
    backgroundColor: colors.secondary,
    borderRadius: 1000,
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
  textButton: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.light,
  },
  buttonAdd: {
    marginBottom: 10,
    borderRadius: 1000,
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
  trash: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  }
})