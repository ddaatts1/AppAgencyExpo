import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { ROUTES, SVG } from '../../../constants';
import CustomInput from '../../../components/commons/customInput';
import {Formik, Field} from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import useReceiver from "../../home/personal/useReceiver";
const InfoPayment = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const formikRef = useRef() as any;
    const [initialValues, setInitialValues] = useState({
        phone: '',
        location: '',
      });

    const {
        Receiver,
        isLoading,
        setFullname,
        setDistrict,
        setCity,
        fullname,
        city,
        districts,
        telephone,
        setTelephone,
        address,
        setAddress,
        isChecked,
        setIsChecked
    } = useReceiver();



    useFocusEffect(
        React.useCallback(() => {
                Receiver();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                {/* <View style={styles.user}>
                    <SVG.Account style={styles.icon}/>
                    <Text style={styles.textUser}>Nguyễn Văn Thành</Text>
                </View> */}

                {/* <View>
                    <TextInput placeholder="Số điện thoại">
                        <SVG.Icon_phone/>
                    </TextInput>
                    <TextInput placeholder="Địa chỉ">
                        <SVG.Icon_location/>
                    </TextInput>
                </View> */}
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.RECEIVER)} style={{flexDirection: 'row', alignItems: 'center'}} >
                <View style={{width: '15%'}}>
                    <SVG.Icon_location />
                </View>
                <View style={{width: '75%'}}>
                    <Text style={{color:'#000000'}}>Họ tên ({telephone})</Text>
                    <Text style={{color:'#000000'}}>{address}</Text>

                    {/*<Text>Địa chỉ nhận hàng</Text>*/}
                    {/*<Text>Chọn địa chỉ</Text>*/}
                </View>
                <View style={{width: '10%'}}>
                    <SVG.Icon_next_grey />
                </View>
                </TouchableOpacity>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        top: 30,
        marginBottom: 50,
        marginLeft: 10,
    },
    box: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        padding: 10,
        backgroundColor: '#0288D1',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user: {
        flexDirection: 'row',
        width: '50%',
    },
    textButton: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        marginLeft: 6,
    },
    textUser: {
        fontSize: 16,
        color: '#323232',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        marginLeft: 4,
    },
    icon: {
        width: 22,
        height: 22,
    },

});

export default InfoPayment;
