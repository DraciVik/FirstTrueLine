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
import Header from '../components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  const [eventData, setEventData] = useState([]);
  const [fireEventData, setFireEventData] = useState([]);
  const [floodsEventData, setFloodsEventData] = useState([]);
  const [earthquakesEventData, setEarthquakesEventData] = useState([]);

  const [showFires, setShowFires] = useState(false);
  const [showFloods, setShowFloods] = useState(false);
  const [showEarthquakes, setShowEarthquakes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingFires, setIsFetchingFires] = useState(false);
  const [isFetchingEarthquakes, setIsFetchingEarthquakes] = useState(false);
  const [isFetchingFloods, setIsFetchingFloods] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    const fires = eventData.filter((event) => event.categories[0].id === 8);
    const floods = eventData.filter((event) => event.categories[0].id === 9);
    const earthquakes = eventData.filter(
      (event) => event.categories[0].id === 16,
    );
    setFireEventData(fires);
    setFloodsEventData(floods);
    setEarthquakesEventData(earthquakes);
  }, [eventData]);

  const fetchEvents = async () => {
    if (eventData.length === 0) {
      const res = await fetch(
        `https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=${ENV.nasaAPIKey}`,
      );
      const {events} = await res.json();
      setEventData(events);
    } else {
      return;
    }
  };
  const handleFires = async () => {
    if (showFires) {
      setShowFires(false);
      return;
    }
    setIsFetchingFires(true);
    await fetchEvents();
    setShowFires(true);
    setIsFetchingFires(false);
  };

  const handleFloods = async () => {
    if (showFloods) {
      setShowFloods(false);
      return;
    }
    setIsFetchingFloods(true);
    await fetchEvents();
    setShowFloods(true);
    setIsFetchingFloods(false);
  };

  const handleEarthquakes = async () => {
    if (showEarthquakes) {
      setShowEarthquakes(false);
      return;
    }
    setIsFetchingEarthquakes(true);
    await fetchEvents();
    setShowEarthquakes(true);
    setIsFetchingEarthquakes(false);
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
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      selectLocationHandler({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map',
        [{text: 'Okay'}],
      );
    }
    setIsFetching(false);
  };

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
      <Header navigation={props.navigation} />

      <MapView
        minZoomLevel={0}
        style={styles.map}
        initialRegion={{
          latitude: 41.6086,
          longitude: 21.7453,
          latitudeDelta: 2.7,
          longitudeDelta: 2.65,
        }}
        region={mapRegion}>
        {showFires &&
          fireEventData &&
          fireEventData.map((value, index) => {
            return (
              <Marker
                key={value.geometries[0].coordinates[1] + index}
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
          })}
        {showFloods &&
          floodsEventData &&
          floodsEventData.map((value, index) => {
            return (
              <Marker
                key={value.geometries[0].coordinates[1] + index}
                coordinate={{
                  latitude: value.geometries[0].coordinates[1],
                  longitude: value.geometries[0].coordinates[0],
                }}>
                <MaterialCommunityIcons
                  name={'home-flood'}
                  color="blue"
                  size={windowWidth / 13}
                />
              </Marker>
            );
          })}
        {showEarthquakes &&
          earthquakesEventData &&
          earthquakesEventData.map((value, index) => {
            return (
              <Marker
                key={value.geometries[0].coordinates[1] + index}
                coordinate={{
                  latitude: value.geometries[0].coordinates[1],
                  longitude: value.geometries[0].coordinates[0],
                }}>
                <MaterialCommunityIcons
                  name={'leak'}
                  color="red"
                  size={windowWidth / 13}
                />
              </Marker>
            );
          })}
      </MapView>

      <TouchableComponent
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        useForeground
        onPress={() => handleFires()}>
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
        useForeground
        onPress={() => handleFloods()}>
        <View style={styles.flood}>
          {isFetchingFloods ? (
            <View>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.floodContainer}>
              <MaterialCommunityIcons
                name={'home-flood'}
                color={showFloods ? 'blue' : 'black'}
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
        useForeground
        onPress={() => handleEarthquakes()}>
        <View style={styles.earthQuake}>
          {isFetchingEarthquakes ? (
            <View>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.earthquakeContainer}>
              <MaterialCommunityIcons
                name={'leak'}
                color={showEarthquakes ? 'green' : 'black'}
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
    top: windowHeight / 10,
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
