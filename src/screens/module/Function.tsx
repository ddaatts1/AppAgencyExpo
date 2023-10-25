import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import dataModule from '../../../ultidata/dataModule';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SVG } from '../../constants';


const Function = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        dataModule.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={styles.box} onPress={() => navigation.navigate(item.route)}>
                    <Image style={styles.icon} source={item.image}/>
                    <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
            );
        })
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        width: '25%',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 3,
    },
    text: {
        fontSize: 14,
        color: '#323232',
        textAlign: 'center',
    },
});
export default Function;
