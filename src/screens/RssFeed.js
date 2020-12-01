import React, { useEffect, useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import * as rssParser from 'react-native-rss-parser';
import HTML from "react-native-render-html";

export default function RssFeed(props) {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        const rssFeed = async () => {
            try {
                console.clear();
                console.log("STARTING");
                const response = await fetch('https://kumanovskimuabeti.mk/feed/');
                const newsFeedText = await response.text();
                const rssParsedResponse = await rssParser.parse(newsFeedText);
                console.log(rssParsedResponse);
                // const parsedRss = rssParser.parse(response)
                // .then((response) => response.text())
                // .then((responseData) => rssParser.parse(responseData))
                // .then((rss) => {
                //     console.log(rss.title);
                //     console.log(rss.items.length);
                // });
                // console.log(parsedRss);
                setFeed(rssParsedResponse.items)
            } catch (err) {
                console.log("ERROR", err)
            }
        }
        rssFeed()
        return () => {
            rssFeed
        }
    }, [])

    const contentWidth = useWindowDimensions().width;
    return (
        <View>
            {feed.map(item => {
                const htmlContent = `
                    ${item.description}   
                `;
                return (
                    <Text key={item.id}><HTML html={htmlContent} contentWidth={contentWidth} /></Text>
                )
            })}
            <Text>RSS FEED Screen</Text>
        </View>
    )
}