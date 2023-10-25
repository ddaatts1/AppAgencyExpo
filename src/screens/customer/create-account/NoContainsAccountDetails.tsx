import {Field, Formik} from "formik";
import {ROUTES, SVG} from "../../../constants";
import CustomInput from "../../../components/commons/customInput";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import useCustomer from "../useCustomer";
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import useCard from "../../card-warehouse/useCard";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Loading} from "../../group/group-create/GroupCreate";

const signUpValidationSchema = yup.object().shape({

    fullNames: yup
        .string()
        .required('Đây là trường bắt buộc điền'),

    // telephone: yup
    //     .string()
    //     .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Nhập số điện thoại hợp lệ')
    //     .required('Đây là trường bắt buộc điền'),
    email: yup
        .string()
        .email('Vui lòng nhập email hợp lệ')
        .required('Đây là trường bắt buộc điền'),
    cardId: yup
        .string()
        .required('Đây là trường bắt buộc điền'),
    password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(32, 'Mật khẩu không được vượt quá 32 ký tự')
        .required('Đây là trường bắt buộc điền'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Đây là trường bắt buộc điền'),


});

const NoContainsAccountDetails = (props: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const {setIntroModel, setMessage} = props
    const {registerCustomer, registerCustomerData, isRegisteringCustomer} = useCustomer()
    const {futureLang} = useFutureLang()
    const {
        fetchAllCard,
        listCard,
        fetchingListTrial,
        lisTrialData,
        fetchStudentCard,
        studentCardData,
        fetchListCardInfo,
        listcardInfo,
        fetchExchangeHistory,
        exchangeHistoryData
    } = useCard()
    const [cardCodeList, setCardCodeList] = useState([])
    const [cardCodeMap, setCardCodeMap] = useState(new Map());
    const [cardName, setCardName] = useState('')


    const [initialValues, setInitialValues] = useState({
        cardId: '',
        fullNames: '',
        telephone: '',
        email: '',
        password: '',
        service: ''

    });
//
    const [listTrialMappingId, setListTrialMappingId] = useState([])
    const [matchingMappingIdsList, setMatchingMappingIdsList] = useState([]);
    const [remainingDataCard, setRemainingDataCard] = useState([]);
    const [countCard, setCountcard] = useState(0)
    const [countTrialCard, setCountTrialCard] = useState(0)
    const [isLoading, setIsloading] = useState(true)
    const [exchangingIds, setExchangingIds] = useState()
    const [emailEror, setEmailEror] = useState()

    useEffect(() => {

        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }

        const fetchData = () => {
            fetchStudentCard("", 0, 0, 0, 1, data)
            fetchingListTrial(data)
            fetchExchangeHistory(data)
        }

        fetchData()
    }, [])


    useEffect(() => {

        if (lisTrialData.length > 0) {
            const mappingIds: number[] = lisTrialData.map(item => item.mappingId);
            setListTrialMappingId(mappingIds)
        }
    }, [lisTrialData])

    useEffect(() => {


        if (studentCardData) {
            const matchingMappingIds = studentCardData?.data.dataCard.filter(item => listTrialMappingId.includes(item.mappingId));
            const remainingCardInfo = studentCardData?.data.dataCard.filter(item => !listTrialMappingId.includes(item.mappingId));

            const countCard = remainingCardInfo.reduce((total, item) => total + item.total_card_cb, 0);
            const countTrialCard = matchingMappingIds.reduce((total, item) => total + item.total_card_cb, 0);

            setCountcard(countCard)
            setCountTrialCard(countTrialCard)

            setMatchingMappingIdsList(matchingMappingIds);
            setRemainingDataCard(remainingCardInfo);
            setIsloading(false)

        }
    }, [listcardInfo, listTrialMappingId, studentCardData]);

    useEffect(() => {

        if (matchingMappingIdsList && remainingDataCard && exchangingIds) {
            // console.log("matchingMappingIdsList: "+ JSON.stringify(matchingMappingIdsList))
            // console.log("remainingDataCard: "+ JSON.stringify(remainingDataCard))
            // console.log("exchangingIds: "+ JSON.stringify(exchangingIds))
            const mergedList = matchingMappingIdsList.map(item => ({
                id: item.mappingId.toString(),
                name: item.name
            })).concat(remainingDataCard.map(item => ({
                id: item.mappingId.toString(),
                name: item.name
            })));

            const filteredMergedList = mergedList.filter(item => !exchangingIds.includes(item.id));

            setCardCodeList(filteredMergedList);
            // setCardCodeList(mergedList);

        }

    }, [matchingMappingIdsList, remainingDataCard, exchangingIds])

    useEffect(() => {

        if (exchangeHistoryData) {
            // console.log("exchangeHistoryData: "+ JSON.stringify(exchangeHistoryData))
            const pendingIds = exchangeHistoryData.data
                .filter(item => item.status === "created")
                .map(item => item.cardIdOld.toString());

            const exchangingIdsToSet = pendingIds && pendingIds.length ? pendingIds : [-1];

            setExchangingIds(exchangingIdsToSet)
        }
    }, [exchangeHistoryData])
    //


    useEffect(() => {
        fetchAllCard()
    }, [])


    // useEffect(()=>{
    //
    //     if(listCard){
    //         console.log("list card: "+ JSON.stringify(listCard))
    //
    //         const newCardCodeMap = new Map();
    //         listCard.forEach((card:any) => {
    //             newCardCodeMap.set(card.mappingId.toString(), card.name);
    //         });
    //         setCardCodeMap(newCardCodeMap);
    //
    //         setCardCodeList(listCard?.map((c:any)=>({
    //             id:c.mappingId.toString(),
    //             name:c.name
    //         })))
    //     }
    // },[listCard])

    async function onSubmit(value: any) {

        setCardName(cardCodeMap.get(value.cardId))
        const data = {
            cardId: value.cardId,
            email: value.email,
            fullname: value.fullNames,
            password: value.password,
            telephone: props.telephone,
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS,
            note_customer:value.note

        }
        console.log("data to submit : " + JSON.stringify(data))

        await registerCustomer(data)
    }

    useEffect(() => {
        console.log("cardCodeList: " + JSON.stringify(cardCodeList))
    }, [cardCodeList])

    useEffect(() => {
        if (registerCustomerData) {
            console.log("registerCustomerData: " + JSON.stringify(registerCustomerData))

            if (registerCustomerData.status == 200) {

                // {"status":200,"data":{"cardcode":{"code":"drxj-tlz6-y83j"},"student":{"email":"ddjj@gmail.com","fullname":"Do tiej dat","id"
                // :442679,"telephone":"0999999998"}}}

                navigation.navigate(ROUTES.CUSTOMER_CREATE_ACCOUNT_RESULT, {
                    name: registerCustomerData?.data?.student?.fullname,
                    phone: registerCustomerData?.data?.student?.telephone,
                    expiredAt: "",
                    cardCode: registerCustomerData?.data?.cardcode?.code,
                    gmail: registerCustomerData?.data?.student?.email,
                    cardName: cardName
                });
            } else {
                if (registerCustomerData?.message?.email) {
                    const emailError = registerCustomerData?.message?.email[0];
                    setEmailEror(emailError);
                } else {
                    setEmailEror(null)
                    props.setIntroModel(true)
                    props.setMessage(registerCustomerData?.message?.cardId?.[0] || 'Có lỗi trong quá trình xử lý! Vui lòng thử lại')
                }

            }
        }
    }, [registerCustomerData])

    return (
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}>
            {({handleSubmit, isValid, values,}) => (
                <>
                    <Field

                        iconLeft={<SVG.Icon_user/>}
                        isValid={true}
                        component={CustomInput}
                        name="fullNames"
                        title="Họ tên"
                    />
                    <Field
                        iconLeft={<SVG.Icon_mail/>}
                        isValid={true}
                        component={CustomInput}
                        name="email"
                        title="Email"
                        hasError={emailEror}
                    />
                    <Field
                        iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}}/>}
                        isValid={true}
                        component={CustomInput}
                        name="telephone"
                        title="Số điện thoại"
                        placeHolder={props.telephone}
                        editable={false}
                    />
                    {cardCodeList.length > 0 && <Field
                        iconLeft={<SVG.IconIndenfifier style={{color: '#1E88E5'}}/>}
                        labelField="name"
                        valueField="id"
                        isIconLeft={true}
                        data={cardCodeList}
                        isIcon
                        isValid={true}
                        component={CustomSearchDropdown}
                        name="cardId"
                        title="Mã thẻ"
                    />

                    }

                    <Field
                        isIconRight={true}
                        iconLeft={<SVG.Icon_key/>}
                        isValid={true}
                        iconRight="eye"
                        component={CustomInput}
                        name="password"
                        title="Mật khẩu"
                    />
                    <Field
                        isIconRight={true}
                        iconLeft={<SVG.Icon_key/>}
                        isValid={true}
                        iconRight="eye"
                        component={CustomInput}
                        name="confirmPassword"
                        title="Nhập lại mật khẩu"
                    />

                    <Field
                        //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                        isValid={true}
                        component={CustomInputForNote}
                        // isWhite={true}
                        name="note"
                        title="Ghi chú"
                    />

                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate(ROUTES.CUSTOMER_CREATE_ACCOUNT)}
                            style={styles.buttonCancel}>
                            <Text style={styles.buttonCancelText}>Hủy bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleSubmit()
                        }} style={styles.buttonRegister}>
                            {isRegisteringCustomer? <Loading/>:<Text style={styles.buttonRegisterText}>Đăng ký</Text> }

                        </TouchableOpacity>
                    </View>


                </>
            )}
        </Formik>
    );
}

export default NoContainsAccountDetails;


const styles = StyleSheet.create({
    buttonCancel: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '49%',
        height: 50,
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        marginRight: 4
    },
    buttonRegister: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '49%',
        height: 50,
        backgroundColor: '#0288D1',
        borderRadius: 12,
        marginLeft: 4
    },
    buttonRegisterText: {
        color: '#FFFFFF',
        fontSize: 16,
        //paddingLeft: 10,
        fontWeight: 500
    },
    buttonCancelText: {
        color: '#0288D1',
        fontSize: 16,
        //paddingLeft: 10,
        fontWeight: 500
    },
    containerButton: {
        marginTop: 40,
        flexDirection: "row"
    },
});


