import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
  Linking,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import '../localization/Localization';
import {useTranslation} from 'react-i18next';

import MkFlag from '../assets/mk-flag.svg';
import EnFlag from '../assets/en-flag.svg';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LANGS = [
  {
    lngCode: 'en',
    component: (
      <EnFlag style={{height: windowWidth / 15, width: windowWidth / 10}} />
    ),
  },
  {
    lngCode: 'mk',
    component: (
      <MkFlag style={{height: windowWidth / 15, width: windowWidth / 10}} />
    ),
  },
  // {
  //   lngCode: 'al',
  //   component: (
  //     <Image
  //       style={{height: windowWidth / 15, width: windowWidth / 10,}}
  //       source={require('../assets/al-flag.png')}
  //     />
  //   ),
  // },
];

const natoRatio = 1280 / 641;
const cepakRatio = 120 / 103;

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const {t, i18n} = useTranslation();
  const selectedLngCode = i18n.language;
  const setLng = (lngCode) => i18n.changeLanguage(lngCode);
  const handleURLOpen = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ", url);
      }
    });
  };
  //
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerContent={() => {
          return (
            <View style={styles.drawerContainer}>
              <View style={styles.languages}>
                {LANGS.map((lang) => {
                  const selected = lang.lngCode === selectedLngCode;

                  return (
                    <TouchableComponent
                      key={lang.lngCode}
                      disabled={selected}
                      onPress={() => setLng(lang.lngCode)}
                      background={
                        Platform.Version >= 21
                          ? TouchableNativeFeedback.Ripple('grey', true)
                          : TouchableNativeFeedback.SelectableBackground()
                      }
                      useForeground>
                      {lang.component}
                    </TouchableComponent>
                  );
                })}
              </View>
              <ScrollView>
                <Text style={styles.aboutUsText}>{t('drawer:about')}</Text>
                <Text style={styles.textColor}>{t('drawer:description')}</Text>

                <Text style={styles.aboutUsText}>
                  {t('drawer:aboutProject')}
                </Text>
                <Text style={styles.textColor}>
                  {t('drawer:aboutProjectDescription')}
                </Text>
              </ScrollView>
              <View style={styles.logos}>
                <View style={styles.natoContainer}>
                  <TouchableComponent
                    onPress={() => handleURLOpen('https://www.nato.int/')}
                    background={
                      Platform.Version >= 21
                        ? TouchableNativeFeedback.Ripple('grey', true)
                        : TouchableNativeFeedback.SelectableBackground()
                    }
                    useForeground>
                    <Image
                      style={{
                        width: (windowWidth / 10) * natoRatio,
                        height: windowWidth / 10,
                      }}
                      source={require('../assets/nato.png')}
                    />
                  </TouchableComponent>
                  <Text style={styles.natoText}>{t('drawer:nato')}</Text>
                </View>
                <TouchableComponent
                  onPress={() => handleURLOpen('http://cepacsk.org/en/')}
                  background={
                    Platform.Version >= 21
                      ? TouchableNativeFeedback.Ripple('grey', true)
                      : TouchableNativeFeedback.SelectableBackground()
                  }
                  useForeground>
                  <Image
                    style={{
                      width: (windowWidth / 10) * cepakRatio,
                      height: windowWidth / 10,
                    }}
                    source={require('../assets/cepaklogo.png')}
                  />
                </TouchableComponent>
              </View>
            </View>
          );
        }}>
        <Drawer.Screen name="Home" component={TabNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: windowWidth / 25,
  },
  aboutUsText: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: windowWidth / 17,
  },
  languages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  logos: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  natoText: {
    fontSize: windowWidth / 40,
    marginHorizontal: windowWidth / 40,
    fontWeight: 'bold',
  },
  natoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  textColor: {color: '#004a70'},
});

export default DrawerNavigation;
