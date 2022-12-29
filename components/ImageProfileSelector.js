import { TouchableOpacity, Image, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

export default function ImageProfilePicker({ image, setImage, setIsOn, size }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let usedSize;

  +size ?
    usedSize = size :
    usedSize = Dimensions.get('screen').height * (+size.slice(0, -1)) / 100;

  const pickImage = async () => {
    setModalVisible(false);

    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setIsLoading(false);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { height: usedSize, width: usedSize }]}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(!modalVisible)}>
        {image ?
          <Image source={{ uri: image, width: '100%', height: '100%' }} style={styles.image} /> :
          isLoading ?
            <ActivityIndicator size="large" color={colors.secondary} /> :
            <FontAwesome name="user" size={0.6 * usedSize} color={colors.secondary} />
        }
      </TouchableOpacity>

      {image &&
        <TouchableOpacity style={{ position: 'absolute', bottom: 0, left: -0.15 * usedSize }} onPress={pickImage}>
          <FontAwesome name="close" size={0.25 * usedSize} color={colors.danger} onPress={() => setImage(null)} style={styles.deleteButton} />
        </TouchableOpacity>}

      {modalVisible &&
        <View style={[styles.modalView, { height: usedSize }]}>
          <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={() => setIsOn(true)} >
            <FontAwesome name="camera" size={0.2 * usedSize} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={pickImage} >
            <FontAwesome name="image" size={0.2 * usedSize} color={colors.secondary} />
          </TouchableOpacity>
        </View>}
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  addButton: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.shade,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    borderRadius: 1000,
  },
  modalView: {
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: colors.shade,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});