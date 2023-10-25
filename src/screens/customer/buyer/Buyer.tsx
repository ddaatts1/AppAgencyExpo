import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {Field, Formik} from "formik";
import {ROUTES, SVG} from "../../../constants";
import CustomSearchCustomer from "../../../components/commons/customSearchCustomer";
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import useCustomer from "../useCustomer";
import formatDate from "../../../components/formatDate";
import LoadingReact from "../../../components/commons/loading";
import Toast from "react-native-simple-toast";
import useCard from "../../card-warehouse/useCard";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import {useFutureLang} from "../../context/StartUpProvider";
import constants from "react-native-render-html/lib/typescript/constants";

const Buyer = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [dataToShow,setDataToShow] = useState([])
    const [isIncreasingActiveDate,setIsIncreasingActiveDate] = useState(false)
    const [isIncreasingExpiredDate,setIsIncreasingExpiredDate] = useState(false)

    const state={
        tableHead: [
            'Tên khách hàng \n/ Số điện thoại',
            <TouchableOpacity onPress={()=>handleArrangeActiveDate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5, color: '#fff', fontWeight: '600' }}>Ngày kích hoạt</Text>
                <SVG.IconArrange />
            </TouchableOpacity>,
            <TouchableOpacity onPress={()=>handleArrangeExpiredDate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5, color: '#fff', fontWeight: '600' }}>Ngày hết hạn</Text>
                <SVG.IconArrange />
            </TouchableOpacity>,
            'Gói',
            'Số buổi đã học',
            'Hành động'
        ],
        widthArr: [140, 140, 140, 140, 140, 140]
    }

    const {futureLang} = useFutureLang()

    const {fetchPremiumInfo, premiumInfo, isFetchingPremiumInfo} = useCustomer()
    const {fetchAllCard, listCard} = useCard()
    const [type, setType] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [enableSearch, setEnableSearch] = React.useState(false);
    const limit = 10
    const [totalPage, setTotalPage] = useState(0)

    // useEffect(()=>{
    //     console.log("dataToShow: "+ JSON.stringify(dataToShow))
    // },[dataToShow])

    function cancelSearch (){
        fetchData(currentPage)
    }
    async function search(values: any, page: any) {


        if (values == null) {
            const params = {
                ...searchData,
                page: page,
                limit: limit
            }
            const data = {
                service: futureLang ? SERVICE_FTL : SERVICE_KIDS
            }
            await fetchPremiumInfo(data, params);
        } else {
            if (values.cardId !== undefined || values.phone !== undefined || values.client !== undefined) {

                const params = {
                    name: values.client,
                    phone: values.phone,
                    card_id: values.cardId,
                    page: page,
                    limit: limit
                }
                const data = {
                    service: futureLang ? SERVICE_FTL : SERVICE_KIDS
                }
                // console.log("param: " + JSON.stringify(params))
                await fetchPremiumInfo(data, params)


            } else {
                // Handle the case where either cardCode or used is null
                // Alert.alert("Thông báo", "Bạn cần điền vào form để tìm kiếm  ")
                Toast.show("Bạn cần điền vào form để tìm kiếm")
            }
        }
        return undefined;
    }

    useEffect(() => {

        if (premiumInfo) {
            console.log("=> premiumInfo: "+ JSON.stringify(premiumInfo))
            // console.log("total page: "+ Math.ceil(premiumInfo.totalRecords / limit))
            setTotalPage(Math.ceil(premiumInfo.totalRecords / limit))
            const data = premiumInfo.data
            const dataArray = Object.keys(data).map((key) => {
                return {
                    ...data[key],
                };
            });

            console.log("dataArray: "+ JSON.stringify(dataArray))
            setDataToShow(dataArray)
        }
    }, [premiumInfo])


    const [searchData, setSeachData] = useState({
        name: "",
        phone: '',
        card_id: null,
    })

    const goToPreviousPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        if (enableSearch) {
            search(null, newPage)
        } else {
            fetchData(newPage);
        }
    };

    const goToNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        // Call your data fetching function with the new page
        if (enableSearch) {
            search(null, newPage)
        } else {
            fetchData(newPage);
        }

    };


    const fetchData = async (p: number) => {
        const params = {
            page: p,
            limit: limit
        }
        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }
        await fetchPremiumInfo(data, params);
    }


    useEffect(() => {
        const params = {
            page: 0,
            limit: limit
        }
        const data = {
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }
        fetchPremiumInfo(data, params)
        fetchAllCard()

    }, [])

    const [cardCodeList, setCardCodeList] = useState([])

    useEffect(() => {

        if (listCard) {
            // console.log("list card: "+ JSON.stringify(listCard))
            setCardCodeList(listCard?.map((c: any) => ({
                value: c.mappingId.toString(),
                label: c.name
            })))
        }
    }, [listCard])

    const button = (index: any) => (
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CUSTOMER_BUYER_TABLE_DETAILS, {
            email: index
        })}>
            <View style={styles.containerButton}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Chi tiết</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const packageTitleMonth = (product: any) => (
        <View style={{flexDirection: 'column'}}>
            {product?.map((p: any, index: any) => {
                if (p.is_expired == 0) {
                    return (<View key={index} style={styles.containerButton}>
                        <View style={styles.btnPackageMonth}>
                            <Text style={styles.btnTextPackageMonth}>{p.name}</Text>
                        </View>
                    </View>)

                } else {
                    return (
                        <View key={index} style={styles.containerButton}>
                            <View style={styles.btnPackageWeek}>
                                <Text style={styles.btnTextPackageWeek}>{p.name}</Text>

                            </View>
                        </View>
                    )
                }


            })}

        </View>

    );

    const packageTitleWeek = (index) => (
        <View style={styles.containerButton}>
            <View style={styles.btnPackageWeek}>
                <Text style={styles.btnTextPackageWeek}>Học thử 1 tuần</Text>
            </View>
        </View>
    );

    const fullname_phone =(fullname:any,phone: any)=>{
        return(
            <View style={{paddingLeft:5}}>
                <Text style={{color:"#000000"}}>{fullname}</Text>
                <Text style={{color:"#000000"}}>{phone}</Text>
            </View>
        )
    }

    const tableData = [];
    dataToShow?.map((t: any) => {
        const rowData = [];
        rowData.push([fullname_phone(t.fullname,t.phone_number), formatDate(t.actived_date), formatDate(t.expired_date), packageTitleMonth(t.product), t.number_study ? t.number_study : '0', button(t.email)]);
        tableData.push(rowData);
    })
    // if (Array.isArray(dataToShow)) {
    //     dataToShow.map((t: any) => {
    //         const rowData = [
    //             t.fullname,
    //             formatDate(t.actived_date),
    //             formatDate(t.expired_date),
    //             packageTitleMonth(t.product),
    //             t.number_study ? t.number_study : '0',
    //             button(t.email)
    //         ];
    //         tableData.push(rowData);
    //     });
    // } else {
    //     console.error('dataToShow is not an array or is undefined.');
    // }








        const handleArrangeActiveDate =  () => {
        if(dataToShow){
            const sortedData = dataToShow.slice().sort((a, b) => {
                const dateA = new Date(a.actived_date);
                const dateB = new Date(b.actived_date);
                return isIncreasingExpiredDate ? dateA - dateB : dateB - dateA;
            });

            setDataToShow(sortedData)

            // Toggle the sorting order for the next click
            setIsIncreasingExpiredDate(prevState => !prevState);
        }

    }

    const handleArrangeExpiredDate = () => {
        //actived_date
        if(dataToShow){
            const sortedData = dataToShow.slice().sort((a, b) => {
                const dateA = new Date(a.expired_date);
                const dateB = new Date(b.expired_date);
                return isIncreasingActiveDate ? dateA - dateB : dateB - dateA;
            });

            setDataToShow(sortedData)

            // Toggle the sorting order for the next click
            setIsIncreasingActiveDate(prevState => !prevState);
        }
    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <TouchableWithoutFeedback onPress={() => setEnableSearch(!enableSearch)}>
                        <View style={styleEnabled(enableSearch).headerDisplaySearch}>
                            <Text style={styleEnabled(enableSearch).headerDisplaySearchText}>
                                {enableSearch ? 'Ẩn bộ lọc tìm kiếm' : 'Hiện bộ lọc tìm kiếm'}
                            </Text>
                            {
                                enableSearch ?
                                    <SVG.Icon_dropdown_search_open height={25} width={25}/>
                                    :
                                    <SVG.Icon_dropdown_search_close height={25} width={25}/>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        enableSearch ?
                            <View style={styles.containerSearch}>
                                <Formik
                                    initialValues={{
                                        // username: '',
                                        // password: '',
                                        // confirmPassword: '',
                                    }}
                                    onSubmit={values => {
                                        search(values, 1)
                                        setSeachData({
                                            name: values.client,
                                            phone: values.phone,
                                            card_id: values.cardId
                                        })
                                    }}>
                                    {({handleSubmit, isValid, values}) => (
                                        <>
                                            <Field
                                                component={CustomSearchCustomer}
                                                title="Tên khách"
                                                name="client"
                                            />
                                            <Field
                                                component={CustomSearchCustomer}
                                                title="Số điện thoại"
                                                name="phone"
                                            />
                                            <Field
                                                component={CustomSearchCustomerDropDown}
                                                data={cardCodeList}
                                                title="Gói kích hoạt"
                                                titleSelect="Chọn gói học thử"
                                                labelField="label"
                                                valueField="value"
                                                name="cardId"
                                            />
                                            {
                                                enableSearch ?
                                                    <View style={styles.containerButtonSearch}>
                                                        <TouchableOpacity onPress={() => {
                                                            handleSubmit()
                                                        }} style={styles.searchBtn}>
                                                            <View style={{flexDirection: "row"}}>
                                                                <Text style={styles.searchBtnText}>Tìm kiếm</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={() => {
                                                            cancelSearch()
                                                        }} style={[styles.cancelBtn]}>
                                                            <View style={{flexDirection: "row"}}>
                                                                <Text style={styles.searchBtnText}>Bỏ lọc</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : null
                                            }
                                        </>
                                    )}
                                </Formik>
                            </View>
                            : null
                    }
                </View>

                <View style={styles.containerTotal}>
                    <Text style={styles.textTotal}>
                        Tổng số: {premiumInfo?.totalRecords} khách hàng
                    </Text>
                </View>
                <View style={styles.containerTable}>
                    {isFetchingPremiumInfo ? <LoadingReact/> :

                        <ScrollView horizontal={true}>
                            <View>
                                <Table>

                                    <Row data={state.tableHead} widthArr={state.widthArr} heighArr={200}
                                         style={styles.header}
                                         textStyle={styles.text}/>

                                    <TableWrapper style={{paddingVertical: 9}}>
                                        {
                                            tableData.map((rowData, index) => (
                                                <Rows
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={state.widthArr}
                                                    style={{
                                                        backgroundColor: index % 2 ? '#fff' : '#FFF2F0',
                                                        paddingVertical: 9
                                                    }}
                                                    textStyle={styles.textRow}
                                                />
                                            ))
                                        }
                                    </TableWrapper>
                                </Table>

                            </View>
                        </ScrollView>}
                </View>
                <View style={styles.paginationButtons}>
                    <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 1}>
                        <Text style={styles.paginationButton}>Previous</Text>
                    </TouchableOpacity>
                    <Text>{currentPage}/{totalPage} </Text>
                    <TouchableOpacity onPress={goToNextPage} disabled={currentPage == totalPage}>
                        <Text style={styles.paginationButton}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
};

