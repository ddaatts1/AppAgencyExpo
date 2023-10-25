import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { ROUTES, SVG } from '../constants';
import { Home, Notifications, Training } from '../screens';
import SettingsNavigator from './PersonalNavigator';

import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import PersonalNavigator from './PersonalNavigator';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTabBar from '../components/commons/customTabBar';
import TrainingTabNavigator from '../screens/training/TrainingTabNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ navigation }: any) {
  const [display, setDisplay] = useState(false);

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
  function IconWithBadge({ badgeCount }: { badgeCount: any }) {
    return (

      <View>
        {badgeCount > 0 && (

          <View style={{
            position: 'absolute',
            right: -15,
            top: -5,
            borderRadius: 6,
            backgroundColor: 'red',
            width: 17,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '500' }}>{badgeCount}</Text>
          </View>
        )}

      </View>
    );
  }

  function HomeIconWithBadge(props: any) {
    return <IconWithBadge {...props} badgeCount={9} />;
  }

  return (
    <Tab.Navigator

      tabBar={(props) => <CustomTabBar {...props} display={display} />}


      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let svg = <SVG.IconHome />;

          if (route.name === ROUTES.HOME_TAB) {
            focused && setDisplay(false)

            svg = focused ? <SVG.IconHome height={24} width={24} style={{ color: '#0288D1' }} /> : <SVG.IconHome height={24} width={24} style={{ color: '#525252' }} />;
          } else if (route.name === ROUTES.TRAINING_TAB_NAVIGATOR) {
            focused && setDisplay(true)
            svg = focused ? <SVG.Book height={24} width={24} style={{ color: '#0288D1' }} /> : <SVG.Book height={24} width={24} style={{ color: '#525252' }} />;
          } else if (route.name === ROUTES.NOTIFICATION) {
            svg = focused ? <View><HomeIconWithBadge /><SVG.IconRings height={24} width={24} style={{ color: '#0288D1' }} /></View> : <View><HomeIconWithBadge /><SVG.IconRings height={24} width={24} style={{ color: '#525252' }} /></View>;
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            svg = focused ? <SVG.IconUser height={24} width={24} style={{ color: '#0288D1' }} /> : <SVG.IconUser height={24} width={24} style={{ color: '#525252' }} />;
          }

          return svg;
        },
        tabBarActiveTintColor: '#0288D1',
        tabBarInactiveTintColor: '#525252',
      })}>
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />

      <Tab.Screen
        name={ROUTES.TRAINING_TAB_NAVIGATOR}
        component={TrainingTabNavigator}

        options={{
          tabBarLabel: 'Đào tạo',
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: false,
          // tabBarStyle: { display: "none" },

          headerLeft: () => {
            return headerLeftComponent('Đào tạo');
          },
        }}
      />

      {/* Notification */}
      <Tab.Screen
        name={ROUTES.NOTIFICATION}
        component={Notifications}
        options={{
          tabBarLabel: 'Thông báo',
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerRight: () => {
            return (
                <View style={{ flex: 1 }}>
                    <View
                        style={{ marginTop: 15, marginRight: 10 }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CART)} style={styles.iconRight}>
                            <SVG.Cart />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        },
          headerLeft: () => {
            return headerLeftComponent('Thông báo');
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={PersonalNavigator}
        options={{
          tabBarLabel: 'Cá nhân',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

// const styles = StyleSheet.create({
//   container: {
//     height: 100,
//     width: '100%',
//     backgroundColor: 'white',

//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     ...StyleSheet.absoluteFillObject,

//   },
//   iconLef: {
//     width: 40,
//     height: 40,

//     // marginTop: 80,
//     //  marginLeft: 20
//   }
// })
// const styles = StyleSheet.create({
//   tabBarStyle: {
//     position: 'absolute',
//     backgroundColor: COLORS.bgColor,
//     borderTopWidth: 0,
//     bottom: 15,
//     right: 10,
//     left: 10,
//     height: 92,
//   },
// });

const styles = StyleSheet.create({
  Header: {
    // height: 100,
    width: '100%',
    // backgroundColor: 'white',

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
  icon: {
    width: 25,
    height: 25,
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
