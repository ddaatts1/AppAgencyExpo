

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
    TextInput, ActivityIndicator,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { COLORS, ROUTES, SVG } from '../../../constants';
import CustomInput from '../../../components/commons/customInput';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import ModalPoup from '../../../components/commons/modalPoup';
import CustomSearchDropdown from '../../../components/commons/customSearchDropdown';
import useLogin from '../../../screens/auth/useLogin';
import CustomInputDetailsCustomer from "../../../components/commons/customInputDetailsCustomer";
import CustomDropdownDetailsCustomer from "../../../components/commons/customDropDownDetailsCustomer";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import Clipboard from "@react-native-community/clipboard";
import BoxIcon from "../../../components/commons/commonBoxIcon";
import useAgency from "../useAgency";
import Toast from "react-native-simple-toast";


const signUpValidationSchema = yup.object().shape({

    fullNames: yup
        .string()
        .required('Đây là trường bắt buộc điền'),

    telephone: yup
        .string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Nhập số điện thoại hợp lệ')
        .required('Đây là trường bắt buộc điền'),
    email: yup
        .string()
        .email('Vui lòng nhập email hợp lệ')
        .required('Đây là trường bắt buộc điền'),
    password: yup
        .string()
        .min(6, ({ min }) => `Mật khẩu yêu cầu độ dài 6 - 32 kí tự`)
        .required('Đây là trường bắt buộc điền'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
        .required('Đây là trường bắt buộc điền'),
    district: yup
        .string()
        .required('Đây là trường bắt buộc điền'),
    city: yup
        .string()
        .required('Đây là trường bắt buộc điền'),


});

const GroupCreate = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()

    const { province, register, isIntroModel, setIntroModel } = useLogin()
const [createError,setCreateError] = useState(false)
    const {createNewAgencyData,createNewAgencyLoading, createNewAgency} = useAgency()
    const [IsPhoneExist,setIsPhoneExist] = useState()
    const [IsEmailExist,setIsEmailExist] = useState()

    const [isLoading,setIsLoading] = useState(false)
    const onIntro = async () => {
        setIntroModel(false)
        navigation.navigate(ROUTES.LOGIN, {
            id: 1
        })
    }




    const [initialValues,setInitialValues] = useState({

    });


    useFocusEffect(
        useCallback(()=>{
            return () => {
                console.log("ahihih")
                setInitialValues({
                    fullNames: '',
                    telephone: '',
                    email: '',
                    city: '',
                    district: '',
                    password: '',
                    confirmPassword: '',
                })
            };
        },[])
    )

    async function onSubmit(value: any) {
        setIsLoading(true)
        const data = {
            fullname: value.fullNames,
            telephone: value.telephone,
            email: value.email,
            city: Number(value.city),
            district: Number(value.district),
            password: value.password,
            confirmPassword: value.confirmPassword,
            note: value.note,
        }

        console.log("data: "+ JSON.stringify(data))
       await createNewAgency(data)
        setIsLoading(false)
        // console.log("data to submit : "+ JSON.stringify(data))
    }




    useEffect(()=>{
        if(createNewAgencyData){
            console.log("createNewAgencyData: "+ JSON.stringify(createNewAgencyData))
            if(createNewAgencyData.status == 200){
                setIntroModel(true)
            }else if(createNewAgencyData.status == 400) {
                createNewAgencyData?.message?.telephone && (
                    setIsPhoneExist("Số điện thoại đã tồn tại"),
                        Toast.show("Số điện thoại đã tồn tại")
                );
                createNewAgencyData?.message?.email &&(
                    setIsEmailExist("Email đã tồn tại"),
                    Toast.show("Email đã tồn tại")
                )

            }else {
                Toast.show("Lỗi")
            }
        }
    },[createNewAgencyData])


    useEffect(() => {
        const fetchData = async () => {
            const data = await province()
        }
        fetchData()



    }, [])

    const onClipboard = async (item: string) => {
        return await Clipboard.setString(item);
    }

    return (

        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <Text style={styles.textLink}>Link giới thiệu</Text>
                    <View style={styles.inputLink}>
                        <View style={{paddingLeft: 12, justifyContent: 'center',}}>
                            <Text numberOfLines={1} style={{color: '#323232', fontSize: 14,}}>http://103.149.170.4:3001/register/67f9s3q</Text>
                        </View>
                        <TouchableOpacity onPress={() => onClipboard('http://103.149.170.4:3001/register/67f9s3q')}>
                            <View style={{ paddingRight: 8, justifyContent: 'center' }}>
                                <SVG.Icon_copy height={18} width={18} style={{color: '#323232'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Formik
                        key={Date.now()}
                        enableReinitialize
                        validationSchema={signUpValidationSchema}
                        initialValues={initialValues}
                        onSubmit={values => onSubmit(values)}>
                        {({ handleSubmit, isValid, values, }) => (
                            <>
                                <Field

                                    iconLeft={<SVG.Icon_user />}
                                    isValid={true}
                                    component={CustomInput}
                                    name="fullNames"
                                    title="Tên đại sứ"
                                />

                                <Field
                                    iconLeft={<SVG.Icon_mail />}
                                    isValid={true}
                                    component={CustomInput}
                                    name="email"
                                    title="Email"
                                    hasError={IsEmailExist}
                                    setIsExist={setIsEmailExist}
                                />

                                <Field
                                    iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                    isValid={true}
                                    component={CustomInput}
                                    name="telephone"
                                    title="Số điện thoại"
                                    isTypeNumber={true}
                                    hasError={IsPhoneExist}
                                    setIsExist={setIsPhoneExist}

                                />


                                <Field
                                    labelField="name"
                                    valueField="id"
                                    isIconLeft={true}
                                    iconLeft={<SVG.Icon_location />}
                                    value={values.city}
                                    data={dataCity}
                                    isIcon
                                    isValid={true}
                                    component={CustomSearchDropdown}
                                    name="city"
                                    title="Tỉnh/Thành phố đang sống"
                                />

                                <Field
                                    checlocation={true}
                                    backgroundColor='blue'
                                    labelField="name"
                                    valueField="id"
                                    isIconLeft={true}
                                    iconLeft={<SVG.Icon_location />}
                                    value={values.district}
                                    data={dataCountry}
                                    isIcon
                                    isValid={true}
                                    component={CustomSearchDropdown}
                                    name="district"
                                    title="Quận/Huyện đang sống"
                                />

                                <Field
                                    isIconRight={true}
                                    iconLeft={<SVG.Icon_key />}
                                    isValid={true}
                                    iconRight="eye"
                                    component={CustomInput}
                                    name="password"
                                    title="Mật khẩu"
                                />
                                <Field


                                    isIconRight={true}
                                    iconLeft={<SVG.Icon_key />}
                                    isValid={true}
                                    iconRight="eye"
                                    component={CustomInput}
                                    name="confirmPassword"
                                    title="Xác nhận mật khẩu"
                                />

                                <Field
                                    //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                    isValid={true}
                                    component={CustomInputForNote}
                                    name="note"
                                    title="Ghi chú"
                                />

                                <View style={{ marginBottom: 43, marginTop: 40 }}>

                                    <TouchableOpacity
                                        //onPress={handleSubmit}
                                        onPress={() => handleSubmit()}
                                        style={styles.loginBtn}>
                                        {createNewAgencyLoading? <Loading/>:        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500 }}>Tạo đại sứ</Text>
                                        </View> }

                                    </TouchableOpacity>

                                    <View style={styles.footerButtonContainer}>
                                        <Text style={styles.footerBlackText}>
                                            Lưu ý: Bằng việc đăng ký bạn đã đồng ý với tất cả các
                                        </Text>
                                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
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



                            </>
                        )}
                    </Formik>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ModalPoup visible={isIntroModel} closeIcon={true}>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.GROUP_LIST_ALL) }>
                            <View style={{alignSelf: 'flex-end'}}>
                                <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center'}}>
                            <SVG.Icon_success style={{maxWidth: 90, maxHeight: 90}}></SVG.Icon_success>
                        </View>
                        <Text style={{alignSelf: 'center', fontSize: 16, fontWeight: 600, color: '#03AA00'}}>Tạo mới đại sứ thành công!</Text>
                        <View style={{paddingVertical: 24, paddingHorizontal: 16}}>
                            <BoxIcon
                                child={<SVG.IconCirclePersonal></SVG.IconCirclePersonal>}
                                title={'Họ và tên'}
                                content={<Text style={styles.contentGroupShadow}>{createNewAgencyData&&createNewAgencyData?.data?.fullname}</Text>}
                                //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                            />
                            <BoxIcon
                                child={<SVG.IconCirclePhoneNumber></SVG.IconCirclePhoneNumber>}
                                title={'Số điện thoại'}
                                content={<Text style={styles.contentGroupShadow}>{createNewAgencyData&&createNewAgencyData?.data?.telephone}</Text>}
                                //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                            />
                            <BoxIcon
                                child={<SVG.IconCircleEmail></SVG.IconCircleEmail>}
                                title={'Email'}
                                content={<Text style={styles.contentGroupShadow}>{createNewAgencyData&&createNewAgencyData?.data?.email}</Text>}
                                //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.GROUP_LIST_ALL)}>
                            <View style={styles.btnOk}>
                                <Text style={styles.buttonText}>
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ModalPoup>

                    <ModalPoup visible={createError}>

                        <TouchableOpacity onPress={() => setCreateError(false)}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <SVG.Icon_close />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 16, textAlign: 'center', color: "#D51E03", fontWeight: "bold" }}>
                            có lỗi xãy ra
                        </Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', color: "#323232", paddingTop: 12 }}>
                            Vui lòng thử lại hoặc liên hệ admin để được hỗ trợ !
                        </Text>



                        <TouchableOpacity

                            onPress={() =>
                                setCreateError(false)

                            }

                            style={styles.Btn}>
                            <View style={{ flexDirection: "row", }}>

                                <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </ModalPoup>

                </View>


            </View>
        </ScrollView>
    );
};

