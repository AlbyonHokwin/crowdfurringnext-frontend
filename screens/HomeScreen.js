import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity,
} from "react-native";
import * as colors from '../styles/colors';
import { useState, useEffect } from 'react';
import Pot from "../components/Pot";
import PotLayout from "../components/PotLayout";
import SearchInput from "../components/SearchInput";

const BACKEND_URL = 'http://192.168.10.150:3000';

export default function HomeScreen() {
    const [pots, setPots] = useState([]);
    const [potLayouts, setPotLayouts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${BACKEND_URL}/pots/all`);
            const data = await response.json();

            if (data.result) {
                const layout = [];
                const copiedPots = [...data.pots];
                let key = 0;
                while (copiedPots[0]) {
                    let randomDist = (4 + Math.floor((Math.random() * 3))) / 10;
                    let randomHeight = (3 + Math.floor((Math.random() * 2))) / 10;

                    if (copiedPots.length <= 4) {
                        layout.push(<PotLayout key={key} pots={copiedPots.splice(0, copiedPots.length)} dist={randomDist} height={randomHeight} padding={10} displayModal={displayModal} />);
                    } else {
                        const randomLength = 1 + Math.floor((Math.random() * 4));
                        (randomLength === 2) && (randomHeight = Math.max(randomHeight, 0.3));
                        layout.push(<PotLayout key={key} pots={copiedPots.splice(0, randomLength)} dist={randomDist} height={randomHeight} padding={10} displayModal={displayModal} />);
                    }
                    key++;
                }
                setPotLayouts(layout);
                setPots(data.pots);
            }
        })();
    }, []);

    if (!pots) return (<></>);

    const displayModal = pot => {
        setModalVisible(!modalVisible);
        setModalContent(
            <View style={styles.modalContent}>

                <View style={styles.modalTop}>
                    <View style={styles.modalImageContainer}>
                        <Image source={{ uri: pot.pictures[0] }} style={styles.modalImage} />
                    </View>
                    <View style={styles.modalTexts}>
                        <Text style={styles.modalTitle}>{pot.animalName}</Text>
                        <Text style={styles.modalText}>{`${pot.description.slice(0, 200)}...`}</Text>
                    </View>
                </View>

                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.modalButtonText}>Voir plus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.modalButtonText}>Donner</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                statusBarTranslucent={true}
            >
                <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(!modalVisible)} activeOpacity={1}>
                    {modalContent}
                </TouchableOpacity>
            </Modal>

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
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundModal,
    },
    modalContent: {
        width: '90%',
        backgroundColor: colors.background,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: colors.dark,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    modalImageContainer: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        shadowColor: colors.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: 10,
    },
    modalTexts: {
        flex: 1,
        paddingRight: 10,
        paddingTop: 10,
    },
    modalTitle: {
        color: colors.dark,
        fontSize: 20,
        marginBottom: 5,
    },
    modalText: {
        color: colors.dark,
        fontSize: 12,
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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