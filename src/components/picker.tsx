import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Styleprops } from '../constants/styleprops';

interface Props {
    selectedValue: string;
    onValueChange: (itemValue: React.ReactText, itemIndex: number) => void;
    list: Array<any>;
}

const PickerList: FC<Props> = (props) => {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                itemStyle={styles.pickerItem}
                selectedValue={props.selectedValue}
                mode='dropdown'
                dropdownIconColor={Styleprops.activeColor}
                onValueChange={props.onValueChange}>
                {props.list.map((item) => {
                    return (<Picker.Item color={Styleprops.titleColor} key={item.key} label={item.name} value={item.name} />)
                })}
            </Picker>
        </View>
    );
};

export default PickerList;

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: Styleprops.normalTextSize,
    },
    pickerContainer: {
        marginHorizontal: Styleprops.marginHorizontal,
        marginVertical: Styleprops.marginVertical,
        padding: 5,
        borderWidth: Styleprops.inputBorderWidth,
        borderRadius: Styleprops.borderRadius,
        borderColor: Styleprops.primaryColor,
        elevation: Styleprops.elevation,
        backgroundColor: Styleprops.inputBackground
    },
});
