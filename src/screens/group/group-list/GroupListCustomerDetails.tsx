import {ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SVG} from "../../../constants";
import BoxIcon from "../../../components/commons/commonBoxIcon";
import CardContentItem from "../../../components/commons/commonCardContentItem";
import {Field, Formik} from "formik";
import CustomInput from "../../../components/commons/customInput";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import CommonButton from "../../../components/commons/commonButton";
import useAgency from "../useAgency";
import {AgencyLevel} from "../../../constants/agencyLevel";
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import CustomDropdownDetailCustomer from "../../../components/commons/CustomDropdownDetailCustomer";
import CustomDropdownDetailsCustomer from "../../../components/commons/customDropDownDetailsCustomer";
import CustomSearchDropdownCustomer from "../../../components/commons/customSearchDropDownCustomer";
import {red50} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import LoadingReact from "../../../components/commons/loading";
import formatDate from "../../../components/formatDate";
import Toast from "react-native-simple-toast";

const GroupListCustomerDetails = ({ navigation,route }: { navigation: any, route: any }) => {

    const id = route?.params?.id

    const {getAgencyDetails,getAgencyDetailsData,getAgencyDetailsLoading,agencyUpdateData,updateAgency} = useAgency()

    useEffect(()=>{
        // console.log("==============> id:"+ id)

        const fetchData =async ()=>{
            await getAgencyDetails(id) //3548073
        }

        fetchData()
    },[])
    const [agencyLevel,setAgencyLevel] = useState("")
    const  [isPress,setIsPress] = useState(false)
    const AgencyLevelArray = [
        { label: "Mới ĐK", value: "0" },
        { label: "Tiềm năng", value: "1" },
    ];


    useEffect(()=>{

        if(getAgencyDetailsData){
            console.log("getAgencyDetailsData: "+ JSON.stringify(getAgencyDetailsData))
            setAgencyLevel(AgencyLevel[getAgencyDetailsData?.agencyType])
        }
    },[getAgencyDetailsData])

    const [isLoading, setIsLoading] = useState(false);

    const update =async (values: any)=>{
        setIsLoading(true);

        await updateAgency(values, id)
        setIsLoading(false)
    }

    useEffect(()=>{

        if (agencyUpdateData){
            // console.log("agencyUpdateData:"+ JSON.stringify(agencyUpdateData))
            if(agencyUpdateData.status == 200){

                Toast.show("Cập nhật thành công")
            }
            else {
                Toast.show("Cập nhật không thành công")
            }
        }

        },[agencyUpdateData]
    )





    return (
        <ScrollView>
            {getAgencyDetailsLoading?  <LoadingReact/>:            <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#EEFAFF', paddingHorizontal: 16}}>
                <BoxIcon
                    child={<SVG.IconCirclePersonal></SVG.IconCirclePersonal>}
                    title={'Họ và tên'}
                    content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.fullname}</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconCirclePhoneNumber></SVG.IconCirclePhoneNumber>}
                    title={'Số điện thoại'}
                    content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.telephone}</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconCircleEmail></SVG.IconCircleEmail>}
                    title={'Email'}
                    content={<Text style={styles.contentGroupShadow}>{getAgencyDetailsData?.email}</Text>}
                    //icon={<SVG.IconGroupEdit></SVG.IconGroupEdit>}
                />
                <BoxIcon
                    child={<SVG.IconCircleCalendar></SVG.IconCircleCalendar>}
                    title={'Ngày đăng ký'}
                    content={<Text style={styles.contentGroupShadow}>{formatDate(getAgencyDetailsData?.createdAt)}</Text>}
                />
                <Formik
                    initialValues={{
                        // username: '',
                        // password: '',
                        // confirmPassword: '',
                    }}
                    onSubmit={values =>update(values)}>
                    {({handleSubmit, isValid, values}) => (
                        <>


                            <BoxIcon
                                child={<SVG.IconCircleChart></SVG.IconCircleChart>}
                                title={'Cấp bậc'}
                                content={<Field
                                    component={CustomDropdownDetailCustomer}
                                    data={AgencyLevelArray}
                                    titleSelect="Chọn cấp đại sứ"
                                    labelField="label"
                                    valueField="value"
                                    name="status"
                                    isBlack={true}
                                    setAgencyLevel={setAgencyLevel}
                                    titleSelect = {getAgencyDetailsData?.status == 1? "Tiềm năng":"Mới đăng ký"}

                                />}
                            >
                            </BoxIcon>

                            <BoxIcon
                                child={<SVG.IconGroupOrder></SVG.IconGroupOrder>}
                                title={'Đơn hàng chờ thanh toán'}
                                content={<View style={{paddingVertical: 4}}>
                                    {/*{getAgencyDetailsData?.order_wait.map((card:any,index: any)=>(*/}
                                    {/*    <CardContentItem key={index} title={card.name} content={card.count} />*/}

                                    {/*))}*/}

                                    <CardContentItem  title={getAgencyDetailsData?.order_wait?.name1} content={getAgencyDetailsData?.order_wait?.count1} />
                                    <CardContentItem  title={getAgencyDetailsData?.order_wait?.name2} content={getAgencyDetailsData?.order_wait?.count2} />
                                    <CardContentItem  title={getAgencyDetailsData?.order_wait?.name3} content={getAgencyDetailsData?.order_wait?.count3} />
                                    {/*<CardContentItem  title={"ahihihi"} content={121} />*/}
                                    {/*<CardContentItem  title={"ahihihi"} content={121} />*/}
                                    {/*<CardContentItem  title={"ahihihi"} content={121} />*/}



                                </View>}
                            />

                            <Field
                                //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                isValid={true}
                                component={CustomInputForNote}
                                isWhite={true}
                                placeholder={getAgencyDetailsData?.note}
                                name="note"
                                title="Ghi chú"
                            />

                            <View style={{marginTop: 40}}>


                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{
                                        backgroundColor: isLoading ? 'lightgray' : '#0288D1',
                                        padding: 10,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loading /> : <Text style={{ color: 'white' }}>Cập nhật</Text>}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
            }
        </ScrollView>
    );
};

const Loading = ({type, color}: any) => (
    <View
        style={{
            height: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0288D1" style={{height: 120}} />
    </View>
);
export default GroupListCustomerDetails;
const styles = StyleSheet.create({
    titleGroupShadow: {
        color: '#0288D1',
        fontSize: 14,
        fontWeight: 400
    },
    contentGroupShadow: {
        color: '#323232',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8
    },
    groupTextShadow: {
        flexDirection: 'row',
        //paddingBottom: 8
    },
    groupShadow: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        //...StyleSheet.absoluteFillObject,
        shadowColor: '#0288D1',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        padding: 7,
    },
    fieldStyle: {
        // Define your custom styles here
        // For example:
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 8,
    },
});
