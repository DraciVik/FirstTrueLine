import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Dimensions,
  Linking,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import HTML from 'react-native-render-html';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import CookieManager from '@react-native-community/cookies';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RssFeed(props) {
  const [feed, setFeed] = useState([]);

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const handleURLOpen = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: ", url);
      }
    });
  };

  useEffect(() => {
    const rssFeed = async () => {
      const myHeaders = new Headers();
      myHeaders.append(
        'Cookie',
        'wordpress_test_cookie=WP+Cookie+check; wordpress_logged_in_584b62c361b2f6f4cb63c5543ab764d3=gennato%7C1609934142%7CjrzZKNzmPNniNPi6NugXBhqnZlZZcjQoWQiou0G3DBM%7C14d7cec0b281a319a2e6d644fa1570a0b6ca081e7d65f6342112c8b37e443ebc; _icl_current_language=mk',
      );
      const response = await fetch('https://mia.mk/feed/', {
        method: 'GET',
        headers: myHeaders,
      });
      const newsFeedText = await response.text();
      const rssParsedResponse = await rssParser.parse(newsFeedText);
      console.log(rssParsedResponse);
      setFeed(rssParsedResponse.items);
    };
    rssFeed();
    return () => {
      rssFeed;
    };
  }, []);

  const contentWidth = useWindowDimensions().width;
  return (
    <>
      <Header navigation={props.navigation} />

      <ScrollView>
        {feed.map((item) => {
          console.log('ITEM', item);
          const authors = item.authors.map((value) => value.name).join(', ');
          const title = item.title;
          const content = item.content;
          const description = item.description;
          // console.log('description', description);
          const url = item.links[0].url;
          console.log(url);
          const htmlContent = `${description}`;
          return (
            <View
              key={item.id}
              style={{overflow: 'hidden', marginVertical: 10}}>
              <TouchableComponent
                onPress={() => handleURLOpen(url)}
                background={
                  Platform.Version >= 21
                    ? TouchableNativeFeedback.Ripple('grey', true)
                    : TouchableNativeFeedback.SelectableBackground()
                }
                useForeground>
                <View style={{flex: 1, paddingHorizontal: 5}}>
                  <Text
                    style={{fontSize: windowWidth / 20, fontWeight: 'bold'}}>
                    {title}
                  </Text>
                  <HTML html={htmlContent} contentWidth={contentWidth} />
                </View>
              </TouchableComponent>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
