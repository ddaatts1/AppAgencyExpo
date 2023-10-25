import React from 'react';

import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const GoldenTable = () => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={{color: 'red', fontSize: 24, textAlign: 'center'}}>
            {'Lê công sang'.toUpperCase()}{' '}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoldenTable;

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
