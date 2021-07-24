import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { Title, Button } from '../../components';
import moment from 'moment';
import 'moment/locale/es';

const RequestStatus = (props: any) => {
  // Se inicializan las Variables de estado
  const [ico, setIco] = useState<Object | null>(null);
  const [text, setText] = useState<Object | null>(null);

  useEffect(() => {
    // Se obtiene de Firestore el estado de la solicitud, la fecha y la hora de visita
    const subscriber = firestore()
      .collection('Submits')
      .doc(auth().currentUser?.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          if (documentSnapshot.data()!!.status == 'Pendiente') {
            setIco(<Icon name="remove-circle" size={70} color="#fdd835" />);
            setText(<Title text={'Solicitud pendiente de revisión.'} type={2} />);
          } else if (documentSnapshot.data()!!.status == 'Aceptada') {
            setIco(<Icon name="checkmark-circle" size={70} color="green" />);
            setText(<Title text={`Su solicitud ha sido aceptada, se procederá a realizar la visita a su domicilio el día ${moment(documentSnapshot.data()!!.date.toDate()).locale('es').format('LL')} a las ${moment(documentSnapshot.data()!!.date.toDate()).format('HH:mm a')}. Por favor estar atento.`} type={2} />);
          } else if (documentSnapshot.data()!!.status == 'Rechazada') {
            setIco(<Icon name="close-circle" size={70} color="red" />);
            setText(<Title text={'Su solicitud ha sido rechazada.'} type={2} />);
          }
        } else {
          setIco(<Icon name="sad" size={70} color="#fdd835" />);
          setText(<Title text={'Solicitud no encontrada.'} type={2} />);
        }
      })
    return () => subscriber();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title text={'Estado de Solicitud'} type={1} />
          <View style={styles.status}>
            {ico}
            {text}
          </View>
          <View style={styles.boton}>
            <Button onPress={() => props.navigation.navigate('HomeUser')} textButton={'Regresar'} type={2} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20
  },
  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3
  },
  status: {
    alignItems: 'center',
    marginVertical: 60
  },
  boton: {
    alignItems: 'center'
  }
});
