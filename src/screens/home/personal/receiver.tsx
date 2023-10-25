import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ROUTES, STYLES, SVG } from '../../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useReceiver from './useReceiver';
import LoadingReact from '../../../components/commons/loading';
import { StorageHelper } from '../../../constants/storageHelper';
import ModalPoup from '../../../components/commons/modalPoup';


const Receiver = ({ route }: any) => {
    const { Receiver,
        isLoading,
        setFullname,
        setDistrict,
        setCity,
        fullname, city,
        districts,
        telephone, setTelephone, address, setAddress, isChecked, setIsChecked } = useReceiver()
    const [isModal, setIsModal] = useState(false);
    const paramsdistrict = route?.params?.district;
    const paramscity = route?.params?.city;

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()


    async function onSubmit() {
        const data = {
            address: address,
            telephone: telephone,
            fullname: fullname,
            districts: districts,
            city: city,
            isChecked: isChecked,

        }
        StorageHelper.setReceiver(JSON.stringify(data));
        setIsModal(true)



    }

    useEffect(() => {

        if (paramscity == undefined) {
            const fetchData = async () => {
                try {
                    Receiver()

                } catch (error) { }
            };

            fetchData();
        } else {
            setCity(paramscity)
            setDistrict(paramsdistrict)
        }

    }, [paramsdistrict, paramscity]);


    return (
        <>
            {isLoading ? <ScrollView style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.wFull}>
                        <Text style={styles.loginContinueTxt}>Thông tin liên hệ</Text>


                        <View style={{ paddingTop: 12 }}>
                            <Text style={STYLES.text_16.text}> Họ và tên</Text>
                            <View
                                style={STYLES.style_input.view}>
                                <View style={{ paddingLeft: 10, paddingTop: 15, }}>
                                    <SVG.Icon_user />
                                </View>
                                <TextInput
                                    style={[STYLES.style_input.textInput]}
                                    value={fullname}
                                    onChangeText={(text => setFullname(text))}
                                />
                            </View>
                        </View>
                        <View style={{ paddingTop: 12 }}>
                            <Text style={STYLES.text_16.text}> Số điện thoại</Text>
                            <View
                                style={STYLES.style_input.view}>
                                <View style={{ paddingLeft: 10, paddingTop: 15, }}>
                                    <SVG.Icon_phone style={{ color: '#0288D1' }} />
                                </View>
                                <TextInput
                                    keyboardType="numeric"
                                    style={[STYLES.style_input.textInput]}
                                    value={telephone}
                                    onChangeText={(text => setTelephone(text))}
                                />
                            </View>
                        </View>
                        <Text style={styles.loginContinueTxt}>Địa chỉ nhận hàng</Text>


                        <Text style={STYLES.text_16.text}>Địa chỉ</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOCATION)}>
                            <View
                                style={[STYLES.style_input.view, {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 8
                                }

                                ]}>
                                <SVG.Icon_location height={25} width={25} />
                                <Text style={[styles.textInput, { fontWeight: 'bold', color: "#323232" }]}>

                                    {city?.name + ", " + districts?.name}
                                    {/* {textLocation && textLocation.split(",")[0] + ", " + textLocation.split(",")[1] + "," + '\n' + textLocation.split(",")[2]} */}
                                </Text>
                                <SVG.Icon_next height={25} width={25} />
                            </View>


                        </TouchableOpacity>
                        <View style={{ paddingTop: 12 }}>
                            <Text style={STYLES.text_16.text}> Địa chỉ cụ thể</Text>
                            <View
                                style={STYLES.style_input.view}>
                                <View style={{ paddingLeft: 10, paddingTop: 15, }}>
                                    <SVG.Icon_location height={25} width={25} />
                                </View>
                                <TextInput
                                    style={[STYLES.style_input.textInput]}
                                    value={address}
                                    onChangeText={(text => setAddress(text))}
                                />
                            </View>

                        </View>

                        <BouncyCheckbox
                            style={{ margin: 12 }}
                            size={25}
                            fillColor="#0288D1"
                            isChecked={isChecked}
                            text="Lưu lại thông tin cho lần sau"

                            textStyle={{
                                fontSize: 16,
                                textDecorationLine: "none",
                                color: "#000000"
                            }}

                            onPress={(isChecked: boolean) =>
                                setIsChecked(isChecked)

                            }
                        />
                        <View style={{ paddingBottom: 12, paddingTop: 12 }}>

                            <TouchableOpacity

                                onPress={() => onSubmit()}
                                style={styles.loginBtn}>

                                <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>Cập nhật</Text>

                            </TouchableOpacity>



                        </View>


                    </View>
                </View>


            </ScrollView> : <LoadingReact />}
            <ModalPoup visible={isModal}>
                <View style={{ alignItems: 'center' }}>
                    <SVG.Icon_success height={65} width={65} />
                </View>
                <Text style={{ marginVertical: 12, fontSize: 18, textAlign: 'center', color: "#323232" }}>
                    Cập nhật thông tin nhận hàng thành công.
                </Text>
                <TouchableOpacity style={styles.loginTime} onPress={() => {
                    setIsModal(false)
                }}>

                    <Text
                        style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
                        Xác Nhận
                    </Text>

                </TouchableOpacity>
            </ModalPoup>
        </>

    );
};

export default Receiver;

const styles = StyleSheet.create({
    loginTime: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 12,
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    textInput: {

        fontSize: 14,
        color: '#323232',
    },
    loginContinueTxt: {
        fontSize: 18,

        color: "#0288D1",
        paddingTop: 12,
        paddingBottom: 12,
        fontWeight: 'bold',
    },
    textStyle: {

        flex: 1,
        color: "#525252"
    },
    loginBtn: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    main: {
        backgroundColor: 'white',
        height: '100%'
    },
    container: {
        marginTop: 50,
        width: '100%',
        backgroundColor: 'white',
    },
    wFull: {
        width: '100%',
        marginTop: -12,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 25,
        backgroundColor: 'white'
    },

});
