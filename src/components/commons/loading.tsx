import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingReact = ({type, color}: any) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="large" color="#0288D1" style={{height: 120}} />
  </View>
);

export default LoadingReact;
