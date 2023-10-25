import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import RenderHTML from 'react-native-render-html';

const ProgramRules = ({navigation, route}: any) => {
  const rules = route?.params?.rules;
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          <RenderHTML
            contentWidth={100}
            source={{
              html: rules,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgramRules;
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
