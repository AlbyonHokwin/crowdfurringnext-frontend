import { View, Text, StyleSheet } from "react-native";

export default function MessageScreen() {
    return (
        <View style={styles.container}>  
            <Text>MESSAGE</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
    }
})