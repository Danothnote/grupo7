import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Keyboard, ToastAndroid, Alert } from 'react-native';
import { Button, Input, Title } from '../../components';
import { FAB } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { UserInfo } from '../../constants/userInfo';
import { LegacyRef } from 'react';
import { Styleprops } from '../../constants/styleprops';

const Request = (props: any) => {
  // Se inicializan las Variables de estado
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
  const [marker, setMarker] = useState<Object | null>(null);
  // Creación de referencia para el MapView
  const mapView: LegacyRef<MapView> = React.createRef();

  useEffect(() => {
    // Se verifica si se tiene permisos de ubicación, si los hay se consulta la posición actual
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
            currentPosition();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  // Función para consultar la posición actual, en caso de no tener activado 
  // el servicio de ubicación se pide al usuario que lo active
  const currentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (position) {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0009,
            longitudeDelta: 0.001,
          })
          moveCamera({latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0009,
            longitudeDelta: 0.001,})
        }
      }, error => {
        if (error.message == 'No location provider available.') {
          Alert.alert('Por favor active su ubicación y vuelva a intentar')
          props.navigation.navigate('HomeUser')
        }
      }
    )
  }

  // Función para mover la cámara a la posición actual
  const moveCamera = (region: any) => {
    mapView.current?.animateToRegion(region, 1000);
  }

  // Si la región cambia, se actualiza la posición en el estado
  const onRegionChange = () => {
    currentPosition();
    setRegion(region);
  }

  // Se agrega un marcador al tocar la pantalla
  const onMapPress = (event: any) => {
    setMarker(<Marker
      title={'Mantenga precionado para arrastrar'}
      coordinate={event.nativeEvent.coordinate}
      onSelect={e => log('onSelect', e)}
      onDrag={e => log('onDrag', e)}
      onDragStart={e => log('onDragStart', e)}
      onDragEnd={e => log('onDragEnd', e)}
      onPress={e => log('onPress', e)}
      draggable
    >
    </Marker>)
    setMarkerCoords(event.nativeEvent.coordinate)
  }

  // Mediante un evento de presionado largo, se puede mover el marcador
  const log = (eventName: string, e: any) => {
    setMarkerCoords({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    })
  }

  // Se agrega el formulario en la base de datos de Firestore si se tiene internet
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
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Title text='Solicitudes' type={1} />
          <Title text='Toque el mapa para marcar su ubicación' type={2} />
          <View style={styles.mapContainer}>
            <MapView
              showsCompass
              showsUserLocation
              ref={mapView}
              style={styles.map}
              initialRegion={region}
              onRegionChange={onRegionChange}
              onPress={(event) => onMapPress(event)}
            >
              {marker}
            </MapView>
            <FAB
              style={styles.fab}
              small
              icon="crosshairs-gps"
              onPress={() => moveCamera(region)}
            />
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
    </SafeAreaView>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
    backgroundColor: Styleprops.primaryColor
  }
});
