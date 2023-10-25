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
    Image, Systrace
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
import CommonDashboardOffice from "../../../components/commons/commonDashboardOffice";
import ModalPoup from "../../../components/commons/modalPoup";
import * as yup from "yup";
import {StorageHelper} from "../../../constants/storageHelper";
import useDepartment from "../useDepartment";
import CustomSearchDropdownProvince from "../../../components/commons/CustomSearchDropdownProvince";
import formatPriceVND from "../../group/formatMoney";
import CustomSearchMonth from "../../../components/commons/CustomSearchMonth";
import LoadingReact from "../../../components/commons/loading";

const OfficeSalesManagement = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const {personalListData,fetchPersonalList,departmentSalesData,fetchDepartmentSales,isFetchingDepartmentSales}  = useDepartment()
    const [state, setState] = React.useState({
        tableHead: [
            'Tháng',
            'Tổng doanh số',
            'Tổng đơn hàng',
            'Hành động',
        ],
        widthArr: [110, 110, 110, 110],
    });
    const DEPARTMENT_STATUS = "paused"
    const [isPaused,setIsPaused] = useState(false)

    const [type, setType] = useState(0);

    const [enableSearch, setEnableSearch] = React.useState(false);
    const [selectedMonth,setSelectedMonth] = useState(null)


    useEffect(()=>{
        fetchData({})
    },[])

    const fetchData   = async (p:any)=>{
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const params = {
            ...p,
            id
        }

        fetchDepartmentSales(params)

        // console.log("user: "+ JSON.stringify(userJson.departmentId))
        const body = {
            id: id
        }
        fetchPersonalList(body)

    }



    useEffect(()=>{

        const  params = {
            month: selectedMonth
        }

        console.log("=====> params: "+ JSON.stringify(params))

        fetchData(params)
    },[selectedMonth])

    const button = (index:any) => (
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.OFFICE_MANAGEMENT_DETAILS,{
                month: index
            })}>
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

    useEffect(()=>{
        console.log("departmentSalesData: "+ JSON.stringify(departmentSalesData))
    },[departmentSalesData])

    const tableData = [];

    departmentSalesData?.data?.sales?.map((d:any)=>{
        const rowData = [];
        rowData.push([`Tháng ${formatDate(d.month,'/')}`, d.totalAmount, d.totalRecord, button(formatDate(d.month,'-'))]);
        tableData.push(rowData);
    })


    function getMonth(month: any){
        const secondPart = month.split('-')[1];
        const m = parseInt(secondPart, 10);
        return m
    }


    function formatDate (date:any, symbol:any ){
        const parts = date.split('-');
        const formattedDate = `${parts[1]}${symbol}${parts[0]}`;
        return formattedDate
    }



    const getCurrentYearMonths = () => {
        const currentYear = new Date().getFullYear();
        const months = Array.from({ length: 12 }, (_, index) => {
            const monthId = `${index + 1}-${currentYear}`;
            const monthName = getMonthName(index);
            return { id: monthId, name: monthName };
        });
        return months;
    };

    const getMonthName = (monthIndex: any) => {
        const monthNames = [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ];
        return monthNames[monthIndex];
    };


    function handleAddOrder() {
        navigation.navigate(ROUTES.ADD_ORDER,{
        })
    }

    function filterByMonth(values) {
        console.log(values)
        return undefined;
    }

    return (
        <ScrollView style={styles.main}>
            {departmentSalesData?.status == 400? <Text>ahihii</Text>:
                <View style={styles.container}>
                    <View style={styles.containerTotal}>
                        <View style={styles.containerTextList}>
                            <Text style={styles.textTotal}>
                                Doanh Số
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>{personalListData?.data?.manager[0]?.status == DEPARTMENT_STATUS? setIsPaused(true):handleAddOrder()}} style={styles.containerTextAdd}>
                            <SVG.IconAddCustom style={styles.iconAdd} />
                            <Text style={styles.textAdd}>
                                Thêm đơn hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wFull}>
                        <Formik
                            initialValues={{
                                // username: '',
                                // password: '',
                                // confirmPassword: '',
                            }}
                            onSubmit={values => filterByMonth(values)}>
                            {({handleSubmit, isValid, values}) => (
                                <>
                                    <Field
                                        labelField="name"
                                        valueField="id"
                                        handleChange={setSelectedMonth}
                                        data={getCurrentYearMonths()}
                                        placeHolder="Chọn tháng muốn tìm kiếm"
                                        component={CustomSearchMonth}
                                        name="month"
                                        title={new Date().getFullYear()}
                                    />
                                </>
                            )}
                        </Formik>
                    </View>
                    <View style={{paddingTop: 12, paddingHorizontal: 12, paddingBottom: 8}}>
                        <View style={{flexDirection:'row'}}>
                            <CommonDashboardOffice
                                iconSVG={<SVG.IconOfficeCoinBlue style={{width: 26, height: 26}}></SVG.IconOfficeCoinBlue>}
                                iconSVGBackground={<SVG.IconOfficeBackgroundCoin style={{width: 95, height: 95}}></SVG.IconOfficeBackgroundCoin>}
                                color={'#29A7E0'}
                                title={'Tổng doanh số'}
                                content={formatPriceVND(departmentSalesData?.data?.dashboard?.totalAmountAll)}>
                            </CommonDashboardOffice>
                            <CommonDashboardOffice
                                iconSVG={<SVG.IconOfficeMarkRed style={{width: 26, height: 26}}></SVG.IconOfficeMarkRed>}
                                iconSVGBackground={<SVG.IconOfficeBackgroundMark style={{width: 95, height: 95}}></SVG.IconOfficeBackgroundMark>}
                                color={'#E05641'}
                                title={'Tổng đơn hàng'}
                                content={`${departmentSalesData?.data?.dashboard?.totalRecordAll} đơn`}>
                            </CommonDashboardOffice>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <CommonDashboardOffice
                                iconSVG={<SVG.IconOfficeCoinGreen style={{width: 26, height: 26}}></SVG.IconOfficeCoinGreen>}
                                iconSVGBackground={<SVG.IconOfficeBackgroundCoin style={{width: 95, height: 95}}></SVG.IconOfficeBackgroundCoin>}
                                color={'#4DB658'}
                                title={'Doanh số tháng này'}
                                content={formatPriceVND(departmentSalesData?.data?.dashboard?.totalAmountCurrent)}>
                            </CommonDashboardOffice>
                            <CommonDashboardOffice
                                iconSVG={<SVG.IconOfficeMarkPurple style={{width: 26, height: 26}}></SVG.IconOfficeMarkPurple>}
                                iconSVGBackground={<SVG.IconOfficeBackgroundMark style={{width: 95, height: 95}}></SVG.IconOfficeBackgroundMark>}
                                color={'#BD60D4'}
                                title={'Số đơn hàng tháng này'}
                                content={`${departmentSalesData?.data?.dashboard?.totalRecordCurrent} đơn`}>
                            </CommonDashboardOffice>
                        </View>
                    </View>
                    <View style={styles.containerTable}>
                        {isFetchingDepartmentSales ? <LoadingReact/>:                         <ScrollView horizontal={true}>
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
                        }
                    </View>

                </View>
            }

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


        </ScrollView>
    );
};

export default OfficeSalesManagement;

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
        marginTop: 24,
        marginHorizontal: 16,
        backgroundColor: '#E1F5FE',
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
        color: '#FFFFFF',
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
    containerTextAdd: {flexDirection: 'row', width: '50%', paddingVertical: 14, backgroundColor: '#FF5722', borderRadius: 12},
    containerTextList: {width: '50%'},
    iconAdd: {marginHorizontal: 8, width: 22, height: 22, color: '#FFFFFF'},
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


});

const styleEnabled = (enabled:boolean) =>
    StyleSheet.create({
        headerDisplaySearch: {
            width: '100%',
            backgroundColor: enabled ? '#0288D1' : '#E1F5FE',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 12,
        },
        headerDisplaySearchText: {fontSize: 14, textAlign: 'left', color: enabled ? '#fff' : '#525252'},
    });

