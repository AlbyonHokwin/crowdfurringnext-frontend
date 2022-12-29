import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';
import { useState, useRef } from 'react';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

const CustomTextInput = ({ label, width, isError, step, currentStep, maxStep, ...props }) => {
    // const [isFocused, setIsFocused] = useState(false)
    const ref = useRef(null);

    const isFocused = step === currentStep;

    isFocused && ref.current.focus();

    return (
        <View style={[{ width }, styles.container, isFocused && styles.containerFocused, isError && styles.containerError]}>
            <Text numberOfLines={1} style={[styles.label, isFocused && styles.labelFocused, isError && styles.labelError]}>{label}</Text>
            <TextInput
                ref={ref}
                style={[styles.input, isFocused && styles.inputFocused, isError && styles.inputError]}
                placeholderTextColor={isFocused ? `${colors.accent}55` : isError ? colors.error : colors.shade}
                returnKeyType={step < maxStep ? 'next' : 'done'}
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
        borderWidth: 2,
        padding: 9,
        borderColor: colors.accent,
    },
    containerError: {
        borderColor: colors.borderError,
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
        top: -fonts.baseSmall.normal.fontSize / 2 - 1,
        left: 9,
        ...fonts.baseSmall.bold,
        color: colors.accent,
    },
    labelError: {
        color: colors.error,
    },
    input: {
        width: '100%',
        ...fonts.base.normal,
        color: colors.dark,
    },
    inputFocused: {
        ...fonts.base.bold,
        color: colors.accent,
    },
    inputError: {
        color: colors.error,
    },
});