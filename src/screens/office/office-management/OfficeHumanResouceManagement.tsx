import React, {useCallback, useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Image
} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {Field, Formik} from 'formik';
import {ROUTES, SVG} from '../../../constants';
import CustomSearchCustomer from '../../../components/commons/customSearchCustomer';
import CustomSearchCustomerDropDown from '../../../components/commons/customSearchDropDownCustomer';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomInput from "../../../components/commons/customInput";
import CustomInputDetailsCustomer from "../../../components/commons/customInputDetailsCustomer";
import CustomSearch from "../../../components/commons/customSearch";
import CustomSearchGroup from "../../../components/commons/commonSearchGroup";
import ModalPoup from "../../../components/commons/modalPoup";
import * as yup from "yup";
import useDepartment from "../useDepartment";
import {StorageHelper} from "../../../constants/storageHelper";
import IconWarning from "../../../assets/icons/WarningHome.svg";
import window from "@react-navigation/native/lib/typescript/src/__mocks__/window";
import LoadingReact from "../../../components/commons/loading";

const signUpValidationSchema = yup.object().shape({
    // telephone: yup
    //     .string()
    //     .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Nhập số điện thoại hợp lệ')
    //     .required('Đây là trường bắt buộc điền'),
});

const OfficeHumanResourceManagement = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const DEPARTMENT_STATUS = "paused"
    const {personalListData,fetchPersonalList,isFetchingPersonalList,dismissDepartment,isDismissingDepartment,dismissDepartmentData,searchDepartments,searchedDepartmentsData,isSearchingDepartments} = useDepartment()

    const [state, setState] = React.useState({
        tableHead: [
            'Tên nhân sự',
            'Email',
            'Số điện thoại',
            'Trạng thái',
            'Hành động'
        ],
        widthArr: [140, 140, 140, 140, 140],
    });

    const [type, setType] = useState(0);

    const [enableSearch, setEnableSearch] = React.useState(false);
    const [isFail,setIsFail] = useState(false)

    const [isIntroModel, setIntroModel] = useState(false);
    const [isDeleted,setIsDeleted] = useState(false)
    const [isConfirmDeleted,setIsConfirmDeleted] = useState(false)
    const [initialValues, setInitialValues] = useState({
        telephone: '',
    });
    const [userIdToDelete,setUserIdToDelete] = useState()


    async function onSubmit(value: any) {
        setIntroModel(false);
        navigation.navigate(ROUTES.OFFICE_ADD_HUMAN_RESOURCE,{
            telephone: value.telephone
        });


    }


    async function searchPersonnel(value: any) {
        setIntroModel(false);

        const  params = {
            telephone: value.telephone
        }
        searchDepartments(params)
    }

    useEffect(()=>{

        if(searchedDepartmentsData){
            // console.log(" searchedDepartmentsData: "+ JSON.stringify(searchedDepartmentsData))

            if(searchedDepartmentsData.status == 200 && searchedDepartmentsData.data.length>0){
                navigation.navigate(ROUTES.OFFICE_ADD_HUMAN_RESOURCE,{
                    data: searchedDepartmentsData?.data
                });
            }else {
                    setIsFail(true)
            }
        }
    },[searchedDepartmentsData])


    useFocusEffect(useCallback(()=>{
        fetchdata()

    },[]))



    const fetchdata =async ()=>{
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const body = {
            id: id
        }
        fetchPersonalList(body)
    }


    useEffect(()=>{

        if(personalListData){
            console.log("personalListData: "+ JSON.stringify(personalListData))
        }
    },[personalListData])


    async function handleDelete(userId: any) {
        setIsConfirmDeleted(true);
        setUserIdToDelete(userId);
    }




    async  function deletePersonal(userId: any) {


        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const body = {
            id: id,
            user_id: userId
        }

        dismissDepartment(body)

    }

    useEffect(()=>{
        if(dismissDepartmentData){
            // console.log("dismissDepartmentData: "+ JSON.stringify(dismissDepartmentData))
            if(dismissDepartmentData.status == 200){
                setIsDeleted(true)
            }
        }
    },[dismissDepartmentData])

    const button = (index) => (
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.OFFICE_HUMAN_RESOURCE_DETAIL,{
                id:index.id
            })}>
                <View style={styles.containerButton}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Chi tiết</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {!index.isManager &&            <TouchableOpacity style={{marginTop: 4}} onPress={() =>{personalListData?.data?.manager[0]?.status == DEPARTMENT_STATUS? setIsPaused(true): handleDelete(index.id)}}>
                <View style={styles.containerButton}>
                    <View style={styles.btnDelete}>
                        <Text style={styles.btnText}>Xóa</Text>
                    </View>
                </View>
            </TouchableOpacity> }

        </View>
    );

    const image = (index) => (
        <View style={{padding: 16, borderRadius: 8}}>
            <Image
                style={{width: '100%',
                    position: 'relative',
                    resizeMode: 'stretch',
                    justifyContent: 'center'
                }}
                source={require('../../../assets/image/office.png')}
            />
        </View>
    );

    const tableData = [];

