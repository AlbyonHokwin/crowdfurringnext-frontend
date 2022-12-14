import { StyleSheet, Text, View } from "react-native";
import CreatePotScreen1 from "./screens/CreatePotScreen";
// import CreatePotScreen2 from "./screens/CreatePotScreens/CreatePotScreen2";
// import CreatePotScreen3 from "./screens/CreatePotScreens/CreatePotScreen3";
// import CreatePotScreen4 from "./screens/CreatePotScreens/CreatePotScreen4";
// import CreatePotScreen5 from "./screens/CreatePotScreens/CreatePotScreen5";
// import CreatePotScreen6 from "./screens/CreatePotScreens/CreatePotScreen6";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CreatePotScreen1" component={CreatePotScreen1} />
        {/* <Stack.Screen name="CreatePotScreen2" component={CreatePotScreen2} /> */}
        {/* <Stack.Screen name="CreatePotScreen3" component={CreatePotScreen3} /> */}
        {/* <Stack.Screen name="CreatePotScreen4" component={CreatePotScreen4} /> */}
        {/* <Stack.Screen name="CreatePotScreen5" component={CreatePotScreen5} /> */}
        {/* <Stack.Screen name="CreatePotScreen6" component={CreatePotScreen6} /> */}
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
