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
import UploadImageAddOrder from "../../../components/commons/uploadImageAddOrder";
import Toast from "react-native-simple-toast";
import {Loading} from "../../group/group-create/GroupCreate";

const OfficeAddHumanResource = ({ navigation,route }: { navigation: any,route:any }) => {
    const [isIntroModel, setIntroModel] = useState(false);
    const [isFail,setIsFail] = useState(false)

    const {data} = route?.params
    const {departmentDetailData,fetchDepartmentDetail,isFetchingDepartmentDetail,requestPersonal,requestPersonalData,isRequestingPersonal} = useDepartment()
    const [image1,setImage1] = useState([])
    const [image2,setImage2] = useState([])
    const [isRequest,setIsRequest] = useState(false)

    function validateImage(image, index) {
        if (!image || !image[0]) {
            Toast.show(`Bạn cần upload ảnh ${index}`);
            return null;
        }
        return `data:${image[0]?.mime};base64,${image[0]?.data}`;
    }

  async  function update(value:any) {
        setIsRequest(true)
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId

      const img1 = validateImage(image1, "tại văn phòng");
      if (!img1) return;

      const img2 = validateImage(image2, "cùng giám đốc");
      if (!img2) return;

      // console.log("data: "+ JSON.stringify(data))
      const requestData = {
            id: id,
          user_id: data[0]?.id,
          image1: img1,
          image2: img2,
          note: value.note
      }
      console.log("request data: "+ JSON.stringify(requestData))
requestPersonal(requestData)

  }

  useEffect(()=>{

      if(requestPersonalData){
          if(requestPersonalData?.status == 200){
              setIntroModel(true)
          }
          else {
              setIsFail(true)
          }
      }
  },[requestPersonalData])

    return (
        <ScrollView>
            <View style={{flex: 1, paddingVertical: 24, backgroundColor: '#EEFAFF', paddingHorizontal: 16}}>
                <BoxIcon
                    child={<SVG.IconCirclePersonal></SVG.IconCirclePersonal>}
                    title={'Họ và tên'}
                    content={
                        <Text style={styles.contentGroupShadow}>{data[0]?.fullname}</Text>
                    }
                />
                <BoxIcon
                    child={<SVG.IconCirclePhoneNumber></SVG.IconCirclePhoneNumber>}
                    title={'Số điện thoại'}
                    content={

                            <Text style={styles.contentGroupShadow}>{data[0]?.telephone}</Text>
                        }
                />
                <BoxIcon
                    child={<SVG.IconCircleEmail></SVG.IconCircleEmail>}
                    title={'Email'}
                    content={

                            <Text style={styles.contentGroupShadow}>{data[0]?.email}</Text>

                    }

                />
                {/*<BoxIcon*/}
                {/*    child={<SVG.IconOfficeBuilding></SVG.IconOfficeBuilding>}*/}
                {/*    title={'Văn phòng'}*/}
                {/*    content={<Text style={styles.contentGroupShadow}>Không có tên VP</Text>}*/}
                {/*/>*/}

                <View style={styles.groupUpload}>
                    {/*<CommonUploadImage textImage={'Ảnh chụp tại Văn phòng*'}></CommonUploadImage>*/}
                    {/*<CommonUploadImage textImage={'Ảnh chụp cùng Giám đốc*'}></CommonUploadImage>*/}
                    <UploadImageAddOrder imageLimit={1} textImage={"Ảnh chụp tại văn phòng"} placeHolder={"Nhấn để tải ảnh"} customStyles={styles.containerUpload} setSelectedImageBase64={setImage1}/>
                    <UploadImageAddOrder imageLimit={1} textImage={"Ảnh chụp cùng Giám đốc"} placeHolder={"Nhấn để tải ảnh"} customStyles={styles.containerUpload} setSelectedImageBase64={setImage2}/>

                </View>
                <Formik
                    initialValues={{}}
                    onSubmit={values=>update(values)}
                >
                    {({ handleSubmit, isValid, values, }) => (
                        <>
                            <Field
                                //iconLeft={<SVG.Icon_phone style={{color: '#0288D1'}} />}
                                isValid={true}
                                component={CustomInputForNote}
                                isWhite={true}
                                name="note"
                                title="Ghi chú"
                            />


                            <View style={{marginTop: 40}}>
                                <TouchableOpacity
                                    disabled={isRequest}
                                    onPress={()=>handleSubmit()}
                                    style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}
                                >
                                    <Text>{isRequestingPersonal? <Loading/>: 'Cập nhật'}</Text>
                                </TouchableOpacity>
                                {/*<CommonButton  handleSubmit={() => handleSubmit()} text={} />*/}
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
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.OFFICE_MANAGEMENT_HUMAN_RESOURCE)}>
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
                        <Text style={{alignSelf: 'center', textAlign: 'center', paddingHorizontal: 36, paddingTop: 8, paddingBottom: 31, fontSize: 16, fontWeight: 400, color: '#000000'}}>{requestPersonalData?.message}</Text>
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
        </ScrollView>
    );
};


export default OfficeAddHumanResource;
const styles = StyleSheet.create({
    containerUpload: { paddingTop: 24, paddingBottom: 12, width: '45%',minHeight:100 },
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
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '100%',
        borderRadius: 12,
    },
});