//0987650023
    personalListData?.data.personnel.map((d:any,index:any)=>{
        const rowData = [];
        rowData.push([d.fullname, d.email, d.telephone,  d.isManager ==1? "Giám đốc":d.department_requested == 1? "Nhân Viên":"Chờ duyệt ", button(d)]);
        tableData.push(rowData);
    })

    const [isPaused,setIsPaused] = useState(false)
    return (
        <ScrollView style={styles.main}>
            {isFetchingPersonalList ? <LoadingReact/>:<View style={styles.container}>
                <View style={styles.containerTotal}>
                    <View style={styles.containerTextList}>
                        <Text style={styles.textTotal}>
                            Danh sách nhân sự
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.containerTextAdd} onPress={() =>{personalListData?.data?.manager[0]?.status == DEPARTMENT_STATUS? setIsPaused(true): setIntroModel(true)} } >
                        <SVG.IconAdd style={styles.iconAdd} />
                        <Text style={styles.textAdd}>
                            Thêm nhân viên
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.containerTable}>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table>
                                <Row data={state.tableHead} widthArr={state.widthArr} heighArr={200} style={styles.header}
                                     textStyle={styles.text}/>
                                <TableWrapper style={{paddingVertical: 9}}>
                                    {
                                        tableData.map((rowData, index) => (
                                            <Rows
                                                key={index}
                                                data={rowData}
                                                widthArr={state.widthArr}
                                                style={{backgroundColor: index % 2 ? '#fff' : '#FFF2F0', paddingVertical: 9}}
                                                textStyle={styles.textRow}
                                            />
                                        ))
                                    }
                                </TableWrapper>
                            </Table>
                        </View>
                    </ScrollView>
                </View>

            </View> }


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={isDeleted} closeIcon={true}>
                    <TouchableOpacity onPress={() => {
                        setIsDeleted(false);
                        fetchdata()
                    } }>
                        <View style={{alignSelf: 'flex-end'}}>
                            <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                        </View>
                    </TouchableOpacity>
                    <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 600, color: '#181818'}}>Thông báo </Text>
                    <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: 600, color: '#517424',marginTop:20,marginBottom: 20}}>Xóa nhân viên thành công!</Text>
                    <TouchableOpacity onPress={()=>{
                        setIsDeleted(false);
                        fetchdata()
                    }}>

                        <View style={styles.btnOk}>
                            <Text style={styles.buttonText}>
                                Đóng
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ModalPoup>
            </View>




            <ModalPoup visible={isConfirmDeleted}>
                <View style={{marginBottom: 44}}>
                    <View style={{marginBottom: 24}}>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '400',
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal'
                        }}>Bạn có muốn xóa nhân viên này ? </Text>
                    </View>
                </View>

                <View style={styles.confirmBtn}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => setIsConfirmDeleted(false)}
                            style={[{backgroundColor: '#fff'}, styles.loginBtn]}>

                            <Text style={{
                                color: '#0288D1',
                                fontSize: 16,
                                paddingLeft: 10,
                                fontWeight: '500'
                            }}>Thoát</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIsConfirmDeleted(false);
                                deletePersonal(userIdToDelete)
                            }}
                            style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                            <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalPoup>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={isIntroModel} closeIcon={true}>
                    <TouchableOpacity onPress={() => setIntroModel(false) }>
                        <View style={{alignSelf: 'flex-end'}}>
                            <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                        </View>
                    </TouchableOpacity>
                    <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 600, color: '#181818'}}>Nhập số điện thoại của nhân viên</Text>
                    <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={initialValues}
                        onSubmit={values => searchPersonnel(values)}>
                        {({ handleSubmit, isValid, values, }) => (
                            <>
                                <View style={{ marginHorizontal: 6 }}>
                                    <Field

                                        iconLeft={<SVG.Icon_phone style={{color: '#323232'}} />}
                                        isValid={false}
                                        isBorderBlue={true}
                                        component={CustomInput}
                                        name="telephone"
                                    />
                                </View>

                                <View style={{ marginTop: 48 }}>

                                    <TouchableOpacity onPress={()=>handleSubmit()}>
                                        <View style={styles.btnOk}>
                                            <Text style={styles.buttonText}>
                                                Kiểm tra
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>



                            </>
                        )}
                    </Formik>

                </ModalPoup>
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={isPaused} closeIcon={true}>
                    <TouchableOpacity onPress={() => setIsPaused(false) }>
                        <View style={{alignSelf: 'flex-end'}}>
                            <SVG.Icon_close style={{width: 24, height: 24}}></SVG.Icon_close>
                        </View>
                    </TouchableOpacity>
                    <View style={{alignItems:"center"}}>
                        <SVG.Icon_warning_red/>
                    </View>
                    <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 600, color: '#181818'}}>Văn phòng hiện đang dừng hoạt động. Vui lòng liên hệ admin để được hỗ trợ</Text>

                    <TouchableOpacity onPress={()=>setIsPaused(false)}>
                        <View style={styles.btnOk1}>
                            <Text style={styles.buttonText}>
                                Ok
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
                    <Text style={{alignSelf: 'center', textAlign: 'center', paddingHorizontal: 36, paddingTop: 8, paddingBottom: 31, fontSize: 16, fontWeight: 400, color: '#000000'}}>{searchedDepartmentsData?.message}</Text>
                    <TouchableOpacity onPress={() => setIsFail(false)}>
                        <View style={styles.btnOk}>
                            <Text style={styles.buttonText}>
                                OK
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ModalPoup>
            </View>

        </ScrollView>
    );
};