export default Buyer;

// @ts-ignore
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff'
    },
    container: {
        width: '100%',
    },
    wFull: {
        width: '92%',
        marginTop: 25,
        marginHorizontal: 16,
        backgroundColor: '#EEFAFF',
        borderRadius: 25,
    },
    containerSearch: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 5,
    },
    containerButtonSearch: {
        marginTop: 24,
        marginHorizontal: 16,
    },
    containerTable: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 16

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
        alignItems: 'center'
    },
    btnText: {fontSize: 12, textAlign: 'center', color: '#fff', paddingHorizontal: 12, paddingVertical: 6},
    btnPackageMonth: {
        // width: 102,
        // height: 26,
        padding:4,
        backgroundColor: 'transparent',
        borderRadius: 15,
        borderColor: '#0288D1',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center'
    },
    btnTextPackageWeek: {fontSize: 12, textAlign: 'center', color: '#D51E03'},
    containerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    searchBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    cancelBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#dee2e5',
        borderRadius: 15,
        marginTop:10
    },
    searchBtnText: {color: '#FFFFFF', fontSize: 16, fontWeight: '500'},
    textTotal: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '600',
        textAlign: 'left'
    },
    containerTotal: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: 32,
    },
    tab: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        marginTop: 45,
        paddingVertical: 5
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
    paginationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    paginationButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0288D1',
    },

});

const styleEnabled = (enabled: boolean) =>
    StyleSheet.create({
        headerDisplaySearch: {
            width: '100%',
            backgroundColor: enabled ? '#0288D1' : '#F5FCFF',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 17,
            paddingVertical: 12
        },
        headerDisplaySearchText: {fontSize: 14, textAlign: 'left', color: enabled ? '#fff' : '#525252'},
    });
