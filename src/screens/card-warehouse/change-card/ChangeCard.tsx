import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import ItemChage from '../../../components/card-warehouse/itemChage';
import {Field, Formik} from 'formik';
import CustomSearchCustomer from '../../../components/commons/customSearchCustomer';
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import InputCard from '../../../components/card-warehouse/InputCard';
import DropdownCard from '../../../components/card-warehouse/dropdownCard';
import {SVG} from '../../../constants';
import {EnumHistory} from '../../../constants/enum';
import ModalPoup from '../../../components/commons/modalPoup';
import useCard from "../useCard";
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import LoadingReact from "../../../components/commons/loading";
import {statusMappings} from "../../../constants/changeCardStatus";
import {set} from "react-hook-form";
import generateSignedQueryString from "./generateSignedQueryString";
import InputCardNumber from "../../../components/card-warehouse/InputCardNumber";
import * as yup from "yup";
import formatPriceVND, {formatMoneyTransfer} from "../../group/formatMoney";
import {isChecked} from "react-native-paper/lib/typescript/src/components/RadioButton/utils";
import convertToGMT7 from "../../../components/convertToGMT7";
import convert from "lodash/fp/convert";

const validate = yup.object().shape({
    quantity: yup
        .string()
        .matches(/^\d+$/, 'Nhập số lượng hợp lệ')
        .required('Đây là trường bắt buộc điền'),


});
const ChangeCard = ({navigation, route}: any) => {

    const [receiveCardOption, setReceiveCardOption] = useState([])
    const [availableCard, setAvailableCard] = useState([])
    const [hashMap, setHashMap] = useState();
    const {futureLang} = useFutureLang()
    const {
        fetchExchangeHistory,
        exchangeHistoryData,
        fetchAllCard,
        fetchStudentCard,
        studentCardData,
        fetchListCardInfo,
        listcardInfo,
        fetchMyAccount,
        myAccountData,
        changeCardCodeAction,
        changeCardCodeData
    } = useCard()

    const [isChecked,setIsCheck] = useState(true)
    const [cardInfo, setCardInfo] = useState([])
    const [confirmModal, setConfirmModal] = useState(false)
    const [confirmModalError, setConfirmModalError] = useState(false)
    const [balance, setBalance] = useState(-1)
    const [agencyId, setAgencyId] = useState(-1)
    const [confirm, setConfirm] = useState(false)
    const [cardNewName, setCardNewname] = useState("")
    const [isloading, setIsloading] = useState(true)
    const [onCheck, setOncheck] = useState(false)
    const [checkComment, setCheckComment] = useState("")
    const [responseMessage, setResponseMessage] = useState("")
    const [responseStatus, setResponseStatus] = useState()
    const [selectedItem,setSelectedItem] = useState(null)
    const [submitData, setSubmitData] = useState({
        cardIdOld: 0,
        quanlityOld: 0,
        cardIdNew: 0,
        quanlityNew: 0,
        agencyId: 0,
        balance: 0,
        service: ""
    })



    const itemRow = (data: any, index: any) => {
        return (
            <View key={index} style={[{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12
            }, index != 0 && {borderTopColor: "#EEFAFF", borderTopWidth: 1}]}>
                <View style={{flexDirection: "row", paddingLeft: 12}}><Text
                    style={{fontSize: 14, color: "#323232"}}>{data.label.split("-")[0].trim()}</Text><Text style={{
                    fontSize: 14,
                    color: "#323232",
                    fontWeight: "bold",
                    fontStyle: 'italic'
                }}> {formatPriceVND(data.price)}</Text></View>
                <Text style={{
                    fontSize: 16,
                    color: "#0288D1",
                    fontWeight: "bold",
                    paddingRight: 12
                }}>{data.notExposedSum} thẻ</Text>
            </View>
        )
    }
    const itemHistory = (data: any, index: any, text: String) => {
        return (
            <View style={{flexDirection: "row", paddingHorizontal: 6, paddingVertical: 12}}>

                <View
                    style={[{
                        width: 10,
                        height: 10,
                        borderRadius: 15
                    }, index == EnumHistory.Complete ? styles.CompleteColor : index == EnumHistory.Waiting ? styles.WaitingColor : styles.CanceledColor]}>
                    <View style={{
                        backgroundColor: "#C2C2C2",
                        height: 110,
                        width: 1,
                        marginLeft: 4,
                        marginTop: 10
                    }}></View>
                </View>

                <View style={[{
                    height: 120,
                    width: "94%",
                    marginLeft: 12,
                    borderRadius: 16,
                    paddingLeft: 12
                }, index == EnumHistory.Complete ? styles.CompleteColorTranform : index == EnumHistory.Waiting ? styles.WaitingColorTranform : styles.CanceledColorTranform]}>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row", paddingTop: 6, alignItems: "center"}}>
                            <SVG.Icon_time></SVG.Icon_time>

                            <Text style={{fontSize: 16, color: "#323232"}}>  {convertToGMT7(data.updatedAt)}</Text>
                            {/*20:00  09/05/2023*/}
                        </View>

                        <View style={styles.containerButton}>
                            <View
                                style={[styles.btn, index == EnumHistory.Complete ? styles.CompleteColor : index == EnumHistory.Waiting ? styles.WaitingColor : styles.CanceledColor]}>
                                <Text style={styles.btnText}>{text}</Text>
                            </View>

                        </View>
                    </View>

                    <Text style={{fontSize: 16, color: "#323232", paddingTop: 12}}> Đổi từ
                        thẻ: {data.cardOld.name} - {data.cardOld.quantity} thẻ</Text>
                    <Text style={{fontSize: 16, color: "#323232"}}> Sang
                        thẻ: {data.cardNew.name} - {data.cardNew.quantity} thẻ</Text>
                    <Text style={{fontSize: 16, color: "#323232"}}> Ví còn dư sau đổi: {formatPriceVND(data.balance)}</Text>
                </View>

            </View>
        )
    }

    const onSubmit = () => {
        setConfirm(true)
        setIsCheck(false)
    }


    const exchange = async () => {

        const data = {
            ...submitData,
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
            , agencyId: agencyId
        }

        const signedQueryString = generateSignedQueryString(data);
        const body: any = {...data, sign: signedQueryString}
        // // console.log("final data to submit : "+JSON.stringify({...data,sign:signedQueryString}))
        // // console.log("signedQueryString: "+ signedQueryString)
        changeCardCodeAction(body)
    }


    const check = (value: any) => {

        // console.log("availableCard:  " + value.availableCard)
        // console.log("receiveCard:  " + value.receiveCard)
        // console.log("quantity: " + value.quantity)
        const card = availableCard.find(card => card.value === value.availableCard);

        // console.log("available card quantity: " + JSON.stringify(card.quantity))


        if (value.availableCard == undefined || value.receiveCard == undefined || value.quantity == undefined) {
            setCheckComment("Hãy chọn thẻ và số lượng muốn đổi")
            return
        }
        if (value.quantity > card.notExposedSum) {
            setCheckComment("Số lượng thể không đủ")
            return
        }
        if (value.receiveCard == value.availableCard) {
            setCheckComment("Loại thẻ trùng nhau")
            return
        }
        // const entry = hashMap[314];
        // console.log(`MappingId: ${314}, Name: ${entry.name}, Value: ${entry.value}`);
        console.log("balance: " + balance)
        console.log("value: " + JSON.stringify(value)) // value: {"availableCard":"6","quantity":"4","receiveCard":"12"}

        const cardOld = hashMap[value.availableCard];
        const cardNew = hashMap[value.receiveCard]
        const balanceFromCard = cardOld?.price * value.quantity
        // // console.log(`MappingId: ${314}, Name: ${entry.name}, Value: ${entry.value}`);
        // console.log("cardOld: " + cardOld?.name + " | " + cardOld?.price)
        // console.log("cardNew: " + cardNew?.name + " | " + cardNew?.price)
        setCardNewname(cardNew?.name)

        const newQuantity: number = Math.floor(balanceFromCard / cardNew?.price);

        if (newQuantity === 0) {
            const newq: number = Math.floor((balanceFromCard + balance) / cardNew?.price);
            if (newq === 0) {
                setCheckComment("Không đủ điều kiện để đổi sang loại thẻ này, vui lòng chọn loại thẻ khác")

            }
            const newbalance = cardNew.price * newq - balanceFromCard

            if (newq > 0) {
                setSubmitData({
                    ...submitData, cardIdOld: value.availableCard
                    , cardIdNew: value.receiveCard
                    , quanlityOld: value.quantity,
                    quanlityNew: newq
                    , balance: -1 * newbalance

                })
                setCheckComment(`Bạn nhận được ${newq} thẻ ${cardNew?.name}`)
                onSubmit()

            }
        } else {
            const newbalance = balanceFromCard - newQuantity * cardNew.price
            setSubmitData({
                ...submitData, cardIdOld: value.availableCard
                , cardIdNew: value.receiveCard
                , quanlityOld: value.quantity, quanlityNew: newQuantity, balance: newbalance
            })
            setCheckComment(`Bạn nhận được ${newQuantity} thẻ ${cardNew?.name}`)

            onSubmit()
        }

    }


    useEffect(() => {

        if (changeCardCodeData) {
            if (changeCardCodeData.status == 400) {
                setConfirmModalError(true)
            } else {
                setConfirmModal(true)
            }
            // // console.log("changeCardCodeData: "+ JSON.stringify(changeCardCodeData.message))
            setResponseMessage(changeCardCodeData.message)
        }


    }, [changeCardCodeData])

    // fetching data
    useEffect(() => {


        // // console.log("services: "+ futureLang? SERVICE_FTL: SERVICE_KIDS)
        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }

        const fetchingData = async (data: any) => {
            fetchExchangeHistory(data)
            fetchAllCard()
            fetchStudentCard("", 0, 0, 0, 1000, data)
            //             fetchStudentCard("", 0,cardid,page,limit,data)
            fetchMyAccount()

            const type0Info: object[] = await fetchListCardInfo({type: '0', ...data});
            const type1Info: object[] = await fetchListCardInfo({type: '1', ...data});

            // Merge the two arrays
            const mergedInfo = [...type0Info, ...type1Info];
            setCardInfo(mergedInfo);
        }

        fetchingData(data)
    }, [])


    useEffect(() => {

        // // console.log("card info: "+ JSON.stringify(cardInfo))
        const transformedArray = cardInfo.map(item => ({
            label: item.name + " - " + formatPriceVND(item.value),
            value: item.mappingId.toString()
        }));

        setReceiveCardOption(transformedArray)

        const mappingHashmap: { [key: number]: { name: string; price: number } } = {};

        // // console.log("cardInfo: "+ JSON.stringify(cardInfo))
        cardInfo.forEach((item) => {
            mappingHashmap[item.mappingId] = {
                name: item.name,
                price: item.value
            };
        });

        setHashMap(mappingHashmap)
        // // console.log("mappingHashmap: "+JSON.stringify( mappingHashmap));

        // const entry = hashMap[314];
        // // console.log(`MappingId: ${314}, Name: ${entry.name}, Value: ${entry.value}`);

    }, [cardInfo])


    useEffect(() => {
        console.log("studentCardData: "+ JSON.stringify(studentCardData))

        if (hashMap) {
            if (studentCardData?.data?.dataCard && Object.keys(hashMap).length > 0) {
                const updatedAvailableCard = studentCardData.data.dataCard.map(c => {
                    const mappingId = c.mappingId;
                    const price = hashMap[mappingId]?.price;

                    if (price !== undefined) {
                        const cardDetails = studentCardData.data.dataImport.filter(d => d.cardId === c.mappingId);
                        const notExposedSum = cardDetails.reduce((sum, d) =>{
                            if(d.cardId == 318){
                                console.log("name: "+ c.name)
                                console.log("=====> used: "+ d.used+"| isExposed: "+ d.isExposed)
                            }

                            return  sum + (d.isExposed === 0 && d.used === 0 ? 1 : 0)}, 0);

                        return {
                            label: `${c.name} - ${formatPriceVND(price)}`,
                            value: mappingId.toString(),
                            quantity: c.total_card_cb,
                            price: price,
                            notExposedSum: notExposedSum
                        };
                    } else {
                        return null;
                    }
                });
                setAvailableCard(updatedAvailableCard.filter(card => card !== null));
                setIsloading(false)
            }

            const entry = hashMap[11];
        }
    }, [hashMap, studentCardData]);


    useEffect(() => {
        futureLang ? setBalance(myAccountData?.available_limit) : setBalance(myAccountData?.available_kids)
        setAgencyId(myAccountData?.id)
    }, [myAccountData])


    useEffect(()=>{

        if(exchangeHistoryData){
            console.log("exchangeHistoryData: "+ JSON.stringify(exchangeHistoryData))
        }
    },[exchangeHistoryData])


    const sortedExchangeHistory = exchangeHistoryData?.data.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        return dateB - dateA; // Descending order (latest first)
    });
    const validateQuantity = (value) => {

        if(!selectedItem){
            return 'Bạn cần chọn loại thẻ muốn đổi';
        }
        if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
            return 'Số lượng phải là một số nguyên dương.';
        }

        if(parseInt(value) > selectedItem.notExposedSum){
            return `Số thẻ của bạn là ${selectedItem.notExposedSum}, vui lòng kiểm tra lại ! `
        }
        return undefined;
    };


    return (
        <ScrollView>
            {isloading && <LoadingReact/>}
            <View style={styles.container}>

                <Text style={{
                    color: '#323232',
                    fontSize: 18,
                    paddingVertical: 12,
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                }}>Thẻ khả dụng</Text>

                {availableCard.length > 0 && <ItemChage color={"#0288D1"}>
                    {availableCard.map((data, index) => {
                        if (data.notExposedSum > 0) {
                            return (itemRow(data, index))
                        }

                    })}
                </ItemChage>}

                <Text style={{
                    color: '#323232',
                    fontSize: 18,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    fontWeight: 'bold',
                }}>Điểm khả dụng: <Text style={{fontWeight: 'bold', color: '#0288D1',}}>{balance}</Text></Text>

                <ItemChage color={"#0288D1"}>

                    <View style={{padding: 12}}>
                        <Formik
                            // validationSchema={validate}
                            initialValues={{
                                // username: '',
                                // password: '',
                                // confirmPassword: '',
                            }}
                            onSubmit={values => check(values)}
                        >
                            {({handleSubmit, isValid, values}) => (
                                <>

                                    {availableCard.length > 0 && (
                                        <Field
                                            component={DropdownCard}
                                            data={availableCard.filter(a => a.notExposedSum > 0)}
                                            title="Bước 1: Chọn loại thẻ muốn đổi"
                                            titleSelect="Chọn thẻ"
                                            labelField="label"
                                            valueField="value"
                                            name="availableCard"
                                            setSelectedItem={setSelectedItem}
                                        />
                                    )}


                                    <Field
                                        component={InputCardNumber}
                                        //isValid={true}
                                        name="quantity"
                                        title="Bước 2: Số lượng muốn đổi"
                                        validate={validateQuantity}
                                        numberOnly={true}
                                        iconRight={false}

                                    />

                                    {receiveCardOption.length > 0 && <Field
                                        component={DropdownCard}
                                        data={receiveCardOption}
                                        title="Bước 3: Chọn loại thẻ muốn nhận"
                                        titleSelect="Chọn thẻ"
                                        labelField="label"
                                        valueField="value"
                                        name="receiveCard"
                                        //isValid={true}

                                    />
                                    }

                                    {onCheck &&
                                    <View style={{alignItems: "flex-start", paddingLeft: 24, paddingTop: 24}}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "#03AA00",
                                            fontWeight: "bold"
                                        }}>{checkComment} </Text>
                                        {/*{submitData.quanlityNew>0 ? `Bạn nhận được ${submitData.quanlityNew} thẻ ${cardNewName}`: 'Không đủ điều kiện để đổi '}*/}
                                        <View style={{flexDirection: "row", marginTop: 12}}><Text
                                            style={{fontSize: 16, color: "#323232"}}>Ví hiện tại: </Text><Text style={{
                                            fontSize: 14,
                                            color: "#323232",
                                            fontWeight: "bold",
                                        }}> {formatPriceVND(balance)}</Text></View>

                                        <View style={{flexDirection: "row", marginTop: 8,}}><Text
                                            style={{fontSize: 16, color: "#323232"}}>Biến động số dư: </Text><Text
                                            style={{
                                                fontSize: 14,
                                                color: "#323232",
                                                fontWeight: "bold"
                                            }}> {formatMoneyTransfer(submitData.balance)}</Text></View>
                                        <View style={{flexDirection: "row", marginTop: 8}}><Text
                                            style={{fontSize: 16, color: "#323232"}}>Ví còn dư sau đổi: </Text><Text
                                            style={{
                                                fontSize: 14,
                                                color: "#323232",
                                                fontWeight: "bold"
                                            }}> {formatPriceVND(balance + submitData.balance)}</Text></View>

                                    </View>}

                                    {isChecked && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSubmit();
                                                setOncheck(true);
                                            }}
                                            style={styles.Btn}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
                                                Kiểm tra
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                </>
                            )}
                        </Formik>
                        {confirm && <>

                            <TouchableOpacity
                                onPress={() => {
                                    exchange()
                                }}
                                style={styles.Btn}>
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}>
                                    Xác nhận đổi
                                </Text>

                            </TouchableOpacity>
                        </>}
                    </View>
                </ItemChage>

            </View>

            <View style={styles.container}>
                <Text style={{
                    color: '#323232',
                    fontSize: 18,
                    marginTop: 40,
                    fontWeight: 'bold',
                    paddingHorizontal: 10,
                    textAlign: 'center'
                }}>Lịch sử giao dịch đổi thẻ</Text>

                {sortedExchangeHistory?.map((data: any,index:any) => (
                    <React.Fragment key={index}>
                        {data.status === "cancelled" ? (
                            itemHistory(data, EnumHistory.Canceled, statusMappings[data.status])
                        ) : data.status === "approved" ? (
                            itemHistory(data, EnumHistory.Complete, statusMappings[data.status])
                        ) : (
                            itemHistory(data, EnumHistory.Waiting, statusMappings[data.status])
                        )}
                    </React.Fragment>
                ))}


            </View>
            <ModalPoup visible={confirmModal}>

                <TouchableOpacity onPress={() => setConfirmModal(false)}>
                    <View style={{alignItems: 'flex-end'}}>
                        <SVG.Icon_close/>
                    </View>
                </TouchableOpacity>

                <View style={{alignItems: 'center'}}>
                    <SVG.Icon_verified_green height={90} width={90}/>
                </View>
                <Text style={{fontSize: 16, textAlign: 'center', color: "#03AA00", fontWeight: "bold"}}>
                    Xác nhận đổi thẻ thành công!
                </Text>
                <Text style={{fontSize: 16, textAlign: 'center', color: "#323232", paddingTop: 12}}>
                    Vui lòng chờ xác nhận của admin.
                </Text>


                <TouchableOpacity

                    onPress={() =>
                        setConfirmModal(false)

                    }

                    style={styles.Btn}>
                    <View style={{flexDirection: "row",}}>

                        <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>OK</Text>
                    </View>
                </TouchableOpacity>
            </ModalPoup>

            <ModalPoup visible={confirmModalError}>

                <TouchableOpacity onPress={() => setConfirmModalError(false)}>
                    <View style={{alignItems: 'flex-end'}}>
                        <SVG.Icon_close/>
                    </View>
                </TouchableOpacity>

                <Text style={{fontSize: 16, textAlign: 'center', color: "#D51E03", fontWeight: "bold"}}>
                    {responseMessage}
                </Text>
                <Text style={{fontSize: 16, textAlign: 'center', color: "#323232", paddingTop: 12}}>
                    Vui lòng thử lại hoặc liên hệ admin để được hỗ trợ !
                </Text>


                <TouchableOpacity

                    onPress={() =>
                        setConfirmModalError(false)

                    }

                    style={styles.Btn}>
                    <View style={{flexDirection: "row",}}>

                        <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>OK</Text>
                    </View>
                </TouchableOpacity>
            </ModalPoup>
        </ScrollView>
    );
};


export default ChangeCard;
const styles = StyleSheet.create({
    styleText12: {
        fontSize: 12, color: "#323232"
    },
    btn: {
        width: 100,
        height: 30,

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {fontSize: 12, textAlign: 'center', color: '#fff',},
    containerButton: {

        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    Btn: {
        marginTop: 24,
        marginBottom:24,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    container: {

        paddingHorizontal: 12,
        backgroundColor: '#EEFAFF',
    },
    content: {

        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#14B0FC',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    CompleteColor: {backgroundColor: '#00A91A',},
    CompleteColorTranform: {backgroundColor: '#E8FFEB',},
    CanceledColor: {backgroundColor: '#D92E2E',},
    CanceledColorTranform: {backgroundColor: '#FFF2F2',},
    WaitingColor: {backgroundColor: '#EEBB08',},
    WaitingColorTranform: {backgroundColor: '#FFFDE8',},

});
