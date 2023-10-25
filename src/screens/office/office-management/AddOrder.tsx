import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ROUTES, SVG} from "../../../constants";
import BoxIcon from "../../../components/commons/commonBoxIcon";
import CardContentItem from "../../../components/commons/commonCardContentItem";
import {Field, Formik} from "formik";
import CustomInput from "../../../components/commons/customInput";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomInputForNote from "../../../components/commons/commonInputForNote";
import CommonButton from "../../../components/commons/commonButton";
import CommonUploadImage from "../../../components/commons/commonUploadImage";
import ModalPoup from "../../../components/commons/modalPoup";
import useDepartment from "../useDepartment";
import {StorageHelper} from "../../../constants/storageHelper";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import ItemChage from "../../../components/card-warehouse/itemChage";
import DropdownCard from "../../../components/card-warehouse/dropdownCard";
import InputCardNumber from "../../../components/card-warehouse/InputCardNumber";
import InputCard from "../../../components/card-warehouse/InputCard";
import UploadImageAddOrder from "../../../components/commons/uploadImageAddOrder";
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import LoadingReact from "../../../components/commons/loading";
import * as yup from "yup";
import {Loading} from "../../group/group-create/GroupCreate";

const validate = yup.object().shape({
    order_id: yup
        .string()
        .required('Đây là trường bắt buộc điền'),

    user_id: yup
        .string()
        .required('Đây là trường bắt buộc điền'),



});

