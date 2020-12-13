import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
  Alert,
} from 'react-native';
import ENV from '../../env/env';
import MapView, {Marker} from 'react-native-maps';
import {Permissions} from 'react-native-unimodules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen = () => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  const [fireEventData, setFireEventData] = useState([]);
  const [showFires, setShowFires] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingFires, setIsFetchingFires] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingEarthquakes, setIsFetchingEarthquakes] = useState(false);
  const [isFetchingFloods, setIsFetchingFloods] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const [mapRegion, setMapRegion] = useState({
    latitude: 41.6086,
    longitude: 21.7453,
    latitudeDelta: 2.7,
    longitudeDelta: 2.65,
  });

  const fetchFires = async () => {
    if (showFires === true) {
      setShowFires(false);
      return;
    }
    setIsFetchingFires(true);

    const res = await fetch(
      `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${ENV.nasaAPIKey}`,
    );
    const {events} = await res.json();
    setFireEventData(events);
    console.log(events);
    setIsFetchingFires(false);
    setShowFires(true);
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this feature',
        [{text: 'Okay'}],
      );
      return false;
    }
    return true;
  };

  const getCurrentLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    console.clear();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      selectLocationHandler({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map',
        [{text: 'Okay'}],
      );
    }
    setIsFetching(false);
  };

  // const loadNasaData = async () => {
  //   https://api.nasa.gov/planetary/apod?api_key=V4tyZdilz6SqNIymRf1Q6rOkGmvwNizwk80Yshqu
  // }

  const selectLocationHandler = (event) => {
    setMapRegion({
      latitude: event.lat,
      longitude: event.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
    Alert.alert('An Error occured', `${error}`, [{text: 'Okay'}]);
  }

  return (
    <>
      <MapView minZoomLevel={0} style={styles.map} region={mapRegion}>
        {showFires &&
          !isFetchingFires &&
          fireEventData &&
          fireEventData.map((value, index) => {
            console.table(value.categories);
            if (value.categories[0].id === 8) {
              console.log('VALUE', value);
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: value.geometries[0].coordinates[1],
                    longitude: value.geometries[0].coordinates[0],
                  }}>
                  <MaterialCommunityIcons
                    name={'fire'}
                    color="red"
                    size={windowWidth / 13}
                  />
                </Marker>
              );
            }
            return null;
          })}
      </MapView>

      <TouchableComponent
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        onPress={() => fetchFires()}
        useForeground>
        <View style={styles.fire}>
          {isFetchingFires ? (
            <View>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.fireContainer}>
              <MaterialCommunityIcons
                name={'fire'}
                color={showFires ? 'red' : 'black'}
                size={windowWidth / 13}
              />
            </View>
          )}
        </View>
      </TouchableComponent>
      <TouchableComponent
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        useForeground>
        <View style={styles.flood}>
          {isFetchingFloods ? (
            <View style={styles.locationIndicator}>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.floodContainer}>
              <MaterialCommunityIcons
                name={'home-flood'}
                color="black"
                size={windowWidth / 13}
              />
            </View>
          )}
        </View>
      </TouchableComponent>
      <TouchableComponent
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        useForeground>
        <View style={styles.earthQuake}>
          {isFetchingEarthquakes ? (
            <View style={styles.locationIndicator}>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.earthquakeContainer}>
              <MaterialCommunityIcons
                name={'leak'}
                color="black"
                size={windowWidth / 13}
              />
            </View>
          )}
        </View>
      </TouchableComponent>
      <TouchableComponent
        onPress={() => {
          getCurrentLocationHandler();
        }}
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        useForeground>
        <View style={styles.navigation}>
          {isFetching ? (
            <View style={styles.locationIndicator}>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons
                name={'navigation'}
                color="black"
                size={windowWidth / 9}
              />
            </View>
          )}
        </View>
      </TouchableComponent>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  locationContainer: {
    backgroundColor: '#fff',
    transform: [{rotate: '45deg'}],
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: windowWidth / 3,
    width: windowWidth / 7.5,
    height: windowWidth / 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  floodContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: windowWidth / 3,
    width: windowWidth / 10,
    height: windowWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  fireContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: windowWidth / 3,
    width: windowWidth / 10,
    height: windowWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  earthquakeContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: windowWidth / 3,
    width: windowWidth / 10,
    height: windowWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  navigation: {
    position: 'absolute',
    bottom: windowWidth / 15,
    right: windowWidth / 20,
  },
  fire: {
    position: 'absolute',
    bottom: windowWidth / 2,
    right: 5,
  },
  flood: {
    position: 'absolute',
    bottom: windowWidth / 1.5,
    right: 5,
  },
  earthQuake: {
    position: 'absolute',
    bottom: windowWidth / 1.2,
    right: 5,
  },
});

export default MapScreen;
