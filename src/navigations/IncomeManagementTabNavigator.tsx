import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ROUTES} from "../constants";
import CommonHeaderIncomeTab from "../components/commons/commonHeaderIncomeTab";
import IncomeRoseWallet from "../screens/income/IncomeRoseWallet";
import IncomePointWallet from "../screens/income/IncomePointWallet";

const Tab = createMaterialTopTabNavigator();

function IncomeManagementTabNavigator() {
    const listTab = [
        { text: 'Ví hoa hồng', isActive: true, route: ROUTES.INCOME_ROSE_WALLET },
        { text: 'Ví điểm', isActive: false, route: ROUTES.INCOME_POINT_WALLET},
    ];

    return (
        <Tab.Navigator tabBar={(props) => <CommonHeaderIncomeTab {...props} listTab={listTab} />} screenOptions={{swipeEnabled: false}}>
            <Tab.Screen name={ROUTES.INCOME_ROSE_WALLET} component={IncomeRoseWallet} />
            <Tab.Screen name={ROUTES.INCOME_POINT_WALLET} component={IncomePointWallet} />
        </Tab.Navigator>
    );
}

export default IncomeManagementTabNavigator;
