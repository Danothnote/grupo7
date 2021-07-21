import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Styleprops } from '../constants/styleprops';
import HomeAdmin from '../screens/admin/homeAdmin';
import RequestValidation from '../screens/admin/requestValidation';

const Stack = createNativeStackNavigator();

export default function AdminNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeAdmin"} screenOptions={{contentStyle: {backgroundColor: Styleprops.appBackground}}}>
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="Validation" component={RequestValidation} options={({ route }) => ({headerShown:false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
