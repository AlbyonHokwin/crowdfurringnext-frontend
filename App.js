import { StyleSheet, Text, View } from "react-native";
import CreatePotScreen1 from "./screens/CreatePotScreens/CreatePotScreen1";
import CreatePotScreen2 from "./screens/CreatePotScreens/CreatePotScreen2";
import CreatePotScreen3 from "./screens/CreatePotScreens/CreatePotScreen3";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreatePotScreen1" component={CreatePotScreen1} />
        <Stack.Screen name="CreatePotScreen2" component={CreatePotScreen2} />
        <Stack.Screen name="CreatePotScreen3" component={CreatePotScreen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
