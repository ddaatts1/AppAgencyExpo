import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import { SVG } from '../../../constants';

const PhoneNumber = () => {
    const [state, setState] = React.useState({
        tableHead: ['Bộ phận', 'Chức năng', 'Đầu mối', 'SĐT liên hệ', 'Ghi chú'],
        widthArr: [140, 140, 140, 140, 140],
    });
    const packageLightBlue = (index: any) => (
        <View style={styles.containerButton} key={index}>
            <View style={styles.btnPackageWeek}>
                <Text style={styles.btnTextPackageWeek}>0999999999</Text>
                <TouchableOpacity>
                    <SVG.Icon_copy color="#0288D1"/>
                </TouchableOpacity>
            </View>
        </View>
    );
    const person = (index: any) => (
        <View style={styles.containerButton} key={index}>
            <View style={styles.text}>
                <Text style={styles.object}>Mrs.Lệ</Text>
            </View>
        </View>
    );
    const title = (index: any) => (
        <View style={styles.containerButton} key={index}>
            <View style={styles.title}>
                <Text style={styles.object}>Chăm sóc đại sứ</Text>
            </View>
        </View>
    );

    const content = (index: any) => (
        <View style={styles.containerButton} key={index}>
            <View style={styles.title}>
                <Text style={styles.object}>Chào đón, vinh danh đại sứ. Chăm sóc đại sứ </Text>
            </View>
        </View>
    );




    const tableData = [];
    for (let i = 0; i < 6; i += 1) {
        const rowData = [];
        rowData.push([title(i), content(i), person(i), packageLightBlue(i), '']);
        tableData.push(rowData);
    }

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerText}>Danh sách người hỗ trợ tại FutureLang</Text>
                </View>
                <View style={styles.containerTable}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header}
                                textStyle={styles.text}
                            />
                            <TableWrapper>
                                {
                                    tableData.map((rowData, index) => (
                                        <Rows
                                            key={index}
                                            data={rowData}
                                            widthArr={state.widthArr}
                                            style={{ backgroundColor: index % 2 ? '#fff' : '#EEFAFF'}}
                                            textStyle={styles.textRow}
                                        />
                                    ))
                                }
                            </TableWrapper>
                        </Table>
                    </View>
                </ScrollView>
            </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: '#fff',
    },
    containerTable: {
        width: '100%',
        marginLeft: 16,
        backgroundColor: '#fff',
    },
    headerTitle: {
        marginTop: 24,
        marginLeft: 16,
        marginBottom: 16,
    },
    headerText: {
        fontWeight: '600',
        fontSize: 18,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#323232',
    },
    object: {
        fontWeight: '500',
        fontSize: 14,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#323232',
    },
    text: { fontWeight: '500', marginLeft: 16, fontSize: 14, color: '#fff'},
    textRow: {
        fontWeight: '500',
        fontSize: 14,
        color: '#525252',
        paddingHorizontal: 10,
        paddingVertical: 16,
    },
    header: {height: 50, backgroundColor: '#0288D1'},
    containerButton: {
        flex:1,
        paddingVertical: 16,
    },
    btnPackageWeek: {
        // backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    btnTextPackageWeek: {
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#525252',
        marginRight: 4,
    },
    title: {
        marginLeft: 16,
    },

});

export default PhoneNumber;
