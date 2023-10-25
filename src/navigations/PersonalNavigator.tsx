import React, {useEffect} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  About,
  Account,
  ChangePassword,
  DetailOrder,
  Order,
  Personal,
  Receiver,
  Rules,
  Settings,
  SettingsDetail,
  Support,
} from '../screens';
import {ROUTES, STYLES, SVG} from '../constants';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import Location from '../screens/home/personal/location';
import Bank from '../screens/home/personal/bank/bank';
import SupportManagement from '../screens/support/SupportManagement';

const Stack = createStackNavigator();

function PersonalNavigator({navigation, route}: any) {
  const order_id = route?.params?.order_id;
  const type = route?.params?.type;
  const status = route?.params?.status;
  const headerBackground = (
    <Image
      style={styles.container}
      source={require('../assets/image/Header1.png')}
    />
  );
  const headerLeftComponent = (text: string) => (
    <View style={{flex: 1}}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.PERSONAL}>
      <Stack.Screen
        name={ROUTES.PERSONAL}
        component={Personal}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.ACCOUNT}
        component={Account}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Tài khoản của bạn
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.SUPPORT_MANAGEMENT}
        component={SupportManagement}
        options={{
          headerBackground: () => headerBackground,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Hỗ trợ');
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.CHANGE_PASSWORD}
        component={ChangePassword}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Đổi mật khẩu
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.BANK}
        component={Bank}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Thông tin ngân hàng của bạn
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.ORDER}
        component={Order}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Quản lý đơn hàng
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.ABOUT}
        component={About}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Về chúng tôi
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.SUPPORT}
        component={Support}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Liên hệ và hỗ trợ
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.RULES}
        component={Rules}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PERSONAL)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Điều khoản và chính sách
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.DETAIL_ORDER}
        component={DetailOrder}
        initialParams={{order_id: order_id, type: type, status: status}}
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
                  //  backgroundColor: "red"
                },
              ]}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.ORDER)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#323232',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Quản lý đơn hàng
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.RECEIVER}
        component={Receiver}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.FSHOPCONFIRMORDER)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Thông tin nhận hàng
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.LOCATION}
        component={Location}
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
                  //  backgroundColor: "red"
                },
              ]}
            />
          ),
          headerTitleStyle: {marginTop: 30, color: '#FFFFFF', fontSize: 18},
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return (
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 12,
                    paddingLeft: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.RECEIVER)}>
                    <SVG.Leftcircleo style={styles.iconLef} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: '#323232',
                      fontSize: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    Thông tin nhận hàng
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

export default PersonalNavigator;
const styles = StyleSheet.create({
  Header: {
    height: 90,
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
    color: 'blue',
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
});
