import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {Field, Formik} from "formik";
import {ROUTES, SVG} from "../../../constants";
import CustomSearchCustomer from "../../../components/commons/customSearchCustomer";
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import {ParamListBase, useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import CardContentItem from "../../../components/commons/commonCardContentItem";
import {AgencyLevel} from "../../../constants/agencyLevel";
import useAgency from "../useAgency";
import {AgencyLevelArray} from "../../../constants/AgencyLevelArray";
import LoadingReact from "../../../components/commons/loading";
import formatDate from "../../../components/formatDate";

const Potential = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const {getListOfAgencies,getListOfAgenciesData, getListOfAgenciesLoading} = useAgency()

    useFocusEffect(
        React.useCallback(() => {
            const data = {
                status: 1
            };

            const fetchData = async () => {
                try {
                    await getListOfAgencies(data);

                } catch (error) {
                    console.error("An error occurred:", error);
                }
            };

            fetchData();
        }, [])
    );


    const [state, setState] = React.useState({
        tableHead: [
            'Họ tên',
            'Ngày đăng ký',
            'Email',
            'Số điện thoại',
            'Cấp đại sứ',
            'Hành động'
        ],
        widthArr: [140, 140, 180, 140,140, 140]
    });

    const [type, setType] = useState(0);

    const [enableSearch, setEnableSearch] = React.useState(false);


    const button = (index) => (
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.GROUP_LIST_CUSTOMER_DETAILS,{
                id: index
            })}>
                <View style={styles.containerButton}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Chi tiết</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );

    const level = (agencyType: any) => (
        <View>
            <Text style={styles.textStatus}>{AgencyLevel[agencyType]}</Text>
        </View>
    );

    const pendingOrder = (index) => (
        <View style={{}}>
            <CardContentItem title={'VIP tiểu học'} content={'10 thẻ'} />
            <CardContentItem title={'VIP tiểu học'} content={'10 thẻ'} />
            <CardContentItem title={'VIP tiểu học'} content={'10 thẻ'} />
        </View>
    );

    const tableData = [];
    getListOfAgenciesData?.data.map((agency:any)=>{
        const rowData = [];
        rowData.push([`${agency.fullname}`, formatDate(agency.createdAt), agency.email,agency.telephone, level(agency.agencyType), button(agency.id)]);
        tableData.push(rowData);
    })

    function search(values: any) {
        const data={
            status: 1,
            fullname: values.client,
            email: values.client,
            telephone: !isNaN(values.client)?values.client: "" ,
            name: values.client,
            agencyType: values.active
        }

        // console.log("data to search: "+ JSON.stringify(data))
        const fetchData =async ()=>{
            await  getListOfAgencies(data)
        }
        fetchData()
    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <Animated.View style={{elevation: 20, scale: 10}}>
                        <TouchableWithoutFeedback onPress={() => setEnableSearch(!enableSearch)}>
                            <View style={styleEnabled(enableSearch).headerDisplaySearch}>
                                <Text style={styleEnabled(enableSearch).headerDisplaySearchText}>
                                    {enableSearch ? 'Ẩn bộ lọc tìm kiếm' : 'Hiện bộ lọc tìm kiếm'}
                                </Text>
                                {
                                    enableSearch ?
                                        <SVG.Icon_dropdown_search_open height={25} width={25} style={{color: '#FFFFFF'}}/>
                                        :
                                        <SVG.Icon_dropdown_search_close height={25} width={25} style={{color: '#525252'}}/>
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
                                        onSubmit={values => search(values)}>
                                        {({handleSubmit, isValid, values}) => (
                                            <>
                                                <Field
                                                    component={CustomSearchCustomer}
                                                    title="Tên / Email / Số điện thoại"
                                                    name="client"
                                                    isBlack={true}
                                                />
                                                <Field
                                                    component={CustomSearchCustomerDropDown}
                                                    data={AgencyLevelArray}
                                                    title="Cấp đại sứ"
                                                    titleSelect="Chọn cấp đại sứ"
                                                    labelField="label"
                                                    valueField="value"
                                                    name="active"
                                                    isBlack={true}
                                                />
                                                {
                                                    enableSearch ?
                                                        <View style={styles.containerButtonSearch}>
                                                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.searchBtn}>
                                                                <View style={{ flexDirection: "row"}}>
                                                                    <Text style={styles.searchBtnText}>Tìm kiếm</Text>
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
                    </Animated.View>
                </View>

                <View style={styles.containerTable}>
                    {getListOfAgenciesLoading? <LoadingReact/>:                    <ScrollView horizontal={true}>
                        <View>
                            <Table>
                                <Row data={state.tableHead} widthArr={state.widthArr} heighArr={100} style={styles.header}
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

export default Potential;

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
        width: 102,
        height: 26,
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
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
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
    searchBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
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
    textStatus: {
        fontSize: 14,
        fontWeight: '500',
        color: '#323232',
        textAlign: 'center',
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
            paddingVertical: 12
        },
        headerDisplaySearchText: {fontSize: 14, textAlign: 'left', color: enabled ? '#fff' : '#525252'},
    });
