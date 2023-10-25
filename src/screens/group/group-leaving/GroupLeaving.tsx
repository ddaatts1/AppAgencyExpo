import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import {Field, Formik} from 'formik';
import {ROUTES, SVG} from '../../../constants';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useAgency from "../useAgency";
import {AgencyLevel} from "../../../constants/agencyLevel";
import LoadingReact from "../../../components/commons/loading";
import formatDate from "../../../components/formatDate";
import * as yup from "yup";
import CustomInputGroupLeaving from "../../../components/commons/commonInputGroupLeaving";


const validationSchema = yup.object().shape({

    days: yup
        .number()
        .required('Đây là trường bắt buộc điền'),



});

const GroupLeaving = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();


    const {markAgencyOffWork,markAgencyOffWorkData, markAgencyOffWorkLoading} = useAgency()

    const [state, setState] = React.useState({
        tableHead: [
            'Họ tên',
            'Email',
            'Số điện thoại',
            'Cấp nhà phân phối',
            'Ngày tạo',
        ],
        widthArr: [140, 180, 140, 140, 140],
    });

    const [type, setType] = useState(0);

    const [enableSearch, setEnableSearch] = React.useState(false);




    const tableData = [];

    markAgencyOffWorkData?.data.map((d: any)=>{
        const rowData = [];
        rowData.push([d.fullname, d.email, d.telephone, AgencyLevel[d.agencyType], formatDate(d.createdAt)]);
        tableData.push(rowData);
    })

    function search(values: any) {

        const data ={
            days: values.days
        }


        const fetchData = ()=>{
            markAgencyOffWork(data)
        }
        fetchData()
    }
    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.containerSearch}>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{
                                // username: '',
                                // password: '',
                                // confirmPassword: '',
                            }}
                            onSubmit={values => search(values)}
                        >
                            {({handleSubmit, isValid, values}) => (
                                <>
                                    <Field
                                        iconLeft={<SVG.IconMonth style={{width: 20, height: 20, marginRight: 10}} />}
                                        component={CustomInputGroupLeaving}
                                        placeHolder={'Số ngày không nhập hàng'}
                                        name="days"

                                    />
                                    <TouchableOpacity onPress={() => {handleSubmit()}} style={styles.searchBtn}>
                                        <Text style={styles.searchBtnText}>Tìm kiếm</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>

                    </View>
                </View>
                <View style={styles.containerTable}>
                    {markAgencyOffWorkLoading? <LoadingReact/>:                    <ScrollView horizontal={true}>
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

export default GroupLeaving;

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
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '600',
        textAlign: 'left',
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
