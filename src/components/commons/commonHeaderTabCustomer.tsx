import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES, SVG} from '../../constants';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

const CommonHeaderTabCustomer = (props: any) => {
    const navigation = useNavigation<MaterialTopTabNavigationProp<ParamListBase>>();
    const [listTab, setListTab] = React.useState(props.listTab);

    const [showInfo, setShowInfo] = useState([false,false,false,false]);
    const info = ['Danh sách KH','KH cần quan tâm','KH tiềm năng','KH từ chối']
    const handleToggleInfo = (index) => {
        setShowInfo((prev) => {
            const updatedShowInfo = [...prev];
            updatedShowInfo[index] = !updatedShowInfo[index];
            return updatedShowInfo;
        });
    };
    const handleTabClick = (index: number, route: string) => {
        const listTabChange = listTab;

        let slug ;
        for (let i = 0; i < listTabChange.length; i++){
            listTabChange[i].isActive = i == index;
            if (i === index) {
                slug = listTabChange[i].slug;
            }
        }
        setListTab(listTabChange);

        navigation.navigate(route,{
            slug:slug
        });
    };

    const tabHeader = (text: string, index: number, route: string, props: any) => (
        <View key={index} style={{height:100}}>
            <View>
                <TouchableOpacity
                    onPress={() => handleTabClick(index, route)}
                    style={[styles.touchTab, listTab[index].isActive ? ({ backgroundColor: '#0288D1' }) : ({ backgroundColor: '#F5FCFF' }), index == 0 ? ({marginLeft: 16}) : ({marginLeft: 0})]}
                >
                    <View>
                        <View>
                            <Text style={[styles.textTab, listTab[index].isActive ? ({ color: '#F5FCFF' }) : ({ color: '#525252' })]}>
                                {text}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => handleToggleInfo(index)}>
                            <View style={{ position: 'absolute', top: -15, right: -15, width: 4, height: 4 }}>
                                <SVG.IconInfo width={12} height={12} />
                            </View>
                        </TouchableOpacity>
                    </View>


                </TouchableOpacity>
            </View>

            {showInfo[index] ? (
                <View style={{
                    position: 'absolute',
                    top: 36,
                    borderRadius: 20,
                    height: 36,
                    left: 70,
                    zIndex: 999,
                    backgroundColor: '#ffffff',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 20,
                    elevation: 5
                }}>
                    <Text style={{
                        lineHeight:35,
                        // paddingTop: 5,
                        // paddingBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        color: '#0288D1'
                    }}>
                        {info[index]}
                    </Text>
                </View>
            ) : null}

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

export default CommonHeaderTabCustomer;

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#ffffff',
        maxHeight: 75,
    },
    textTab: {
        color: '#323232',
        fontSize: 14,
    },
    touchTab: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 17,
        paddingHorizontal: 32,
        paddingVertical: 8,
    },
});
