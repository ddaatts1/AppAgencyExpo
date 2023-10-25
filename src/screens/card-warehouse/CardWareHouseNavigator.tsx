import React from 'react';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {ROUTES, SVG} from '../../constants';
import CardDetail from '../card-warehouse/card-warehouse-total/cardDetail';


const Stack = createStackNavigator();

function CardWareHouseNavigator({navigation, route}: any) {
    const itemtype = route.params?.itemtype;
    const id = route.params?.id;
    const name = route.params?.name;
    const header = route.params?.header

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}

            initialRouteName={ROUTES.CARDDETAIL}>

            <Stack.Screen
                name={ROUTES.CARDDETAIL} component={CardDetail}
                initialParams={{itemtype: itemtype, id: id, name: name}}
                options={{
                    headerBackground: () => (
                        <View
                            style={[styles.Header, {
                                shadowColor: '#000',
                                shadowOpacity: 0.5,
                                shadowRadius: 10,
                                elevation: 5,
                                //  backgroundColor: "red"
                            }]}

                        />

                    ),
                    headerTitleStyle: {color: '#FFFFFF', fontSize: 18},
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
                                        onPress={() => navigation.navigate(ROUTES.CARD_WAREHOUSE_TAB_NAVIGATOR)}><SVG.Leftcircleo
                                        style={styles.iconLef}/></TouchableOpacity>

                                    <Text
                                        style={{
                                            color: '#323232',
                                            fontSize: 20,
                                            paddingLeft: 10,
                                            paddingTop: 5,
                                        }}>
                                        {header||'Danh sách gói thẻ trả phí'}
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

export default CardWareHouseNavigator;
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

    iconLef: {
        width: 40,
        height: 40,
        color: 'blue',

    },

});