export default GroupCreate;

export const Loading = ({type, color}: any) => (
    <View
        style={{
            height: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#ffffff" style={{height: 120}} />
    </View>
);
const styles = StyleSheet.create({

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
    loginBtn: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15
    },
    btnOk: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '65%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15
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
    textLink: {color: '#323232', fontSize: 14, paddingTop: 18,},
    inputLink: {
        borderRadius: 8,
        flexDirection: 'row',
        height: 40,
        backgroundColor: "#EEFAFF",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    contentGroupShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500, textAlign: 'center' },
});

const dataCity = [{ "id": "1", "name": "Thành phố Hà Nội" }, { "id": "2", "name": "Tỉnh Hà Giang" }, { "id": "4", "name": "Tỉnh Cao Bằng" }, { "id": "6", "name": "Tỉnh Bắc Kạn" }, { "id": "8", "name": "Tỉnh Tuyên Quang" }, { "id": "10", "name": "Tỉnh Lào Cai" }, { "id": "11", "name": "Tỉnh Điện Biên" }, { "id": "12", "name": "Tỉnh Lai Châu" }, { "id": "14", "name": "Tỉnh Sơn La" }, { "id": "15", "name": "Tỉnh Yên Bái" }, { "id": "17", "name": "Tỉnh Hòa Bình" }, { "id": "19", "name": "Tỉnh Thái Nguyên" }, { "id": "20", "name": "Tỉnh Lạng Sơn" }, { "id": "22", "name": "Tỉnh Quảng Ninh" }, { "id": "24", "name": "Tỉnh Bắc Giang" }, { "id": "25", "name": "Tỉnh Phú Thọ" }, { "id": "26", "name": "Tỉnh Vĩnh Phúc" }, { "id": "27", "name": "Tỉnh Bắc Ninh" }, { "id": "30", "name": "Tỉnh Hải Dương" }, { "id": "31", "name": "Thành phố Hải Phòng" }, { "id": "33", "name": "Tỉnh Hưng Yên" }, { "id": "34", "name": "Tỉnh Thái Bình" }, { "id": "35", "name": "Tỉnh Hà Nam" }, { "id": "36", "name": "Tỉnh Nam Định" }, { "id": "37", "name": "Tỉnh Ninh Bình" }, { "id": "38", "name": "Tỉnh Thanh Hóa" }, { "id": "40", "name": "Tỉnh Nghệ An" }, { "id": "42", "name": "Tỉnh Hà Tĩnh" }, { "id": "44", "name": "Tỉnh Quảng Bình" }, { "id": "45", "name": "Tỉnh Quảng Trị" }, { "id": "46", "name": "Tỉnh Thừa Thiên Huế" }, { "id": "48", "name": "Thành phố Đà Nẵng" }, { "id": "49", "name": "Tỉnh Quảng Nam" }, { "id": "51", "name": "Tỉnh Quảng Ngãi" }, { "id": "52", "name": "Tỉnh Bình Định" }, { "id": "54", "name": "Tỉnh Phú Yên" }, { "id": "56", "name": "Tỉnh Khánh Hòa" }, { "id": "58", "name": "Tỉnh Ninh Thuận" }, { "id": "60", "name": "Tỉnh Bình Thuận" }, { "id": "62", "name": "Tỉnh Kon Tum" }, { "id": "64", "name": "Tỉnh Gia Lai" }, { "id": "66", "name": "Tỉnh Đắk Lắk" }, { "id": "67", "name": "Tỉnh Đắk Nông" }, { "id": "68", "name": "Tỉnh Lâm Đồng" }, { "id": "70", "name": "Tỉnh Bình Phước" }, { "id": "72", "name": "Tỉnh Tây Ninh" }, { "id": "74", "name": "Tỉnh Bình Dương" }, { "id": "75", "name": "Tỉnh Đồng Nai" }, { "id": "77", "name": "Tỉnh Bà Rịa - Vũng Tàu" }, { "id": "79", "name": "Thành phố Hồ Chí Minh" }, { "id": "80", "name": "Tỉnh Long An" }, { "id": "82", "name": "Tỉnh Tiền Giang" }, { "id": "83", "name": "Tỉnh Bến Tre" }, { "id": "84", "name": "Tỉnh Trà Vinh" }, { "id": "86", "name": "Tỉnh Vĩnh Long" }, { "id": "87", "name": "Tỉnh Đồng Tháp" }, { "id": "89", "name": "Tỉnh An Giang" }, { "id": "91", "name": "Tỉnh Kiên Giang" }, { "id": "92", "name": "Thành phố Cần Thơ" }, { "id": "93", "name": "Tỉnh Hậu Giang" }, { "id": "94", "name": "Tỉnh Sóc Trăng" }, { "id": "95", "name": "Tỉnh Bạc Liêu" }, { "id": "96", "name": "Tỉnh Cà Mau" }];


const dataCountry = [{ "id": 1, "name": "Thành phố Hà Nội" }, { "id": 2, "name": "Tỉnh Hà Giang" }, { "id": 4, "name": "Tỉnh Cao Bằng" }, { "id": 6, "name": "Tỉnh Bắc Kạn" }, { "id": 8, "name": "Tỉnh Tuyên Quang" }, { "id": 10, "name": "Tỉnh Lào Cai" }, { "id": 11, "name": "Tỉnh Điện Biên" }, { "id": 12, "name": "Tỉnh Lai Châu" }, { "id": 14, "name": "Tỉnh Sơn La" }, { "id": 15, "name": "Tỉnh Yên Bái" }, { "id": 17, "name": "Tỉnh Hòa Bình" }, { "id": 19, "name": "Tỉnh Thái Nguyên" }, { "id": 20, "name": "Tỉnh Lạng Sơn" }, { "id": 22, "name": "Tỉnh Quảng Ninh" }, { "id": 24, "name": "Tỉnh Bắc Giang" }, { "id": 25, "name": "Tỉnh Phú Thọ" }, { "id": 26, "name": "Tỉnh Vĩnh Phúc" }, { "id": 27, "name": "Tỉnh Bắc Ninh" }, { "id": 30, "name": "Tỉnh Hải Dương" }, { "id": 31, "name": "Thành phố Hải Phòng" }, { "id": 33, "name": "Tỉnh Hưng Yên" }, { "id": 34, "name": "Tỉnh Thái Bình" }, { "id": 35, "name": "Tỉnh Hà Nam" }, { "id": 36, "name": "Tỉnh Nam Định" }, { "id": 37, "name": "Tỉnh Ninh Bình" }, { "id": 38, "name": "Tỉnh Thanh Hóa" }, { "id": 40, "name": "Tỉnh Nghệ An" }, { "id": 42, "name": "Tỉnh Hà Tĩnh" }, { "id": 44, "name": "Tỉnh Quảng Bình" }, { "id": 45, "name": "Tỉnh Quảng Trị" }, { "id": 46, "name": "Tỉnh Thừa Thiên Huế" }, { "id": 48, "name": "Thành phố Đà Nẵng" }, { "id": 49, "name": "Tỉnh Quảng Nam" }, { "id": 51, "name": "Tỉnh Quảng Ngãi" }, { "id": 52, "name": "Tỉnh Bình Định" }, { "id": 54, "name": "Tỉnh Phú Yên" }, { "id": 56, "name": "Tỉnh Khánh Hòa" }, { "id": 58, "name": "Tỉnh Ninh Thuận" }, { "id": 60, "name": "Tỉnh Bình Thuận" }, { "id": 62, "name": "Tỉnh Kon Tum" }, { "id": 64, "name": "Tỉnh Gia Lai" }, { "id": 66, "name": "Tỉnh Đắk Lắk" }, { "id": 67, "name": "Tỉnh Đắk Nông" }, { "id": 68, "name": "Tỉnh Lâm Đồng" }, { "id": 70, "name": "Tỉnh Bình Phước" }, { "id": 72, "name": "Tỉnh Tây Ninh" }, { "id": 74, "name": "Tỉnh Bình Dương" }, { "id": 75, "name": "Tỉnh Đồng Nai" }, { "id": 77, "name": "Tỉnh Bà Rịa - Vũng Tàu" }, { "id": 79, "name": "Thành phố Hồ Chí Minh" }, { "id": 80, "name": "Tỉnh Long An" }, { "id": 82, "name": "Tỉnh Tiền Giang" }, { "id": 83, "name": "Tỉnh Bến Tre" }, { "id": 84, "name": "Tỉnh Trà Vinh" }, { "id": 86, "name": "Tỉnh Vĩnh Long" }, { "id": 87, "name": "Tỉnh Đồng Tháp" }, { "id": 89, "name": "Tỉnh An Giang" }, { "id": 91, "name": "Tỉnh Kiên Giang" }, { "id": 92, "name": "Thành phố Cần Thơ" }, { "id": 93, "name": "Tỉnh Hậu Giang" }, { "id": 94, "name": "Tỉnh Sóc Trăng" }, { "id": 95, "name": "Tỉnh Bạc Liêu" }, { "id": 96, "name": "Tỉnh Cà Mau" }];

