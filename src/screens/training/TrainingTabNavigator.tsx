import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, TouchableOpacity } from 'react-native';
import { COLORS, ROUTES, SVG } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTabBar from '../../components/commons/customTabBar';
import CardWareHouseTotal from '../card-warehouse/card-warehouse-total/CardWareHouseTotal';
import ChangeCard from '../card-warehouse/change-card/ChangeCard';
import TrialStudy from '../card-warehouse/trial-study/TrialStudy';
import TrainingSchedule from './training-schedule/TrainingSchedule';
import FutureAcademy from './future-academy/FutureAcademy';
import TrainingDocument from './document/document';
import MyCoursrs from './myCourses/myCourse';

const Tab = createBottomTabNavigator();

function TrainingTabNavigator({ navigation }: any) {

    const headerLeftComponent = (text: string) => (
        <View style={{ flex: 1 }}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HOME_TAB)}>
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
                tabBarIcon: ({ focused }) => {
                    let svg = <SVG.Icon_dropdown_search_open height={25} width={25} />;

                    if (route.name === ROUTES.TRAINING_SCHEDULE) {

                        svg = focused ? <SVG.Icon_month_blue height={24} width={24} /> :
                            <SVG.Icon_month height={24} width={24} />;
                    } else if (route.name === ROUTES.TRAINING_DOCUMENT) {
                        svg = focused ?
                            <SVG.Icon_docment_blue height={24} width={24} /> :
                            <SVG.Icon_docment height={24} width={24} />;
                    } else if (route.name === ROUTES.MY_COURSES) {
                        svg = focused ?
                            <SVG.Icon_book_blue height={24} width={24} /> :
                            <SVG.Icon_book_white height={24} width={24} />;
                    } else if (route.name === ROUTES.TRAINING_FUTURE_ACADEMY) {

                        svg = focused ? <SVG.Icon_future_academy_blue height={24} width={24} /> :
                            <SVG.Icon_future_academy_white height={24} width={24} />;
                    }


                    return svg;
                },
                tabBarActiveTintColor: '#0288D1',
                tabBarInactiveTintColor: '#525252',
            })}>
            <Tab.Screen name={ROUTES.TRAINING_FUTURE_ACADEMY} component={FutureAcademy}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    tabBarLabel: 'Future Academy',
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Đào tạo');
                    },
                }}
            />
            <Tab.Screen name={ROUTES.TRAINING_DOCUMENT} component={TrainingDocument}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    tabBarLabel: 'Tài Liệu',
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Tài Liệu');
                    },
                }}
            />
            <Tab.Screen name={ROUTES.TRAINING_SCHEDULE} component={TrainingSchedule}

                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    tabBarLabel: 'Lịch đào tạo ',
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Lịch đào tạo');
                    },

                }}
            />



            <Tab.Screen name={ROUTES.MY_COURSES} component={MyCoursrs}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    tabBarLabel: 'Khóa học của bạn',
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Khóa học của bạn');
                    },
                }}
            />

        </Tab.Navigator >

    );
}

export default TrainingTabNavigator;

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
    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
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
