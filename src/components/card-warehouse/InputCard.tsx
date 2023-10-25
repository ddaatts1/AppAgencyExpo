import React from 'react';
import {Appearance, StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES, SVG } from '../../constants';
import { useState } from 'react';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
const InputCard = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;


    const isDarkMode = Appearance.getColorScheme() === 'dark';

    const hasError = errors[name] && touched[name];
    const isValid = props.isValid;
    const autoFocus = props.autoFocus;
    const title = props.title;
    const isIconRight = props.isIconRight;
    const [checkInconRight, setInconRight] = useState(isIconRight);
    const textarea = props.textarea;
    const placeholder = props.placeholder;
    const customStyle = props.customStyle

    // @ts-ignore
    return (
        <View style={[{ paddingTop: 12, }, textarea && { height: 200 }]}>
            <Text style={STYLES.text_16.text}>
                {title}
                {!isValid ? (
                    <Text />
                ) : (
                    <Text style={STYLES.text_16.text_color}>*</Text>
                )}
            </Text>
            <View
                style={[
                    !customStyle && STYLES.style_input.view,
                    hasError && STYLES.style_input.errorInput, textarea && { height: 160 }
                ]}>
                <View style={{
                    paddingLeft: 10,
                    paddingTop: 15,

                }}>

                </View>

                <TextInput

                    style={[
                        // STYLES.style_input.textInput,
                        customStyle,
                        textarea && { height: 160, textAlignVertical: 'top' },
                        isDarkMode &&{color:'black'}
                    ]}
                    multiline={true}
                    placeholder={placeholder}
                    numberOfLines={textarea ? 8 : 1}
                    keyboardType="default"
                    autoFocus={autoFocus}
                    secureTextEntry={checkInconRight}
                    password={false}
                    // multiline={true}
                    value={value}
                    onChangeText={text => onChange(name)(text)}
                    onBlur={() => {
                        setFieldTouched(name);
                        onBlur(name);
                    }}
                    {...inputProps}
                />

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


export default InputCard;
