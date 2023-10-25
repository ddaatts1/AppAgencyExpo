import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES } from '../../constants';
import { useState } from 'react';
import IconCustom from './iconCustom';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../constants/colors";
const CustomSearchOffice = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const title = props.title;
    const isBlack = props.isBlack;
    const iconLeft = props.iconLeft;
    const placeHolder = props.placeHolder;

    // @ts-ignore
    return (
        <View style={{ flexDirection: 'row', borderRadius: 10 }}>
            <View style={{
                paddingLeft: 15,
                paddingTop: 15,
            }}>
                {iconLeft}
            </View>
            <TextInput
                style={styles.textInput}
                placeholder={placeHolder}
                //secureTextEntry={checkInconRight}
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


export default CustomSearchOffice;

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#EEFAFF',
        width: '90%',
        height: 51,
        backgroundColor: '#EEFAFF',
        borderWidth: 1,
        borderRadius: 16,
        fontSize: 16,
        color: '#323232',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '500',
    },
});
