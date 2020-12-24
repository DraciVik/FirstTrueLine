import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function AudioPlayer(props) {
  const [pressed, setPressed] = useState(false);
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  const sound = useRef();

  useEffect(() => {
    sound.current = new Sound(props.source, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('FAILED', error);
        return;
      }
    });
    console.log('SOUND Loaded initially', sound.current);
  }, [props.source]);
  // java -jar "/home/viktor/Desktop/bundletool.jar" build-apks --bundle=app-release.aab --output=myapp.apks --ks="/home/viktor/Desktop/Repos/FirstTrueLine/android/app/my-upload-key.keystore" --ks-pass=pass:firsttrueline --ks-key-alias=my-key-alias --key-pass=pass:firsttrueline --mode=universal
  const handlePress = () => {
    setPressed((prevState) => !prevState);
    console.log(sound.current);
    if (sound.current._playing) {
      console.log('IF playing', sound.current);
      sound.current.stop();
      return;
    }
    if (!sound.current._playing) {
      console.log('IF not playing', sound.current._playing);
      sound.current.play((succ) => {
        if (succ) {
          console.log('PLAYING HARD');
        }

        if (!succ) {
          console.log('FAILED HARD');
        }
      });
      console.log('AFTER HITTING PLAY', sound.current._playing);
    }
  };

  return (
    <>
      <View style={{borderRadius: 10, overflow: 'hidden', zIndex: 3}}>
        <TouchableComponent
          background={
            Platform.Version >= 21
              ? TouchableNativeFeedback.Ripple('green', true)
              : TouchableNativeFeedback.SelectableBackground()
          }
          useForeground
          onPress={() => handlePress()}>
          <View
            style={{
              width: windowWidth / 8.5,
              height: windowWidth / 8.5,
              overflow: 'hidden',
              backgroundColor: '#c1272d',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: pressed ? 3 : 0,
            }}>
            <MaterialCommunityIcons
              size={windowWidth / 10}
              name={'volume-high'}
              color="#fff"
            />
          </View>
        </TouchableComponent>
      </View>
    </>
  );
}
