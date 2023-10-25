import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES } from '../../constants';
import { useState } from 'react';
import IconCustom from './iconCustom';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from "../../constants/colors";
const CustomInputGroupLeaving = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const title = props.title;
    const isBlack = props.isBlack;
    const iconLeft = props.iconLeft;
    const placeHolder = props.placeHolder;
    const [countNumber, setCountNumber] = useState(0);


    const onChangeText = (text: string) => {
            // Remove non-numeric characters from the input
            const cleanedText = text.replace(/[^0-9]/g, '');
            setCountNumber(Number(cleanedText));
            onChange(name)(cleanedText);

    };
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
                placeholderTextColor={'#000000'}
                //secureTextEntry={checkInconRight}
                value={value}
                onChangeText={text=>{
                    console.log("text:"+ text)
                    onChangeText(text)
                }}
                onBlur={() => {
                    setFieldTouched(name);
                    onBlur(name);
                }}
                {...inputProps}
            />
        </View>
    );
};


export default CustomInputGroupLeaving;

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#EEFAFF',
        width: '70%',
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
