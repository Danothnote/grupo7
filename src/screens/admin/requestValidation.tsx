import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Button, Title } from '../../components';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Styleprops } from '../../constants/styleprops';
import moment from 'moment';

const RequestValidation = (props: any) => {
  const { key, name, surname, age, details, latitude, longitude } = props.route.params;
  const [granted, setGranted] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<any>('');
  const [value, setValue] = useState<Date>(new Date);
  const [date, setDate] = useState<string | Date>('');

  const next = () => {
    if (granted == 'Aceptada') {
      firestore()
        .collection('Submits')
        .doc(key)
        .update({ status: granted, date: firestore.Timestamp.fromDate(date as Date) })
      ToastAndroid.show('Solicitud Aceptada', ToastAndroid.SHORT)
      props.navigation.navigate('HomeAdmin')
    } else if (granted == 'Rechazada') {
      firestore()
        .collection('Submits')
        .doc(key)
        .update({ status: granted })
      ToastAndroid.show('Solicitud Rechazada', ToastAndroid.SHORT)
      props.navigation.navigate('HomeAdmin')
    }
  }

  let btn1;
  let picker;
  let dateTxt;
  let hourTxt;
  if (granted == '') {
    btn1 = <Button disabled={true} onPress={next} textButton='Continuar' type={1} />
  } else if (granted == 'Rechazada') {
    btn1 = <Button onPress={next} textButton='Continuar' type={1} />
  } else if (granted == 'Aceptada') {
    if (date == '') {
      dateTxt = 'Dia de visita'
      hourTxt = 'Hora de visita'
    } else {
      dateTxt = moment(date).format('LL')
      hourTxt = moment(date).format('LT a')
    }
    btn1 = <Button disabled={true} onPress={next} textButton='Continuar' type={1} />
    picker = <View style={{ marginVertical: 20 }} >
      <Title text={'Ecoja la fecha y hora de visita'} type={1} />
      <View style={{ alignItems: 'center', marginVertical: 20 }} >
        <Button onPress={() => { setShow(true); setMode('date') }} textButton={dateTxt} type={4} />
        <Button onPress={() => { setShow(true); setMode('time') }} textButton={hourTxt} type={4} />
      </View>
    </View>
    if (date != '') {
      btn1 = <Button onPress={next} textButton='Continuar' type={1} />
    }

  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title text='Validar Solicitud' type={1} />
          <View style={styles.mapContainer}>
            <MapView
              showsCompass
              showsUserLocation={false}
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0009,
                longitudeDelta: 0.001
              }}
            >
              <Marker
                title={`${surname} ${name}`}
                coordinate={{ latitude: latitude, longitude: longitude }}
              >
              </Marker>
            </MapView>
          </View>
          <Title text={'Motivo o discapacidad'} type={1} />
          <Title text={details} type={3} />
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
            <Title text={'Edad: '} type={2} />
            <Title text={age} type={2} />
          </View>
          <View style={styles.radioGroup}>
            <RadioButton.Group
              onValueChange={newValue => { setGranted(newValue) }}
              value={granted}>
              <RadioButton.Item
                value={'Aceptada'}
                labelStyle={styles.radioBtnTxt}
                label={'Aceptar'}
                uncheckedColor={Styleprops.disabledButtonBackground}
                color={Styleprops.primaryColor}
              />
              <RadioButton.Item
                value={'Rechazada'}
                labelStyle={styles.radioBtnTxt}
                label={'Rechazar'}
                uncheckedColor={Styleprops.disabledButtonBackground}
                color={Styleprops.primaryColor}
              />
            </RadioButton.Group>
          </View>
          {picker}
          {show && (
            <DateTimePicker
              style={{ width: 200 }}
              value={value}
              minimumDate={new Date}
              mode={mode}
              onChange={(event: any, selectedDate: any) => {
                if (event.type == 'set') {
                  setShow(false)
                  setValue(selectedDate)
                  setDate(selectedDate)
                } else {
                  setShow(false)
                }
              }}
            />
          )}
          {btn1}
          <Button onPress={() => props.navigation.navigate('HomeAdmin')} textButton='Regresar' type={2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestValidation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  mapContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: 400,
  },
  radioGroup: {
    borderWidth: 1,
    borderColor: Styleprops.primaryColor,
    borderRadius: Styleprops.borderRadius,
    padding: Styleprops.inputPaddingHorizontal,
    marginVertical: Styleprops.marginVertical,
    marginHorizontal: Styleprops.marginHorizontal
  },
  radioBtnTxt: {
    color: Styleprops.normalTxtColor,
    fontSize: Styleprops.normalTextSize,
    width: '90%',
    marginVertical: 10
  },
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
});
