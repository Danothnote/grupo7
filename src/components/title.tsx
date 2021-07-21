import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Styleprops } from '../constants/styleprops';

interface Props {
    text: string;
    type: number;
}

const Title: FC<Props> = (props) => {
    let styleTxt;
    if (props.type == 1) {
        styleTxt = styles.title
    } else if (props.type == 2) {
        styleTxt = styles.subtitle
    } else if (props.type == 3) {
        styleTxt = styles.paragraph
    }
    return (
        <Text style={styleTxt}>{props.text}</Text>
    );
};

export default Title;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: Styleprops.titleColor,
        fontSize: Styleprops.titleSize,
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        color: Styleprops.subtitleColor,
        fontSize: Styleprops.subtitleSize,
        marginTop: Styleprops.marginVertical
    },
    paragraph: {
        textAlign: 'justify',
        color: Styleprops.subtitleColor,
        fontSize: Styleprops.subtitleSize,
        marginTop: Styleprops.marginVertical
    }
});
