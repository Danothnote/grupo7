import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, ToastAndroid, Alert } from 'react-native';
import { Button, Input, Title } from '../../components';
import NetInfo from "@react-native-community/netinfo";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { UserInfo } from '../../constants/userInfo';

const Request = (props: any) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0009,
    longitudeDelta: 0.001,
  });
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 0,
    longitude: 0
  });
  const [text, setText] = useState<string | null>(null);
  const [net, setNet] = useState<Object | null>(null);
  
  useEffect(() => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
              console.log(result)
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            posiciónActual();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });

    const posiciónActual = () => {
      Geolocation.getCurrentPosition(
        position => {
          if (position) {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0009,
              longitudeDelta: 0.001,
            })
            setMarkerCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          }
        }
      )
    }

  }, []);

  const onRegionChange = (region: any) => {
    setRegion(region);
  }

  const log = (eventName: any, e: any) => {
    setMarkerCoords({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    })
  }

  const submit = () => {
    Keyboard.dismiss()
    UserInfo.latitude = markerCoords.latitude
    UserInfo.longitude = markerCoords.longitude
    UserInfo.details = text as string
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        firestore().collection('Submits').doc(auth().currentUser?.uid).set(UserInfo)
        ToastAndroid.show('Solicitud enviada', ToastAndroid.SHORT)
        props.navigation.navigate('HomeUser')
      } else {
        Alert.alert('No tiene acceso a Internet, por favor intentar más tarde');
      }
    });
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Title text='Solicitudes' type={1} />
        <Title text='Escoja su ubicación' type={2} />
        <View style={styles.mapContainer}>
          <MapView
            showsCompass
            showsUserLocation
            style={styles.map}
            initialRegion={region}
            onRegionChange={onRegionChange}
          >
            <Marker
              title={'Mantenga precionado para arrastrar'}
              coordinate={{ latitude: markerCoords.latitude, longitude: markerCoords.longitude }}
              onSelect={e => log('onSelect', e)}
              onDrag={e => log('onDrag', e)}
              onDragStart={e => log('onDragStart', e)}
              onDragEnd={e => log('onDragEnd', e)}
              onPress={e => log('onPress', e)}
              draggable
            >
            </Marker>
          </MapView>
        </View>
        <Input
          type={2}
          keyboardType='default'
          placeholder='Motivo o discapacidad por la cual solicita la vacuna a domicilio'
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={submit} textButton='Enviar Solicitud' type={1} />
        <Button onPress={() => props.navigation.navigate('HomeUser')} textButton='Regresar' type={2} />
      </View>
    </ScrollView>
  );
};

export default Request;

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
});
