import React, {useState, useCallback, useEffect} from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking, PermissionsAndroid, Systrace, Alert,
} from 'react-native';
// @ts-ignore
import {Table, TableWrapper, Row, Rows,} from 'react-native-table-component';
import {Field, Formik} from "formik";
import {ROUTES, SVG} from "../../../constants";
import CustomSearchCustomer from "../../../components/commons/customSearchCustomer";
import CustomSearchCustomerDropDown from "../../../components/commons/customSearchDropDownCustomer";
import ModalPoup from '../../../components/commons/modalPoup';
import Clipboard from '@react-native-community/clipboard';
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import useCard from "../useCard";
import LoadingReact from "../../../components/commons/loading";
import FileViewer from "react-native-file-viewer";

var RNFS = require("react-native-fs");
import XLSX from "xlsx"

const CarDetail = ({navigation, route}: any) => {
    const itemtype = route.params?.itemtype;
    const id = route.params?.id;
    const name: String = route.params?.name;
    const limit = 10
    const [exportConfirm, setExportConfirm] = useState(false)
    const [fileName, setFileName] = useState()
    const [searchData, setSeachData] = useState({
        cardCode: "",
        used: 0
    })
    const [totalPage,setTotalPage] = useState(0)

    const [state, setState] = React.useState({
        tableHead: ['STT', 'Mã thẻ', 'Gói', 'Trạng thái', 'Hành động'],
        widthArr: [50, 140, 140, 140, 140]
    });
    const [enableSearch, setEnableSearch] = React.useState(false);
    const {futureLang} = useFutureLang()
    const {
        fetchStudentCard,
        studentCardData,
        isLoadingStudentCard,
        exposeCard,
        exposeData,
        exportTrialDataAction,
        exportTrialData
    } = useCard()
    const status = [
        {label: "Đã kích hoạt", value: '1'},
        {label: "Chưa kích hoạt", value: '0'},

    ]

    const [type, setType] = useState(0);
    const [checkModal, setCheckModal] = useState(false);
    const [checkModalVerified, setCheckModalVerified] = useState(false);
    const [namecardExport, setNamecardExport] = useState() as any;
    const [idExport, setIdExport] = useState() as any;
    const [isloading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    const data = {
        service: futureLang ? SERVICE_FTL : SERVICE_KIDS
    }
    const cardExportButton = (data: any, id: any) => {
        setNamecardExport(data)
        setIdExport(id)
        setCheckModal(true)
    }
    const cardVerified = () => {
        setCheckModal(false)

        const body = {
            id: idExport,
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS
        }
        exposeCard(body)
    }


    useEffect(() => {
        if (exposeData?.status === 200) {
            setCheckModalVerified(true)
        }
    }, [exposeData])


    const fetchData = async (p: number) => {
        await fetchStudentCard("", null, id, p, limit, data);
        setIsLoading(false)
    }


    useEffect(() => {
        fetchData(currentPage);
    }, []);


    useEffect(()=>{
        if(studentCardData){
            // console.log("studentCardData: "+ JSON.stringify(studentCardData))
            setTotalPage(Math.ceil(studentCardData.totalRecords / limit))
        }
    },[studentCardData])

    const button = (name: any, id: any, isExposed: boolean) => {
        if (isExposed) {
            return (
                <View style={styles.containerButton}>
                    <View style={[styles.btn, styles.greyButton]}>
                        <Text style={styles.btnText}>Đã xuất</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => cardExportButton(name, id)}>
                    <View style={styles.containerButton}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Xuất thẻ</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };


    const packageTitleMonth = (used: any) => (
        <View style={styles.containerButton}>
            <View style={styles.btnPackageStatus}>
                <Text
                    style={used ? styles.btnTextPackageStatus : styles.btnTextPackageWeek}>{used ? "Đã kích hoạt" : "Chưa kích hoạt"}</Text>
            </View>
        </View>
    );

    const packageTitleWeek = () => (
        <View style={styles.containerButton}>
            <View style={styles.btnPackageMonth}>
                <Text style={styles.btnTextPackageMonth}>{name}</Text>
            </View>
            {/*<View style={styles.btnPackageWeek}>*/}
            {/*    <Text style={styles.btnTextPackageWeek}>Tiếng Trung 1 năm </Text>*/}
            {/*</View>*/}

        </View>
    );

    const tableData: any[][][] = [];

    studentCardData?.data?.dataImport?.map((data: any, index: any) => {
        const rowData = [];
        rowData.push([index + 1 + (currentPage - 1) * limit, data.isExposed === 0 ? maskCardCode(data.card_code) : data.card_code, packageTitleWeek(), packageTitleMonth(data.used), button(data.card_code, data.id, data.isExposed)]);
        tableData.push(rowData);
    })


    function maskCardCode(cardCode) {
        const firstTwoChars = cardCode.substring(0, 2);
        const maskedPart = "*".repeat(cardCode.length - 2);
        return `${firstTwoChars}_${maskedPart}`;
    }


    const onClipboard = async (item: string) => {
        return await Clipboard.setString(item);
    }

    const goToPreviousPage = () => {
        setIsLoading(true);
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        if (enableSearch) {
            search(null, newPage)
        } else {
            fetchData(newPage);
        }
    };

    const goToNextPage = () => {
        setIsLoading(true);
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        // Call your data fetching function with the new page
        if (enableSearch) {
            search(null, newPage)
        } else {
            fetchData(newPage);
        }

    };


    async function search(values: any, page: any) {


        if (values == null) {
            await fetchStudentCard(searchData.cardCode, searchData.used, id, page, limit, data);

        } else {
            if (values.cardCode !== undefined || values.active !== undefined) {
                // Fetch student card data using the fetchStudentCard function
                if (values.cardCode == "") {
                    await fetchStudentCard("", values.active, id, page, limit, data);
                } else {

                    await fetchStudentCard(values.cardCode, values.active, id, page, limit, data);

                }


            } else {
                // Handle the case where either cardCode or used is null
                Alert.alert("Thông báo", "bạn cần điền vào trường Mã Thẻ hoặc trạng thái ")
            }
        }
        setIsLoading(false)


        return undefined;
    }


    const exportDataToExcel = (dataToExport: any) => {
        const sample_data_to_export = dataToExport.map((card, index) => ({
            STT: index + 1,
            "Sản phẩm": card.type,
            "Loại thẻ học thử": card.name,
            "Mã thẻ": card.card_code,
            "Trạng thái": card.used === 0 ? "Chưa sử dụng" : "Đã sử dụng",
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(sample_data_to_export);

        // Add column formatting
        const wscols = [
            {wch: 5, alignment: {horizontal: 'left'}}, // STT column width
            {wch: 15, alignment: {horizontal: 'left'}}, // Sản phẩm column width
            {wch: 25}, // Loại thẻ học thử column width
            {wch: 15}, // Mã thẻ column width
            {wch: 15}, // Trạng thái column width
        ];
        ws['!cols'] = wscols;

        XLSX.utils.book_append_sheet(wb, ws, 'Cards');
        const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

        RNFS.writeFile(
            RNFS.ExternalStorageDirectoryPath + `/${fileName}`,
            wbout,
            'base64'
        ).then(() => {
            openExcelFileWithApp(); // Open the file after it's exported
        }).catch((e: any) => {
            // console.log('Error', e);
        });
    };

    const openExcelFileWithApp = async () => {
        const filePath = RNFS.ExternalStorageDirectoryPath + `/${fileName}`;
        try {
            FileViewer.open(filePath)
        } catch (e) {
            // console.log("khong the mo file ")
        }

    };


    const handleClick = async (data: any) => {
        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {

                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        message: "",
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel(data);
                } else {
                    // Permission denied
                    // console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel(data);
            }
        } catch (e) {
            // console.log('Error while checking permission');
            // console.log(e);
            return
        }

    };

    function exportTrial(values: any) {
        const currentDate = new Date();
        const filename = `${name}_${currentDate.getHours()}_${currentDate.getMinutes()}.xlsx`
        setFileName(filename)
        if (values.used != undefined) {
            exportTrialDataAction(data, "", values.used, values.cardId)
        } else {
            // console.log("chua chon trang thai")
        }
    }

    useEffect(() => {
        if (exportTrialData) {
            const cardsToExport = exportTrialData.data.dataImport;
            handleClick(cardsToExport) // export exel file
        }
    }, [exportTrialData])

    return (
        <ScrollView>
            <View style={styles.main}>
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
                                            cardCode: values.cardCode ? values.cardCode : "",
                                            used: values.active
                                        })
                                    }}>
                                    {({handleSubmit, isValid, values}) => (
                                        <>
                                            <Field
                                                component={CustomSearchCustomer}
                                                title="Mã thẻ"
                                                name="cardCode"
                                            />

                                            <Field
                                                component={CustomSearchCustomerDropDown}
                                                data={status}
                                                title="Trạng thái"
                                                titleSelect="Chọn trạng thái"
                                                labelField="label"
                                                valueField="value"
                                                name="active"
                                            />
                                            <Field
                                                component={CustomSearchCustomer}
                                                title="Loại thẻ"
                                                titleSelect="Chọn loại thẻ"
                                                labelField="label"
                                                valueField="value"
                                                name="active"
                                                value={name}
                                                readOnly
                                            />

                                            {
                                                enableSearch ?
                                                    <View style={styles.containerButtonSearch}>
                                                        <TouchableOpacity onPress={() => {
                                                            handleSubmit()
                                                            setIsLoading(true)

                                                        }} style={styles.searchBtn}>
                                                            <View style={{flexDirection: "row"}}>
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
                </View>


                {itemtype == 2 ? <TouchableOpacity onPress={() => setExportConfirm(true)} style={{
                    backgroundColor: "#0288D1",
                    flexDirection: "row",
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    marginTop: 12,
                    width: "60%",
                    marginHorizontal: 12,
                    borderRadius: 20
                }}>
                    <SVG.Icon_excel/>
                    <Text style={{color: "#FFFFFF", fontSize: 14, paddingHorizontal: 12}}>Xuất tất cả mã thẻ học
                        thử</Text>
                </TouchableOpacity> : null}
                <View style={styles.containerTable}>
                    {isLoadingStudentCard? <LoadingReact/>:                    <ScrollView horizontal={true}>
                        <View>

                            <Table>
                                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header}
                                     textStyle={styles.text}
                                />

                                <TableWrapper>
                                    {

                                        isloading ? <LoadingReact/> :
                                            tableData.map((rowData, index) => (
                                                <Rows
                                                    key={index}
                                                    data={rowData}
                                                    widthArr={state.widthArr}
                                                    style={{backgroundColor: '#fff'}}
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

            <View style={styles.paginationButtons}>
                <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 1}>
                    <Text style={styles.paginationButton}>Previous</Text>
                </TouchableOpacity>
                <Text>{currentPage}/{totalPage} </Text>
                <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPage}>
                    <Text style={styles.paginationButton}>Next</Text>
                </TouchableOpacity>
            </View>


            <ModalPoup visible={exportConfirm}>

                <TouchableOpacity onPress={() => setExportConfirm(false)}>
                    <View style={{alignItems: 'flex-end'}}>
                        <SVG.Icon_close/>
                    </View>
                </TouchableOpacity>
                <Text style={{marginVertical: 12, fontSize: 16, textAlign: 'center', color: "#323232"}}>
                    Bạn có thể xuất tất cả mã thẻ học thử hoặc từng loại mã thẻ học thử theo trạng thái ra file excel để
                    dễ dàng quản lý hơn nhé!
                </Text>
                <Formik
                    initialValues={{
                        // ... Other initial values
                        cardId: id
                    }}
                    onSubmit={values => {
                        exportTrial(values)
                    }}
                >
                    {({handleSubmit, isValid, values}) => (
                        <>
                            <Field
                                component={CustomSearchCustomer}
                                title="Loại thẻ"
                                name="card"
                                readOnly={true}
                                placeholder={name}
                            />

                            <Field
                                component={CustomSearchCustomerDropDown}
                                data={status}
                                title="Trạng thái"
                                titleSelect="Chọn trạng thái"
                                labelField="label"
                                valueField="value"
                                name="used"
                            />
                            <View style={styles.containerButtonSearch}>
                                <TouchableOpacity onPress={() => {
                                    handleSubmit()
                                    setExportConfirm(false)
                                }} style={styles.exportButton}>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.searchBtnText}>Xuất thẻ</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </>
                    )}
                </Formik>

            </ModalPoup>


            <ModalPoup visible={checkModal}>

                <View style={{marginBottom:20}}>
                    <TouchableOpacity onPress={() => setCheckModal(false)}>
                        <View style={{alignItems: 'flex-end'}}>
                            <SVG.Icon_close/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{marginVertical: 12, fontSize: 16, textAlign: 'center', color: "#323232"}}>
                        Bạn có chắc chắn muốn xuất mã thẻ
                    </Text>
                    <Text
                        style={{marginBottom: 24, fontSize: 16, textAlign: 'center', color: "#323232", fontWeight: "bold"}}>
                        {namecardExport && maskCardCode(namecardExport)}
                    </Text>
                    <Text style={{marginVertical: 12, fontSize: 16, textAlign: 'center', color: "#323232"}}>
                        Bạn có chắc chắn muốn xuất mã thẻ
                    </Text>
                    <TouchableOpacity


                        onPress={() => cardVerified()}
                        style={styles.Btn}>
                        <View style={{flexDirection: "row",}}>

                            <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>Xuất
                                thẻ</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ModalPoup>
            <ModalPoup visible={checkModalVerified}>

                <View style={{marginBottom:20}}>
                    <TouchableOpacity onPress={() => setCheckModalVerified(false)}>
                        <View style={{alignItems: 'flex-end'}}>
                            <SVG.Icon_close/>
                        </View>
                    </TouchableOpacity>

                    <View style={{alignItems: 'center'}}>
                        <SVG.Icon_verified_green/>
                    </View>
                    <Text style={{fontSize: 18, textAlign: 'center', color: "#323232", fontWeight: "bold"}}>
                        Bạn đã xuất thẻ thành công!
                    </Text>


                    <View
                        style={{
                            marginTop: 60,
                            borderRadius: 8,
                            flexDirection: 'row',
                            height: 40,
                            backgroundColor: "#EEFAFF",
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>


                        <View style={{
                            paddingLeft: 12,

                            justifyContent: 'center',
                        }}>


                            <Text numberOfLines={1} style={{color: '#141414', fontSize: 14,}}>Mã thẻ của bạn là: <Text
                                numberOfLines={1} style={{color: '#0288D1', fontSize: 14,}}>{namecardExport}</Text></Text>

                        </View>
                        <TouchableOpacity


                            onPress={() => onClipboard(namecardExport)}>
                            <View
                                style={{
                                    paddingRight: 6,
                                    justifyContent: 'center',

                                }}>
                                <SVG.Icon_copy_blue height={45} width={45}/>

                            </View></TouchableOpacity>
                    </View>
                    <Text style={{marginVertical: 12, fontSize: 16, textAlign: 'center', color: "#323232"}}>
                        Hãy gửi cho khách hàng và hướng dẫn họ kích hoạt thẻ tại trang web<Text
                        style={{color: "#0288D1"}}> futurelang.edu.vn</Text>
                    </Text>
                    <TouchableOpacity

                        onPress={() => {
                            setCheckModalVerified(false)
                            navigation.navigate(ROUTES.CARD_WAREHOUSE_TAB_NAVIGATOR)
                        }}

                        style={styles.Btn}>
                        <View style={{flexDirection: "row",}}>

                            <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>Quay lại
                                trang chủ</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </ModalPoup>

        </ScrollView>
    );
};


export default CarDetail;
const styles = StyleSheet.create({
    Btn: {

        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
    },
    main: {
        backgroundColor: 'white',
        width: '100%',
        paddingTop: 36,
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
        marginTop: 12,
        marginHorizontal: 16,
    },
    containerTable: {flex: 1, backgroundColor: '#fff', paddingTop: 12},
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
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: '#4FC3F733',
        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextPackageMonth: {fontSize: 12, textAlign: 'center', color: '#0288D1'},
    btnPackageStatus: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#6BB96A33',
        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextPackageStatus: {fontSize: 12, textAlign: 'center', color: '#03AA00'},
    btnPackageWeek: {
        marginTop: 6,
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: '#FFF2F066',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextPackageWeek: {fontSize: 12, textAlign: 'center', color: '#D51E03'},
    containerButton: {
        marginVertical: 6,
        flex: 1,
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
    exportButton: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 55,
        backgroundColor: '#0288D1',
        borderRadius: 15,
        marginBottom: 10
    },
    searchBtnText: {color: '#FFFFFF', fontSize: 16, fontWeight: '500'},


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
    greyButton: {
        backgroundColor: 'grey', // Apply grey color when isExposed is true
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
    modalCloseButton: {
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalCloseButtonText: {
        color: 'black',
        fontSize: 16,
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
