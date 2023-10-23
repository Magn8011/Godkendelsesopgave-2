// importer React og de nødvendige komponenter fra react-navigation
import * as React from "react";
import ScreenOne from "./StackComponents/ScreenOne";
import ScreenTwo from "./StackComponents/ScreenTwo";
import DetailsScreen from "./DetailScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ScanScreen from "./Scan";

// Her instantieres en StackNavigator.
const Stack = createStackNavigator();

// I return() placeres en Stack.Navigator komponent, som i 'initialRouteName' henviser til DetailsScreen.
// Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
// Hver Screen har individuel styling af den fremviste header.
function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Details" 
// Den første skærm, der vises, er DetailsScreen
        >
            <Stack.Screen
// Navnet på skærmen
                name="Details" 
// Den tilknyttede komponent, der skal vises
                component={DetailsScreen}
                options={{
// Centrer titlen i headeren
                    headerTitleAlign: 'center', 
// Styling af headerens titeltekst                    
                    headerTitleStyle: { color: 'white' }, 
// Styling af headerens baggrund
                    headerStyle: { backgroundColor: '#ba6262' } 
                }}
            />
            <Stack.Screen
                name="ScreenOne"
                component={ScreenOne}
                options={{
// Styling af headerens titeltekst
                    headerTitleStyle: { textAlign: 'right', color: 'white' }, 
// Styling af headerens baggrund
                    headerStyle: { backgroundColor: '#62bab5' } 
                }}
            />
            <Stack.Screen
                name="ScreenTwo"
                component={ScreenTwo}
                options={{
// Styling af headerens titeltekst
                    headerTitleStyle: { color: 'black' }, 
// Styling af headerens baggrund
                    headerStyle: { backgroundColor: '#628bba' } 
                }}
            />
            <Stack.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: '#62bab5' },
        }}

    />
        </Stack.Navigator>
    );
}

// Eksport af den funktionelle komponent, så den kan importeres i andre komponenter
export default StackNavigator;