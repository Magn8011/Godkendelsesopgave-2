import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  
  // Opretter to tilstande: showConsultants (for at styre om konsulenter skal vises) og consultantData (til at opbevare hentede data)
  const [showConsultants, setShowConsultants] = useState(false);
  const [consultantData, setConsultantData] = useState([]);

  // Funktion til at hente data fra en ekstern API, dette gøres via et asynkront fetch-kald, som henter en liste med 10 konsulenter
  const fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      setConsultantData(data.results);
    } catch (error) {
      console.error('Fejl under hentning af data:', error);
    }
  }

  // Effektfunktion aktiveres, når showConsultants ændres. Henter data, hvis showConsultants er true.
  useEffect(() => {
    if (showConsultants) {
      fetchData();
    }
  }, [showConsultants]);

  // Funktion til at skifte visningen af konsulenter
  const toggleConsultants = () => {
    setShowConsultants(!showConsultants);
  };

  const navigateToScan = () => {
    navigation.navigate('Scan');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Scan"
        onPress={navigateToScan}
        color="#007AFF"
      />

      <Button
        title={showConsultants ? 'Skjul konsulenter' : 'Vis ledige konsulenter'}
        onPress={toggleConsultants}
        color="#007AFF"
        style={styles.button}
      />

      {showConsultants && (
        <FlatList
          data={consultantData}
          keyExtractor={(item) => item.login.uuid}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
              <Text style={styles.experience}>{`${item.dob.age} år erfaring`}</Text>
              {item.skills && item.skills.length > 0 && (
                <Text style={styles.skills}>Faglige kompetencer:</Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'beige',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  experience: {
    fontSize: 14,
    color: '#777',
  },
  skills: {
    fontSize: 14,
    color: 'black',
  },
});

export default HomeScreen;