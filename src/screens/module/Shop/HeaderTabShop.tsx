import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

const CommonHeaderTab = (props: any) => {
    const navigation = useNavigation<MaterialTopTabNavigationProp<ParamListBase>>();
    const listTextTab = props.textTab;
    const [listTab, setListTab] = React.useState(listTextTab);

    const handleTabClick = (index: number, route: string) => {
        const listTabChange = listTab;

        for (let i = 0; i < listTabChange.length; i++){
            listTabChange[i].isActive = i == index;
        }
        setListTab(listTabChange);
        navigation.navigate(route);
    };

    const tabHeader = (text: string, index: number, route: string, props: any) => (
        <View key={index}>
            <TouchableOpacity
            onPress={() => handleTabClick(index, route)}
            style={[styles.touchTab, listTab[index].isActive ? ({ backgroundColor: '#0288D1' }) : ({ backgroundColor: '#F5FCFF' }), index == 0 ? ({marginLeft: 16}) : ({marginLeft: 0})]}
            >
            <Text style={[styles.textTab, listTab[index].isActive ? ({ color: '#F5FCFF' }) : ({ color: '#525252' })]}>
                {text}
            </Text>
            </TouchableOpacity>
        </View>

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

export default CommonHeaderTab;

const styles = StyleSheet.create({
    tab: {
        //flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        //marginTop: 45,
        maxHeight: 36,
    },
    textTab: {
        color: '#323232',
        fontSize: 12,
    },
    touchTab: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 17,
        paddingHorizontal: 32,
        paddingVertical: 8,
    },
});
