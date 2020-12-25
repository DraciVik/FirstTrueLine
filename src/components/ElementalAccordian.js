import React from 'react';
import {View, StyleSheet} from 'react-native';
import Accordian from '../components/Accordian';
import {AccordionData, ElementalData} from '../data/HardcodedData';
import '../localization/Localization';
import {useTranslation} from 'react-i18next';

const ElementalAccordian = () => {
  const {t} = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: '#e6e6e6',
      }}>
      {ElementalData.map((accordian) => {
        return (
          <Accordian
            // handleSoundClick={() => handleSoundClick()}
            accordianBackgroundColor={accordian.accordionColor}
            key={t(`homeScreen:${accordian.title}`)}
            title={t(`homeScreen:${accordian.title}`)}
            data={t(`homeScreen:${accordian.data}`)}>
            {/* <Vozdusna style={styles.soundSvg} /> */}
            <View style={{flexDirection: 'row'}}>{accordian.audioSvg}</View>
          </Accordian>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ElementalAccordian;
