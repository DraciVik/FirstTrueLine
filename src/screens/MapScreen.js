import React, {useState} from 'react';
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
import MapView, {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen = () => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  console.log('Map screen loaded');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

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
      <MapView
        minZoomLevel={0}
        style={styles.map}
        region={{
          latitude: 41.6086,
          longitude: 21.7453,
          latitudeDelta: 2.7,
          longitudeDelta: 2.65,
        }}></MapView>
      <TouchableComponent
        // onPress={() => {
        //   getCurrentLocationHandler();
        // }}
        background={
          Platform.Version >= 21
            ? TouchableNativeFeedback.Ripple('black', true)
            : TouchableNativeFeedback.SelectableBackground()
        }
        useForeground>
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          {isFetching ? (
            <View style={styles.locationIndicator}>
              <ActivityIndicator size="large" color={'black'} />
            </View>
          ) : (
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons
                name={'navigation'}
                color="black"
                size={windowWidth / 8}
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
    width: windowWidth / 6,
    height: windowWidth / 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
});

export default MapScreen;
