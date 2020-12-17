import React from 'react';
import Pic from '../assets/karta-mk.svg';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Header from '../components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen(props) {
  return (
    <View>
      <Header navigation={props.navigation} />
      <Text onPress={() => props.navigation.toggleDrawer()}>YES WORKING</Text>
      <Pic />
    </View>
  );
}
