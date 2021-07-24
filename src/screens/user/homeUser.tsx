import * as React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Title } from '../../components';

const HomeUser = (props: any) => {
  const signout = () => {
    auth().signOut()
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title text='Bienvenido' type={1} />
          <Title text='Escoja una opción' type={2} />
          <View style={{ marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => props.navigation.navigate('Request')} textButton='Crear Solicitud' type={1} />
            <Button onPress={() => props.navigation.navigate('Status')} textButton='Estado de solicitud' type={1} />
            <View style={{ marginTop: 40 }}>
              <Button onPress={signout} textButton='Cerrar Sesión' type={2} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
