import React from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HeaderStackNavigator from './HeaderStackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerContent={() => {
          return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <Text>DFDFD</Text>
              <Text>sfsdfds</Text>
            </View>
          );
        }}>
        <Drawer.Screen name="Home" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
