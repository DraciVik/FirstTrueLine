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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
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
          <View style={styles.child}>
            <Text style={styles.bodyTextColor}>{this.props.data}</Text>

            <AudioPlayer source={this.props.audioSource} />
          </View>
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
