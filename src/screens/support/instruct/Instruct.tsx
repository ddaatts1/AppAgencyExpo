import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import dataInstruct from '../../../../ultidata/dataInstruct';
import { SVG } from '../../../constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import routes from '../../../constants/routes';

const Instruct = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.box}>
                {
                    dataInstruct.map((item: any, index: any) => {
                        return (
                            <View key={index} style={{width: '100%' , flexDirection: 'row', marginBottom: 12}}>
                                <View style={{width: '30%'}}>
                                    <Image style={{width: '100%', borderRadius: 8}} source={item.image}/>
                                </View>
                                <View style={{width: '70%', marginLeft: 8}}>
                                    <View>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.content}>{item.content}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate(routes.NEWSDETAIL)}>
                                    <View style={{flexDirection: 'row', marginTop: 30}}>
                                        <Text style={styles.next}>Xem chi tiết</Text>
                                        <SVG.Icon_next color = "#0288D1"/>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        marginTop: 24,
        marginLeft: 16,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#181818',
    },
    content: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#181818',
    },
    next: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#0288D1',
        marginRight: 8,
    },
});

export default Instruct;
