import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as colors from '../styles/colors';

const CreditCard = ({ isConnected, isSelected, onPress, ...card }) => {
    const expirationDate = new Date(card.expirationDate);
    const expirationDateStr = `${expirationDate.getMonth() + 1}`.padStart(2, '0') + '/' + `${expirationDate.getFullYear()}`.slice(-2);
    // const cardNumberStr = (card.number.toString().match(/\d{1,4}/g) || []).join(' ');
    const cardNumberStr = card.number.toString().slice(-4).padStart(card.number.toString().length + 3, '**** ');

    return (
        <TouchableOpacity style={[styles.container, isSelected && { borderWidth: 2, backgroundColor: `${colors.accent}55` }]} activeOpacity={0.9} onPress={onPress}>
            {isConnected &&
                <Text style={styles.title}>{card.paymentName}</Text>
            }
            <View style={styles.textsContainer}>
                <Text style={[styles.text, styles.cardNumber]}>{cardNumberStr}</Text>
                <Text style={[styles.text, styles.securityCode]}>{card.securityCode}</Text>
            </View>
            <View style={styles.textsContainer}>
                <Text style={[styles.text, styles.owner]}>{card.nameOnCard}</Text>
                <Text style={[styles.text, styles.date]}>{expirationDateStr}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default CreditCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    title: {
        width: '90%',
        fontSize: 20,
        color: colors.dark,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    textsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingLeft: 15,
    },
    text: {
        backgroundColor: colors.light,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
        borderWidth: 1,
        borderColor: colors.shade,
        color: colors.dark,
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
});