import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Sound from 'react-native-sound';

export default function AudioPlayer() {
  const [customSound, setCustomSound] = useState();

  useEffect(() => {
    const sound = new Sound('prestanok.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('FAILED', error);
        return;
      }
    });
    setCustomSound(sound);
  }, []);

  const handlePress = () => {
    customSound.play((succ) => {
      if (!succ) {
        console.log('FAILED HARD');
      }
    });
  };

  return (
    <View>
      <Button title="Play Sound" onPress={() => handlePress()} />
      <Text>ds</Text>
    </View>
  );
}
