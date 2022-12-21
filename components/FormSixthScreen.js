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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: "flex-start", width: "80%" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Nom de l'animal : {animalName}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Photos de l'animal :{" "}
        </Text>

        <View style={styles.horizontalScroll}>
          <ScrollView horizontal={true}>
            {pictures}
          </ScrollView>
        </View>

        {infos.specie && (
          <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
            Espèce : {infos.specie}
          </Text>
        )}
        {infos.breed && (
          <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
            Race : {infos.breed}
          </Text>
        )}
        {infos.age && (
          <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
            Age : {infos.age}
          </Text>
        )}
        {infos.sex && (
          <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
            Sexe : {infos.sex}
          </Text>
        )}
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Description :
        </Text>
        <Text style={{ fontSize: 18 }}>
          {description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Cagnotte : {amount}€
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Contrepartie :
        </Text>
        <View style={styles.horizontalScroll}>
          <ScrollView horizontal={true}>
            {compensationsList}
          </ScrollView>
        </View>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Urgent : {urgent ? 'Oui' : 'Non'}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Justificatif(s) :
        </Text>
        <View style={styles.horizontalScroll}>
          <ScrollView horizontal={true}>
            {documents}
          </ScrollView>
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
    width: '125%',
    marginVertical: 0,
    alignSelf: 'center',
  },
});