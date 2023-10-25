import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {ROUTES, SVG} from '../../constants';
import TopSales from './topSale/topSale';
import ProgramRules from './topSale/programRules';

const Stack = createStackNavigator();

function GoldenTableNavigator({navigation, route}: any) {
  const rules = route?.params?.rules;
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.TOP_SALES}>
      <Stack.Screen
        name={ROUTES.TOP_SALES}
        component={TopSales}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Bảng vàng');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.PROGRAM_RULES}
        component={ProgramRules}
        initialParams={{rules: rules}}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View style={styles.headerLeft}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.TOP_SALES)}>
                    <View>
                      <SVG.Leftcircleo style={styles.iconLef} />
                    </View>
                  </TouchableOpacity>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.headerText}>Thể lệ chương trình</Text>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default GoldenTableNavigator;
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
