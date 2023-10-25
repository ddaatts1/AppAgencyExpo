import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {COLORS, ROUTES, SVG} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import CustomTabBar from "../../components/commons/customTabBar";
import GroupList from "./group-list/GroupList";
import GroupCreate from "./group-create/GroupCreate";
import GroupLeaving from "./group-leaving/GroupLeaving";
import GroupListTabNavigator from "../../navigations/GroupListTabNavigator";

const Tab = createBottomTabNavigator();

function GroupTabNavigator() {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const listTab = [
        { text: 'Tất cả', isActive: true, route: ROUTES.CUSTOMER_TRIAL_STUDY_ALL },
        { text: 'Cần chăm sóc', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_NEED_OF_CARE},
        { text: 'Tiềm năng', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_POTENTIAL},
        { text: 'Dừng chăm sóc', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_STOP_TAKING_CARE}
    ];

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
            screenOptions={({route}) => ({
                tabBarIcon: ({color, focused}) => {
                    let svg = <SVG.Icon_dropdown_search_open height={25} width={25}/>;

                    if (route.name === ROUTES.GROUP_LIST_NAVIGATOR) {
                        svg = focused ? <SVG.IconGroupList height={24} width={24} style={{color: '#0288D1'}}/> :
                            <SVG.IconGroupList height={24} width={24} style={{color: '#525252'}}/>;
                    } else if (route.name === ROUTES.GROUP_CREATE) {
                        svg = focused ? <SVG.IconGroupCreate height={24} width={24} style={{color: '#0288D1'}}/> :
                            <SVG.IconGroupCreate height={24} width={24} style={{color: '#525252'}}/>;
                    } else if (route.name === ROUTES.GROUP_LEAVING) {
                        svg = focused ?
                            <SVG.IconGroupLeaving height={24} width={24} style={{color: '#0288D1'}}/> :
                            <SVG.IconGroupLeaving height={24} width={24} style={{color: '#525252'}}/>;
                    }

                    return svg;
                },
                tabBarActiveTintColor: '#0288D1',
                tabBarInactiveTintColor: '#525252',
            })}>
            <Tab.Screen name={ROUTES.GROUP_LIST_NAVIGATOR} component={GroupListTabNavigator}

                        options={{
                            headerBackground: () => headerBackground,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarLabel: 'Danh sách',
                            tabBarLabelStyle: styles.tabBarLabelStyle,
                            headerTitle: '',
                            headerShown: true,
                            headerLeft: () => {
                                return headerLeftComponent('Danh sách đại sứ');
                            }

                        }}
            />
            <Tab.Screen name={ROUTES.GROUP_CREATE} component={GroupCreate}
                        options={{
                            headerBackground: () => headerBackground,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarLabel: 'Tạo mới',
                            tabBarLabelStyle: styles.tabBarLabelStyle,
                            headerTitle: '',
                            headerShown: true,
                            headerLeft: () => {
                                return headerLeftComponent('Tạo mới đại sứ');
                            }
                        }}
            />
            <Tab.Screen name={ROUTES.GROUP_LEAVING} component={GroupLeaving}
                        options={{
                            headerBackground: () => headerBackground,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarLabel: 'Nguy cơ nghỉ',
                            tabBarLabelStyle: styles.tabBarLabelStyle,
                            headerTitle: '',
                            headerShown: true,
                            headerLeft: () => {
                                return headerLeftComponent('Danh sách đại sứ nguy cơ nghỉ');
                            }
                        }}
            />
        </Tab.Navigator>
    );
}

export default GroupTabNavigator;

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
