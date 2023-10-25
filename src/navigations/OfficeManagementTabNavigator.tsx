import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {ROUTES, SVG} from "../constants";
import NeedOfCare from "../screens/customer/trial-study/NeedOfCare";
import Potential from "../screens/group/group-list/Potential";
import StopTakingCare from "../screens/customer/trial-study/StopTakingCare";
import {Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommonHeaderTab from "../components/commons/commonHeaderTab";
import TrialStudyAll from "../screens/customer/trial-study/TrialStudyAll";
import GroupList from "../screens/group/group-list/GroupList";
import GroupListCustomer from "../screens/group/group-list/GroupListCustomer";
import OfficeSalesManagement from "../screens/office/office-management/OfficeSalesManagement";
import OfficeHumanResourceManagement from "../screens/office/office-management/OfficeHumanResouceManagement";
import OfficeInformationManagement from "../screens/office/office-management/OfficeInformationManagement";
import CommonHeaderOfficeTab from "../components/commons/commonHeaderOfficeTab";
import useDepartment from "../screens/office/useDepartment";
import {useEffect} from "react";
import {StorageHelper} from "../constants/storageHelper";
import LoadingReact from "../components/commons/loading";

const Tab = createMaterialTopTabNavigator();

function OfficeManagementTabNavigator() {
    const listTab = [
        { text: 'Quản lý doanh số', isActive: true, route: ROUTES.OFFICE_MANAGEMENT_SALES },
        { text: 'Quản lý nhân sự', isActive: false, route: ROUTES.OFFICE_MANAGEMENT_HUMAN_RESOURCE},
        // { text: 'Thông tin GĐ VP', isActive: false, route: ROUTES.OFFICE_MANAGEMENT_INFORMATION},
    ];

    const {departmentSalesData,fetchDepartmentSales,isFetchingDepartmentSales}  = useDepartment()
    useEffect(()=>{
        fetchData({})
    },[])

    const fetchData   = async (p:any)=>{
        const user: any = await StorageHelper.getUser();
        let userJson = JSON.parse(user)
        console.log("user: "+ JSON.stringify(userJson.departmentId))
        const id = userJson.departmentId
        const params = {
            ...p,
            id
        }

        fetchDepartmentSales(params)

    }

    useEffect(()=>{
        if(departmentSalesData){
            console.log("departmentSalesData: "+ JSON.stringify(departmentSalesData))
        }
    },[departmentSalesData])


    return (
        <>

            {isFetchingDepartmentSales?<LoadingReact/>:  departmentSalesData&& departmentSalesData?.status == 400? OfficeNotFound():<><View style={styles.container}>
                <View style={styles.frame}>
                    <View style={styles.overlapGroup}>
                        <View style={styles.textWrapper}>
                            <Text style={{fontWeight: "bold",fontSize:20}} >{departmentSalesData?.data?.manager[0]?.name}</Text>

                        </View>
                    </View>
                    <View style={styles.textWrapper2}>
                        <Text style={{color:'#000000'}} >Giám đốc Văn phòng: {departmentSalesData?.data?.manager[0]?.fullname} </Text>
                        <Text style={{color:'#000000'}}>Số điện thoại: {departmentSalesData?.data?.manager[0]?.telephone}</Text>
                    </View>

                </View>

            </View>
            {/*    <Tab.Navigator tabBar={(props) => <CommonHeaderOfficeTab {...props} listTab={listTab} />} screenOptions={{swipeEnabled: false}}>*/}
            {/*    <Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_SALES} component={OfficeSalesManagement} />*/}
            {/*    <Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_HUMAN_RESOURCE} component={OfficeHumanResourceManagement} />*/}
            {/*/!*<Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_INFORMATION} component={OfficeInformationManagement} />*!/*/}
            {/*    </Tab.Navigator>*/}
                <Tab.Navigator tabBar={(props) => <CommonHeaderOfficeTab {...props} listTab={listTab} />} screenOptions={{swipeEnabled: false}}>
                    <Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_SALES} component={OfficeSalesManagement} />
                    <Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_HUMAN_RESOURCE} component={OfficeHumanResourceManagement} />
                    {/*<Tab.Screen name={ROUTES.OFFICE_MANAGEMENT_INFORMATION} component={OfficeInformationManagement} />*/}
                </Tab.Navigator>
            </>
            }


        </>

    );
}

export default OfficeManagementTabNavigator;


const OfficeNotFound =()=>{
    const screenHeight = Dimensions.get('window').height;
    const openGoogleLink = () => {
        const googleLink = 'https://www.google.com';

        Linking.openURL(googleLink)
            .catch((err) => console.error('An error occurred: ', err));
    };

    return(
        <View style={{ height:screenHeight, flex: 1,
            justifyContent: 'center',
            alignItems: 'center'     }}>
            <SVG.Search width={100}></SVG.Search>
            <Text style={{textAlign:"center",marginBottom:20,color:"#000000"}}>
                <Text>Bạn chưa có văn phòng.</Text>
                {'\n'}
                <Text>Bạn có muốn đăng ký mở văn phòng?</Text>
            </Text>
            <TouchableOpacity onPress={openGoogleLink} style={styles.containerTextAdd}>
                <Text style={styles.textAdd}>Đăng ký nhanh</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    },
    frame: {
        backgroundColor: '#ffffff',
        borderColor: '#ebb501',
        borderRadius: 16,
        borderWidth: 1,
        height: 120,
        overflow: 'hidden',
        position: 'relative',
        width: '95%',
        marginTop: 20,
        display: "flex",
        flexDirection: "column"
    },
    overlapGroup: {
        backgroundColor: 'linear-gradient(180deg, rgb(255, 167.03, 69.06) 0%, rgb(255, 234.92, 54.19) 100%)',
        height: 50,
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: "center"
    },
    textWrapper: {
        color: '#000000',
        fontFamily: 'Roboto-Medium',
        fontWeight: "bold",
        letterSpacing: 0,
        lineHeight: 'normal',
        position: 'absolute',
        top: 13,
        whiteSpace: 'nowrap',
    },
    div: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        left: 11,
        letterSpacing: 0,
        lineHeight: 'normal',
        position: 'absolute',
        top: 56,
        whiteSpace: 'nowrap',
    },
    textWrapper2: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        left: 20,
        letterSpacing: 0,
        lineHeight: 'normal',
        position: 'absolute',
        top: 60,
        whiteSpace: 'nowrap',
    }, containerTextAdd: {flexDirection: 'row', width: '70%', paddingVertical: 14, backgroundColor: '#0288D1', borderRadius: 12,justifyContent:"center"},
    textAdd: {
        fontSize: 16,
        color: '#EEFAFF',
        fontWeight: '500',
        textAlign: 'left',
        marginLeft: 8
    },


});
