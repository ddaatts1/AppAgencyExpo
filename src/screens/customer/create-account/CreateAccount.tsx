import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Field, Formik} from "formik";
import {ROUTES, SVG} from "../../../constants";
import CustomInputDetailsCustomer from "../../../components/commons/customInputDetailsCustomer";
import CustomDropdownDetailsCustomer from "../../../components/commons/customDropDownDetailsCustomer";
import CustomInput from "../../../components/commons/customInput";
import * as yup from "yup";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import useCustomer from "../useCustomer";
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import InputCardNumber from "../../../components/card-warehouse/InputCardNumber";

const signUpValidationSchema = yup.object().shape({
    telephone: yup
        .string()
        .matches(/^0[0-9]{7,11}$/, 'Nhập số điện thoại hợp lệ')
        .required('Đây là trường bắt buộc điền'),
});


const CreateAccount = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()
    const  {checkCustomerExists,customerExistsData,isCheckingCustomerExists} = useCustomer()
    const {futureLang} = useFutureLang()
    const [initialValues, setInitialValues] = useState({
        telephone: '',
    });

    const [telephone,setTelephone] = useState()
    async function onSubmit(value: any) {
        const data = {
            telephone: value.telephone,
            service: futureLang? SERVICE_FTL: SERVICE_KIDS
        }
        setTelephone(value.telephone)
        await checkCustomerExists(data);
    }

    useEffect(()=>{

        if (customerExistsData?.status ==200){
            if(Array.isArray(customerExistsData.data) ){
                console.log("======> chua dang ky: "+ JSON.stringify(customerExistsData))
                navigation.navigate(ROUTES.CUSTOMER_CREATE_ACCOUNT_DETAILS, {isCreatedAccount: false,telephone: telephone})

            }else {
                console.log("======> da dang ky: "+ JSON.stringify(customerExistsData))
                navigation.navigate(ROUTES.CUSTOMER_CREATE_ACCOUNT_DETAILS, {isCreatedAccount: true,
                name: customerExistsData?.data?.student?.fullname,
                    phone: customerExistsData?.data?.student?.telephone,
                    expiredAt: customerExistsData?.data?.scc?.expireAt,
                    id: customerExistsData?.data?.student?.id,
                    email: customerExistsData?.data?.student?.email
                },)

            }


        }
    },[customerExistsData])

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={{flex: 1}}>
                        <View style={styles.headerLeft}>
                            <View>
                                <SVG.IconCustomerCreateAccount style={styles.iconLef}/>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={styles.headerText}>
                                    Đăng ký tài khoản khách hàng
                                </Text>
                            </View>
                        </View>

                    </View>
                    <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={initialValues}
                        onSubmit={values =>onSubmit(values) }>
                        {({ handleSubmit, isValid, values, }) => (
                            <>
                                <Field

                                    iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                    isValid={false}
                                    component={InputCardNumber}
                                    name="telephone"
                                    title="Số điện thoại khách hàng"
                                    isTypeNumber={true}
                                    iconRight={false}
                                    numberOnly={true}

                                />

                                <View style={{ marginTop: 100 }}>

                                    <TouchableOpacity

                                        onPress={()=>{handleSubmit()}}
                                        style={styles.loginBtn}>
                                        <View style={{ flexDirection: "row", }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500 }}>Kiểm tra</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>



                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </ScrollView>
    );
};

export default CreateAccount;

const styles = StyleSheet.create({
    main: {
        height: "100%",
        backgroundColor: 'white'
    },
    container: {
        width: '100%',
    },
    wFull: {
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingTop: 12,
        //paddingBottom: 25,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#0288D1',
        borderRadius: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 12
        //paddingLeft: 16,
    },
    headerText: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '600',
        paddingLeft: 10,
        paddingBottom: 2
    },
    iconLef: {
        width: 24,
        height: 24,
        color: '#0288D1'
    },
});
