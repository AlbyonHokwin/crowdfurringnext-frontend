import React from 'react'
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Modal,
    SafeAreaView,
} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as colors from "../styles/colors";

const BACKEND_URL = 'http://192.168.1.110:3000';

const PotScreen = ({ route, navigation }) => {
    const [pot, setPot] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const slug = route.params.slug;
            const response = await fetch(`${BACKEND_URL}/pots/slug/${slug}`);
            const data = await response.json();

            data.result && setPot(data.pot);
        })();
    }, []);

    if (!pot) return (<></>);

    const photos = pot.pictures.map((photo, i) => {
        return (
            <TouchableOpacity key={i} style={styles.touchablePhoto} activeOpacity={0.8} onPress={() => pressOnPhoto(i)} >
                <Image source={{ uri: photo }} style={styles.photo} />
            </TouchableOpacity>
        );
    });

    const modalPhotos = pot.pictures.map((photo, i) => {
        return (
            <View key={i} style={styles.bigPhotoContainer} >
                <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => pressLeft()} >
                    <FontAwesome name='angle-left' size={50} color='black' />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} >
                    <Image source={{ uri: photo }} style={styles.bigPhoto} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => pressRight()} >
                    <FontAwesome name='angle-right' size={50} color='black' />
                </TouchableOpacity>
            </View>
        );
    })

    const compensations = pot.compensations.map((compensation, i) => {
        return (
            <View key={i} style={styles.compensationContainer}>
                <Feather name="check" size={20} color={colors.dark} />
                <Text style={styles.compensationText}>{compensation}</Text>
            </View>
        );
    });

    const pressOnPhoto = index => {
        setModalIndex(index);
        setModalVisible(true);
    }

    const pressLeft = () => {
        setModalIndex(Math.max(0, modalIndex - 1));
    }

    const pressRight = () => {
        setModalIndex(Math.min(modalPhotos.length - 1, modalIndex + 1));
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled={true} >
                <View style={styles.header}>
                    <Text style={styles.name}>{pot.animalName}</Text>
                    <Text style={styles.city}>{pot.user.address.city}</Text>
                    <Text style={styles.amounts}>{pot.currentAmount}€ / {pot.targetAmount}€</Text>
                </View>

                <View style={styles.photos}>
                    <ScrollView horizontal={true} style={styles.photosScroll}>
                        {photos}
                    </ScrollView>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoText}>Animal : {pot.info.specie}</Text>
                    <Text style={styles.infoText}>Race : {pot.info.race}</Text>
                    <Text style={styles.infoText}>Age : {pot.info.age}</Text>
                    <Text style={styles.infoText}>Sexe : {pot.info.sex}</Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <ScrollView style={styles.scrollDescription} nestedScrollEnabled={true}>
                        <Text style={styles.description}>{pot.description}</Text>
                    </ScrollView>
                </View>

                {pot.compensations[0] && <View style={styles.compensations}>
                    <Text style={styles.compensationTitle}>Contre-parties :</Text>
                    <ScrollView style={styles.scrollCompensations} nestedScrollEnabled={true} >
                        {compensations}
                    </ScrollView>
                </View>}

                <View style={styles.voidContainer}></View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textBackButton}>Retour</Text>
                </TouchableOpacity>
                {pot.isValidate ?
                    <TouchableOpacity onPress={() => navigation.navigate('Payment', { pot })} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textGiveButton}>Donner</Text>
                    </TouchableOpacity> :
                    pot.draft &&
                    <TouchableOpacity onPress={() => navigation.navigate('CreatePot', { id: pot._id })} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textGiveButton}>Modifier</Text>
                    </TouchableOpacity>
                }
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
                <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(!modalVisible)} activeOpacity={1} >
                    {modalPhotos[modalIndex]}
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    );
}

export default PotScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.dark,
    },
    city: {
        fontSize: 20,
        color: colors.dark,
    },
    amounts: {
        fontSize: 30,
        marginVertical: 5,
        padding: 10,
        borderRadius: 20,
        backgroundColor: colors.secondary,
        color: colors.light,
    },
    photos: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        height: Dimensions.get('screen').width / 2.5,
        width: Dimensions.get('screen').width / 2.5,
        margin: 2,
        borderRadius: 10,
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: '80%',
        maxWidth: '80%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.tertiary,
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
    infoText: {
        flexGrow: 1,
        fontSize: 20,
        color: colors.dark,
        textAlign: 'left',
        marginHorizontal: 5,
    },
    descriptionContainer: {
        width: '80%',
        maxHeight: Dimensions.get('screen').height / 2.5,
        marginVertical: 20,
        padding: 10,
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
    scrollDescription: {},
    description: {
        fontSize: 16,
        textAlign: 'justify',
    },
    compensations: {
        width: '80%',
        maxHeight: Dimensions.get('screen').height / 3,
        alignItems: 'flex-start',
    },
    compensationTitle: {
        fontSize: 30,
        width: '100%',
    },
    scrollCompensations: {
        width: '100%',
    },
    compensationContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.tertiary,
        borderColor: colors.shade,
        borderWidth: 1,
        borderRadius: 10,
    },
    compensationText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.dark,
        marginLeft: 10,
        marginVertical: 10,
        flexGrow: 1,
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundModal,
    },
    bigPhotoContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    arrowButton: {
        flex: 1,
        height: Dimensions.get('screen').width * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigPhoto: {
        height: Dimensions.get('screen').width * 0.75,
        width: Dimensions.get('screen').width * 0.75,
        borderRadius: 10,
    },
    voidContainer: {
        height: 100,
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 999,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.accent,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textBackButton: {
        fontWeight: '600',
        fontSize: 20,
        color: colors.light,
    },
    textGiveButton: {
        fontWeight: '600',
        fontSize: 30,
        color: colors.light,
    },
});