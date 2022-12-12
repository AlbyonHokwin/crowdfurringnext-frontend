import React from 'react'
import { useState } from 'react';
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

const dummyData = {
    user: {
        firstname: 'Camille',
        lastname: 'HAUSTANT',
        email: 'test@gmail.com',
        password: 'azerty123',
        address: {
            street: '154 Promenade du Verger',
            additionnal: '',
            zipCode: '92130',
            city: 'Issy-Les-Moulineaux',
        },
        token: 'thisisatruetoken',
        picture: 'picture_testFile.png',
        association: '',
        admin: false,
    },
    contributors: [],
    pictures: [
        require('../assets/bounty_testFile1.jpg'),
        require('../assets/bounty_testFile2.jpg'),
        require('../assets/bounty_testFile3.jpg'),
    ],
    description: 'This is the description of the most amazing existing on Earth. His name : Bounty ! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.',
    info: {
        specie: 'Chat',
        race: 'Baltringue',
        age: 7,
        sex: 'male',
    },
    socialNetwork: [],
    compensations: ['Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'Petite balade dans le parc', 'Venir jouer avec lui', 'FIN'],
    documents: [],
    isValidate: true,
    startDate: new Date('10-12-2022'),
    endDate: new Date('25-12-2022'),
    targetAmount: 1420,
    currentAmount: 254,
    animalName: 'Bounty',
    isClosed: false,
    draft: false,
};

const PotScreen = ({ route, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    const photos = dummyData.pictures.map((photo, i) => {
        return (
            <TouchableOpacity key={i} style={styles.touchablePhoto} activeOpacity={0.8} onPress={() => pressOnPhoto(i)} >
                <Image source={photo} style={styles.photo} />
            </TouchableOpacity>
        );
    });

    const modalPhotos = dummyData.pictures.map((photo, i) => {
        return (
            <View key={i} style={styles.bigPhotoContainer} >
                <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => pressLeft()} >
                    <FontAwesome name='angle-left' size={50} color='black' />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} >
                    <Image source={photo} style={styles.bigPhoto} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => pressRight()} >
                    <FontAwesome name='angle-right' size={50} color='black' />
                </TouchableOpacity>
            </View>
        );
    })

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

    const compensations = dummyData.compensations.map((compensation, i) => {
        return (
            <Text key={i} style={styles.compensation}>{compensation}</Text>
        );
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled={true} >
            <View style={styles.header}>
                <Text style={styles.name}>{dummyData.animalName}</Text>
                <Text style={styles.city}>{dummyData.user.address.city}</Text>
            </View>

            <View style={styles.photos}>
                <ScrollView horizontal={true} style={styles.photosScroll}>
                    {photos}
                </ScrollView>
            </View>

            <View style={styles.info}>
                <Text style={styles.infoText}>Animal : {dummyData.info.specie}</Text>
                <Text style={styles.infoText}>Race : {dummyData.info.race}</Text>
                <Text style={styles.infoText}>Age : {dummyData.info.age}</Text>
                <Text style={styles.infoText}>Sexe : {dummyData.info.sex}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <ScrollView style={styles.scrollDescription} nestedScrollEnabled={true}>
                    <Text style={styles.description}>{dummyData.description}</Text>
                </ScrollView>
            </View>

            <View style={styles.compensations}>
                <Text style={styles.compensationTitle}>Contre-parties :</Text>
                <ScrollView style={styles.scrollCompensations} nestedScrollEnabled={true} >
                    {compensations}
                </ScrollView>
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
                <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)} activeOpacity={1} >
                    <View style={styles.modalView}>
                        {modalPhotos[modalIndex]}
                    </View>
                </TouchableOpacity>
            </Modal>

            <View><Text>FIN</Text></View>
        </ScrollView>
    );
}

export default PotScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: StatusBar.currentHeight + 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('screen').height / 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    city: {
        fontSize: 20,
        color: 'black',
    },
    photos: {
        width: '100%',
        marginVertical: 20,
    },
    photosScroll: {},
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
        color: 'grey',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(100, 100, 100, 0.7)',
    },
    modalView: {
        backgroundColor: "transparent",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
});