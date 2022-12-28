import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';
import { useRef, useState } from 'react';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

const CustomTextInput = ({ label, width, isError, ...props }) => {
    const ref = useRef(null);
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View style={[{ width }, styles.container, isFocused && styles.containerFocused, isError && styles.containerError]}>
            <Text style={isFocused ? styles.labelFocused : styles.label}>{label}</Text>
            <TextInput
                ref={ref}
                style={[isFocused ? styles.inputFocused : styles.input]}
                placeholderTextColor={isFocused ? `${colors.accent}55` : isError ? colors.error : colors.shade}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.shade,
        marginVertical: 5,
        height: 3 * fonts.baseSmall.normal.fontSize,
    },
    containerFocused: {
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.accent,
        marginVertical: 5,
    },
    containerError: {
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderError,
        marginVertical: 5,
    },
    label: {
        ...fonts.baseSmall.normal,
        color: colors.shade,
        position: 'absolute',
        top: -fonts.baseSmall.normal.fontSize / 2,
        left: 10,
        backgroundColor: colors.background,
        paddingHorizontal: 5,
        borderRadius: 1000,
    },
    labelFocused: {
        ...fonts.baseSmall.normal,
        color: colors.accent,
        position: 'absolute',
        top: -fonts.baseSmall.normal.fontSize / 2,
        left: 10,
        backgroundColor: colors.background,
        paddingHorizontal: 5,
        borderRadius: 1000,
    },
    labelError: {
        ...fonts.baseSmall.normal,
        color: colors.error,
        position: 'absolute',
        top: -fonts.baseSmall.normal.fontSize / 2,
        left: 10,
        backgroundColor: colors.background,
        paddingHorizontal: 5,
        borderRadius: 1000,
    },
    input: {
        width: '100%',
        ...fonts.base.normal,
        color: colors.dark,
    },
    inputFocused: {
        width: '100%',
        ...fonts.base.bold,
        color: colors.accent,
    },
    error: {
        color: colors.light,
    },
});