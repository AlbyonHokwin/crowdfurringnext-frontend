import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from "react-native";
import * as colors from "../styles/colors";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import PotLayout from "../components/PotLayout";
import SearchInput from "../components/SearchInput";
import { CommonActions, useIsFocused } from "@react-navigation/native";

const BACKEND_URL = 'http://192.168.158.89:3000';

export default function HomeScreen({ route, navigation }) {
  const [pots, setPots] = useState([]);
  const [potLayouts, setPotLayouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  if (isFocused && route.params?.refresh && !isLoading) {
    setIsLoading(true);
    navigation.dispatch(CommonActions.setParams({ refresh: false }));
  }

  useEffect(() => {
    if (isLoading) {
      (async () => {
        setIsLoading(true);
        let latitude = "";
        let longitude = "";
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          latitude = `${location.coords.latitude}`;
          longitude = `${location.coords.longitude}`;
        }

        const response = await fetch(
          `${BACKEND_URL}/pots/all?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();

        if (data.result) {
          const layout = [];
          const copiedPots = [...data.pots];

          let key = 0;
          while (copiedPots[0]) {
            let randomDist = (4 + Math.floor(Math.random() * 3)) / 10;
            let randomHeight = (3 + Math.floor(Math.random() * 2)) / 10;

            if (copiedPots.length <= 4) {
              layout.push(
                <PotLayout
                  key={key}
                  pots={copiedPots.splice(0, copiedPots.length)}
                  dist={randomDist}
                  height={randomHeight}
                  padding={10}
                  displayModal={displayModal}
                />
              );
            } else {
              const randomLength = 1 + Math.floor(Math.random() * 4);
              randomLength === 2 &&
                (randomHeight = Math.max(randomHeight, 0.3));
              layout.push(
                <PotLayout
                  key={key}
                  pots={copiedPots.splice(0, randomLength)}
                  dist={randomDist}
                  height={randomHeight}
                  padding={10}
                  displayModal={displayModal}
                />
              );
            }
            key++;
          }
          setPotLayouts(layout);
          setPots(data.pots);
        }
        setIsLoading(false);
      })();
    }
  }, [isLoading, route.params?.refresh]);

  if (!pots) return <></>;

  const updateDisplayPots = (pots) => {
    if (!pots[0]) {
      setIsLoading(true);
      return;
    }

    const layout = [];
    const copiedPots = [...pots];

    let key = 0;
    while (copiedPots[0]) {
      let randomDist = (4 + Math.floor(Math.random() * 3)) / 10;
      let randomHeight = (3 + Math.floor(Math.random() * 2)) / 10;

      if (copiedPots.length <= 4) {
        layout.push(
          <PotLayout
            key={key}
            pots={copiedPots.splice(0, copiedPots.length)}
            dist={randomDist}
            height={randomHeight}
            padding={10}
            displayModal={displayModal}
          />
        );
      } else {
        const randomLength = 1 + Math.floor(Math.random() * 4);
        randomLength === 2 && (randomHeight = Math.max(randomHeight, 0.3));
        layout.push(
          <PotLayout
            key={key}
            pots={copiedPots.splice(0, randomLength)}
            dist={randomDist}
            height={randomHeight}
            padding={10}
            displayModal={displayModal}
          />
        );
      }
      key++;
    }
    setPotLayouts(layout);
    setPots(pots);
  };

  const pressSeeMore = (slug) => {
    setModalVisible(false);
    navigation.navigate("Pot", { slug });
  };

  const pressGive = (pot) => {
    setModalVisible(false);
    navigation.navigate("Payment", { pot });
  };

  const displayModal = (pot) => {
    setModalVisible(!modalVisible);
    setModalContent(
      <View style={styles.modalContent}>
        <View style={styles.modalTop}>
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: pot.pictures[0] }}
              style={styles.modalImage}
            />
          </View>
          <View style={styles.modalTexts}>
            <View style={styles.modalTextsHeader}>
              <Text style={styles.modalTitle}>{pot.animalName}</Text>
              <Text style={styles.modalAmount}>
                {pot.currentAmount}??? / {pot.targetAmount}???
              </Text>
            </View>
            <Text style={styles.modalText}>{`${pot.description.slice(
              0,
              200
            )}...`}</Text>
          </View>
        </View>

        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pressGive(pot)}
          >
            <Text style={styles.modalButtonText}>Donner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pressSeeMore(pot.slug)}
          >
            <Text style={styles.modalButtonText}>Voir plus</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => setIsLoading(true)}
            refreshing={false}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
      >
        <View style={styles.header}>
          <Image source={require("../assets/logo.jpg")} style={styles.logo} />
          <Text style={styles.title}>Crowd-furring</Text>
        </View>
        <Animated.View
          style={[
            styles.movingContainer,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 50, 1000],
                    outputRange: [0, 0, 950],
                  }),
                },
              ],
            },
          ]}
        >
          <SearchInput updateDisplayPots={updateDisplayPots} />
        </Animated.View>

        {isLoading ? (
          <View style={{ width: "100%", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 24 }}>
              R??cup??ration des cagnottes en cours
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Merci de bien vouloir patienter
            </Text>
            <ActivityIndicator
              style={{ margin: 10 }}
              size="large"
              color={colors.primary}
            />
          </View>
        ) : (
          <View contentContainerStyle={styles.potsContainer}>{potLayouts}</View>
        )}
      </Animated.ScrollView>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePot")}
          style={styles.floatingButton}
          activeOpacity={0.8}
        >
          <Text style={styles.floatingButtonText}>Cr??er</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        statusBarTranslucent={true}
      >
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}
        >
          {modalContent}
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight + 5,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    minWidth: "100%",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  movingContainer: {
    position: "relative",
    // top: 10,
    zIndex: 1000,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 1000,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
    color: colors.dark,
  },
  potsContainer: {
    width: "100%",
  },
  floatingButtonContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
  },
  floatingButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    fontWeight: "600",
    fontSize: 40,
    color: colors.light,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundModal,
  },
  modalContent: {
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  modalImageContainer: {
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 10,
  },
  modalTexts: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
  },
  modalTextsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  modalTitle: {
    color: colors.dark,
    fontSize: 20,
  },
  modalAmount: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 5,
  },
  modalText: {
    color: colors.dark,
    fontSize: 12,
  },
  modalButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.primary,
  },
  modalButtonText: {
    color: colors.light,
    fontSize: 20,
  },
});
