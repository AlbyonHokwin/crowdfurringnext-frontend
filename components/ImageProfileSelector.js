import { TouchableOpacity, Image, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

export default function ImageProfilePicker({ image, originalImage, setImage, setIsOn, size }) {
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
    <View style={[styles.container, { height: usedSize, width: 2 * usedSize }]}>

      <View style={[styles.modalViewLeft, { height: usedSize, width: 0.4 * usedSize }]}>
        {modalVisible && originalImage &&
          <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={() => setImage(originalImage)} activeOpacity={0.8}>
            <FontAwesome name="refresh" size={0.2 * usedSize} color={colors.secondary} />
          </TouchableOpacity>}
        {modalVisible && image &&
          <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={() => setImage('')} activeOpacity={0.8}>
            <FontAwesome name="close" size={0.2 * usedSize} color={colors.danger} />
          </TouchableOpacity>}
      </View>

      <TouchableOpacity style={[styles.addButton, { height: usedSize, width: usedSize }]} onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.8}>
        {image ?
          <Image source={{ uri: image, width: '100%', height: '100%' }} style={styles.image} /> :
          isLoading ?
            <ActivityIndicator size="large" color={colors.secondary} /> :
            <FontAwesome name="user" size={0.6 * usedSize} color={colors.secondary} />
        }
      </TouchableOpacity>

      <View style={[styles.modalViewRight, { height: usedSize, width: 0.4 * usedSize }]}>
        {modalVisible &&
          <>
            <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={() => setIsOn(true)} activeOpacity={0.8}>
              <FontAwesome name="camera" size={0.2 * usedSize} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { height: 0.4 * usedSize, width: 0.4 * usedSize }]} onPress={pickImage} activeOpacity={0.8}>
              <FontAwesome name="image" size={0.2 * usedSize} color={colors.secondary} />
            </TouchableOpacity>
          </>}
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  refreshButton: {
    backgroundColor: colors.light,
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
  addButton: {
    backgroundColor: colors.light,
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
  modalViewLeft: {
    marginRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalViewRight: {
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: colors.light,
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