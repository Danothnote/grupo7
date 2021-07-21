import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Styleprops } from '../constants/styleprops';
import HomeUser from '../screens/user/homeUser';
import Request from '../screens/user/requestUser';
import RequestStatus from '../screens/user/requestStateUser';

const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeUser"} screenOptions={{contentStyle: {backgroundColor: Styleprops.appBackground}}}>
        <Stack.Screen name="HomeUser" component={HomeUser} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="Request" component={Request} options={({ route }) => ({headerShown:false})}/>
        <Stack.Screen name="Status" component={RequestStatus} options={({ route }) => ({headerShown:false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
