import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as colors from '../styles/colors';

const Pot = (props) => {
    const { picture, slug, width, height } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log(slug)} activeOpacity={0.9}>
            <Image source={{ uri: picture }} style={[{ width: width , height: height }, styles.image]} />
        </TouchableOpacity>
    );
};

export default Pot;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        shadowColor: colors.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 20,
    },
});