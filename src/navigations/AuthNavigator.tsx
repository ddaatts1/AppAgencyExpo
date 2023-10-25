import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  ForgotPassword,
  Register,
  Intro,
  Regulations,
  Notifications,
  Home,
} from '../screens';
import { ROUTES, SVG } from '../constants';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native';
import Maintaince from '../screens/home/Maintaince';
import ScheduleDetail from '../screens/module/Schedules/ScheduleDetail';
import Schedules from '../screens/module/Schedules/ScheduleList';
import NewsDetail from '../screens/module/News/NewsDetail';
import Discount from '../screens/module/Discount/DiscountAll';
import DiscountDetail from '../screens/module/Discount/DiscountDetail';
import DiscountPayment from '../screens/module/Discount/DiscountPayment';
import Verification from '../screens/auth/Verification';

const Stack = createStackNavigator();


function AuthNavigator() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const headerLeftComponent = (text: string) => (
    <View style={{ flex: 1 }}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <SVG.Leftcircleo style={styles.iconLef} />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.headerText}>
            {text}
          </Text>
        </View>
      </View>

    </View>
  );

  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{
          headerBackground: () => (
            <SVG.Header width="100%" style={styles.container} />
          ),

          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
                style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <SVG.Leftcircleologin style={styles.iconLef} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.MAINTAINCE}
        component={Maintaince}
        options={{
          headerBackground: () => (
            <SVG.Header width="100%" style={styles.container} />
          ),
          headerTitle: '',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={ROUTES.SCHEDULEDETAIL}
        component={ScheduleDetail}
        options={{
          headerBackground: () => (
            <Image
              style={styles.headerBox}
              source={require('../assets/image/BannerHome.png')}
            />
          ),
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.NEWSDETAIL}
        component={NewsDetail}
        options={{
          headerBackground: () => (
            <Image
              style={styles.headerBox}
              source={require('../assets/image/headerNews.png')}
            />
          ),
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.DISCOUNTDETAIL}
        component={DiscountDetail}
        options={{
          headerBackground: () => (
            <Image
              style={styles.headerBox}
              source={require('../assets/image/CardEng.png')}
            />
          ),
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Danh sách khách mua');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.DISCOUNT}
        component={Discount}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Ưu đãi cho bạn');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{

          headerShown: false,
          // headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },


        }}
      /> */}

      <Stack.Screen
        name={ROUTES.NOTIFICATION}
        component={Notifications}
        options={{
          title: 'ddssssss',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.SCHEDULELIST}
        component={Schedules}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Lịch sắp tới');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.DISCOUNTPAYMENT}
        component={DiscountPayment}
        options={{
          headerTitleStyle: { fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Thanh toán');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.INTRO}
        component={Intro}
        options={{
          headerBackground: () => <View style={styles.headerBackgroundColor} />,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <SVG.arrowleft />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.REGULSTIONS}
        component={Regulations}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Chính sách và điều khoản
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
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
  container: {
    height: 90,
    width: '100%',
    backgroundColor: '#14B0FC',
  },
  iconLef: {
    width: 40,
    height: 40,
    // marginTop: 80,
    //  marginLeft: 20
  },
  iconRight: {
    width: 40,
    height: 40,
  },
  headerBackgroundColor: {
    height: 90,
    width: '100%',
    // backgroundColor: 'white',
    ...StyleSheet.absoluteFillObject,
  },
  headerBox: {
    width: '100%',
    position: 'relative',
    resizeMode: 'stretch',
  },
  headerLeft: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 16,
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingLeft: 10,
    paddingBottom: 2,
  },
});
