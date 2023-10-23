import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Button, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';


const Scan = ({ navigation }) => {
  const cameraRef = useRef(); // Reference til kameraet
  const [hasPermission, setHasPermission] = useState(null); // Tilstandsvariabel for kameraadgang
  const [imagesArr, setImagesArr] = useState([]); // Tilstandsvariabel til opbevaring af billeder
  const [type, setType] = useState(Camera.Constants.Type.back); // Tilstandsvariabel til at ændre kameratype (for- eller bagkamera)
  const [loading, setLoading] = useState(false); // Tilstandsvariabel til at kontrollere, om der er en igangværende handling (f.eks. tage et billede)

  useEffect(() => {
    (async () => {
      // Anmod om kameraadgang og kontroller adgangstilladelser
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!'); // Vis en besked, hvis adgang ikke er blevet godkendt
      }

      if (Platform.OS !== 'web') {
        // Anmod om adgang til mediebiblioteket (galleri) på platforme, der ikke er web
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!'); // Vis en besked, hvis galleriadgang ikke er blevet godkendt
        }
      }

      setHasPermission(status === 'granted'); // Opdater hasPermission-tilstanden baseret på kameraadgangstilladelsen
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // Hvis adgangstilladelse er ukendt, vis intet (vent på, at useEffect udføres)
  }

  if (hasPermission === false) {
    return (
      <View style={styles.gallery}>
        <Text>No access to camera</Text>
        <Button title="Change settings" onPress={() => Linking.openSettings()} />
      </View>
    ); // Hvis adgang ikke er blevet godkendt, vis besked og knap til at ændre indstillinger
  }

  const snap = async () => {
    if (!cameraRef.current) {
      return;
    }
    setLoading(true); // Angiv loading til true for at vise en indlæsningsindikator
    const result = await cameraRef.current.takePictureAsync(); // Tag et billede med kameraet

    // Gem billedet til imagesArr og afslut indlæsningsindikatoren
    setImagesArr((imagesArr) => [result].concat(imagesArr));
    setLoading(false);
  };

  const CameraGallery = () => {
    return (
      <View style={styles.gallery}>
        <Text style={styles.buttonGallery}>Billeder taget: {imagesArr.length}</Text>
        <ScrollView horizontal={true}>
          {imagesArr.length > 0 ? (
            // Vis billeder, hvis der er billeder i imagesArr
            imagesArr.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={{ paddingHorizontal: 10 }}
                onPress={() => navigation.navigate('image', { image: image.uri })}
              >
                <Image source={{ uri: image.uri }} style={{ width: 100, height: 200 }} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: 'white' }}> No images taken </Text> // Vis en besked, hvis der ikke er taget nogen billeder
          )}
        </ScrollView>
      </View>
    );
  };

  const pickImage = async () => {
    // Vælg et billede fra telefonens galleri
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Hvis brugeren valgte et billede, tilføj det til imagesArr
      setImagesArr((imagesArr) => [result].concat(imagesArr));
    }
  };

  return (
    <Fragment>
      <StatusBar StatusBarStyle="dark-content" style={{ fontcolor: 'white' }} backgroundColor={'rgba(255,255,255,0.4)'} />
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={{ flexDirection: 'column', alignContent: 'center', flex: 1, padding: 20 }}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => 
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
            <FontAwesome5 name="exchange-alt" size={24} color="blue" /> 
                </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={snap}>
                <FontAwesome5 name="camera" size={24} color="blue" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={pickImage}>
            <FontAwesome5 name="image" size={24} color="blue" />
            </TouchableOpacity>
            </View>
            <CameraGallery />
          </View>
        </Camera>
      </View>
    </Fragment>
  );
};

// Standard styling til Scan.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        color: 'white',
        backgroundColor: 'transparent',
        justifyContent:"space-between",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    buttonGallery: {
        fontSize: 15,
        color:"white",
        padding: 10,
        borderRadius:10,
        alignSelf: 'center',
    },
    button: {
        padding:5,
        alignSelf: 'flex-start',   
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    gallery:{
        flex: 0.4,
        paddingTop:20,
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Scan;