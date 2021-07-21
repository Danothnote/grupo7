import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button, Input, Title } from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Styleprops } from '../../constants/styleprops';

export default function SignUp(props: any) {
  const [name, setName] = useState<string | null>();
  const [surname, setSurname] = useState<string | null>();
  const [age, setAge] = useState<string | Date>('');
  const [cedula, setCedula] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string>('');
  const [vpassword, setVpassword] = useState<string | null>();
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Date>(new Date);

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email!!, password!!)
      .then(() => {
        auth().currentUser?.sendEmailVerification()
      })
      .then((createUserDB))
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
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('El usuario ya existe');
        }
        console.error(error);
      });
  }

  const createUserDB = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .set({
        name: name,
        surname: surname,
        age: firestore.Timestamp.fromDate(age as Date),
        cedula: cedula,
        email: email,
        role: 'user'
      })
      .then(() => {
        auth().signOut()
        Alert.alert('Por favor revise su correo para activar su cuenta')
        props.navigation.navigate('SignIn')
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
  }

  let pswrd;
  if (password != '' && vpassword != '') {
    if (password!!.length < 6) {
      pswrd = <Text style={{ color: "red", marginHorizontal: 30 }}>Son necesarios 6 caracteres como mínimo</Text>
    } else if (password == vpassword) {
      pswrd = <Text style={{ color: "green", marginHorizontal: 30 }}>Contraseñas correctas</Text>
    } else {
      pswrd = <Text style={{ color: "red", marginHorizontal: 30 }}>Las contraseñas no coinciden</Text>
    }
  }

  let btn1;
  if (name != '' && surname != '' && age != '' && cedula != null && email != '' && password != '' && password == vpassword) {
    btn1 = <Button onPress={signup} textButton='Registrarse' type={1} />
  } else {
    btn1 = <Button disabled={true} onPress={signup} textButton='Registrarse' type={1} />
  }

  let dateTxt;
  if (age == '') {
    dateTxt = 'Fecha de nacimiento'
  } else {
    dateTxt = moment(age).format('LL')
  }

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps='handled' >
        <View>
          <Title text='Registro' type={1} />
          <Title text='Por favor escriba todos sus datos' type={2} />
        </View>
        <View>
          <Input
            keyboardType='default'
            placeholder='Nombres'
            onChangeText={(name) => setName(name)}
          />
          <Input
            keyboardType='default'
            placeholder='Apellidos'
            onChangeText={(surname) => setSurname(surname)}
          />
          <Button onPress={() => { setShow(true) }} textButton={dateTxt} type={4} />
          {show && (
            <DateTimePicker
              value={value}
              mode={'date'}
              onChange={(event: any, selectedDate: any) => {
                if (event.type == 'set') {
                  setShow(false)
                  setValue(selectedDate)
                  setAge(moment(selectedDate).startOf('day').toDate())
                } else {
                  setShow(false)
                }
              }}
            />
          )}
          <Input
            keyboardType='numeric'
            placeholder='Cédula'
            onChangeText={(cedula) => {
              if (isNaN(parseInt(cedula))) {
                setCedula(null);
              } else {
                setCedula(cedula);
              }
            }}
          />
          <Input
            keyboardType='email-address'
            placeholder='Correo'
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            keyboardType='default'
            secureTextEntry={true}
            passwordRules={'Mínimo 6 caracteres'}
            placeholder='Contraseña'
            onChangeText={(password) => setPassword(password)}
          />
          <Input
            keyboardType='default'
            secureTextEntry={true}
            passwordRules={'Mínimo 6 caracteres'}
            placeholder='Verificar Contraseña'
            onChangeText={(vpassword) => setVpassword(vpassword)}
          />
          <View>
            {pswrd}
          </View>
        </View>
        <View style={styles.buttons}>
          {btn1}
          <Button onPress={() => props.navigation.navigate('SignIn')} textButton='Regresar' type={2} />
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
    justifyContent: "space-between"
  },
  buttons: {
    alignItems: "center"
  },
});