import { Text, View, Image } from "react-native";
import * as colors from "../styles/colors";

export default function ({
  animalName,
  urgent,
  images,
  files,
  infos,
  description,
  compensation,
  amount,
}) {
  const pictures = images.map((image, i) => {
    return (
      <Image
        key={i}
        source={{ uri: image }}
        style={{ width: 70, height: 70, margin: 10 }}
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
          width: "35%",
          height: 50,
          borderRadius: 8,
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

  return (
    <>
      <View style={{ alignItems: "left", width: "80%", margin: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Nom de l'animal : {animalName}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Photos de l'animal :{" "}
        </Text>
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 6 }}
        >
          {pictures}
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
          Description : {description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Cagnotte : {amount}€
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Contrepartie : {compensation}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Urgent : {urgent}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", margin: 6 }}>
          Justificatif :
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {documents}
        </View>
      </View>
    </>
  );
}
