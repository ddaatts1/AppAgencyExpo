import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES} from '../../constants';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

const CommonHeaderOfficeTab = (props: any) => {
    const navigation = useNavigation<MaterialTopTabNavigationProp<ParamListBase>>();
    const [listTab, setListTab] = React.useState(props.listTab);

    const handleTabClick = (index: number, route: string) => {
        const listTabChange = listTab;

        for (let i = 0; i < listTabChange.length; i++){
            listTabChange[i].isActive = i == index;
        }
        setListTab(listTabChange);
        navigation.navigate(route);
    };

    const tabHeader = (text: string, index: number, route: string, props: any) => (
        <TouchableOpacity
            key={index}
            onPress={() => handleTabClick(index, route)}
            style={[styles.touchTab, listTab[index].isActive ? ({ backgroundColor: '#0288D1' }) : ({ backgroundColor: '#F5FCFF' }), index == 0 ? ({marginLeft: 16}) : ({marginLeft: 0})]}
        >
            <Text style={[styles.textTab, listTab[index].isActive ? ({ color: '#F5FCFF' }) : ({ color: '#525252' })]}>
                {text}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={{paddingTop: 25, backgroundColor: '#fff'}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tab}>
                {
                    listTab.map((item, index) => tabHeader(item.text, index, item.route, props))
                }
            </ScrollView>
        </View>

    );
};

export default CommonHeaderOfficeTab;

const styles = StyleSheet.create({
    tab: {
        //flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        //marginTop: 45,
        maxHeight: 38,
    },
    textTab: {
        color: '#525252',
        fontSize: 16,
    },
    touchTab: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 17,
        paddingHorizontal: 32,
        paddingVertical: 8,
    },
});
