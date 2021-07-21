import React, { FC } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Styleprops } from '../constants/styleprops';

interface Props {
    onPress: () => void;
    textButton: string;
    disabled?: boolean;
    type?: number;
}

const Button: FC<Props> = (props) => {
    let styleBtn;
    let styleTxt;
    if (!props.disabled) {
        if (props.type == 1) {
            styleBtn = { ...styles.btn, backgroundColor: Styleprops.primaryColor }
            styleTxt = { ...styles.txtBtn, color: Styleprops.primaryButtonTextColor }
        } else if (props.type == 2) {
            styleBtn = { ...styles.btn, backgroundColor: Styleprops.secondaryColor }
            styleTxt = { ...styles.txtBtn, color: Styleprops.secondaryButtonTextColor }
        } else if (props.type == 3) {
            styleBtn = styles.indexBtn
            styleTxt = { ...styles.txtBtn, color: Styleprops.primaryButtonTextColor }
        } else if (props.type == 4) {
            styleBtn = styles.btnInput
            styleTxt = styles.inputTxt
        } else {
            styleTxt = { color: Styleprops.titleColor }
        }
    } else {
        styleBtn = { ...styles.btn, backgroundColor: Styleprops.disabledButtonBackground, elevation: 0 }
        styleTxt = { ...styles.txtBtn, color: Styleprops.disabledTxtButtonColor }
    }
    return (
        <TouchableOpacity style={styleBtn} disabled={props.disabled || false} onPress={props.onPress}>
            <Text style={styleTxt}>{props.textButton}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Styleprops.buttonPaddingVertical,
        paddingHorizontal: Styleprops.buttonPaddingHorizontal,
        marginVertical: Styleprops.marginVertical,
        borderRadius: Styleprops.borderRadius,
        elevation: Styleprops.elevation,
        shadowColor: Styleprops.activeColor,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    btnInput: {
        marginHorizontal: Styleprops.marginHorizontal,
        marginVertical: Styleprops.marginVertical,
        paddingHorizontal: Styleprops.inputPaddingHorizontal,
        paddingVertical: Styleprops.inputPaddingVertical,
        borderWidth: Styleprops.inputBorderWidth,
        borderRadius: Styleprops.borderRadius,
        borderColor: Styleprops.inputBorderColor,
        elevation: Styleprops.elevation,
        backgroundColor: Styleprops.inputBackground,
    },
    txtBtn: {
        fontSize: Styleprops.normalTextSize,
        fontWeight: 'bold'
    },
    indexBtn: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: Styleprops.primaryColor,
        marginVertical: Styleprops.marginVertical,
        marginHorizontal: Styleprops.marginHorizontal,
        borderRadius: Styleprops.borderRadius,
        elevation: Styleprops.elevation
    },
    inputTxt: {
        fontSize: Styleprops.normalTextSize,
        color: Styleprops.normalTxtColor
    }
});
