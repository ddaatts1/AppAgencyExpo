import React from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {STYLES, SVG} from '../../constants';
import {useState} from 'react';
import IconCustom from './iconCustom';
import {EnumIconCustom} from '../../constants/enum';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import Tooltip from "react-native-walkthrough-tooltip";

const CustomInputForNote = (props: any) => {
    const {
        field: {name, onBlur, onChange, value},
        form: {errors, touched, setFieldTouched},
        ...inputProps
    } = props;

    //const hasError = errors[name] && touched[name];
    //const isValid = props.isValid;
    const title = props.title;
    const isWhite = props.isWhite;
    const isLabelBlue = props.isLabelBlue;
    const toolTipText = props.toolTipText
    // const stateIcon = props.stateIcon;
    // const iconLeft = props.iconLeft;
    // const iconRight = props.iconRight;
    // const isIconRight = props.isIconRight;
    // const [checkInconRight, setInconRight] = useState(props.secureTextEntry);

    const [toolTipVisible, setToolTipVisible] = useState(false);

    // const toolTip = () => (
    //     <Tooltip
    //         isVisible={toolTipVisible}
    //         content={<Text>Check this out!</Text>}
    //         placement="top"
    //         onClose={() => setToolTipVisible(false)}>
    //     </Tooltip>
    //
    // );

    return (
        <View style={{paddingTop: 12}}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.container}>
                    <Text style={[styles.text, {color: isLabelBlue ? '#039BE5' : '#323232'}]}>
                        {title}
                    </Text>
                </View>
                {
                    !isLabelBlue ? (<View>
                        <TouchableOpacity onPress={() => setToolTipVisible(!toolTipVisible)}>
                            <SVG.IconDetails style={styles.iconNote}/>
                        </TouchableOpacity>
                    </View>) : null
                }
            </View>
            {toolTipVisible && toolTipText && <View style={{
                position: 'absolute',
                top: 36,
                borderRadius: 5,
                // height: 36,
                left: 70,
                zIndex: 999,
                backgroundColor: '#ffffff',
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5
            }}><Text style={{
                lineHeight: 20,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                color: '#000000',
                maxWidth:200
            }}>{toolTipText}</Text></View>}


            <TextInput
                style={[styles.textInput, {borderColor: isWhite ? '#fff' : '#EEFAFF'}, {backgroundColor: isWhite ? '#fff' : '#EEFAFF'}]}
                //secureTextEntry={checkInconRight}
                value={value}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="black"
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


export default CustomInputForNote;

const styles = StyleSheet.create({
    textInput: {
        color: '#000000',
        borderColor: '#EEFAFF',
        width: '100%',
        height: 100,
        backgroundColor: '#EEFAFF',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        //color: '#323232',
        paddingHorizontal: 12,
        textAlignVertical: 'top',
    },
    text: {
        fontSize: 16,
        color: '#323232',
        paddingBottom: 5
    },
    container: {
        justifyContent: 'center',
        //width: '32%',
    },
    iconNote: {
        width: 16,
        height: 16,
        marginTop: 3,
        marginLeft: 3,
    }
});
