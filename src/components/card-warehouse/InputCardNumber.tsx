import React from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import {STYLES, SVG} from '../../constants';
import {useState} from 'react';
import {Appearance} from 'react-native';

const InputCardNumber = (props: any) => {
    const {
        field: {name, onBlur, onChange, value},
        form: {errors, touched, setFieldTouched},
        ...inputProps
    } = props;

    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const hasError = errors[name] && touched[name];
    const isValid = props.isValid;
    const autoFocus = props.autoFocus;
    const title = props.title;
    const iconRight = props.iconRight !== undefined ? props.iconRight : true
    const [countNumber, setCountNumber] = useState(0);

    const numberOnly = props.numberOnly || false;
    const placeholder = props.placeholder;

    const onButton = (index: number) => {
        const item = countNumber + index;

        if (item >= 0) {
            setCountNumber(item);
            onChange(name)(String(item));
        }
    }

    const onChangeText = (text: string) => {
        if (numberOnly) {
            // Remove non-numeric characters from the input
            const cleanedText = text.replace(/[^0-9]/g, '');
            setCountNumber(Number(cleanedText));
            onChange(name)(cleanedText);
        } else {
            setCountNumber(Number(text));
            onChange(name)(text);
        }
    };

    return (
        <View style={{paddingTop: 12}}>
            <Text style={STYLES.text_16.text}>
                {title}
                {!isValid ? (
                    <Text/>
                ) : (
                    <Text style={STYLES.text_16.text_color}>*</Text>
                )}
            </Text>
            <View
                style={[
                    STYLES.style_input.view,
                    hasError && STYLES.style_input.errorInput,
                ]}>
                <View style={{paddingLeft: 10, paddingTop: 15}}></View>

                <TextInput
                    style={[
                        styles.textInput,
                        isDarkMode && {color: 'black'},
                    ]}
                    keyboardType='numeric'
                    autoFocus={autoFocus}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={() => {
                        setFieldTouched(name);
                        onBlur(name);
                    }}
                    {...inputProps}
                />
                {iconRight && <View style={{position:"absolute",right:10}}>
                    <TouchableOpacity onPress={() => onButton(1)}>
                        <SVG.Icon_go_up height={25} width={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onButton(-1)}>
                        <SVG.Icon_down height={25} width={25}/>
                    </TouchableOpacity>
                </View>}

            </View>

            <View style={STYLES.style_input.viewErrorText}>
                {hasError && (
                    <Text style={STYLES.style_input.errorText}>
                        <SVG.Icon_group/> {errors[name]}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default InputCardNumber;

const styles = StyleSheet.create({
    textInput: {
        width: '86%',
        borderColor: '#EEFAFF',
        flexDirection: 'row',
        height: 51,
        backgroundColor: '#EEFAFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
});
