import React from 'react'
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as colors from '../styles/colors';

const AddCard = ({ onPressFunction, paymentNameError, cardNumberError, securityCodeError, ownerError, dateError, isConnected }) => {
    const [paymentName, setPaymentName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const cardNumberStr = (cardNumber.toString().match(/\d{1,4}/g) || []).join(' ');
    const [securityCode, setSecurityCode] = useState('');
    const [owner, setOwner] = useState('');
    const [date, setDate] = useState('');

    const onChangeDate = date => {
        let month = '';
        let year = '';
        const separate = date.match(/\d{1,2}/g) || [];
        separate[0] && (month = Math.min(12, separate[0]).toString().padStart(separate[0].length, '0'));
        separate[1] && (year = '/' + separate[1]);
        setDate(`${month}${year}`);
    };

    return (
        <View style={styles.container}>
            {isConnected ?
                <View style={styles.inputsContainer}>
                    <TextInput
                        placeholder='Nom du moyen de paiement'
                        textContentType='name'
                        style={[styles.input, styles.paymentName, paymentNameError && styles.error]}
                        placeholderTextColor={paymentNameError ? 'white' : undefined}
                        onChangeText={value => setPaymentName(value)}
                        value={paymentName}
                    />
                </View> :
                <Text style={styles.title}>Ajouter une carte</Text>
            }
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder='Numéro de carte'
                    keyboardType='numeric'
                    textContentType='creditC...ardNumber'
                    style={[styles.input, styles.cardNumber, cardNumberError && styles.error]}
                    placeholderTextColor={cardNumberError ? 'white' : undefined}
                    maxLength={19}
                    onChangeText={value => setCardNumber(+(value.split(' ').join('')))}
                    value={cardNumberStr}
                />
                <TextInput
                    placeholder='CVC'
                    keyboardType='numeric'
                    style={[styles.input, styles.securityCode, securityCodeError && styles.error]}
                    placeholderTextColor={securityCodeError ? 'white' : undefined}
                    maxLength={3}
                    onChangeText={value => setSecurityCode(value)}
                    value={securityCode}
                />
            </View>
            <View style={styles.inputsContainer}>
                <TextInput
                    placeholder='NOM'
                    autoCapitalize='characters'
                    textContentType='name'
                    style={[styles.input, styles.owner, ownerError && styles.error]}
                    placeholderTextColor={ownerError ? 'white' : undefined}
                    onChangeText={value => setOwner(value)}
                    value={owner}
                />
                <TextInput
                    placeholder='MM/AA'
                    autoCapitalize='characters'
                    textContentType='name'
                    keyboardType='numeric'
                    style={[styles.input, styles.date, dateError && styles.error]}
                    placeholderTextColor={dateError ? 'white' : undefined}
                    maxLength={5}
                    onChangeText={value => onChangeDate(value)}
                    value={date}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => onPressFunction({ paymentName, cardNumber, securityCode, owner, date })}>
                <Text style={styles.textButton}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    )
};

export default AddCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 20,
        paddingVertical: 5,
    },
    title: {
        fontSize: 20,
        color: colors.dark,
        fontWeight: 'bold',
    },
    inputsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    input: {
        backgroundColor: colors.light,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
        borderWidth: 1,
        borderColor: colors.shade,
        color: colors.dark,
    },
    error: {
        color: 'white',
        backgroundColor: colors.backgroundError,
        borderColor: colors.borderError,
    },
    paymentName: {
        flexGrow: 1,
    },
    cardNumber: {
        flexGrow: 1,
    },
    securityCode: {
        marginLeft: 10,
        width: 60,
        textAlign: 'center',
    },
    owner: {
        flexGrow: 1,
    },
    date: {
        marginLeft: 10,
        width: 80,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.primary,
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
        marginVertical: 5,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.light,
    },
});