import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Dimensions,
} from "react-native";
import * as colors from '../styles/colors';
import { useState, useEffect } from 'react';
import Pot from "../components/Pot";
import PotLayout from "../components/PotLayout";
import SearchInput from "../components/SearchInput";

const BACKEND_URL = 'http://192.168.10.157:3000';

export default function HomeScreen() {
    const [pots, setPots] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${BACKEND_URL}/pots/all`);
            const data = await response.json();

            data.result && setPots(data.pots);
        })();
    }, []);

    if (!pots) return (<></>);

    const potLayouts = [];
    const copiedPots = [...pots];
    let key = 0;
    while (copiedPots[0]) {
        let randomDist = (4 + Math.floor((Math.random() * 3))) / 10;
        let randomHeight = (3 + Math.floor((Math.random() * 2))) / 10;

        if (copiedPots.length <= 4) {
            potLayouts.push(<PotLayout key={key} pots={copiedPots.splice(0, copiedPots.length)} dist={randomDist} height={randomHeight} padding={10} />);
        } else {
            const randomLength = 1 + Math.floor((Math.random() * 4));
            (randomLength === 2) && (randomHeight = Math.max(randomHeight, 0.3));
            potLayouts.push(<PotLayout key={key} pots={copiedPots.splice(0, randomLength)} dist={randomDist} height={randomHeight} padding={10} />);
        }
        key++;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo} />
                <Text style={styles.title}>Crowd-furring</Text>
            </View>
            <SearchInput />
            <ScrollView contentContainerStyle={styles.potsContainer}>
                {potLayouts}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 60,
        width: 60,
        borderRadius: 1000,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 20,
        color: colors.dark,
    },
    potsContainer: {
        width: '100%',
        // flexDirection: 'column',
        // // flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        // alignItems: 'flex-start',
    },
});