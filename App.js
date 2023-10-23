import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Importer Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

// Importer vores komponenter fra components mappen
import LoginForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from './components/SettingScreen';
import StackNavigator from "./components/StackNavigator";
import Scan from "./components/Scan";

// Opret en bundnavigation til at skifte mellem skærme og importer vores komponenter
const Tab = createBottomTabNavigator();


// Konfigurer Firebase, så den kan bruges i hele appen taget fra firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeqQluJe8Wz37Q9iwdRE9ky7pu0DrkoQ0",
    authDomain: "godkendelseopgave1.firebaseapp.com",
    projectId: "godkendelseopgave1",
    storageBucket: "godkendelseopgave1.appspot.com",
    messagingSenderId: "783482051352",
    appId: "1:783482051352:web:a5a18ba1782418ab429c6d"
  };

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

export default function App() {
// Brugt til at repræsentere ingen bruger
  const [user, setUser] = useState(null); 

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
// Opdater brugerens tilstand baseret på godkendelsesstatus
      setUser(authUser); 
    });

// Afbryd abonnementet ved afmontering af komponenten
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
// Brugeren er logget ind, vis hovednavigationen
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Stack" component={StackNavigator} />
          <Tab.Screen name="Scan" component={Scan} /> 
        </Tab.Navigator>
      ) : (
// Brugeren er ikke logget ind, vis login-siderne
        <View style={styles.container}>
          <Text style={styles.paragraph}>
          Denne side bruges til at oprette en bruger eller logge ind, hvis du allerede har en bruger.
          </Text>
          <Card style={{ padding: 20, margin: 20 }}>
            <SignUpForm />
          </Card>
          <Card style={{ padding: 20, margin: 20 }}>
            <LoginForm />
          </Card>
        </View>
      )}
    </NavigationContainer>
  );
}

// Standard styling til i App.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    color: 'gray',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});