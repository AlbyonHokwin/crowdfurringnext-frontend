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
    SafeAreaView,
} from 'react-native';
import AddCard from '../components/AddCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as colors from '../styles/colors';

const BACKEND_URL = 'http://192.168.143.89:3000';

const PaymentScreen = ({ route, navigation }) => {
    const pot = route.params.pot;

    const photos = pot.pictures.map((photo, i) => {
        return (
            <View key={i} style={styles.touchablePhoto}>
                <Image source={{ uri: photo }} style={styles.photo} />
            </View>
        );
    });

    const paymentMethods = [];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContainer} >
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

                <View style={styles.paymentMethodsContainer}>
                    {paymentMethods}
                    <AddCard />
                </View>
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
    );
}

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        justifyContent: 'space-between',
    },
    scrollContainer: {
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
    paymentMethodsContainer: {
        width: '80%',
        height: Dimensions.get('screen').height / 3,
        marginVertical: 20,
    },
    scrollDescription: {},
    description: {
        fontSize: 16,
        textAlign: 'justify',
    },
    voidContainer: {
        height: 100,
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
