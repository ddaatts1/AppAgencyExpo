import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ROUTES } from '../constants';
import { Home } from '../screens';

function TabScreen(props: any) {
    // const { route, screen } = props
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />

    );
}
export default TabScreen;
