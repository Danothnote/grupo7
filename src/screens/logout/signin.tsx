import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, StatusBar, Alert } from 'react-native';
import { Title, RoundLogo, Input, Button } from '../../components'
import auth from '@react-native-firebase/auth';
import { Styleprops } from '../../constants/styleprops';

export default function SignIn(props:any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (!auth().currentUser?.emailVerified) {
            auth().signOut()
            Alert.alert('Por favor revise su correo para activar su cuenta')
          } else {
            props.navigation.navigate('SignIn')
          }
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('El correo no es válido');
          }
          if (error.code === 'auth/user-not-found') {
            Alert.alert('Usuario no encontrado');
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('La contraseña no es correcta');
          }
          console.error(error);
        });
    } else {
      Alert.alert('Por favor ingrese sus datos')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Styleprops.appBackground} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps='handled' >
        <View>
          <RoundLogo />
        </View>
        <View>
          <Title text='Bienvenido' type={1} />
          <Title text='Por favor ingrese sus datos' type={2} />
        </View>
        <View>
          <Input
            placeholder='Correo'
            keyboardType='email-address'
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            placeholder='Contraseña'
            keyboardType='default'
            secureTextEntry={true}
            passwordRules={'Mínimo 6 caracteres'}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={login} textButton='Ingresar' type={1} />
          <Button onPress={() => props.navigation.navigate('SignUp')} textButton='Registrarse' type={2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styleprops.appBackground
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 100,
    justifyContent: 'space-around'
  },
  buttons: {
    alignItems: 'center'
  }
});
