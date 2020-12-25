import React from 'react';

import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import Header from '../components/Header';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Accordian from '../components/Accordian';
import {AccordionData, ElementalData} from '../data/HardcodedData';
import '../localization/Localization';
import {useTranslation} from 'react-i18next';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen(props) {
  const {t} = useTranslation();

  console.log('ELEMENTAL DATA', ElementalData);

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
        {AccordionData.map((accordian) => {
          let elementalsApply = false;
          if (
            t(`homeScreen:${accordian.title}`) ===
              'DANGER OF NATURAL ELEMENT CASES AND OTHER ACCIDENTS' ||
            t(`homeScreen:${accordian.title}`) ===
              'ОПАСНОСТ ОД ЕЛЕМЕНТАРНИ ПРИРОДНИ НЕПОГОДИ И ДРУГИ НЕСРЕЌИ'
          ) {
            elementalsApply = true;
          }
          return (
            <Accordian
              // handleSoundClick={() => handleSoundClick()}
              accordianBackgroundColor={accordian.accordionColor}
              elementalsApply={elementalsApply}
              key={t(`homeScreen:${accordian.title}`)}
              title={t(`homeScreen:${accordian.title}`)}
              data={t(`homeScreen:${accordian.data}`)}
              audioSource={accordian.audioFile}
              afterSound={t(`homeScreen:${accordian.afterSound}`)}>
              {/* <Vozdusna style={styles.soundSvg} /> */}
              <View style={{flexDirection: 'row'}}>{accordian.audioSvg}</View>
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
