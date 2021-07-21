import React, { FC } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Styleprops } from '../constants/styleprops';
import moment from 'moment';

interface Props {
    data: Array<any>;
    navigation: any;
}

const List: FC<Props> = (props) => {
    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={props.data}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Validation', { key: item.key, name: item.name, surname: item.surname, age: moment.duration({from: new Date , to: item.age.toDate()}).humanize(), details: item.details, latitude: item.latitude, longitude: item.longitude })}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[Styleprops.listColor1, Styleprops.listColor2, Styleprops.listColor3]}
                        locations={[0, 0.8, 1]}
                    >
                        <Text style={styles.txtBtn}>{item.surname} {item.name}</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={styles.txtBtn}>Edad: </Text>
                            <Text style={{ ...styles.txtBtn, fontWeight: 'normal' }}>{moment.duration({from: new Date , to: item.age.toDate()}).humanize()}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={styles.txtBtn}>Estado: </Text>
                            <Text style={{ ...styles.txtBtn, fontWeight: 'normal' }}>{item.status}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        />
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        marginVertical: Styleprops.marginVertical,
    },
    btn: {
        marginVertical: Styleprops.marginVertical,
        elevation: Styleprops.elevation
    },
    gradient: {
        borderRadius: Styleprops.borderRadius,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    txtBtn: {
        fontSize: Styleprops.normalTextSize,
        color: Styleprops.listTextColor,
        fontWeight: 'bold',
        textAlign: 'justify'
    }
});
