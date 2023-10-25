import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES, SVG } from '../../constants';
import { useState } from 'react';
import IconCustom from './iconCustom';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomInputDetailsCustomer = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];
    const isValid = props.isValid;
    const autoFocus = props.autoFocus;
    const title = props.title;
    const editable = props.editable;
    // const stateIcon = props.stateIcon;
    // const iconLeft = props.iconLeft;
    // const iconRight = props.iconRight;
    // const isIconRight = props.isIconRight;
    // const [checkInconRight, setInconRight] = useState(isIconRight);

    // @ts-ignore
    return (
        <View style={{ paddingTop: 12 }}>
            <Text style={styles.text}>
                {title}
                {!isValid ? (
                    <Text />
                ) : (
                    <Text style={STYLES.text_16.text_color}></Text>
                )}
            </Text>

            <View
                style={[
                    STYLES.style_input.view,
                    hasError && STYLES.style_input.errorInput,
                ]}>
                <View style={{
                    paddingLeft: 10,
                    paddingTop: 15,

                }}>
                    {/*{iconLeft}*/}
                </View>

                <TextInput

                    style={styles.textStyle}
                    keyboardType="default"
                    autoFocus={autoFocus}
                    //secureTextEntry={checkInconRight}
                    password={false}
                    // multiline={true}
                    value={value}
                    editable={editable}
                    onChangeText={text => onChange(name)(text)}
                    onBlur={() => {
                        setFieldTouched(name);
                        onBlur(name);
                    }}
                    {...inputProps}
                />
                {/*{isIconRight ? (*/}
                {/*    <AntDesign*/}

                {/*        onPress={() => {*/}
                {/*            checkInconRight ? setInconRight(false) : setInconRight(true);*/}

                {/*        }}*/}
                {/*        style={*/}
                {/*            checkInconRight*/}
                {/*                ? STYLES.style_input.icon_right*/}
                {/*                : STYLES.style_input.icon_right_color*/}
                {/*        }*/}
                {/*        name={iconRight}*/}
                {/*        size={20}*/}
                {/*    />*/}
                {/*) : null}*/}
            </View>

            <View style={STYLES.style_input.viewErrorText}>
                {hasError && (

                    <Text style={STYLES.style_input.errorText}>
                        <SVG.Icon_group /> {errors[name]}
                    </Text>
                )}
            </View>
        </View>
    );
};


export default CustomInputDetailsCustomer;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#039BE5',
        paddingBottom: 5,
    },
    textStyle: {
        fontSize: 16,
        color: '#323232',
        borderColor: '#EEFAFF',
        width: '90%',
        flexDirection: 'row',
        height: 51,
        backgroundColor: '#EEFAFF',

        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
});
