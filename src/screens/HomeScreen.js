import React, {useState} from 'react';

import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Header from '../components/Header';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordian from '../components/Accordian';
import {AccordionData} from '../data/HardcodedData';
import '../localization/Localization';
import {useTranslation} from 'react-i18next';
import Vozdusna from '../assets/vozdusna.svg';
import useInterval from '../hooks/useInterval';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen(props) {
  const [percent, setPercent] = useState(0);
  const {t} = useTranslation();

  // useInterval(() => {
  //   setPercent((prevPercent) => prevPercent + 5);
  // });

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.speakerContainer}>
        <MaterialCommunityIcons
          size={windowWidth / 10}
          name={'volume-high'}
          color="#fff"
        />
        <Text style={styles.alarmSigns}>{t('homeScreen:sings')}</Text>
      </View>
      <ScrollView>
        {AccordionData.map((accordian, index) => {
          return (
            <Accordian
              // handleSoundClick={() => handleSoundClick()}
              accordianBackgroundColor={accordian.accordionColor}
              key={accordian.title}
              title={t(`homeScreen:${accordian.title}`)}
              data={t(`homeScreen:${accordian.data}`)}
              audioSource={accordian.audioFile}>
              {/* <Vozdusna style={styles.soundSvg} /> */}
              {accordian.audioSvg}
            </Accordian>
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
  soundSvg: {
    height: windowHeight / 15,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: -1,
    borderRadius: 10,
  },
});
