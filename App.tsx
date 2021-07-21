import * as React from 'react';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LogoutNavigation from './src/navigation/logoutNavigation';
import RoleNavigation from './src/navigation/roleNavigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <LogoutNavigation />
    );
  }

  return (
    <RoleNavigation />
  );
}

export default App;