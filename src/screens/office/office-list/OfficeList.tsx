import React, {useEffect, useState} from 'react';
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
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomInput from "../../../components/commons/customInput";
import CustomInputDetailsCustomer from "../../../components/commons/customInputDetailsCustomer";
import CustomSearch from "../../../components/commons/customSearch";
import CustomSearchGroup from "../../../components/commons/commonSearchGroup";
import useLogin from "../../auth/useLogin";
import CustomSearchDropdown from "../../../components/commons/customSearchDropdown";
import CustomSearchDropdownProvince from "../../../components/commons/CustomSearchDropdownProvince";
import useDepartment from "../useDepartment";
import LoadingReact from "../../../components/commons/loading";

const OfficeList = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const {fetchDepartmentList, isFetchingDepartmentList, departmentListData} = useDepartment()
    const [state, setState] = React.useState({
        tableHead: [
            'Ảnh',
            'Mã văn phòng',
            'Tên văn phòng',
            'Địa chỉ văn phòng',
            'Giám đốc văn phòng',
            'SĐT chủ văn phòng'
        ],
        widthArr: [180, 140, 180, 140, 140, 140],
    });

    useEffect(()=>{
        fetchData({})
    },[])
    function cancelSearch (){
        fetchData({})
    }
    const  fetchData = (params: any)=>{
        fetchDepartmentList(params)
    }

    // useEffect(()=>{
    //
    //     if(departmentListData){
    //         console.log("departmentListData: "+ JSON.stringify(departmentListData))
    //     }
    // },[departmentListData])

    const [selectedProvince,setSelectedProvince] = useState(null)


    useEffect(()=>{

        if (selectedProvince){
            // console.log("==========> selectedProvince: "+ selectedProvince)

            const params ={
                province : selectedProvince
            }

            // console.log("params: "+ JSON.stringify(params))
            fetchData(params)
        }
    },[selectedProvince])



    const button = (index) => (
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.OFFICE_LIST_DETAILS)}>
                <View style={styles.containerButton}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Chi tiết</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    const image = (index) => (
        <View style={{padding: 16, borderRadius: 8}}>
            {isImage(index)  ?  <Image source = {{uri:index}}
                                     style={{width: '100%',
                                         height:90,
                                         position: 'relative',
                                         resizeMode: 'stretch',
                                         justifyContent: 'center'
                                     }}

            />:  <Image
                style={{width: '100%',
                    height:90,

                    position: 'relative',
                    resizeMode: 'stretch',
                    justifyContent: 'center'
                }}
                source={require('../../../assets/image/logo.jpg')}

            /> }



        </View>
    );

    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);



    const tableData = [];


    departmentListData?.data.map((d:any)=>{
        const rowData = [];
        rowData.push([image(d.image), d.code, d.name, d.city,d.manager , d.telephone]);
        tableData.push(rowData);
    })


    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>

                    <Formik
                        initialValues={{
                            // username: '',
                            // password: '',
                            // confirmPassword: '',
                        }}
                        onSubmit={values => {}}>
                        {({handleSubmit, isValid, values}) => (
                            <>
                                <Field
                                    labelField="name"
                                    valueField="id"
                                    handleChange={setSelectedProvince}
                                    data={province}
                                    placeHolder="Tìm kiếm theo tỉnh/ Thành phố"
                                    component={CustomSearchDropdownProvince}
                                    name="city"
                                    title="Tỉnh/Thành phố"
                                />
                                <TouchableOpacity onPress={() => {
                                    cancelSearch()
                                }} style={[styles.cancelBtn]}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.searchBtnText}>Bỏ lọc</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}

                    </Formik>


                </View>
                <View style={styles.containerTotal}>
                    <Text style={styles.textTotal}>
                        Danh sách văn phòng
                    </Text>
                </View>
                <View style={styles.containerTable}>
                    {isFetchingDepartmentList? <LoadingReact/>:                    <ScrollView horizontal={true}>
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
                    </ScrollView> }

                </View>

            </View>

        </ScrollView>
    );
};

export default OfficeList;

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
    },
    containerTotal: {
        paddingHorizontal: 16,
        paddingTop: 16,
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
    }, cancelBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#2586c7',
        borderRadius: 15,
        marginTop:10
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


