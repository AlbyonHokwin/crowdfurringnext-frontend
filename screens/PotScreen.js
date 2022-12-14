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
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as colors from '../styles/colors';

const BACKEND_URL = 'http://192.168.10.157:3000';

const PotScreen = ({ route, navigation }) => {
    const [pot, setPot] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const slug = "testSlug";
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
            <Text key={i} style={styles.compensation}>{compensation}</Text>
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
        <View style={styles.container}>
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

                <View style={styles.compensations}>
                    <Text style={styles.compensationTitle}>Contre-parties :</Text>
                    <ScrollView style={styles.scrollCompensations} nestedScrollEnabled={true} >
                        {compensations}
                    </ScrollView>
                </View>

                <View style={styles.voidContainer}></View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => console.log('----')} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textBackButton}>Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('++++')} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textGiveButton}>Donner</Text>
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
                <TouchableOpacity style={styles.modalView} onPress={() => setModalVisible(!modalVisible)} activeOpacity={1} >
                    {modalPhotos[modalIndex]}
                </TouchableOpacity>
            </Modal>

        </View>
    );
}

export default PotScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
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
    },
    photo: {
        height: Dimensions.get('screen').width / 2.5,
        width: Dimensions.get('screen').width / 2.5,
        margin: 2,
    },
    info: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoText: {
        width: '40%',
        fontSize: 20,
        color: colors.tertiary,
        textAlign: 'left',
        marginVertical: 2,
    },
    descriptionContainer: {
        width: '80%',
        maxHeight: Dimensions.get('screen').height / 2.5,
        marginVertical: 20,
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
    compensation: {
        paddingLeft: 30,
        fontSize: 20,
        width: '100%',
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
        zIndex: 1000,
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