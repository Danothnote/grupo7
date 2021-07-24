import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { List, Title, Button } from '../../components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeAdmin = (props: any) => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Submits')
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('No hay datos')
        } else {
          const data: Array<any> = [];
          querySnapshot.forEach(documentSnapshot => {
            data.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setData(data);
        }
      });
    return () => {
      subscriber();
    }

  }, []);

  const signout = () => {
    auth().signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title text={'Bienvenido Administrador'} type={1} />
      <View style={{ flex: 1, marginTop: 20 }}>
        <Title text={'Lista de Solicitudes'} type={2} />
        <List data={data} navigation={props.navigation} />
      </View>
      <View style={{ marginTop: 20, alignItems: 'center', justifyContent:'flex-end' }}>
        <Button onPress={signout} textButton='Cerrar Sesión' type={2} />
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20
  }
});
