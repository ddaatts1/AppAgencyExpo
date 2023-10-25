import React from 'react';
import {Appearance, StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES } from '../../constants';
import { useState } from 'react';
import IconCustom from './iconCustom';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../constants/colors";
const CustomSearchCustomer = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const title = props.title;
    const isBlack = props.isBlack;

    const isDarkMode = Appearance.getColorScheme() === 'dark';

    // @ts-ignore
    return (
        <View style={{ paddingTop: 12, flexDirection: "row" }}>
            <View style={styles.container}>
                <Text style={[styles.text, {color: isBlack ? '#323232' : '#0288D1'}]}>
                    {title}
                </Text>
            </View>

            <TextInput
                style={[
                    styles.textInput,
                ]}
                //secureTextEntry={checkInconRight}
                placeholderTextColor={isDarkMode&&'grey'}
                value={value}
                onChangeText={text => onChange(name)(text)}
                onBlur={() => {
                    setFieldTouched(name);
                    onBlur(name);
                }}
                {...inputProps}
            />
        </View>
    );
};


export default CustomSearchCustomer;

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#0288D1',
        width: '68%',
        height: 45,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        color: '#323232',
        paddingHorizontal: 12
    },
    text: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '500',
    },
    container: {
        justifyContent: 'center',
        width: '32%'
    }
});
