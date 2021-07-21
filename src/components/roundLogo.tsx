import React, { FC } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Styleprops } from '../constants/styleprops';

const RoundLogo: FC = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/logo.png')}/>
        </View>
    );
};

export default RoundLogo;

const styles = StyleSheet.create({
    container: {
        width: Styleprops.imgWidth,
        height: Styleprops.imgHeight,
        borderRadius: Styleprops.imgBorderRadius,
        borderColor: Styleprops.imgBorderColor,
        borderWidth: Styleprops.imgBorderWidth,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    img: {
        resizeMode: 'contain',
        alignSelf: 'center',
    },
});