const AddOrder = ({ navigation,route }: { navigation: any,route:any }) => {
    const [isIntroModel, setIntroModel] = useState(false);
    const [isFail,setIsFail] = useState(false)
    const [selectedImageBase64,setSelectedImageBase64] = useState([])
    const user_id = route?.params?.id
    const [isRequest,setIsRequest] = useState(false)

    const {addOrderData,addDepartmentOrder,isAddingOrder, departmentPersonalListData,fetchDepartmentPersonalList,isFetchingDepartmentPersonalList} = useDepartment()

    const [dropdownData,setDropdownData] = useState(null)




    useEffect(()=>{
        const fetchDepartmentPersonnelList = async ()=>{
            const user: any = await StorageHelper.getUser();
            let userJson = JSON.parse(user)
            // console.log("user: "+ JSON.stringify(userJson.departmentId))
            const id = userJson.departmentId

            const params = {
                id: id
            }
            fetchDepartmentPersonalList(params)

        }
        fetchDepartmentPersonnelList()
    },[])


    useEffect(()=>{

        if(departmentPersonalListData){
            // console.log("departmentPersonalListData: "+ JSON.stringify(departmentPersonalListData))
            setDropdownData(
                departmentPersonalListData?.data?.map((d) => ({
                    label: d.fullname ,
                    value: d.id.toString() ,
                })) || []
            );
        }
    },[departmentPersonalListData])




  async  function onSubmit(values: any) {
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const images =selectedImageBase64.map((i:any)=>`data:${i.mime};base64,${i.data}`)
        const data = {
            image: images,
            order_id: values.order_id,
            user_id:values.user_id,
            id:id
        }

      addDepartmentOrder(data)
    }

    useEffect(()=>{

        if(addOrderData){
            if(addOrderData?.status == 200){
                setIntroModel(true)
                setIsRequest(true)

            }
        else {
            setIsFail(true)
            }
        }
    },[addOrderData])

    const customStyle={
        borderColor: '#000000',
        width: '100%',
        // flexDirection: 'row',
        height: 51,
        backgroundColor: '#ffffff',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color: "#323232",
    }
    const customStyleDropdown={
        borderColor: '#000000',
        width: '100%',
        // flexDirection: 'row',
        height: 51,
        backgroundColor: '#ffffff',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color: "#323232",
        paddingLeft: 12,
        paddingRight: 12,


    }
    return (
        <ScrollView>
            {isFetchingDepartmentPersonalList? <LoadingReact/>:             <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#ffffff', paddingHorizontal: 16}}>

                <View style={{ alignItems:"center"}}><Text style={{color:'#0288D1',fontSize:19,fontWeight:"bold"}}>Thêm đơn hàng </Text></View>
                <Formik
                    validationSchema={validate}
                    initialValues={{
                        // username: '',
                        // password: '',
                        // confirmPassword: '',
                    }}
                    onSubmit={onSubmit}>
                    {({handleSubmit, isValid, values}) => (
                        <>
                            {/*<ItemChage color={"#0288D1"}>*/}

                                <View style={{paddingHorizontal: 8, paddingVertical: 12}}>

                                    <Field
                                        component={InputCard}
                                        isValid={true}
                                        name="order_id"
                                        title="Mã đơn hàng"
                                        customStyle={customStyle}
                                    />
                                    {/*<Field*/}
                                    {/*    component={InputCard}*/}
                                    {/*    isValid={true}*/}
                                    {/*    name="user_id"*/}
                                    {/*    title="Người hỗ trợ"*/}
                                    {/*/>*/}


                                    {dropdownData && dropdownData.length > 0 ? (
                                        <Field
                                            component={DropdownCard}
                                            data={dropdownData}
                                            title=" Người hỗ trợ"
                                            titleSelect="Người hỗ trợ"
                                            labelField="label"
                                            valueField="value"
                                            name="user_id"
                                            isValid={true}
                                            customStyle={customStyleDropdown}
                                        />
                                    ) : null}

                                </View>
                            {/*</ItemChage>*/}
                            <Text style={{fontWeight:"bold", marginLeft:10, color:'#000000'}}>Minh chứng <Text style={{color:'red'}}>*</Text></Text>
                            <Text style={{ marginLeft:10,color:"#000000"}}>Bạn hãy gửi ảnh minh chứng xác minh khách hàng đã nhập hàng tại văn phòng. Ví Dụ: Chụp ảnh cùng khách hàng tại Văn phòng + Bill chuyển khoản</Text>

                            <View style={styles.groupUpload}>
                                {/*<CommonUploadImage textImage={'Ảnh chụp tại Văn phòng*'}></CommonUploadImage>*/}
                                {/*<CommonUploadImage textImage={'Ảnh chụp cùng Giám đốc*'}></CommonUploadImage>*/}
                                <UploadImageAddOrder imageLimit={4} placeHolder={"Tải ít nhất 2 ảnh của bạn"} setSelectedImageBase64={setSelectedImageBase64}/>
                            </View>
                            <TouchableOpacity
                                disabled={isRequest || isAddingOrder}
                                onPress={() => {
                                    handleSubmit()
                                }}
                                style={styles.Btn}>
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 16,
                                        paddingLeft: 10,
                                    }}>
                                    {isAddingOrder? <Loading/>:'Gửi xác nhận' }

                                </Text>

                            </TouchableOpacity>


                        </>
                    )}
                </Formik>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ModalPoup visible={isIntroModel} closeIcon={true}>
                        <TouchableOpacity onPress={() => setIntroModel(false) }>
                            <View style={{alignSelf: 'flex-end'}}>
                                <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center'}}>
                            <SVG.Icon_success style={{maxWidth: 90, maxHeight: 90}}></SVG.Icon_success>
                        </View>
                        <Text style={{alignSelf: 'center', fontSize: 16, fontWeight: 600, color: '#03AA00'}}>Gửi yêu cầu xác nhận đơn hàng thành công!</Text>
                        <Text style={{alignSelf: 'center', textAlign: 'center', paddingHorizontal: 36, paddingTop: 8, paddingBottom: 31, fontSize: 16, fontWeight: 400, color: '#000000'}}></Text>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.OFFICE_MANAGEMENT_SALES)}>
                            <View style={styles.btnOk}>
                                <Text style={styles.buttonText}>
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ModalPoup>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ModalPoup visible={isFail} closeIcon={true}>
                        <TouchableOpacity onPress={() => setIsFail(false) }>
                            <View style={{alignSelf: 'flex-end'}}>
                                <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                            </View>
                        </TouchableOpacity>
                        <View style={{alignSelf: 'center'}}>
                            <SVG.Icon_wrong style={{maxWidth: 90, maxHeight: 90}}></SVG.Icon_wrong>
                        </View>
                        <Text style={{alignSelf: 'center', fontSize: 16, fontWeight: 600, color: '#b31313'}}>Không thành công!</Text>
                        <Text style={{alignSelf: 'center', textAlign: 'center', paddingHorizontal: 36, paddingTop: 8, paddingBottom: 31, fontSize: 16, fontWeight: 400, color: '#000000'}}>{addOrderData?.message}</Text>
                        <TouchableOpacity onPress={() => setIsFail(false)}>
                            <View style={styles.btnOk}>
                                <Text style={styles.buttonText}>
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ModalPoup>
                </View>
            </View>
            }
        </ScrollView>
    );
};



export default AddOrder;
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
    groupUpload: {flexDirection: 'row', justifyContent: 'space-between'},
    btnOk: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '65%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    Btn: {
        marginTop: 24,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500, textAlign: 'center' },
});
