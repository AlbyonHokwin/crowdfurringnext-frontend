import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import * as colors from "../styles/colors";

export default function ({
  animalName,
  urgent,
  images,
  files,
  infos,
  description,
  compensations,
  amount,
}) {
  const pictures = images.map((image, i) => {
    return (
      <Image
        key={i}
        source={{ uri: image }}
        style={{ width: 70, height: 70, margin: 5, borderRadius: 10 }}
        resizeMode="stretch"
      />
    );
  });

  const documents = files.map((file, i) => {
    return (
      <View
        key={i}
        style={{
          alignItems: "center",
          height: 50,
          paddingHorizontal: 10,
          borderRadius: 10,
          margin: 5,
          backgroundColor: colors.shade,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{file.name}</Text>
      </View>
    );
  });

  const compensationsList = compensations.map((compensation, i) => {
    return (
      <View
        key={i}
        style={{
          alignItems: "center",
          height: 50,
          paddingHorizontal: 10,
          borderRadius: 10,
          margin: 5,
          backgroundColor: colors.shade,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{compensation}</Text>
      </View>
    );
  });


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "flex-start", width: "100%" }}>
        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Nom de l'animal :</Text>
          <Text style={styles.info}>{animalName}</Text>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Photos de l'animal :</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal={true}>
              {pictures}
            </ScrollView>
          </View>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Informations :</Text>
          {infos.specie && (
            <Text style={styles.info}>Espèce :{infos.specie}</Text>
          )}
          {infos.breed && (
            <Text style={styles.info}>
              Race : {infos.breed}
            </Text>
          )}
          {infos.age && (
            <Text style={styles.info}>
              Age : {infos.age}
            </Text>
          )}
          {infos.sex && (
            <Text style={styles.info}>
              Sexe : {infos.sex}
            </Text>
          )}
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Description :</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Montant demandé :</Text>
          <Text style={styles.info}>{amount}€</Text>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Contrepartie :</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal={true}>
              {compensationsList}
            </ScrollView>
          </View>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Urgent :</Text>
          <Text style={styles.info}>{urgent ? 'Oui' : 'Non'}</Text>
        </View>

        <View style={styles.displayInfo}>
          <Text style={styles.infoName}>Justificatif(s) :</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal={true}>
              {documents}
            </ScrollView>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minWidth: '80%',
    maxWidth: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    width: '100%',
    marginVertical: 0,
    alignSelf: 'center',
  },
  displayInfo: {
    minWidth: '100%',
    maxWidth: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.light,
    borderColor: colors.shade,
    borderWidth: 1,
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
  },
  info: {
    marginLeft: 20,
    fontSize: 16,
    color: colors.dark,
    marginBottom: 2,
  },
  description: {
    marginHorizontal: 20,
    fontSize: 14,
    color: colors.dark,
    textAlign: 'justify',
  },
});