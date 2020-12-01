import 'react-native-gesture-handler';
import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RssFeed from "../screens/RssFeed";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route, navigation }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = focused ? 'home-circle' : 'home-circle-outline'
                        } else if (route.name === "RSSFeed") {
                            iconName = focused ? 'rss-box' : 'rss'
                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} optoins={{
                    onClick: () => {

                    }
                }} />
                <Tab.Screen name="RSSFeed" component={RssFeed} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;