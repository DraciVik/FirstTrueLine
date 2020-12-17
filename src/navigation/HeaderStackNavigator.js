import React from 'react';
import {Button, View, Text, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HeaderStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0071bc',
          height: windowHeight / 9,
        },
        headerTitle: (
          <View>
            <Text style={styles.headerTitle}>FIRST LINE </Text>
            <Text style={styles.headerTitle}>OF TRUTH</Text>
          </View>
        ),
        headerTintColor: '#fff',
        headerLeft: () => {
          return (
            <View style={styles.logoContainer}>
              <Logo style={styles.logo} />
            </View>
          );
        },
      }}>
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: windowWidth / 6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: windowWidth / 7,
    height: '90%',
  },
  menuContainer: {
    height: '100%',
    width: windowWidth / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: windowWidth / 17,
    fontWeight: 'bold',
  },
});

export default HeaderStackNavigator;
