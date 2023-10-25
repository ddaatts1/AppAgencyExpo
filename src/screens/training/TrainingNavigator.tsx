import React, { useEffect, useState } from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES, SVG } from '../../constants';
import TrainingSchedule from './training-schedule/TrainingSchedule';
import TrainingDetail from './training-detail/TrainingDetail';
import StartLearning from './start-learning/StartLearning';
import { EnumNavigatorTraining } from '../../constants/enum';
import FutureAcademy from './future-academy/FutureAcademy';
import LearningDetail from './start-learning/LearningDetail';
import Question from './question/question';

import DocumentDetail from './document/documentDetail';

// const Stack = createStackNavigator();

function TrainingNavigator({ navigation, route }: any) {
  const Stack = route?.params?.Stack;
  const name = route?.params?.name;
  const data = route?.params?.data;
  const id = route?.params?.id;
  const times = route?.params?.times;

  const indexRoute = route?.params?.indexRoute;
  const navigations = route?.params?.navigation;
  const headerLeftComponent = (text: string) => (
    <View style={{ flex: 1 }}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <SVG.Leftcircleo style={styles.iconLef} />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.headerText}>{text}</Text>
        </View>
      </View>
    </View>
  );

  const headerBackground = (
    <Image
      style={styles.container}
      source={require('../../assets/image/Header1.png')}
    />
  );

  const RouteNavigator = (state: any) => {
    switch (state) {
      case EnumNavigatorTraining.TrainingDetail:
        return ROUTES.TRAINING_DETAIL;
      case EnumNavigatorTraining.Question:
        return ROUTES.QUESTION_NAVIGATOR;
      case EnumNavigatorTraining.StartLearning:
        return ROUTES.STARTLEARNING;
      case EnumNavigatorTraining.LearningDetail:
        return ROUTES.LEARNINDETAIL;
      case EnumNavigatorTraining.FutureAcademy:
        return ROUTES.TRAINING_FUTURE_ACADEMY;
      case EnumNavigatorTraining.DocumentDetail:
        return ROUTES.DOCUMENT_DETAIL;
      default:
        return ROUTES.TRAINING_SCHEDULE;
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{}}
      initialRouteName={RouteNavigator(indexRoute)}
      key={indexRoute}>
      <Stack.Screen
        name={ROUTES.TRAINING_SCHEDULE}
        component={TrainingSchedule}
        initialParams={{ name: name }}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent(name);
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.DOCUMENT_DETAIL}
        component={DocumentDetail}
        initialParams={{ name: name, id: id }}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent(name);
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.TRAINING_DETAIL}
        initialParams={{ name: name, navigation: navigation }}
        component={TrainingDetail}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent(name);
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.STARTLEARNING}
        component={StartLearning}
        initialParams={{ id: id }}
        options={{
          headerBackground: () => (
            <Image
              style={styles.headerBox}
              source={require('../../assets/image/BannerHome.png')}
            />
          ),
          headerTitle: '',
          headerShown: false,
          headerLeft: () => {
            return headerLeftComponent('');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.LEARNINDETAIL}
        component={LearningDetail}
        initialParams={{ data: data, id: id }}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('FutureLang Academy');
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.TRAINING_FUTURE_ACADEMY}
        component={FutureAcademy}
        initialParams={{ name: name }}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('FutureLang Academy');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.QUESTION_NAVIGATOR}
        component={Question}
        initialParams={{ id: id, times: times }}
        options={{
          headerBackground: () => (
            <View
              style={[
                styles.Header,
                {
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  elevation: 5,
                },
              ]}
            />
          ),
          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  Header: {
    height: 100,
    width: '100%',
    backgroundColor: 'white',

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...StyleSheet.absoluteFillObject,
  },
  iconLef: {
    width: 40,
    height: 40,
    // marginTop: 80,
    //  marginLeft: 20
  },
  headerBox: {
    width: '100%',
    position: 'relative',
    resizeMode: 'stretch',
  },
  iconRight: {
    width: 40,
    height: 40,
  },
  container: {
    height: 90,
    width: '100%',
    backgroundColor: 'white',

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...StyleSheet.absoluteFillObject,
  },
  headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
  headerLeft: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingLeft: 10,
    paddingBottom: 2,
  },

  iconBackStyle: {
    width: 32,
    height: 32,
  },
  textBannerWhite: {
    color: '#323232',
    fontSize: 18,
    paddingLeft: 8,
    paddingTop: 4,
    fontWeight: 600,
  },
  headerWhite: {
    height: 85,
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...StyleSheet.absoluteFillObject,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  headerLeftWhite: {
    flexDirection: 'row',
    paddingTop: 12.5,
    paddingLeft: 16,
  },
});
export default TrainingNavigator;
