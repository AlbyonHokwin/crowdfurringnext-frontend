import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as colors from '../styles/colors';

const AddCard = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une carte</Text>
            <View style={styles.ownerSecurityCodeContainer}>
                <TextInput
                    placeholder='NOM'
                    autoCapitalize='characters'
                    textContentType='name'
                    style={[styles.input, styles.ownerInput]}
                />
                <TextInput
                    placeholder='CVC'
                    keyboardType='numeric'
                    style={[styles.input, styles.securityCodeInput]}
                />
            </View>
            <TextInput
                placeholder='Numéro de carte'
                keyboardType='numeric'
                textContentType='creditCardNumber'
                style={[styles.input, styles.cardNumberInput]}
            />
            <View>

            </View>

        </View>
    )
};

export default AddCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    title: {
        fontSize: 20,
        color: colors.dark,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: colors.light,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        fontSize: 16,
        color: colors.dark,
    },
    ownerSecurityCodeContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ownerInput: {
        flexGrow: 1,
    },
    securityCodeInput: {
        marginLeft: 10,
        width: 60,
        textAlign: 'center',
    },
    cardNumberInput: {
        width: '100%',
    },
});