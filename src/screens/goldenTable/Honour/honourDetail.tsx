import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import RenderHTML from 'react-native-render-html';
import Moment from 'moment';
const HonourDetatil = ({navigation, route}: any) => {
  const data = route?.params?.data;
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              color: '#181818',
              fontWeight: 'bold',
              paddingTop: 12,
              paddingBottom: 12,
            }}>
            {data.name}
          </Text>
          <Text> {Moment(data.date).format('DD/MM/YYYY hh:mm')}</Text>
          <RenderHTML
            contentWidth={100}
            source={{
              html: data.content,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HonourDetatil;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 12,
    height: '100%',
  },
});
