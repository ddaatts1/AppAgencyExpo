import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { STYLES, SVG } from '../../constants';
import { useState } from 'react';
import IconCustom from './iconCustom';
import { EnumIconCustom } from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomInput = (props: any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;


  const hasError =props.hasError|| errors[name] && touched[name];
  const isValid = props.isValid;
  const autoFocus = props.autoFocus;
  const title = props.title;
  const stateIcon = props.stateIcon;
  const iconLeft = props.iconLeft;
  const iconRight = props.iconRight;
  const isIconRight = props.isIconRight;
  const placeHolder = props.placeHolder;
  const isBorderBlue = props.isBorderBlue;
  const [checkInconRight, setInconRight] = useState(isIconRight);
  const isTypeNumber = props.isTypeNumber;
  const setIsExist = props.setIsExist

  // @ts-ignore
  return (
    <View style={{paddingTop: 12}}>
      <Text style={STYLES.text_16.text}>
        {title}
        {!isValid ? (
          <Text />
        ) : (
          <Text style={STYLES.text_16.text_color}> *</Text>
        )}
      </Text>

      <View
        style={[
          STYLES.style_input.view,
          hasError && STYLES.style_input.errorInput,
            isBorderBlue && {borderColor: '#0288D1', borderWidth: StyleSheet.hairlineWidth},
        ]}>
        <View style={{
          paddingLeft: 10,
          paddingTop: 15,

        }}>
          {iconLeft}
        </View>

        <TextInput

          style={[
            STYLES.style_input.textInput,
            isIconRight && STYLES.style_input.textInputRight,
          ]}

          placeholderTextColor={'#000000'}
          placeholder={placeHolder}
          keyboardType={isTypeNumber ? "numeric" : "default"}
          autoFocus={autoFocus}
          secureTextEntry={checkInconRight}
          password={false}
          // multiline={true}
          value={value}
          onChangeText={text => {
              onChange(name)(text)
              setIsExist&& setIsExist(null)
          }}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          {...inputProps}
        />
        {isIconRight ? (
          <AntDesign

            onPress={() => {
              checkInconRight ? setInconRight(false) : setInconRight(true);

            }}
            style={
              checkInconRight
                ? STYLES.style_input.icon_right
                : STYLES.style_input.icon_right_color
            }
            name={iconRight}
            size={20}
          />
        ) : null}
      </View>

      <View style={STYLES.style_input.viewErrorText}>
        {hasError && (

          <Text style={STYLES.style_input.errorText}>
            <SVG.Icon_group /> {errors[name] || hasError}
          </Text>
        )}
      </View>
    </View>
  );
};


export default CustomInput;
