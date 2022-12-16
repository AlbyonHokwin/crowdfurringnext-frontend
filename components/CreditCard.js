import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as colors from '../styles/colors';

const CreditCard = ({ isConnected, ...card }) => {
    const cardNumberStr = (card.number.toString().match(/\d{1,4}/g) || []).join(' ');

    return (
        <View style={styles.container}>
            {isConnected &&
                <Text style={styles.title}>{card.paymentName}</Text>
            }
            <View style={styles.textsContainer}>
                <Text style={[styles.text, styles.cardNumber]}>{cardNumberStr}</Text>
                <Text style={[styles.text, styles.securityCode]}>{card.securityCode}</Text>
            </View>
            <View style={styles.textsContainer}>
                <Text style={[styles.text, styles.owner]}>{card.nameOnCard}</Text>
                <Text style={[styles.text, styles.date]}>{card.expirationDate}</Text>
            </View>
        </View>
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
        borderRadius: 20,
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
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