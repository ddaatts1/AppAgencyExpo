import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, TouchableOpacity } from 'react-native';
import {COLORS, ROUTES, SVG} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import OfficeList from "./office-list/OfficeList";
import CustomTabBar from "../../components/commons/customTabBar";
import OfficeManagementTabNavigator from "../../navigations/OfficeManagementTabNavigator";

const Tab = createBottomTabNavigator();

function OfficeTabNavigator() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const headerLeftComponent = (text: string) => (
        <View style={{flex: 1}}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <SVG.Leftcircleo style={styles.iconLef}/>
                    </View>
                </TouchableOpacity>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.headerText}>
                        {text}
                    </Text>
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
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => {
                    let svg = <SVG.Icon_dropdown_search_open height={25} width={25}/>;

                    if (route.name === ROUTES.OFFICE_LIST) {
                        svg = focused ? <SVG.IconListCustomerBuyer height={24} width={24} style={{color: '#0288D1'}}/> :
                            <SVG.IconListCustomerBuyer height={24} width={24} style={{color: '#525252'}}/>;
                    } else if (route.name === ROUTES.OFFICE_MANAGEMENT) {
                        svg = focused ? <SVG.IconOfficeManagement height={24} width={24} style={{color: '#0288D1'}}/> :
                            <SVG.IconOfficeManagement height={24} width={24} style={{color: '#525252'}}/>;
                    }
                    // else if (route.name === ROUTES.OFFICE_OPEN) {
                    //     svg = focused ?
                    //         <SVG.IconOfficeOpen height={24} width={24} style={{color: '#0288D1'}}/> :
                    //         <SVG.IconOfficeOpen height={24} width={24} style={{color: '#525252'}}/>;
                    // }

                    return svg;
                },
                tabBarActiveTintColor: '#0288D1',
                tabBarInactiveTintColor: '#525252',
            })}>
            <Tab.Screen name={ROUTES.OFFICE_LIST} component={OfficeList}

                        options={{
                            headerBackground: () => headerBackground,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarLabel: 'Danh sách\n văn phòng',
                            headerTitle: '',
                            headerShown: true,
                            headerLeft: () => {
                                return headerLeftComponent('Văn phòng');
                            }

                        }}
            />
            <Tab.Screen name={ROUTES.OFFICE_MANAGEMENT} component={OfficeManagementTabNavigator}
                        options={{
                            headerBackground: () => headerBackground,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarLabel: 'Quản lý\n văn phòng',
                            headerTitle: '',
                            headerShown: true,
                            headerLeft: () => {
                                return headerLeftComponent('Quản lý văn phòng');
                            }
                        }}
            />
            {/*<Tab.Screen name={ROUTES.OFFICE_OPEN} component={OfficeOpen}*/}
            {/*            options={{*/}
            {/*                headerBackground: () => headerBackground,*/}
            {/*                headerTitleStyle: styles.headerTitleStyle,*/}
            {/*                tabBarLabel: 'Mở văn phòng',*/}
            {/*                headerTitle: '',*/}
            {/*                headerShown: true,*/}
            {/*                headerLeft: () => {*/}
            {/*                    return headerLeftComponent('Mở văn phòng');*/}
            {/*                }*/}
            {/*            }}*/}
            {/*/>*/}
        </Tab.Navigator >
    );
}

export default OfficeTabNavigator;

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
        paddingBottom: 2
    },
    tabBarLabelStyle: {
        fontSize: 12,
        textAlign: 'center',
    }
})
