import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES, SVG} from '../../constants';

import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomTabBar from '../../components/commons/customTabBar';
import TopSales from './topSale/topSale';
import Honor from './Honour/honor';
import AgencyList from './agencyList/agencyList';
import GoldenTableNavigator from './GoldenTableNavigator';
import HonourNavigator from './Honour/HonourNavigator';

const Tab = createBottomTabNavigator();

function GoldenTableTabNavigator() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const headerLeftComponent = (text: string) => (
    <View style={{flex: 1}}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <SVG.Leftcircleo style={styles.iconLef} />
          </View>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
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

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let svg = <SVG.Icon_dropdown_search_open height={25} width={25} />;

          if (route.name === ROUTES.GOLDEB_TABLE_NAVIGATOR) {
            svg = focused ? (
              <SVG.Icon_topSales_blue height={24} width={24} />
            ) : (
              <SVG.Icon_topSales_grey height={24} width={24} />
            );
          } else if (route.name === ROUTES.HONOUR_NAVIGATOR) {
            svg = focused ? (
              <SVG.Icon_honor_blue height={24} width={24} />
            ) : (
              <SVG.Icon_honor_grey height={24} width={24} />
            );
          } else if (route.name === ROUTES.AGENCY_LIST) {
            svg = focused ? (
              <SVG.Icon_agencyList_blue height={24} width={24} />
            ) : (
              <SVG.Icon_agencyList_grey height={24} width={24} />
            );
          }

          return svg;
        },
        tabBarActiveTintColor: '#0288D1',
        tabBarInactiveTintColor: '#525252',
      })}>
      <Tab.Screen
        name={ROUTES.GOLDEB_TABLE_NAVIGATOR}
        component={GoldenTableNavigator}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: 'Bảng vàng',
          headerTitle: '',
          headerShown: false,
          headerLeft: () => {
            return headerLeftComponent('Bảng vàng');
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.HONOUR_NAVIGATOR}
        component={HonourNavigator}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: 'Vinh Danh',
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.AGENCY_LIST}
        component={AgencyList}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarLabel: 'Bảng vàng',
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Bảng vàng');
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default GoldenTableTabNavigator;

const styles = StyleSheet.create({
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

  iconLef: {
    width: 32,
    height: 32,
  },
  headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
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
  tabBarLabelStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
