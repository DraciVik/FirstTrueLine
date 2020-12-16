import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RssFeed from '../screens/RssFeed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapScreen from '../screens/MapScreen';
import Colors from '../data/Colors';
import Pic from '../assets/karta-mk.svg';

const Tab = createBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          tabBarLabel: ({focused, color, position}) => {
            let title;
            let backgroundColor;
            if (route.name === 'Home') {
              title = 'Centar za upravuvanje so krizi';
              backgroundColor = Colors.cuk;
            } else if (route.name === 'RSSFeed') {
              title = 'NEWS';
              backgroundColor = Colors.news;
            } else if (route.name === 'Map') {
              title = 'MAP';
              backgroundColor = Colors.map;
            }

            return (
              <View style={{...styles.tabStyle, ...{backgroundColor}}}>
                <Text style={styles.textColor}>{title}</Text>
                {route.name === 'Map' && <Pic style={styles.mkSvg} />}
              </View>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'blue',
          },
        }}>
        <Tab.Screen name="RSSFeed" component={RssFeed} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: '99%',
    height: '99%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {color: 'white', textAlign: 'center'},
  mkSvg: {
    position: 'absolute',
    width: windowWidth / 4,
    height: windowHeight / 16,
  },
});

export default Navigation;
