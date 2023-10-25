import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {Field, Formik} from 'formik';
import {ROUTES, SVG} from '../../../constants';
import CustomSearchCustomer from '../../../components/commons/customSearchCustomer';
import CustomSearchCustomerDropDown from '../../../components/commons/customSearchDropDownCustomer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useAgency from '../useAgency';
import {AgencyLevel} from '../../../constants/agencyLevel';
import {AgencyLevelArray} from '../../../constants/AgencyLevelArray';
import formatDate from '../../../components/formatDate';
import formatPriceVND from '../formatMoney';
import LoadingReact from '../../../components/commons/loading';

const GroupListProfile = ({ route }: { route: any }) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const id = route?.params?.id;
    const name  = route?.params?.name;
    const {getAgencyTeam,getAgencyTeamLoading,getAgencyTeamData} = useAgency();
    const [state, setState] = React.useState({
        tableHead: [
            'Họ tên',
            'Ngày đăng ký',
            'Email',
            'Số điện thoại',
            'Cấp',
            'Số đại sứ \n trực tiếp',
            'Doanh số nhập \n tháng này',
            'Thu nhập \n tháng này',
            'Hành động',
        ],
        widthArr: [140, 140, 140, 140, 140, 140, 140, 140, 140],
    });



    const [type, setType] = useState(0);

    const [enableSearch, setEnableSearch] = React.useState(false);


    useEffect(()=>{
        const  fetchData = ()=>{
            getAgencyTeam(id,{});
        };
        fetchData();
        console.log('id: ' + id);
    },[id]);


    function search(values: any) {
        const data = {
            fullname: values.client,
            telephone: !isNaN(values.client) ? values.client : '' ,
            agencyType: values.active,
        };

        // console.log("data to search: "+ JSON.stringify(data))
        const fetchData = async ()=>{
            await  getAgencyTeam(id,data);
        };
        fetchData();
    }



    const button = (a_id:any,a_name:any) => (
        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.GROUP_LIST_PROFILE,{
                id: a_id,
                name: a_name,
            })}>
                <View style={styles.containerButton}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Đội nhóm</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );

    const tableData = [];

    getAgencyTeamData?.data.map((agency:any)=>{
        console.log('id: ' + agency.id);
        const rowData = [];
        rowData.push([`${agency.fullname}`, formatDate(agency.createdAt), agency.email,agency.telephone, AgencyLevel[agency.agencyType], agency.managed, formatPriceVND(agency.total_group_sale), formatPriceVND(agency.total_income), button(agency.id,agency.fullname)]);
        tableData.push(rowData);
    });

    return (
        <ScrollView style={styles.main}>
            {getAgencyTeamLoading ? <LoadingReact/> :
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
                                        <SVG.Icon_dropdown_search_open height={25} width={25} />
                                        :
                                        <SVG.Icon_dropdown_search_close height={25} width={25} />
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
                                                            <TouchableOpacity onPress={() =>handleSubmit() } style={styles.searchBtn}>
                                                                <View style={{ flexDirection: 'row'}}>
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

                <View style={styles.containerTotal}>
                    <Text>
                        <Text style={styles.textTitleTotal}>
                            Đội nhóm của:
                        </Text>
                        <Text style={styles.textTitleTotal}> </Text>
                        <Text style={styles.textContentTotal}>
                            {name }
                        </Text>
                    </Text>
                </View>
                <View style={styles.containerTable}>

                    {/*{getAgencyTeamData?.data >0 ?*/}
                    {/*    : <Text style={{width:'100%',color:'black',textAlign:"center", backgroundColor:'#908b8b',lineHeight:30}}>Không tìm thấy dữ liệu. </Text>}*/}

                    <ScrollView horizontal={true}>
                        <View>
                            <Table>
                                <Row data={state.tableHead} widthArr={state.widthArr} heighArr={200} style={styles.header}
                                     textStyle={styles.text}/>
                                <TableWrapper style={{}}>
                                    {getAgencyTeamData?.data?.length > 0 ? (
                                        tableData.map((rowData, index) => (
                                            <Rows
                                                key={index}
                                                data={rowData}
                                                widthArr={state.widthArr}
                                                style={{ backgroundColor: index % 2 ? '#fff' : '#FFF2F0', paddingVertical: 9 }}
                                                textStyle={styles.textRow}
                                            />
                                        ))
                                    )  : (
                                        <Row
                                            data={['Không tìm thấy dữ liệu']}
                                            widthArr={state.widthArr}
                                            style={{ backgroundColor: '#d7d3d3', paddingVertical: 9, justifyContent: 'center' }}
                                            textStyle={styles.textRow}
                                        />
                                    )}

                                </TableWrapper>

                            </Table>
                        </View>
                    </ScrollView>

                </View>

            </View>
            }

        </ScrollView>
    );
};

export default GroupListProfile;




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
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    searchBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
    textTitleTotal: {
        fontSize: 18,
        color: '#323232',
        fontWeight: '600',
        textAlign: 'left',
    },
    textContentTotal: {
        fontSize: 18,
        color: '#0288D1',
        fontWeight: '600',
        textAlign: 'left',
    },
    containerTotal: {
        paddingHorizontal: 16,
        paddingBottom: 0,
        paddingTop: 24,
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