export default OfficeHumanResourceManagement;


// @ts-ignore
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
    },
    container: {
        width: '100%',
    },
    wFull: {
        width: '92%',
        marginTop: 36,
        marginHorizontal: 16,
        backgroundColor: '#EEFAFF',
        borderRadius: 16,
    },
    containerSearch: {
        flexDirection: 'row',
        width: '100%',
    },
    containerButtonSearch: {
        marginTop: 24,
        marginHorizontal: 16,
    },
    containerTable: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingLeft: 16,
    },
    header: {height: 50, backgroundColor: '#0288D1'},
    text: {textAlign: 'center', fontWeight: '500', fontSize: 14, color: '#fff'},
    textRow: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
        color: '#525252',
        paddingHorizontal: 10,
    },
    dataWrapper: {marginTop: -1},
    row: {height: 40, backgroundColor: '#fff'},
    btn: {
        width: 100,
        height: 30,
        backgroundColor: '#0288D1',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDelete: {
        width: 100,
        height: 30,
        backgroundColor: '#D51E03',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {fontSize: 12, textAlign: 'center', color: '#fff', paddingHorizontal: 12, paddingVertical: 6},
    btnPackageMonth: {
        width: 102,
        height: 26,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderColor: '#0288D1',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextPackageMonth: {fontSize: 12, textAlign: 'center', color: '#0288D1'},
    btnPackageWeek: {
        width: 102,
        height: 26,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderColor: '#D51E03',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextPackageWeek: {fontSize: 12, textAlign: 'center', color: '#D51E03'},
    containerButton: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        width: '25%',
        height: 51,
        backgroundColor: '#0288D1',
        borderRadius: 12,
        marginLeft: -25
    },
    searchBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
    textTotal: {
        fontSize: 18,
        color: '#323232',
        fontWeight: '600',
        textAlign: 'left',
        paddingVertical: 14
    },
    textAdd: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '500',
        textAlign: 'left',
        marginLeft: 8
    },
    containerTotal: {
        paddingHorizontal: 16,
        paddingTop: 24,
        flexDirection: 'row',
    },
    tab: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        marginTop: 45,
        paddingVertical: 5,
    },
    textTab: {
        color: '#323232',
        fontSize: 12,
    },
    touchTab: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 17,
        marginHorizontal: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    containerTab: {
        alignItems: 'center',
        width: '100%',
    },
    containerTextAdd: {flexDirection: 'row', width: '50%', paddingVertical: 14, backgroundColor: '#EEFAFF', borderRadius: 12},
    containerTextList: {width: '50%'},
    iconAdd: {marginHorizontal: 8, width: 22, height: 22},
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
    btnOk1: {
marginTop:20,
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
    confirmBtn: {
        width: '100%',
        flexDirection: 'row',
        marginBottom:20
    },

    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '50%',
        borderRadius: 12,
    },

});

const styleEnabled = (enabled:boolean) =>
    StyleSheet.create({
        headerDisplaySearch: {
            width: '100%',
            backgroundColor: enabled ? '#0288D1' : '#F5FCFF',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 12,
        },
        headerDisplaySearchText: {fontSize: 14, textAlign: 'left', color: enabled ? '#fff' : '#525252'},
    });

