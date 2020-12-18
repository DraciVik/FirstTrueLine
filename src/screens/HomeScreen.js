import React from 'react';
import Pic from '../assets/karta-mk.svg';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Header from '../components/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordian from '../components/Accordian';
import {AccordionData} from '../data/HardcodedData';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.speakerContainer}>
        <MaterialCommunityIcons
          size={windowWidth / 10}
          name={'volume-high'}
          color="#fff"
        />
        <Text style={styles.alarmSigns}>SIGNS OF ALARM</Text>
      </View>
      <ScrollView>
        {AccordionData.map((accordian, index) => {
          return (
            <Accordian
              accordianBackgroundColor={accordian.accordionColor}
              key={accordian.title}
              title={accordian.title}
              data={accordian.data}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  speakerContainer: {
    backgroundColor: '#c1272d',
    height: windowHeight / 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmSigns: {
    fontSize: windowWidth / 15,
    color: '#fff',
    marginLeft: windowWidth / 40,
  },
});
