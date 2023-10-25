import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ROUTES} from "../constants";
import TrialStudy from "../screens/customer/trial-study/TrialStudy";
import NeedOfCare from "../screens/customer/trial-study/NeedOfCare";
import Potential from "../screens/group/group-list/Potential";
import StopTakingCare from "../screens/customer/trial-study/StopTakingCare";
import {StyleSheet} from "react-native";
import CommonHeaderTab from "../components/commons/commonHeaderTab";
import TrialStudyAll from "../screens/customer/trial-study/TrialStudyAll";
import GroupList from "../screens/group/group-list/GroupList";
import GroupListCustomer from "../screens/group/group-list/GroupListCustomer";
import CommonHeaderIncomeTab from "../components/commons/commonHeaderIncomeTab";
import CommonHeaderOfficeTab from "../components/commons/commonHeaderOfficeTab";

const Tab = createMaterialTopTabNavigator();

function GroupTrialTabNavigator() {
    const listTab = [
        {text: 'DS Đại sứ', isActive: true, route: ROUTES.GROUP_LIST_ALL},
        {text: 'Khách mời', isActive: false, route: ROUTES.GROUP_LIST_CUSTOMER},
        {text: 'Tiềm năng', isActive: false, route: ROUTES.GROUP_LIST_POTENTIAL},
    ];

    return (
        <Tab.Navigator tabBar={(props) => <CommonHeaderOfficeTab {...props} listTab={listTab}/>}
                       screenOptions={{swipeEnabled: false}}>
            <Tab.Screen name={ROUTES.GROUP_LIST_ALL} component={GroupList}/>
            <Tab.Screen name={ROUTES.GROUP_LIST_CUSTOMER} component={GroupListCustomer}/>
            <Tab.Screen name={ROUTES.GROUP_LIST_POTENTIAL} component={Potential}/>
        </Tab.Navigator>
    );
}

export default GroupTrialTabNavigator;
