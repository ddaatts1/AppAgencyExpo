import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ROUTES, SVG} from "../../../constants";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {Field, Formik} from "formik";
import CustomInput from "../../../components/commons/customInput";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import CommonButton from "../../../components/commons/commonButton";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import BoxShadow from "../../../components/commons/commonBoxShadow";
import useCustomer from "../useCustomer";
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import useCard from "../../card-warehouse/useCard";

const validationSchema = yup.object().shape({
    cardId: yup
        .string()
        .required('Đây là trường bắt buộc điền'),
});

const ContainsAccountDetails = (props: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const {name, phone, expiredAt, id, email} = props
    const {futureLang} = useFutureLang()
    const {activateCardCode, activateCardCodeData, isActivatingCardCode} = useCustomer()
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
    const [initialValues, setInitialValues] = useState({});
    const [cardCodeList, setCardCodeList] = useState([])
    const [cardCodeMap, setCardCodeMap] = useState(new Map());
    const [cardName, setCardName] = useState('')
//

    const [listTrialMappingId, setListTrialMappingId] = useState([])
    const [matchingMappingIdsList, setMatchingMappingIdsList] = useState([]);
    const [remainingDataCard, setRemainingDataCard] = useState([]);
    const [countCard, setCountcard] = useState(0)
    const [countTrialCard, setCountTrialCard] = useState(0)
    const [isLoading, setIsloading] = useState(true)
    const [exchangingIds,setExchangingIds] = useState()

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

    useEffect(()=>{

        if(matchingMappingIdsList && remainingDataCard &&exchangingIds){
            console.log("matchingMappingIdsList: "+ JSON.stringify(matchingMappingIdsList))
            console.log("remainingDataCard: "+ JSON.stringify(remainingDataCard))
            console.log("exchangingIds: "+ JSON.stringify(exchangingIds))
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




    },[matchingMappingIdsList,remainingDataCard,exchangingIds])

    useEffect(()=>{

        if(exchangeHistoryData){
            console.log("exchangeHistoryData: "+ JSON.stringify(exchangeHistoryData))
            const pendingIds = exchangeHistoryData.data
                .filter(item => item.status === "created")
                .map(item => item.cardIdOld.toString());

            const exchangingIdsToSet = pendingIds && pendingIds.length ? pendingIds : [-1];

            setExchangingIds(exchangingIdsToSet)
        }
    },[exchangeHistoryData])

    //
    useEffect(() => {
        fetchAllCard()
    }, [])


    // useEffect(() => {
    //
    //     if (listCard) {
    //         console.log("list card: " + JSON.stringify(listCard))
    //
    //         const newCardCodeMap = new Map();
    //         listCard.forEach((card: any) => {
    //             newCardCodeMap.set(card.mappingId.toString(), card.name);
    //         });
    //         setCardCodeMap(newCardCodeMap);
    //
    //         setCardCodeList(listCard?.map((c: any) => ({
    //             id: c.mappingId.toString(),
    //             name: c.name
    //         })))
    //     }
    // }, [listCard])

    useEffect(() => {
        console.log("cardCodeList: " + JSON.stringify(cardCodeList))
    }, [cardCodeList])

    async function onSubmit(value: any) {
        setCardName(cardCodeMap.get(value.cardId))
        const data = {
            cardId: value.cardId,
            studentId: id,
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS,
            note_customer:value.note
        }


        await activateCardCode(data)

    }

    useEffect(() => {

        if (activateCardCodeData) {
            console.log("activateCardCodeData: " + JSON.stringify(activateCardCodeData))

            if (activateCardCodeData?.status == 200) {
                //{"status":200,"data":{"cardcode":{"code":"7feo-c9wr-cb0u"}}}
                navigation.navigate(ROUTES.CUSTOMER_CREATE_ACCOUNT_RESULT, {
                    name: name,
                    phone: phone,
                    expiredAt: expiredAt,
                    cardCode: activateCardCodeData?.data?.cardcode?.code,
                    gmail: email,
                    cardName: cardName
                });

            } else {
                props.setIntroModel(true)
                props.setMessage(activateCardCodeData?.message)

            }
        }

    }, [activateCardCodeData])


    return (
        <View>
            <View style={{flex: 1, marginVertical: 16}}>
                <View style={styles.groupShadow}>
                    <BoxShadow title={'Họ tên'} content={name}></BoxShadow>
                    <BoxShadow title={'Số điện thoại'} content={phone}></BoxShadow>
                    <BoxShadow title={'Ngày hết hạn'} content={expiredAt}></BoxShadow>
                </View>
            </View>
            <Formik validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={values => onSubmit(values)}>
                {({handleSubmit, isValid, values,}) => (
                    <>
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
                        />}

                        <Field
                            //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                            isValid={true}
                            component={CustomInputForNote}
                            // isWhite={true}
                            toolTipText={"Hãy nhập lí do/ thông tin khách hàng của bạn vào phần ghi chú, để bạn có thể ghi nhớ được thông tin."}
                            name="note"
                            title="Ghi chú"
                        />

                        <View style={{marginTop: 85}}>
                            <CommonButton handleSubmit={() => {
                                handleSubmit()
                            }} text={'Kích hoạt'}/>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

export default ContainsAccountDetails;

const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#323232',
        fontSize: 14,
    },
    contentGroupShadow: {
        color: '#0288D1',
        fontSize: 18,
        fontWeight: '500'
    },
    groupShadow: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        //...StyleSheet.absoluteFillObject,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        paddingVertical: 11,
        paddingHorizontal: 12,
    },
    groupTextShadow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8
    }
});


