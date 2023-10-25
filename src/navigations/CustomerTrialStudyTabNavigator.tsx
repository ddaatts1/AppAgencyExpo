import React, {useEffect, useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTES, SVG } from '../constants';
import NeedOfCare from '../screens/customer/trial-study/NeedOfCare';
import Potential from '../screens/customer/trial-study/Potential';
import StopTakingCare from '../screens/customer/trial-study/StopTakingCare';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommonHeaderTab from '../components/commons/commonHeaderTab';
import TrialStudyAll from '../screens/customer/trial-study/TrialStudyAll';
import CommonHeaderTabCustomer from "../components/commons/commonHeaderTabCustomer";

const Tab = createMaterialTopTabNavigator();

function CustomerTrialStudyTabNavigator() {
    const [showInfo, setShowInfo] = useState([false,false,false,false]);
    const listTab = [
        {
            text: 'Tất cả',
            isActive: true,
            route: ROUTES.CUSTOMER_TRIAL_STUDY_ALL,
        },
        { text: 'Cần chăm sóc', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_NEED_OF_CARE },
        { text: 'Tiềm năng', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_POTENTIAL },
        { text: 'Dừng chăm sóc', isActive: false, route: ROUTES.CUSTOMER_TRIAL_STUDY_STOP_TAKING_CARE },
    ];



    useEffect(()=>{
        console.log("showInfo: "+ JSON.stringify(showInfo))

    },[showInfo])
    return (
        <Tab.Navigator tabBar={(props) => <CommonHeaderTabCustomer {...props} listTab={listTab} />} screenOptions={{ swipeEnabled: false }}>
            <Tab.Screen name={ROUTES.CUSTOMER_TRIAL_STUDY_ALL} component={TrialStudyAll} />
            <Tab.Screen name={ROUTES.CUSTOMER_TRIAL_STUDY_NEED_OF_CARE} component={NeedOfCare} />
            <Tab.Screen name={ROUTES.CUSTOMER_TRIAL_STUDY_POTENTIAL} component={Potential} />
            <Tab.Screen name={ROUTES.CUSTOMER_TRIAL_STUDY_STOP_TAKING_CARE} component={StopTakingCare} />
        </Tab.Navigator>
    );
}

export default CustomerTrialStudyTabNavigator;
