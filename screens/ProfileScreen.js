import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';



export default function ProfileScreen({ navigation }) {


    return (
        <View style={styles.container}>
        <View style={styles.gestion}>
         <View style={styles.menu} >
            <View style={styles.title}>
            <Text style={styles.text}>Gestion du compte</Text>
            </View >
            <TouchableOpacity style={styles.menu1} activeOpacity={0.8} title="Go to modify your info"
             onPress={() => navigation.navigate('modify info')}>
            <Text style={styles.text3} >Modifier ses informations</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menu1} activeOpacity={0.8}title="Go to add payment"
              onPress={() => navigation.navigate('add payment')}>
            <Text style={styles.text3} >Gestion des moyens de paiements</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menu1} activeOpacity={0.8}title="Go to send news"
             onPress={() => navigation.navigate('send news')}>
            <Text style={styles.text3} >Gestion des notifications</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menu1} activeOpacity={0.8}title="Go to settings"
             onPress={() => navigation.navigate('settings')}>
            <Text style={styles.text3} >Réglages</Text></TouchableOpacity>
         </View>
      
            <View style={styles.endMenu}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}><Text style={styles.text2} >retour</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}><Text style={styles.text2}>Valider</Text></TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight+40,
        paddingBottom: 20,
        
    },
    gestion: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '106%',
    },
menu: {
    width: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

},
title: {
    height: '30%',
    justifyContent: 'center',
},
endMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
},
button: {
    padding: 15,
    width: '45%',
    backgroundColor: "#1F6F78",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
},
menu1: {
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#33BBAA",
    alignItems: "center",
    justifyContent: "center",
}, 
text2: {
    color: 'white',
    fontSize: 17,

},
text: {
fontSize: 30,
alignItems: "center",
justifyContent: "center",
fontWeight: "bold", 
paddingTop: 60,
},
text3: {
    width: '90%',
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 17,
}
});