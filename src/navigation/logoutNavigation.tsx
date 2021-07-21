import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Styleprops } from '../constants/styleprops';
import SignIn from '../screens/logout/signin';
import SignUp from '../screens/logout/signup';

const Stack = createNativeStackNavigator();

export default function LogoutNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"SignIn"} screenOptions={{contentStyle: {backgroundColor: Styleprops.appBackground}}}>
        <Stack.Screen name="SignIn" component={SignIn} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="SignUp" component={SignUp} options={({ route }) => ({headerShown:false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}