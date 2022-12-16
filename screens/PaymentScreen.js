import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    KeyboardAvoidingView,
} from 'react-native';
import AddCard from '../components/AddCard';
import CreditCard from '../components/CreditCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as colors from '../styles/colors';

const BACKEND_URL = 'http://192.168.10.171:3000';

const PaymentScreen = ({ route, navigation }) => {
    // const user = useSelector(state => state.user.value);
    const user = { token: 'fzealiujeqnejbnlz1367I4njliH' };

    const pot = route.params.pot;
    const [paymentNameError, setPaymentNameError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [securityCodeError, setSecurityCodeError] = useState(false);
    const [ownerError, setOwnerError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [addNewCard, setAddNewCard] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const photos = pot.pictures.map((photo, i) => {
        return (
            <View key={i} style={styles.touchablePhoto}>
                <Image source={{ uri: photo }} style={styles.photo} />
            </View>
        );
    });

    const addCard = async card => {
        let isValid = true;

        if ((card.cardNumber.toString().match(/\d/g) || []).length !== 16) {
            isValid = false;
            setCardNumberError(true);
        } else setCardNumberError(false);

        if ((card.securityCode.match(/\d/g) || []).length !== 3) {
            isValid = false;
            setSecurityCodeError(true);
        } else setSecurityCodeError(false);

        if (!card.owner || /\d/.test(card.owner)) {
            isValid = false;
            setOwnerError(true);
        } else setOwnerError(false);

        if (!/\d{2}\/\d{2}/.test(card.date)) {
            isValid = false;
            setDateError(true);
        } else setDateError(false);

        if (!card.paymentName && user.token) {
            isValid = false;
            setPaymentNameError(true);
        } else setPaymentNameError(false);

        if (!isValid) return;

        const newCard = {
            paymentName: 'Carte rajoutée',
            number: card.cardNumber,
            expirationDate: card.date,
            securityCode: card.securityCode,
            nameOnCard: card.owner,
        };

        if (!user.token) {
            setAddNewCard(false);
            setPaymentMethods([...paymentMethods, newCard]);
        } else {
            newCard.paymentName = card.paymentName;

            const response = await fetch(`${BACKEND_URL}/users/addpayment`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newCard }),
            });
            const data = await response.json();

            if (data.result) {
                setAddNewCard(false);
                setPaymentMethods([...paymentMethods, newCard]);
            }
        }
    };

    const closeAddCard = () => {
        setAddNewCard(false);
    }

    const creditCards = paymentMethods.map((card, i) => {
        return (
            <CreditCard key={i} isConnected={!!user.token} {...card} />
        );
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={styles.container}>

                <View style={styles.content} >
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

                    <ScrollView style={styles.paymentMethodsContainer}>
                        {creditCards}
                        {addNewCard && <AddCard
                            onPressFunction={addCard}
                            onCloseFunction={closeAddCard}
                            isConnected={!!user.token}
                            paymentNameError={paymentNameError}
                            cardNumberError={cardNumberError}
                            securityCodeError={securityCodeError}
                            ownerError={ownerError}
                            dateError={dateError}
                        />}
                        {!addNewCard &&
                            <TouchableOpacity onPress={() => setAddNewCard(true)} style={styles.button} activeOpacity={0.8}>
                                <Text style={styles.textBackButton}>Rajouter une carte</Text>
                            </TouchableOpacity>
                        }
                    </ScrollView>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textBackButton}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('next')} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textGiveButton}>Vérification</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    content: {
        justifyContent: 'flex-end',
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
    paymentMethodsContainer: {
        width: '80%',
        marginVertical: 20,
    },
    buttonsContainer: {
        // position: 'absolute',
        // bottom: 0,
        // zIndex: 999,
        width: '100%',
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
