import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
    StatusBar,
    Modal,
    KeyboardAvoidingView,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CameraPicker from "../components/CameraPicker";
import ImageProfileSelector from '../components/ImageProfileSelector';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

import { colors } from "../styles/colors";
import { fonts } from "../styles/fonts";

import { BACKEND_URL } from "../global";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ModifyInfoScreen({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.value.token);

    const [isOn, setIsOn] = useState(false);

    const [formStep, setFormStep] = useState(0);
    const maxStep = 7;

    const [modalVisible, setModalVisible] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [image, setImage] = useState('');
    const [originalImage, setOriginalImage] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState(false);
    const [street, setStreet] = useState('');
    const [streetError, setStreetError] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [zipCodeError, setZipCodeError] = useState(false);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [additionnal, setAdditionnal] = useState('');

    useEffect(() => {
        fetch(`${BACKEND_URL}/users/information`, {
            headers: { Authorization: "Bearer " + token }
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setImage(data.user.picture);
                    setOriginalImage(data.user.picture);
                    setEmail(data.user.email);
                    setLastname(data.user.lastname);
                    setFirstname(data.user.firstname);
                    setStreet(data.user.street);
                    setAdditionnal(data.user.additionnal);
                    setZipCode(`${data.user.zipCode}`);
                    setCity(data.user.city);
                }
            });
    }, []);


    const handleConfirm = async () => {
        setEmailError(!EMAIL_REGEX.test(email));
        setLastnameError(!lastname.trim());
        setFirstnameError(!firstname.trim());
        setStreetError(!street.trim());
        setZipCodeError(!+zipCode);
        setCityError(!city.trim());

        if (!(emailError || lastnameError || firstnameError || streetError || zipCodeError || cityError)) {
            setIsLoading(true);
            setModalVisible(true);

            const formData = new FormData();
            if (image && image !== originalImage) {
                formData.append('profilePicture', {
                    uri: image,
                    name: 'profilePicture.jpg',
                    type: 'image/jpeg',
                });
            } else formData.append('picture', image);

            formData.append('email', email.trim());
            formData.append('lastname', lastname.trim());
            formData.append('firstname', firstname.trim());
            formData.append('street', street.trim());
            formData.append('additionnal', additionnal.trim());
            formData.append('zipCode', zipCode.trim());
            formData.append('city', city.trim());

            try {
                const response = await fetch(`${BACKEND_URL}/users/modify`, {
                    method: "PUT",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData,
                });

                const data = await response.json();

                setIsLoading(false);
                setModalVisible(false);

                if (data.result) {
                    dispatch(login({ token, email, picture: image }));
                    setOriginalImage(image);

                    setModalVisible(true);
                    setErrorText('Les modifications ont bien été prise en compte.');
                } else if (data.error === 'Email already used') {
                    setEmailError(true);
                    setModalVisible(true);
                    setErrorText('L\'Email est déjà utilisé !');
                } else {
                    setModalVisible(true);
                    setErrorText('Une erreur est apparu durant la requête, veuillez Réessayer');
                }
            } catch (error) {
                setIsLoading(false);
                setModalVisible(true);
                setErrorText('Une erreur est apparu durant la requête, veuillez Réessayer');
                console.error(error)
            }
        }
    };

    // *************************************************** //

    const takePicture = (picture) => setImage(picture.uri);

    const handleCamera = (isOn) => setIsOn(isOn);

    //******************** Display pages ******************* //

    if (isOn) return <CameraPicker active={true} takePicture={takePicture} isOn={handleCamera} />;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Modifier vos informations</Text>

                <ImageProfileSelector
                    image={image}
                    originalImage={originalImage}
                    setImage={setImage}
                    setIsOn={setIsOn}
                    size='15%'
                />

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            step={1}
                            currentStep={formStep}
                            maxStep={maxStep}
                            label='E-mail'
                            width='90%'
                            isError={emailError}
                            placeholder="Adresse e-mail"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoComplete="email"
                            autoCapitalize="none"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                            onBlur={() => setFormStep(0)}
                            onFocus={() => setFormStep(1)}
                            onSubmitEditing={() => {
                                setEmail(email.trim());
                                setFormStep(2)
                            }}
                            editable={!isLoading}
                        />

                        <CustomTextInput
                            step={2}
                            currentStep={formStep}
                            maxStep={maxStep}
                            label='Nom de famille'
                            width='90%'
                            isError={lastnameError}
                            placeholder="Nom"
                            autoComplete='name'
                            textContentType='name'
                            onChangeText={(value) => setLastname(value)}
                            value={lastname}
                            onBlur={() => setFormStep(0)}
                            onFocus={() => setFormStep(2)}
                            onSubmitEditing={() => {
                                setLastname(lastname.trim());
                                setFormStep(3)
                            }}
                            editable={!isLoading}
                        />

                        <CustomTextInput
                            step={3}
                            currentStep={formStep}
                            maxStep={maxStep}
                            label='Prénom'
                            width='90%'
                            isError={firstnameError}
                            placeholder="Prénom"
                            autoComplete='name'
                            textContentType='name'
                            onChangeText={(value) => setFirstname(value)}
                            value={firstname}
                            onBlur={() => setFormStep(0)}
                            onFocus={() => setFormStep(3)}
                            onSubmitEditing={() => {
                                setFirstname(firstname.trim());
                                setFormStep(4)
                            }}
                            editable={!isLoading}
                        />

                        <CustomTextInput
                            step={4}
                            currentStep={formStep}
                            maxStep={maxStep}
                            label='Adresse'
                            width='90%'
                            isError={streetError}
                            placeholder="Adresse"
                            autoComplete='postal-address'
                            textContentType='fullStreetAddress'
                            onChangeText={(value) => setStreet(value)}
                            value={street}
                            onBlur={() => setFormStep(0)}
                            onFocus={() => setFormStep(4)}
                            onSubmitEditing={() => {
                                setStreet(street.trim());
                                setFormStep(5)
                            }}
                            editable={!isLoading}
                        />

                        <CustomTextInput
                            step={5}
                            currentStep={formStep}
                            maxStep={maxStep}
                            label="Complément d'adresse"
                            width='90%'
                            isError={false}
                            placeholder="Complément d'adresse"
                            onChangeText={(value) => setAdditionnal(value)}
                            value={additionnal}
                            onBlur={() => setFormStep(0)}
                            onFocus={() => setFormStep(5)}
                            onSubmitEditing={() => {
                                setAdditionnal(additionnal.trim());
                                setFormStep(6)
                            }}
                            editable={!isLoading}
                        />

                        <View style={styles.city}>
                            <CustomTextInput
                                step={6}
                                currentStep={formStep}
                                maxStep={maxStep}
                                label="Code postal"
                                width='30%'
                                isError={zipCodeError}
                                placeholder="C. P."
                                keyboardType="numeric"
                                textContentType="postalCode"
                                onChangeText={(value) => setZipCode(value)}
                                value={zipCode}
                                onBlur={() => setFormStep(0)}
                                onFocus={() => setFormStep(6)}
                                onSubmitEditing={() => setFormStep(7)}
                                editable={!isLoading}
                            />

                            <CustomTextInput
                                step={7}
                                currentStep={formStep}
                                maxStep={maxStep}
                                label="Ville"
                                width='68%'
                                isError={cityError}
                                placeholder="Ville"
                                textContentType="addressCity"
                                onChangeText={(value) => setCity(value)}
                                value={city}
                                onBlur={() => setFormStep(0)}
                                onFocus={() => setFormStep(7)}
                                onSubmitEditing={() => {
                                    setCity(city.trim());
                                    setFormStep(0);
                                    handleConfirm();
                                }}
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleConfirm()}
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Modifier</Text>
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
                        onPress={errorText ? () => setModalVisible(!modalVisible) : undefined}
                        activeOpacity={1}
                    >
                        <View style={styles.modalContent}>
                            {isLoading &&
                                <ActivityIndicator
                                    style={{ margin: 10 }}
                                    size="large"
                                    color={colors.primary}
                                />}
                            {errorText &&
                                <>
                                    <Text style={styles.modalText}>{errorText}</Text>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={styles.modalButtonText}>Fermer</Text>
                                    </TouchableOpacity>
                                </>}
                        </View>
                    </TouchableOpacity>
                </Modal>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight + 20,
        alignItems: 'center',
    },
    content: {
        paddingTop: 10,
        minWidth: '100%',
        maxWidth: '100%',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    title: {
        ...fonts.baseBig.bold,
        color: colors.dark,
    },
    input: {
        flexDirection: "row",
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderColor: colors.shade,
        ...fonts.base.normal,
        color: colors.dark,
        marginVertical: 5,
        borderRadius: 5,
    },
    city: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginVertical: 5,
    },
    error: {
        color: colors.light,
        backgroundColor: colors.backgroundError,
        borderColor: colors.borderError,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginVertical: 20,
    },
    button: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        ...fonts.baseBig.bold,
        color: colors.light,
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundModal,
    },
    modalContent: {
        maxWidth: "70%",
        backgroundColor: colors.background,
        borderRadius: 10,
        padding: 20,
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
    modalText: {
        ...fonts.base.normal,
        color: colors.dark,
        textAlign: 'center',
    },
    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: colors.primary,
        marginTop: 20,
    },
    modalButtonText: {
        ...fonts.baseSmall.normal,
        color: colors.light,
    },
});
