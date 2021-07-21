import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import UserNavigation from './userNavigation';
import AdminNavigation from './adminNavigation';
import { UserInfo } from '../constants/userInfo';

export default function RoleNavigation(props: any) {
    const [role, setRole] = useState<string | null>(null);
    const [navigator, setNavigator] = useState(<Text>Espere por Favor</Text>);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users')
            .doc(auth().currentUser?.uid)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.data()!!.role == 'admin') {
                    setRole('admin');
                    setNavigator(<AdminNavigation />)
                } else if (documentSnapshot.data()!!.role == 'user') {
                    setRole('user');
                    setNavigator(<UserNavigation />)
                    UserInfo.name = documentSnapshot.data()!!.name
                    UserInfo.surname = documentSnapshot.data()!!.surname
                    UserInfo.age = documentSnapshot.data()!!.age
                    UserInfo.email = documentSnapshot.data()!!.email
                    UserInfo.cedula = documentSnapshot.data()!!.cedula
                }
            })
        return () => subscriber();
    }, []);

    return (
        navigator
    );
}