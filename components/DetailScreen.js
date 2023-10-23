// Importer nødvendige komponenter fra "react-native" biblioteket
import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";

/*
Metode til at navigere baseret på de argumenter, der sendes med i metoden.
Metodens logik udnytter den foruddefinerede metode 'navigate', som navigerer til den komponent,
der er associeret med det angivne rutenavn.
 */
const navController = (navigation, route) => {
    navigation.navigate(route);
}

// Definerer DetailsScreen-komponenten, der tager 'navigation' som en prop.
function DetailsScreen({ navigation }) {
    return (
        // Opretter en View (visuel container) med specifikke stilarter, herunder at centrere indholdet vandret.
        <View style={[styles.container, { alignItems: 'center' }]}>
            {/* Viser en tekst med specifikke stilarter */}
            <Text style={styles.text}>Gå til konsulentlister eller til virksomhedslister</Text>
            
            {/* Viser en knap med titlen "Gå til eksterne konsulenter" og en funktion, der kaldes, når knappen trykkes. Funktionen bruger 'navController' til at navigere til 'ScreenOne'. */}
            <Button title="Gå til virksomheder" onPress={() => navController(navigation, 'ScreenOne')} />
            
            {/* Viser en knap med titlen "Gå til interne konsulenter" og en funktion, der kaldes, når knappen trykkes. Funktionen bruger 'navController' til at navigere til 'ScreenTwo'. */}
            <Button title="Gå til konsulenter" onPress={() => navController(navigation, 'ScreenTwo')} />
        </View>
    );
}

export default DetailsScreen

// Opsætter en konstant 'styles', som indeholder styling til vores komponenter, hos os 'DetailsScreen'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingBottom: 100,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});