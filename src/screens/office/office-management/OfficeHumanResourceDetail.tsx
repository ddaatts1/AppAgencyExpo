import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SVG} from "../../../constants";
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
import LoadingReact from "../../../components/commons/loading";

const OfficeHumanResourceDetail = ({ navigation,route }: { navigation: any,route:any }) => {
    const [isIntroModel, setIntroModel] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFullname, setEditedFullname] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const user_id = route?.params?.id
    // console.log("user_id"+ user_id)

    const {departmentDetailData,fetchDepartmentDetail,isFetchingDepartmentDetail} = useDepartment()


    useEffect(()=>{

        fetchdata()
    },[])

    const fetchdata =async ()=>{
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const body = {
            id: id,
            user_id: user_id
        }

        fetchDepartmentDetail(body)
    }


    useEffect(()=>{

        if(departmentDetailData){
            // console.log("departmentDetailData: "+ JSON.stringify(departmentDetailData))
            setEditedFullname(departmentDetailData?.data[0]?.fullname || '');
            setEditedPhoneNumber(departmentDetailData?.data[0]?.telephone || '');
            setEditedEmail(departmentDetailData?.data[0]?.email || '');
        }
    },[departmentDetailData])


    return (
        <ScrollView>
            {isFetchingDepartmentDetail?<LoadingReact/>:            <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#EEFAFF', paddingHorizontal: 16}}>
                <Formik
                    initialValues={{}}
                    onSubmit={values => {}}
                >
                    {({ handleSubmit, isValid, values, }) => (
                        <>

                            <BoxIcon
                                child={<SVG.IconCirclePersonal></SVG.IconCirclePersonal>}
                                title={'Họ và tên'}
                                content={
                                //     isEditing ? (
                                //     <TextInput
                                //         style={styles.contentGroupShadow}
                                //         value={editedFullname}
                                //         onChangeText={setEditedFullname}
                                //     />
                                // ) : (
                                    <Text style={styles.contentGroupShadow}>{editedFullname}</Text>
                                // )
                                }
                                // icon={ <TouchableOpacity onPress={ handleEditClick}>
                                //     <SVG.IconGroupEdit />
                                // </TouchableOpacity>}
                            />
                            <BoxIcon
                                child={<SVG.IconCirclePhoneNumber></SVG.IconCirclePhoneNumber>}
                                title={'Số điện thoại'}
                                content={
                                    // isEditing ? (
                                    //     <TextInput
                                    //         style={styles.contentGroupShadow}
                                    //         value={editedPhoneNumber}
                                    //         onChangeText={setEditedPhoneNumber}
                                    //     />
                                    // ) : (
                                        <Text style={styles.contentGroupShadow}>{editedPhoneNumber}</Text>
                                    // )
                                }
                                // icon={ <TouchableOpacity onPress={ handleEditClick}>
                                //     <SVG.IconGroupEdit />
                                // </TouchableOpacity>}
                            />
                            <BoxIcon
                                child={<SVG.IconCircleEmail></SVG.IconCircleEmail>}
                                title={'Email'}
                                content={
                                    // isEditing ? (
                                    //     <TextInput
                                    //         style={styles.contentGroupShadow}
                                    //         value={editedEmail}
                                    //         onChangeText={setEditedEmail}
                                    //     />
                                    // ) : (
                                        <Text style={styles.contentGroupShadow}>{editedEmail}</Text>
                                    // )
                                }
                                // icon={ <TouchableOpacity onPress={ handleEditClick}>
                                //     <SVG.IconGroupEdit />
                                // </TouchableOpacity>}
                            />
                            <BoxIcon
                                child={<SVG.IconOfficeBuilding></SVG.IconOfficeBuilding>}
                                title={'Văn phòng'}
                                content={<Text style={styles.contentGroupShadow}>{departmentDetailData?.data[0]?.name}</Text>}
                            />


                            <BoxIcon
                                child={<SVG.IconCircleChart></SVG.IconCircleChart>}
                                title={'Trạng thái'}
                                content={<Text style={styles.contentGroupShadow}>{departmentDetailData?.data[0]?.status}</Text>}
                            />
                            <Field
                                //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                isValid={true}
                                component={CustomInputForNote}
                                isWhite={true}
                                name="note"
                                title="Ghi chú"
                                placeholder={departmentDetailData?.data[0]?.note}
                            />
                            <View style={styles.groupUpload}>
                                 <CommonUploadImage image={departmentDetailData?.data[0]?.departmentImage1} textImage={'Ảnh chụp tại Văn phòng*'}></CommonUploadImage>
                                <CommonUploadImage image={departmentDetailData?.data[0]?.departmentImage2}  textImage={'Ảnh chụp cùng Giám đốc*'}></CommonUploadImage>

                            </View>



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
                        <Text style={{alignSelf: 'center', fontSize: 16, fontWeight: 600, color: '#03AA00'}}>Yêu cầu đã được gửi thành công!</Text>
                        <Text style={{alignSelf: 'center', textAlign: 'center', paddingHorizontal: 36, paddingTop: 8, paddingBottom: 31, fontSize: 16, fontWeight: 400, color: '#000000'}}>Admin sẽ duyệt thông tin trong tối đa 3 ngày làm việc!</Text>
                        <TouchableOpacity onPress={() => setIntroModel(false)}>
                            <View style={styles.btnOk}>
                                <Text style={styles.buttonText}>
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



export default OfficeHumanResourceDetail;
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
    buttonText: { color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 500, textAlign: 'center' },
});
