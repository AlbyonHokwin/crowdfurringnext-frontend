import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import * as colors from "../styles/colors";
import AddCard from '../components/AddCard';
import CreditCard from '../components/CreditCard';

const BACKEND_URL = 'http://192.168.158.89:3000';

const PaymentManagementScreen = ({ navigation }) => {
    const user = useSelector(state => state.user.value);
    const [paymentNameError, setPaymentNameError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [securityCodeError, setSecurityCodeError] = useState(false);
    const [ownerError, setOwnerError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [addNewCard, setAddNewCard] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        (async () => {
            if (user.token) {
                const response = await fetch(`${BACKEND_URL}/users/payments`, {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                    },
                });
                const data = await response.json();

                if (data.result) {
                    const fetchedPaymentMethods = data.paymentMethods;
                    setPaymentMethods(fetchedPaymentMethods);

                    if (fetchedPaymentMethods[0]) {
                        setAddNewCard(false);
                    }
                }
            }
        })();
    }, []);

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
        } else if (new Date(`20${card.date.split('/')[1]}`, card.date.split('/')[0]) <= new Date()) {
            isValid = false;
            setDateError(true);
        } else setDateError(false);

        if (!card.paymentName && user.token) {
            isValid = false;
            setPaymentNameError(true);
        } else setPaymentNameError(false);

        if (!isValid) return;

        const expirationDate = new Date(`20${card.date.split('/')[1]}`, card.date.split('/')[0]);
        const newCard = {
            paymentName: 'Carte rajoutée',
            number: card.cardNumber,
            expirationDate,
            securityCode: card.securityCode,
            nameOnCard: card.owner,
        };

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
    };

    const closeAddCard = () => {
        setAddNewCard(false);
    };

    const onPressCard = ({ key, card }) => {
        if (!selectedCard) {
            setSelectedCard({ key, card });
            return;
        }

        if (selectedCard.key === key) setSelectedCard(null);
        else setSelectedCard({ key, card });
    }

    const deleteCard = async paymentName => {
        const response = await fetch(`${BACKEND_URL}/users/deletepayment/${paymentName}`, {
            method: 'DELETE',
            headers: {'authorization': 'Bearer ' + user.token}
        });
        const data = await response.json();

        if (data.result) {
            setPaymentMethods(paymentMethods.filter(paymentMethod => paymentMethod.paymentName !== data.paymentName));
        }
    };

    const creditCards = paymentMethods.map((card, i) => {
        return (
            <View key={i}>
                <CreditCard isSelected={selectedCard ? selectedCard.key === i : false} isConnected={true} onPress={() => onPressCard({ key: i, card })} {...card} />
                {selectedCard && selectedCard.key === i && <>
                    <TouchableOpacity onPress={() => deleteCard(card.paymentName)} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Supprimer</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                </>}
            </View>
        );
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Gestion des paiments</Text>
                <ScrollView contentContainerStyle={styles.content} >
                    {creditCards}
                    <View style={styles.divider} />
                    {addNewCard &&
                        <AddCard
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
                            <Text style={styles.textButton}>Rajouter une carte</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Retour</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default PaymentManagementScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.dark,
        marginVertical: 30,
    },
    content: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '80%',
    },
    buttonsContainer: {
        width: '100%',
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
    textButton: {
        fontWeight: '600',
        fontSize: 20,
        color: colors.light,
    },
    divider: {
        minWidth: '100%',
        maxWidth: '100%',
        borderBottomWidth: 1,
        borderColor: colors.accent,
        marginVertical: 10,
    },
});