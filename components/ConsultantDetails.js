// Importér React og nødvendige komponenter fra 'react-native' biblioteket
import React from 'react';
import { View, Text, Image } from 'react-native';

// Definér en funktionel komponent kaldet ConsultantDetails, der modtager 'route' som en prop
function ConsultantDetails({ route }) {
  // Destruér værdier fra 'route.params' objektet
  const { name, imageUri, experience, skills } = route.params;

  // Render komponenten
  return (
    // Opret en View-komponent med styling for at centrere indhold
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Vis et billede med kilden specificeret af 'imageUri' */}
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />

      {/* Vis konsulentens navn */}
      <Text>Navn: {name}</Text>

      {/* Vis konsulentens erfaring i antal år */}
      <Text>Erfaring: {experience} år</Text>

      {/* Vis konsulentens færdigheder som en kommasepareret liste */}
      <Text>Færdigheder: {skills.join(', ')}</Text>
    </View>
  );
}

// Eksportér ConsultantDetails komponenten som standard eksport
export default ConsultantDetails;