import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Styleprops } from '../constants/styleprops';

interface Props {
    placeholder: string;
    keyboardType: any;
    secureTextEntry?: boolean;
    passwordRules?: string;
    onChangeText: (text: string) => void;
    type?: number;
}


const Input: FC<Props> = (props) => {

    let style;
    let multiline;
    if (props.type == 2) {
        style = styles.largeInput
        multiline = true
    } else {
        style = styles.normalInput
        multiline = false
    }
    
    return (
        <TextInput
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            multiline={multiline}
            textAlignVertical='top'
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry || false}
            passwordRules={props.passwordRules || null}
            placeholderTextColor={Styleprops.placeholderColor}
            style={style}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    normalInput: {
        fontSize: Styleprops.normalTextSize,
        marginHorizontal: Styleprops.marginHorizontal,
        marginVertical: Styleprops.marginVertical,
        paddingHorizontal: Styleprops.inputPaddingHorizontal,
        paddingVertical: Styleprops.inputPaddingVertical,
        borderWidth: Styleprops.inputBorderWidth,
        borderRadius: Styleprops.borderRadius,
        borderColor: Styleprops.inputBorderColor,
        elevation: Styleprops.elevation,
        backgroundColor: Styleprops.inputBackground,
        color: Styleprops.normalTxtColor
    },
    largeInput: {
        fontSize: Styleprops.normalTextSize,
        marginHorizontal: Styleprops.marginHorizontal,
        marginVertical: Styleprops.marginVertical,
        paddingHorizontal: Styleprops.inputPaddingHorizontal,
        paddingVertical: Styleprops.inputPaddingVertical,
        borderWidth: Styleprops.inputBorderWidth,
        borderRadius: Styleprops.borderRadius,
        borderColor: Styleprops.inputBorderColor,
        elevation: Styleprops.elevation,
        backgroundColor: Styleprops.inputBackground,
        color: Styleprops.normalTxtColor,
        height: 200
    }
});
