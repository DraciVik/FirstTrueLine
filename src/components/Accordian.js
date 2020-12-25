import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioPlayer from './AudioPlayer';
import ElementalAccordian from '../components/ElementalAccordian';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      audioLength: undefined,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  setAudioLength = (audioLength) => {
    this.setState({
      audioLength: audioLength,
    });
  };

  render() {
    console.log(this.state.audioLength);

    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={{
            ...styles.row,
            backgroundColor: this.props.accordianBackgroundColor,
          }}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <MaterialCommunityIcons
            name={this.state.expanded ? 'chevron-up' : 'chevron-down'}
            size={windowWidth / 15}
            color={'#fff'}
            style={{position: 'absolute', right: 0, bottom: 0}}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <>
            <View style={styles.child}>
              <Text style={styles.bodyTextColor}>{this.props.data}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.props.audioSource && (
                  <AudioPlayer
                    setAudioLength={this.setAudioLength}
                    source={this.props.audioSource}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: -windowWidth / 45,
                    borderRadius: 10,
                  }}>
                  {this.props.children}
                  {/* <View
                  style={{
                    borderRadius: 10,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    // zIndex: -2,
                    width: '60%',
                    backgroundColor: 'rgba(0,0,0, 0.3)',
                  }}></View> */}
                </View>
              </View>
              <Text style={{...styles.bodyTextColor, fontWeight: 'bold'}}>
                {this.props.afterSound !== 'undefined'
                  ? this.props.afterSound
                  : null}
              </Text>
            </View>
            {this.props.elementalsApply && <ElementalAccordian />}
          </>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: windowWidth / 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: windowHeight / 10,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  parentHr: {
    height: 1,
    color: 'green',
    width: '100%',
  },
  child: {
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    padding: 16,
  },
  bodyTextColor: {color: '#004a70'},
});
