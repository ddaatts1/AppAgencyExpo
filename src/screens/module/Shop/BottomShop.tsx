import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';

import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import ShopWholeSale from './WholeSale/Shop';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES, SVG} from '../../../constants';
import SingleOrderAll from './SingleOrder/SingleOrderAll';
import Fshop from './Fshop/Fshop';
import ManageOrder from './ManageOrder/ManageOrder';
import CustomTabBar from '../../../components/commons/customTabBar';
import LanguageTabNavigator from '../../../navigations/LanguageTab';
import FshopTab from '../../../navigations/FshopTab';
import routes from '../../../constants/routes';
import Order from '../../home/personal/order/order';

const Tab = createBottomTabNavigator();

function ShopTabNavigator() {
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
  return (
    <Tab.Navigator
        sceneContainerStyle={{backgroundColor:"#fff"}}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, focused}) => {
          let svg = <SVG.IconHome />;

          if (route.name === ROUTES.WHOLE_SALE_TAB) {
            svg = focused ? (
              <SVG.ComboCard
                height={24}
                width={24}
                style={{color: '#0288D1'}}
              />
            ) : (
              <SVG.ComboCard
                height={24}
                width={24}
                style={{color: '#525252'}}
              />
            );
          } else if (route.name === ROUTES.SINGLEORDER) {
            svg = focused ? (
              <SVG.LearnCard
                height={24}
                width={24}
                style={{color: '#0288D1'}}
              />
            ) : (
              <SVG.LearnCard
                height={24}
                width={24}
                style={{color: '#525252'}}
              />
            );
          } else if (route.name === ROUTES.FSHOP) {
            svg = focused ? (
              <SVG.IconFshop
                height={24}
                width={24}
                style={{color: '#0288D1'}}
              />
            ) : (
              <SVG.IconFshop
                height={24}
                width={24}
                style={{color: '#525252'}}
              />
            );
          } else if (route.name === ROUTES.ORDER) {
            svg = focused ? (
              <SVG.IconManageOrder
                height={24}
                width={24}
                style={{color: '#0288D1'}}
              />
            ) : (
              <SVG.IconManageOrder
                height={24}
                width={24}
                style={{color: '#525252'}}
              />
            );
          }

          return svg;
        },
        tabBarActiveTintColor: '#0288D1',
        tabBarInactiveTintColor: '#525252',
      })}>
      <Tab.Screen
        name={ROUTES.WHOLE_SALE_TAB}
        component={ShopWholeSale}
        options={{
          tabBarLabel: 'Combo thẻ',
          headerBackground: () => (
            <Image
              style={styles.container}
              source={require('../../../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerRight: () => {
            return (
              <View style={{flex: 1}}>
                <View style={{marginTop: 15, marginRight: 10}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.CART)}
                    style={styles.iconRight}>
                    <SVG.Cart />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return headerLeftComponent('Cửa hàng');
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.SINGLEORDER}
        component={LanguageTabNavigator}
        options={{
          tabBarLabel: 'Thẻ học',
          headerBackground: () => (
            <Image
              style={styles.container}
              source={require('../../../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerRight: () => {
            return (
              <View style={{flex: 1}}>
                <View style={{marginTop: 15, marginRight: 10}}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate(routes.CART)}

                      style={styles.iconRight}>
                    <SVG.Cart />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return headerLeftComponent('Cửa hàng');
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.FSHOP}
        component={FshopTab}
        options={{
          tabBarLabel: 'Fshop',
          headerBackground: () => (
            <Image
              style={styles.container}
              source={require('../../../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerRight: () => {
            return (
              <View style={{flex: 1}}>
                <View style={{marginTop: 15, marginRight: 10}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(routes.CART)}
                    style={styles.iconRight}>
                    <SVG.Cart />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return headerLeftComponent('Fshop');
          },
        }}
      />
      <Tab.Screen
        name={ROUTES.ORDER}
        component={Order}
        options={{
          tabBarLabel: 'Quản lí đơn hàng',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/image/manageOrder.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#0288D1' : '#525252',
              }}
            />
          ),
          headerBackground: () => (
            <Image
              style={styles.container}
              source={require('../../../assets/image/Header1.png')}
            />
          ),

          headerTitleStyle: {marginTop: 10, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Quản lí đơn hàng');
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default ShopTabNavigator;

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
  container: {
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
  iconRight: {
    width: 40,
    height: 40,
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
