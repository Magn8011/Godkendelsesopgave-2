import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

// Generel opstilling er identisk for "ScreenOne" og "ScreenTwo"


/*
ScreenTwo udgør ligesom ScreenOne, en af de tre views i StackNavigatoren.
Den viser en tekst, der beskriver brugerens aktuelle position og tilbyder samtidig to <Button/>-elementer.
Det ene knap bruges til at gå tilbage til den forrige skærm, 
mens det andet knap bruges til at navigere til den næste skærm i mappen "StackComponents".
*/
function ScreenTwo({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nyt view!</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                <View style={{margin: '2%'}} >
                    <Button title="Gå tilbage" onPress={() => navigation.goBack() } />
                </View>
                <View style={{margin: '2%'}} >
                    <Button title="Gå til virksomhedernes lister" onPress={() => navigation.navigate('ScreenOne')}  />
                </View>
            </View>
        </View>
    );
}
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default ScreenTwo

//Lokal styling til brug til funktionen "ScreenTwo"
const styles = StyleSheet.create({
    container: {
        borderColor: 'babyblue',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});