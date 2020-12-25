import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import Vozdusna from '../assets/vozdusna.svg';
import Elementarni from '../assets/elementarni.svg';
import Radioloski from '../assets/radioloski.svg';
import Prestanok from '../assets/prestanok.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  soundSvg: {
    height: windowHeight / 15,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: -1,
    borderRadius: 10,
  },
});

export const AccordionData = [
  {
    title: 'dangers.title.air',
    data: 'dangers.body.air',
    afterSound: 'dangers.afterSound.air',
    accordionColor: '#007dbc',
    audioFile: 'vozdusna.wav',
    audioSvg: <Vozdusna style={styles.soundSvg} />,
  },
  {
    title: 'dangers.title.RCB',
    data: 'dangers.body.RCB',
    afterSound: 'dangers.afterSound.RCB',
    accordionColor: '#006496',
    audioFile: 'radiolosko_hemisko_bioloska.wav',
    audioSvg: <Radioloski style={styles.soundSvg} />,
  },
  {
    title: 'dangers.title.elements',
    data: 'dangers.body.elements',
    accordionColor: '#004a70',
    audioFile: 'elementarni_nepogodi.wav',
    audioSvg: <Elementarni style={styles.soundSvg} />,
  },
  {
    title: 'dangers.title.end',
    data: 'dangers.body.end',
    accordionColor: '#22b573',
    audioFile: 'prestanok.wav',
    audioSvg: <Prestanok style={styles.soundSvg} />,
  },
];
export const ElementalData = [
  {
    title: 'elementals.title.earthquake',
    data: 'elementals.body.earthquake',
    accordionColor: '#22b573',
  },
  {
    title: 'elementals.title.flood',
    data: 'elementals.body.flood',
    accordionColor: '#007dbc',
  },
  {
    title: 'elementals.title.fire',
    data: 'elementals.body.fire',
    accordionColor: '#c1272d',
  },
];
