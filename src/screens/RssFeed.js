import React, {useEffect, useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import HTML from 'react-native-render-html';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';

export default function RssFeed(props) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const rssFeed = async () => {
      try {
        const response = await fetch('https://kumanovskimuabeti.mk/feed/');
        const newsFeedText = await response.text();
        const rssParsedResponse = await rssParser.parse(newsFeedText);
        setFeed(rssParsedResponse.items);
      } catch (err) {
        console.log('ERROR', err);
      }
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
          const htmlContent = `
                    ${item.description}
                `;
          return (
            <Text key={item.id}>
              <HTML html={htmlContent} contentWidth={contentWidth} />
            </Text>
          );
        })}
      </ScrollView>
    </>
  );
}
