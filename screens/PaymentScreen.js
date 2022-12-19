import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TextInput,
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

const BACKEND_URL = 'http://192.168.1.110:3000';

const PaymentScreen = ({ route, navigation }) => {
    // const user = useSelector(state => state.user.value);
    const user = { token: 'fzealiujeqnejbnlz1367I4njliH' };

    const pot = route.params.pot;
    const [currentAmount, setCurrentAmount] = useState(pot.currentAmount);
    const [paymentNameError, setPaymentNameError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [securityCodeError, setSecurityCodeError] = useState(false);
    const [ownerError, setOwnerError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [addNewCard, setAddNewCard] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState(1);

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
                        setSelectedCard({ key: 0, card: fetchedPaymentMethods[0] })
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

        if (!user.token) {
            setAddNewCard(false);
            setPaymentMethods([...paymentMethods, newCard]);
            !selectedCard && setSelectedCard({ key: 0, card: newCard })
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
                !selectedCard && setSelectedCard({ key: 0, card: newCard })
            }
        }
    };

    const closeAddCard = () => {
        setAddNewCard(false);
    }

    const creditCards = paymentMethods.map((card, i) => {
        return (
            <CreditCard key={i} isSelected={selectedCard ? selectedCard.key === i : false} isConnected={!!user.token} onPress={() => setSelectedCard({ key: i, card })} {...card} />
        );
    });

    const photos = pot.pictures.map((photo, i) => {
        return (
            <View key={i} style={styles.touchablePhoto}>
                <Image source={{ uri: photo }} style={styles.photo} />
            </View>
        );
    });

    const pressBack = () => {
        step === 1 ?
            navigation.goBack() :
            setStep(step - 1);
    };

    const pressNext = async () => {
        if (step === 1) {
            if (!selectedCard || !+amount) return;
            setStep(step + 1);
        }
        if (step === 2) {
            const response = await fetch(`${BACKEND_URL}/pots/pay/${pot.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, email: user.email }),
            });
            const data = await response.json();
            if (data.result) {
                setCurrentAmount(data.newAmount);
                setStep(step + 1);
            }
        }
    };

    let paymentStep = null;
    let nextBtnText = '';
    switch (step) {
        case 1:
            paymentStep = <>
                <View style={styles.photos}>
                    <ScrollView horizontal={true} style={styles.photosScroll}>
                        {photos}
                    </ScrollView>
                </View>

                <ScrollView style={styles.paymentMethodsContainer} nestedScrollEnabled={true}>
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

                <View style={styles.divider} />

                <View>
                    <Text style={styles.textAmount}>Combien souhaitez-vous donner ?</Text>
                    <View style={styles.amountContainer}>
                        <TextInput style={styles.amountInput} placeholder='---' keyboardType='numeric' onChangeText={value => setAmount(value)} value={amount.replace(',', '.')} />
                        <Text style={styles.textAmount}> €</Text>
                    </View>
                </View>
            </>;
            nextBtnText = 'Vérification';
            break;
        case 2:
            paymentStep = <>
                <View style={styles.amountToGiveContainer}>
                    <Text style={styles.textAmountToGive}>Vous souhaitez donner :</Text>
                    <Text style={styles.amountToGive}>{amount} €</Text>
                </View>

                <View style={styles.photos}>
                    <ScrollView horizontal={true} style={styles.photosScroll}>
                        {photos}
                    </ScrollView>
                </View>

                {!user.token &&
                    <View style={[styles.loginContainer, { flexDirection: 'column' }]}>
                        <Text style={styles.textInformation}>En ayant un compte, vous pourrez suivre l'évolution de cette cagnotte.</Text>
                        <TouchableOpacity onPress={() => pressBack()} style={[styles.button, { width: '100%' }]} activeOpacity={0.8}>
                            <Text style={styles.textBackButton}>Se connecter ou créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                }
            </>;
            nextBtnText = 'Payer';
            break;
        case 3:
            break;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <SafeAreaView style={styles.container}>

                <ScrollView contentContainerStyle={styles.content} >
                    <View style={styles.header}>
                        <Text style={styles.name}>{pot.animalName}</Text>
                        <Text style={styles.city}>{pot.user.address.city}</Text>
                        <Text style={styles.amounts}>{currentAmount}€ / {pot.targetAmount}€</Text>
                    </View>

                    {paymentStep}
                    
                </ScrollView>

                <View style={styles.buttonsContainer}>
                    {step < 3 ?
                        <>
                            <TouchableOpacity onPress={() => pressBack()} style={styles.button} activeOpacity={0.8}>
                                <Text style={styles.textBackButton}>Retour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => pressNext()} style={styles.button} activeOpacity={0.8}>
                                <Text style={styles.textGiveButton}>{nextBtnText}</Text>
                            </TouchableOpacity>
                        </> :
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Home' })} style={[styles.button, { width: '100%' }]} activeOpacity={0.8}>
                                <Text style={styles.textGiveButton}>Revenir à l'accueil</Text>
                            </TouchableOpacity>
                        </>
                    }
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
        marginVertical: 10,
        maxHeight: Dimensions.get('screen').height / 2.5,
    },
    textAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.dark,
    },
    amountContainer: {
        borderWidth: 1,
        borderColor: colors.shade,
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountInput: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.dark,
    },
    voidContainer: {
        flexGrow: 1,
        backgroundColor: 'blue',
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
    divider: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: colors.accent,
        marginVertical: 5,
    },
    amountToGiveContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 30,
    },
    textAmountToGive: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.dark,
    },
    amountToGive: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.dark,
    },
    loginContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: '80%',
    },
    textInformation: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
});
