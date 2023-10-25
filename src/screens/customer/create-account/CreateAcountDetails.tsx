

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Modal,
    Button,
    FlatList,
    TextInput,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { COLORS, ROUTES, SVG } from '../../../constants';
import CustomInput from '../../../components/commons/customInput';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useRef, useState, useEffect } from 'react';
import ModalPoup from '../../../components/commons/modalPoup';
import CustomSearchDropdown from '../../../components/commons/customSearchDropdown';
import useLogin from '../../../screens/auth/useLogin';
import CustomInputDetailsCustomer from "../../../components/commons/customInputDetailsCustomer";
import CustomDropdownDetailsCustomer from "../../../components/commons/customDropDownDetailsCustomer";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import ContainsAccountDetails from "./ContainsAccountDetails";
import NoContainsAccountDetails from "./NoContainsAccountDetails";
import CommonMessageModal from "../../../components/commons/commonMessageModal";


const CreateAccountDetails = ( {route }) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { isCreatedAccount,name,phone,expiredAt,id,email,telephone } = route.params;


    const [message,setMessage] = useState('')
    useEffect(()=>{
        console.log("name: "+ name + "| phone: "+phone+" | expiredAt: "+ expiredAt+ "| id: "+ id+"| email: "+ email )
    },[])
    const { province, register, isIntroModel, setIntroModel } = useLogin()


    const onIntro = async () => {
        setIntroModel(false)
        navigation.navigate(ROUTES.LOGIN, {
            id: 1
        })
    }

    useEffect(() => {


        const fetchData = async () => {
            const data = await province()
        }
        fetchData()



    }, [])

    return (

        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.headerBlackText}>
                                Kích hoạt thẻ cho học viên
                            </Text>
                            <Text style={styles.headerRedText}>
                                Lưu ý: Chỉ kích hoạt khi đã nhận được tiền từ khách hàng
                            </Text>
                        </View>
                    </View>
                    {
                        isCreatedAccount ?
                            <ContainsAccountDetails id={id} name={name} phone={phone} expiredAt={expiredAt} email={email} setIntroModel={setIntroModel} setMessage={setMessage}></ContainsAccountDetails>
                            : <NoContainsAccountDetails setIntroModel={setIntroModel} setMessage={setMessage} telephone={telephone}  ></NoContainsAccountDetails>
                    }
                    <View style={styles.footerButtonContainer}>
                        <Text style={styles.footerBlackText}>
                            Lưu ý: Bằng việc đăng ký bạn đã đồng ý với tất cả các
                        </Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text style={styles.footerRedText}>
                                điều khoản, chính sách
                            </Text>
                            <Text style={styles.footerBlackText}> </Text>
                            <Text style={styles.footerBlackText}>
                                bảo mật thông tin.
                            </Text>
                        </View>
                    </View>
                </View>

                <CommonMessageModal
                    message={message}
                    buttonText={'Xác nhận'}
                    isIntroModel={isIntroModel}
                    setIntroModel={setIntroModel}
                />


            </View>
        </ScrollView>
    );
};

export default CreateAccountDetails;


const styles = StyleSheet.create({
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '60%',
        height: 50,
        backgroundColor: '#0288D1',
        borderRadius: 12,
    },
    textStyle: {

        flex: 1,
        color: "#525252"
    },
    appBar: {
        height: 192,
    },
    formContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    formControl: {
        marginVertical: 4,
    },
    submitButton: {
        marginVertical: 24,
    },
    haveAccountButton: {
        alignSelf: 'center',
    },

    ///
    main: {
        height: "100%",
        backgroundColor: 'white'
    },
    container: {
        width: '100%',
    },
    brandName: {
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.primary,
        opacity: 0.9,
    },
    loginContinueTxt: {
        fontSize: 21,
        textAlign: 'center',
        color: "#0288D1",
        paddingTop: 25,
        paddingBottom: 25,
        fontWeight: 'bold',
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        height: 55,
        paddingVertical: 0,
    },
    // Login Btn Styles

    linearGradient: {
        width: '100%',
        borderRadius: 15,
    },

    loginText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '400',
    },
    forgotPassText: {
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
    },
    // footer
    footer: {
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    signupBtn: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    // utils
    wFull: {
        width: '100%',
        //marginTop: -12,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingTop: 12,
        //paddingBottom: 25,
    },

    mr7: {
        marginRight: 7,
    },
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },

    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    headerLeft: {
        flexDirection: 'column',
        paddingTop: 16,
        paddingBottom: 12,
        textAlign: 'center'
        //paddingLeft: 16,
    },
    footerButtonContainer: {
        flexDirection: 'column',
        paddingTop: 12,
        paddingBottom: 47,
        textAlign: 'center',
        alignItems: 'center'
        //paddingLeft: 16,
    },
    headerBlackText: {
        fontSize: 16,
        color: '#323232',
        fontWeight: '500',
        paddingBottom: 2
    },
    headerRedText: {
        fontSize: 12,
        color: '#D51E03',
    },

    footerBlackText: {
        fontSize: 12,
        color: '#000000',
        paddingBottom: 2,
    },
    footerRedText: {
        fontSize: 12,
        color: '#F91414',
        paddingBottom: 2,
        textDecorationLine: 'underline',
        textDecorationColor: '#F91414',
        textDecorationStyle: "double",
    },
    textBannerWhite: {
        color: '#323232',
        fontSize: 18,
        paddingLeft: 8,
        paddingTop: 4,
        fontWeight: 600
    },
    headerWhite: {
        height: 85,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        ...StyleSheet.absoluteFillObject,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    headerLeftWhite: {
        flexDirection: 'row',
        paddingVertical: 11,
        paddingHorizontal: 12,
        justifyContent: 'space-between'
    }
});


const status = [{ "id": "1", "name": "Tiềm năng" }, { "id": "2", "name": "Cần chăm sóc" }, { "id": "3", "name": "Dừng chăm sóc" }];
