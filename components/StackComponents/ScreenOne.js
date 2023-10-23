import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { useState } from "react";

const generateRandomCompanies = (count) => {
    const companies = [];
    const companyNames = ["Apple Inc.", "Google LLC", "Microsoft Corporation", "Amazon.com Inc.", "Facebook, Inc.", "Tesla, Inc.", "Netflix, Inc.", "Adobe Inc."];
    const focusAreas = ["IT-branchen", "E-handel", "Cloud Services", "Social Media", "Elektriske køretøjer", "Underholdning", "Softwareudvikling", "Digitale løsninger"];
  
    for (let i = 0; i < count; i++) {
      const company = {
        name: companyNames[Math.floor(Math.random() * companyNames.length)],
        lifespan: `${Math.floor(Math.random() * 50) + 1} years`,
        focus: focusAreas[Math.floor(Math.random() * focusAreas.length)],
      };
      companies.push(company);
    }
    return companies;
  };

function ScreenOne() {
  const [companies, setCompanies] = useState([]);

  const showRandomCompanies = () => {
    const randomCompanies = generateRandomCompanies(10);
    setCompanies(randomCompanies);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mulige arbejdspladser for konsulenter!</Text>
      <Button title="Vis virksomheder" onPress={showRandomCompanies} />
      {companies.length > 0 && (
        <FlatList
          data={companies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.companyItem}>
              <Text>{item.name}</Text>
              <Text>Livetid: {item.lifespan}</Text>
              <Text>Fokusområde: {item.focus}</Text>
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
  },
  companyItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default ScreenOne;