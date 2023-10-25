import React, { useEffect, useState } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { ROUTES, SVG } from '../constants';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Intro } from '../screens';
import { ParamListBase, useNavigation, useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';


const Stack = createStackNavigator();

function IntroNavigator({ navigation, }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const focus = useIsFocused();
    useEffect(() => {
        // setIsSwitch(true)
        console.log("intro----------------fsdfsdfsd")
        setIsLoading(true)
    }, [])

    return (


        isLoading ? <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={ROUTES.INTRO}>
            <Stack.Screen
                name={ROUTES.INTRO}
                component={Intro}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.HOME}
                component={BottomTabNavigator}
                options={{
                    title: 'Trang chủ',
                    headerShown: false,


                }}
            />
        </Stack.Navigator> : <View >

            <ActivityIndicator size="small" color="#0000ff" />

        </View>

    );
} export default IntroNavigator;
const styles = StyleSheet.create({
    headerBackgroundColor: {
        height: 90,
        width: '100%',
        backgroundColor: 'white',
        ...StyleSheet.absoluteFillObject,
    },

});