const province = [
    {id: '1', name: 'Thành phố Hà Nội'},
    {id: '2', name: 'Tỉnh Hà Giang'},
    {id: '4', name: 'Tỉnh Cao Bằng'},
    {id: '6', name: 'Tỉnh Bắc Kạn'},
    {id: '8', name: 'Tỉnh Tuyên Quang'},
    {id: '10', name: 'Tỉnh Lào Cai'},
    {id: '11', name: 'Tỉnh Điện Biên'},
    {id: '12', name: 'Tỉnh Lai Châu'},
    {id: '14', name: 'Tỉnh Sơn La'},
    {id: '15', name: 'Tỉnh Yên Bái'},
    {id: '17', name: 'Tỉnh Hòa Bình'},
    {id: '19', name: 'Tỉnh Thái Nguyên'},
    {id: '20', name: 'Tỉnh Lạng Sơn'},
    {id: '22', name: 'Tỉnh Quảng Ninh'},
    {id: '24', name: 'Tỉnh Bắc Giang'},
    {id: '25', name: 'Tỉnh Phú Thọ'},
    {id: '26', name: 'Tỉnh Vĩnh Phúc'},
    {id: '27', name: 'Tỉnh Bắc Ninh'},
    {id: '30', name: 'Tỉnh Hải Dương'},
    {id: '31', name: 'Thành phố Hải Phòng'},
    {id: '33', name: 'Tỉnh Hưng Yên'},
    {id: '34', name: 'Tỉnh Thái Bình'},
    {id: '35', name: 'Tỉnh Hà Nam'},
    {id: '36', name: 'Tỉnh Nam Định'},
    {id: '37', name: 'Tỉnh Ninh Bình'},
    {id: '38', name: 'Tỉnh Thanh Hóa'},
    {id: '40', name: 'Tỉnh Nghệ An'},
    {id: '42', name: 'Tỉnh Hà Tĩnh'},
    {id: '44', name: 'Tỉnh Quảng Bình'},
    {id: '45', name: 'Tỉnh Quảng Trị'},
    {id: '46', name: 'Tỉnh Thừa Thiên Huế'},
    {id: '48', name: 'Thành phố Đà Nẵng'},
    {id: '49', name: 'Tỉnh Quảng Nam'},
    {id: '51', name: 'Tỉnh Quảng Ngãi'},
    {id: '52', name: 'Tỉnh Bình Định'},
    {id: '54', name: 'Tỉnh Phú Yên'},
    {id: '56', name: 'Tỉnh Khánh Hòa'},
    {id: '58', name: 'Tỉnh Ninh Thuận'},
    {id: '60', name: 'Tỉnh Bình Thuận'},
    {id: '62', name: 'Tỉnh Kon Tum'},
    {id: '64', name: 'Tỉnh Gia Lai'},
    {id: '66', name: 'Tỉnh Đắk Lắk'},
    {id: '67', name: 'Tỉnh Đắk Nông'},
    {id: '68', name: 'Tỉnh Lâm Đồng'},
    {id: '70', name: 'Tỉnh Bình Phước'},
    {id: '72', name: 'Tỉnh Tây Ninh'},
    {id: '74', name: 'Tỉnh Bình Dương'},
    {id: '75', name: 'Tỉnh Đồng Nai'},
    {id: '77', name: 'Tỉnh Bà Rịa - Vũng Tàu'},
    {id: '79', name: 'Thành phố Hồ Chí Minh'},
    {id: '80', name: 'Tỉnh Long An'},
    {id: '82', name: 'Tỉnh Tiền Giang'},
    {id: '83', name: 'Tỉnh Bến Tre'},
    {id: '84', name: 'Tỉnh Trà Vinh'},
    {id: '86', name: 'Tỉnh Vĩnh Long'},
    {id: '87', name: 'Tỉnh Đồng Tháp'},
    {id: '89', name: 'Tỉnh An Giang'},
    {id: '91', name: 'Tỉnh Kiên Giang'},
    {id: '92', name: 'Thành phố Cần Thơ'},
    {id: '93', name: 'Tỉnh Hậu Giang'},
    {id: '94', name: 'Tỉnh Sóc Trăng'},
    {id: '95', name: 'Tỉnh Bạc Liêu'},
    {id: '96', name: 'Tỉnh Cà Mau'},
];
