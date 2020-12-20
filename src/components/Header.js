import React from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import Logo from '../assets/logo.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import '../localization/Localization';
import {useTranslation} from 'react-i18next';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Header = (props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerText}>{t('header.header1')}</Text>
        <Text style={styles.headerText}>{t('header.header2')}</Text>
      </View>
      <View style={styles.menuContainer}>
        <MaterialCommunityIcons
          onPress={() => props.navigation.toggleDrawer()}
          name="menu"
          size={windowWidth / 10}
          color="#fff"
        />
      </View>
    </View>
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
  headerContainer: {
    backgroundColor: '#0071bc',
    height: windowHeight / 6,
    flexDirection: 'row',
  },
  headerTitleContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: windowWidth / 15,
    fontWeight: 'bold',
  },
  menuContainer: {
    height: '100%',
    width: windowWidth / 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: windowWidth / 17,
    fontWeight: 'bold',
  },
});

export default Header;
