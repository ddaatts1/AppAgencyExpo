

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
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import useCustomer from "../useCustomer";
import {useAuth} from "../../auth/AuthContext";
import LoadingReact from "../../../components/commons/loading";
import formatDate from '../../../components/formatDate';
import CommonMessageModal from '../../../components/commons/commonMessageModal';


const signUpValidationSchema = yup.object().shape({

    // fullNames: yup
    //     .string()
    //     .required('Đây là trường bắt buộc điền'),
    //
    // telephone: yup
    //     .string()
    //     .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Nhập số điện thoại hợp lệ')
    //     .required('Đây là trường bắt buộc điền'),
    // email: yup
    //     .string()
    //     .email('Vui lòng nhập email hợp lệ')
    //     .required('Đây là trường bắt buộc điền'),
    // active: yup
    //     .string()
    //     .required('Đây là trường bắt buộc điền'),
    // lession: yup
    //     .number()
    //     .required('Đây là trường bắt buộc điền'),
    // status: yup
    //     .string()
    //     .required('Đây là trường bắt buộc điền'),


});
const InformationCustomerDetails = ({route}:any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()
    const email = route?.params?.email
    const {futureLang} = useFutureLang()
    const {fetchCustomerDetail,customerData,isLoadingCustomerData,updateCustomer,updateCustomerData,isUpdatingCustomer} = useCustomer()

    useEffect(()=>{
        const data = {
            email: email,
            service: futureLang?SERVICE_FTL: SERVICE_KIDS,
            mode: 2
        }

        fetchCustomerDetail(data)

    },[])


    const { province, register, isIntroModel, setIntroModel } = useLogin()

    const [initialValues, setInitialValues] = useState({
        status: '',

    });
    const onIntro = async () => {
        setIntroModel(false)
        navigation.navigate(ROUTES.LOGIN, {
            id: 1
        })
    }
    async function onSubmit(value: any) {
        const data = {

            status_customer: value.status,
            email:email ,
            service: futureLang?SERVICE_FTL: SERVICE_KIDS,
            note_customer: value.note
        }
        console.log("data: "+ JSON.stringify(data))
        updateCustomer(data)


    }

    useEffect(()=>{

        if(updateCustomerData){
            if (updateCustomerData.status == 200){
                setIntroModel(true)
            }
        }

    },[updateCustomerData])
    useEffect(() => {


        const fetchData = async () => {
            const data = await province()
        }
        fetchData();
        console.log(customerData);

    }, [])

    const productOptions = customerData?.product?.map((product:any, index:any) => ({
        name: `${product.name}`,
        id: product.expired_date,
    }));
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedStatus,setSelectedStatus] = useState(null);



    return (

        <ScrollView style={styles.main}>
            <View style={styles.container}>
                {isLoadingCustomerData? <LoadingReact/>:                 <View style={styles.wFull}>
                    <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={initialValues}
                        onSubmit={values => onSubmit(values)}>
                        {({ handleSubmit, isValid, values, }) => (
                            <>
                                <Field

                                    iconLeft={<SVG.Icon_user />}
                                    isValid={true}
                                    component={CustomInputDetailsCustomer}
                                    name="fullNames"
                                    title="Họ và tên khách hàng"
                                    editable={false}
                                    value={customerData?.fullname}
                                />
                                <Field
                                    isValid={true}
                                    component={CustomInputDetailsCustomer}
                                    name="telephone"
                                    title="Số điện thoại"
                                    editable={false}
                                    value={customerData?.phone_number}
                                />
                                <Field
                                    isValid={true}
                                    component={CustomInputDetailsCustomer}
                                    name="email"
                                    title="Email"
                                    editable={false}
                                    value={customerData?.email}
                                />

                                {productOptions&&  <Field
                                    labelField="name"
                                    valueField="id"
                                    data={productOptions}
                                    setSelectedValue={setSelectedValue}
                                    isIcon={true}
                                    isValid={true}
                                    component={CustomDropdownDetailsCustomer}
                                    name="active"
                                    title="Gói kích hoạt"
                                    defaultItem="Nhấn vào để chọn"
                                    // defaultItem={datafake[0]}
                                    disable={false}

                                />}


                                <Field
                                    isValid={true}
                                    component={CustomInputDetailsCustomer}
                                    name="expireDate"
                                    title="Ngày hết hạn"
                                    editable={false}
                                    value={formatDate(selectedValue)}
                                />


                                <Field

                                    isValid={true}
                                    component={CustomInputDetailsCustomer}
                                    name="lession"
                                    title="Số buổi đã học"
                                    editable={false}
                                    value={customerData?.number_study == null? "0":customerData?.number_study.toString() }
                                />

                                {customerData&&   <Field
                                    labelField="name"
                                    valueField="id"
                                    data={status}
                                    isIcon={true}
                                    isValid={true}
                                    component={CustomDropdownDetailsCustomer}
                                    defaultItem={customerData?.status_customer - 1 >= 0 && customerData?.status_customer - 1 < status.length
                                        ? status[customerData?.status_customer - 1].name
                                        : 'Nhấn vào để chọn'
                                    }

                                    name="status"
                                    title="Trạng thái"
                                    setSelectedValue={setSelectedStatus}

                                />}





                                <Field
                                    //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                    isValid={true}
                                    component={CustomInputForNote}
                                    name="note"
                                    title="Ghi chú"
                                    isLabelBlue={true}
                                    value={customerData?.note_customer}
                                />



                                <View style={{ marginBottom: 43, marginTop: 12 }}>

                                    <TouchableOpacity

                                        onPress={()=>handleSubmit()}
                                        style={styles.loginBtn}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500 }}>Cập nhật</Text>
                                        </View>
                                    </TouchableOpacity>


                                    {/*<View style={{*/}
                                    {/*    flexDirection: 'row', paddingBottom: 16, paddingTop: 12,*/}
                                    {/*}}>*/}

                                    {/*    <Text style={[styles.textStyle, { fontSize: 16 }]}>Bạn đã có tài khoản?</Text>*/}
                                    {/*    <TouchableOpacity style={styles.textStyle} onPress={() => navigation.navigate(ROUTES.LOGIN)}>*/}
                                    {/*        <Text style={{ fontSize: 16, color: '#0288D1', fontWeight: "bold" }}>Đăng nhập ngay!</Text>*/}
                                    {/*    </TouchableOpacity>*/}

                                    {/*</View>*/}
                                </View>



                            </>
                        )}
                    </Formik>
                </View>
                }

                <CommonMessageModal
                    image={<View style={{alignSelf: 'center'}}>
                            <SVG.Icon_success style={{width: 162, height: 162}}></SVG.Icon_success>
                        </View>}
                    message={'Cập nhật thông tin thành công'}
                    buttonText={'Xác nhận'}
                    isIntroModel={isIntroModel}
                    setIntroModel={setIntroModel}
                />


            </View>
        </ScrollView>
    );
};

export default InformationCustomerDetails;


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
});
const datafake = [{ "id": "1", "name": "Học thử 1 tuần" }, { "id": "2", "name": "Học thử 1 tháng" }];


const status = [{ "id": "1", "name": "Tiềm năng" }, { "id":"2", "name": "Cần chăm sóc" }, { "id": "3", "name": "Dừng chăm sóc" }];
