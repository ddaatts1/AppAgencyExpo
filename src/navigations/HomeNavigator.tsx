import React, { useState, useEffect } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { ROUTES, SVG } from '../constants';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase, useNavigation, useIsFocused } from '@react-navigation/native';
import NewsDetail from '../screens/module/News/NewsDetail';
import DiscountDetail from '../screens/module/Discount/DiscountDetail';
import ScheduleDetail from '../screens/module/Schedules/ScheduleDetail';
import Schedules from '../screens/module/Schedules/ScheduleList';
import DiscountPayment from '../screens/module/Discount/DiscountPayment';
import { DetailOrder, Intro, Notifications, Receiver, Support } from '../screens';
import Discount from '../screens/module/Discount/DiscountAll';

import CardWareHouseTabNavigator from '../screens/card-warehouse/CardWareHouseTabNavigator';
import Income from '../screens/income/Income';
import SupportManagement from '../screens/support/SupportManagement';
import Chat from '../screens/support/chat/Chat';
import PhoneNumber from '../screens/support/phone-number/PhoneNumber';
import Question from '../screens/support/question/Question';
import Feedback from '../screens/support/feedback/Feedback';
import Instruct from '../screens/support/instruct/Instruct';
import Community from '../screens/support/community/Community';
import OfficeTabNavigator from '../screens/office/OfficeNavigator';
import TrainingSchedule from '../screens/training/training-schedule/TrainingSchedule';
import FutureAcademy from '../screens/training/future-academy/FutureAcademy';
import CustomerTabNavigator from '../screens/customer/Customer';
import ShopTabNavigator from '../screens/module/Shop/BottomShop';
import Verification from '../screens/auth/Verification';
import ThankLetter from '../screens/module/DocumentRequire/ThankLetter';
import Culture from '../screens/module/DocumentRequire/Culture';
import Term from '../screens/module/DocumentRequire/Term';
import Contract from '../screens/module/DocumentRequire/Contract';
import Rule from '../screens/module/DocumentRequire/Rule';
import Maintaince from '../screens/home/Maintaince';
import Cart from '../screens/module/Shop/Cart';
import Course from '../screens/module/Course/Course';
import Group from '../screens/group/Group';
import GoldenTable from '../screens/goldenTable/GoldenTable';
import CustomerTrialStudyTabNavigator from './CustomerTrialStudyTabNavigator';
import InformationCustomerDetails from '../screens/customer/trial-study/InformationCustomerDetails';
import CardDetail from '../screens/card-warehouse/card-warehouse-total/cardDetail';
import CardWareHouseNavigator from '../screens/card-warehouse/CardWareHouseNavigator';
import WholeSalePayment from '../screens/module/Shop/WholeSale/WholeSalePayment';
import CancelOrder from '../screens/module/Shop/WholeSale/CancelOrder';
import ConfirmOrder from '../screens/module/Shop/WholeSale/ConfirmOrder';
import LanguageTabNavigator from './LanguageTab';
import SingleOrderDetail from '../screens/module/Shop/SingleOrder/SingleOrderDetail';
import FshopDetail from '../screens/module/Shop/Fshop/FshopDetail';
import FshopConfirmOrder from '../screens/module/Shop/Fshop/FshopConfirmOrder';
import FshopCancelOrder from '../screens/module/Shop/Fshop/FshopCancelOrder';
import CardEng from '../screens/module/Shop/SingleOrder/CardEng';
import OfficeListDetails from '../screens/office/office-list/OfficeListDetails';
import OfficeManagementDetails from '../screens/office/office-management/OfficeManagementDetails';
import OfficeAddHumanResource from '../screens/office/office-management/OfficeAddHumanResource';
import IncomeManagementTabNavigator from './IncomeManagementTabNavigator';

import CreateAccountDetails from '../screens/customer/create-account/CreateAcountDetails';
import ResultCreateAccount from '../screens/customer/create-account/ResultCreateAccount';
import TrainingNavigator from '../screens/training/TrainingNavigator';
import GroupTabNavigator from '../screens/group/Group';
import GroupListDetails from '../screens/group/group-list/GroupListDetails';
import GroupListCustomerDetails from '../screens/group/group-list/GroupListCustomerDetails';
import GroupListProfile from '../screens/group/group-list/GroupListProfile';
import NewsTab from './NewsTab';
import { ActivityIndicator } from 'react-native-paper';
import { StorageHelper } from '../constants/storageHelper';
import useLogin from '../screens/auth/useLogin';
import { values } from 'lodash';
import LoadingReact from '../components/commons/loading';
import TrainingTabNavigator from '../screens/training/TrainingTabNavigator';
import InformationCustomerBuyerDetails from '../screens/customer/buyer/InformationCustomerBuyerDetails';
import NotificationList from '../screens/home/notification/NotificationList';
import NotificationDetail from '../screens/home/notification/NotificationDetail';
import IncentiveProgram from '../screens/module/IncentivePrograms/IncentiveProgram';
import OfficeHumanResourceDetail from '../screens/office/office-management/OfficeHumanResourceDetail';
import AddOrder from '../screens/office/office-management/AddOrder';
import Location from '../screens/home/personal/location';
import SingleOrderConfirmOrder from '../screens/module/Shop/SingleOrder/SingleOrderConfirmOrder';
import GOLDEB_TABLE_TAB_NAVIGATOR from '../screens/goldenTable/GoldenTableTabNavigator';
import GoldenTableTabNavigator from '../screens/goldenTable/GoldenTableTabNavigator';
import Account from '../screens/home/personal/account';

const Stack = createStackNavigator();

function HomeNavigator({ isIntro }: any) {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const headerLeftComponent = (text: string) => (
        <View style={{ flex: 1 }}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <SVG.Leftcircleo style={styles.iconLef} />
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.headerText}>
                        {text}
                    </Text>
                </View>
            </View>

        </View>
    );

    const headerLeftIconNoColor = (text: string) => (
        <View style={{ flex: 1 }}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <SVG.Icon_Left_NoColor style={styles.iconLef} />
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.headerText}>
                        {text}
                    </Text>
                </View>
            </View>

        </View>
    );

    const headerLeftComponentWhite = (text: string) => (
        <View style={{ flex: 1 }}>
            <View
                style={styles.headerLeftWhite}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SVG.Leftcircleo style={styles.iconBackStyle} />
                </TouchableOpacity>

                <Text style={styles.textBannerWhite}>
                    {text}
                </Text>
            </View>
        </View>
    );

    const headerWhiteComponent = (text: string) => (
        <View style={{ flex: 1 }}>
            <View
                style={styles.headerLeftWhite}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SVG.Leftcircleo style={styles.iconBackStyle} />
                </TouchableOpacity>

                <Text style={styles.textBannerWhite}>
                    {text}
                </Text>
            </View>
        </View>
    );

    const headerBackground = (
        <Image
            style={styles.container}
            source={require('../assets/image/Header1.png')}
        />
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isIntros, setIsIntros] = useState(false);
    const { checkRule }: any = useLogin();

    const focus = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await checkRule();
                if (result == true) {
                    setIsIntros(true);
                } else if (result == false) {
                    setIsIntros(false);
                } else {
                    await checkRule();
                    setIsIntros(true);

                }

                setIsLoading(true);
            } catch (error) { }
        };
        fetchData();
    }, []);

    return (
        isLoading ? <Stack.Navigator screenOptions={{}} initialRouteName={isIntros ? ROUTES.INTRO : ROUTES.HOME}>
            <Stack.Screen
                name={ROUTES.INTRO}
                component={Intro}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.CUSTOMER_TRIAL_STUDY}
                component={CustomerTrialStudyTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.SINGLEORDER}
                component={LanguageTabNavigator}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name={ROUTES.DETAIL_ORDER}
                component={DetailOrder}
                options={{
                    headerBackground: () => (
                        <View
                            style={[
                                styles.Header,
                                {
                                    shadowColor: '#000',
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10,
                                    elevation: 5,
                                    //  backgroundColor: "red"
                                },
                            ]}
                        />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return (
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingTop: 12,
                                        paddingLeft: 10,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(ROUTES.ORDER)}>
                                        <SVG.Leftcircleo style={styles.iconLef} />
                                    </TouchableOpacity>

                                    <Text
                                        style={{
                                            color: '#323232',
                                            fontSize: 20,
                                            paddingLeft: 10,
                                            paddingTop: 5,
                                        }}>
                                        Quản lý đơn hàng
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.CUSTOMER_TABLE_DETAILS}
                component={InformationCustomerDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Chi tiết khách hàng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.CUSTOMER_BUYER_TABLE_DETAILS}
                component={InformationCustomerBuyerDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Chi tiết khách hàng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.CUSTOMER_CREATE_ACCOUNT_DETAILS}
                component={CreateAccountDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Đăng ký thẻ cho khách hàng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.INCENTIVEPROGRAMS}
                component={IncentiveProgram}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerLeftComponent('Chương trình ưu đãi'),
                }}
            />

            <Stack.Screen
                name={ROUTES.CUSTOMER_CREATE_ACCOUNT_RESULT}
                component={ResultCreateAccount}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Đăng ký thẻ cho khách hàng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.HOME}
                component={BottomTabNavigator}
                options={{
                    title: 'Trang chủ',
                    headerShown: false,
                }}
            />



            <Stack.Screen
                name={ROUTES.SCHEDULEDETAIL}
                component={ScheduleDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/BannerHome.png')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('');
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.ALL}
                component={NewsTab}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Tin tức');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.NEWSDETAIL}
                component={NewsDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/logo.jpg')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftIconNoColor('');
                    },
                }}
            />

            <Stack.Screen
                name={ROUTES.NOTIFICATION_DETAIL}
                component={NotificationDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/logo.jpg')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftIconNoColor('');
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.DISCOUNTDETAIL}
                component={DiscountDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/CardEng.png')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('');
                    },
                }}
            />

            <Stack.Screen
                name={ROUTES.SINGLEORDERDETAIL}
                component={SingleOrderDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/CardEng.png')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('');
                    },
                }}
            />

            <Stack.Screen
                name={ROUTES.FSHOPDETAIL}
                component={FshopDetail}
                options={{
                    headerBackground: () => (
                        <Image style={styles.headerBox} source={require('../assets/image/BaloDetail.png')} />
                    ),
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('');
                    },
                }}
            />

            {/* <Stack.Screen
        name={ROUTES.PROGRAM}
        component={Program}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />

          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Tin tức');
          },

        }}
      /> */}
            {/* <Stack.Screen
        name={ROUTES.NEWS}
        component={News}
        options={{
          headerBackground: () => (
            <Image
              style={styles.Header}
              source={require('../assets/image/Header1.png')}
            />

          ),

          headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
          headerTitle: '',
          headerShown: true,
          headerLeft: () => {
            return headerLeftComponent('Tin tức');
          },

        }}
      /> */}

            <Stack.Screen
                name={ROUTES.SCHEDULELIST}
                component={Schedules}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Lịch sắp tới');
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.DISCOUNTPAYMENT}
                component={DiscountPayment}
                options={{

                    headerTitleStyle: { fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Thanh toán');
                    },

                }}
            />
            {/* <Stack.Screen
        name={ROUTES.CARDENG}
        component={CardEng}
        options={{

        }}
      /> */}
            <Stack.Screen
                name={ROUTES.CARDDETAIL}
                component={CardDetail}
                options={{

                    headerTitleStyle: { fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Thanh toán');
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.CUSTOMER_NAVIGATOR}
                component={CustomerTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.LOCATION}
                component={Location}
                options={{
                    headerBackground: () => (
                        <View
                            style={[
                                styles.Header,
                                {
                                    shadowColor: '#000',
                                    shadowOpacity: 0.5,
                                    shadowRadius: 10,
                                    elevation: 5,
                                    //  backgroundColor: "red"
                                },
                            ]}
                        />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return (
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingTop: 12,
                                        paddingLeft: 10,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(ROUTES.RECEIVER)}>
                                        <SVG.Leftcircleo style={styles.iconLef} />
                                    </TouchableOpacity>

                                    <Text
                                        style={{
                                            color: '#323232',
                                            fontSize: 20,
                                            paddingLeft: 10,
                                            paddingTop: 5,
                                        }}>
                                        Thông tin nhận hàng
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
            <Stack.Screen name={ROUTES.RECEIVER}
                component={Receiver}
            />
            <Stack.Screen
                name={ROUTES.CARD_WAREHOUSE_TAB_NAVIGATOR}
                component={CardWareHouseTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.TRAINING_TAB_NAVIGATOR}
                component={TrainingTabNavigator}
                options={{
                    headerShown: false,
                }}
            />




            <Stack.Screen
                name={ROUTES.CARD_WAREHOUSE_NAVIGATOR}
                component={CardWareHouseNavigator}

                options={{

                    headerTitleStyle: { fontSize: 18 },
                    headerTitle: '',
                    headerShown: false,


                }}
            />
            <Stack.Screen
                name={ROUTES.OFFICE_NAVIGATOR}
                component={OfficeTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.OFFICE_LIST_DETAILS}
                component={OfficeListDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Thông tin chi tiết của văn phòng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.ADD_ORDER}
                component={AddOrder}
                options={{
                    headerBackground: () => (<Image
                        style={styles.container}
                        source={require('../assets/image/Header1.png')}
                    />),
                    // headerBackground: () => (
                    //     <View style={styles.headerWhite} />
                    // ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Thêm đơn hàng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.OFFICE_HUMAN_RESOURCE_DETAIL}
                component={OfficeHumanResourceDetail}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Chi tiết nhân sự '),

                }}
            />

            <Stack.Screen
                name={ROUTES.OFFICE_MANAGEMENT_DETAILS}
                component={OfficeManagementDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Quản lý văn phòng'),

                }}
            />

            <Stack.Screen
                name={ROUTES.OFFICE_ADD_HUMAN_RESOURCE}
                component={OfficeAddHumanResource}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Thêm nhân sự'),

                }}
            />

            <Stack.Screen
                name={ROUTES.INCOME}
                component={IncomeManagementTabNavigator}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Quản lý thu nhập');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_MANAGEMENT}
                component={SupportManagement}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Hỗ trợ');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_CHAT}
                component={Chat}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Chat với kỹ thuật viên');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_PHONE_NUMBER}
                component={PhoneNumber}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Số điện thoại hỗ trợ');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_QUESTION}
                component={Question}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Câu hỏi thường gặp');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_FEEDBACK}
                component={Feedback}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Góp ý từ tài khoản');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT_INSTRUCT}
                component={Instruct}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Hướng dẫn');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.TRAINING_NAVIGATOR}
                component={TrainingNavigator}
                initialParams={{ Stack: Stack }}
                options={{


                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: false,
                    headerLeft: () => {
                        return headerLeftComponent('Lịch sắp tới');
                    },

                }}
            />

            <Stack.Screen
                name={ROUTES.SUPPORT_COMMUNITY}
                component={Community}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Cộng đồng');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.CANCELORDER}
                component={CancelOrder}
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponentWhite('Thanh toán');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.CONFIRMORDER}
                component={ConfirmOrder}
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponentWhite('Thanh toán');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.FSHOPCONFIRMORDER}
                component={FshopConfirmOrder}
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponentWhite('Thanh toán');
                    },

                }}
            />

            <Stack.Screen
                name={ROUTES.SINGLEORDERCONFIRMORDER}
                component={SingleOrderConfirmOrder}
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponentWhite('Thanh toán');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.FSHOPCANCELORDER}
                component={FshopCancelOrder}
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponentWhite('Thanh toán');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.GROUP}
                component={GroupTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.GROUP_LIST_DETAILS}
                component={GroupListDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Thông tin chi tiết của đại sứ'),

                }}
            />
            <Stack.Screen
                name={ROUTES.GROUP_LIST_CUSTOMER_DETAILS}
                component={GroupListCustomerDetails}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Thông tin chi tiết của đại sứ'),

                }}
            />
            <Stack.Screen
                name={ROUTES.GROUP_LIST_PROFILE}
                component={GroupListProfile}
                options={{
                    headerBackground: () => (
                        <View style={styles.headerWhite} />
                    ),
                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => headerWhiteComponent('Danh sách đội nhóm'),
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <SVG.IconGroupList style={styles.iconHeaderRight} />
                            <Text style={styles.textHeaderRight}>Danh sách</Text>
                        </View>
                    ),

                }}
            />

            <Stack.Screen
                name={ROUTES.WHOLE_PAYMENT}
                component={WholeSalePayment}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Thanh toán');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.GOLDENTABLE}
                component={GoldenTable}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Bảng vàng');
                    },

                }}
            />

            <Stack.Screen
                name={ROUTES.GOLDEB_TABLE_TAB_NAVIGATOR}
                component={GoldenTableTabNavigator}
                options={{
                    headerBackground: () => headerBackground,
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: '',
                    headerShown: false,
                    headerLeft: () => {
                        return headerLeftComponent('Bảng vàng');
                    },

                }}
            />

            <Stack.Screen
                name={ROUTES.NOTIFICATION}
                component={Notifications}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name={ROUTES.DISCOUNT}
                component={Discount}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Ưu đãi cho bạn');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.VERIFICATION}
                component={Verification}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Xác minh tài khoản');
                    },
                }}
            />
            <Stack.Screen
                name={ROUTES.SUPPORT}
                component={Support}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Cộng đồng');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.CART}
                component={Cart}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    cardStyle: { backgroundColor: '#fff' },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Giỏ hàng');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.COURSE}
                component={Course}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('FutureLang Academy');
                    },

                }}
            />
            <Stack.Screen
                name={ROUTES.THANKLETTER}
                component={ThankLetter}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.CONTRACT}
                component={Contract}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.CULTURE}
                component={Culture}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.TERM}
                component={Term}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.RULE}
                component={Rule}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.WHOLE_SALE}
                component={ShopTabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={ROUTES.MAINTAINCE}
                component={Maintaince}
                options={{
                    title: 'ddssssss',
                    headerShown: false,
                }}
            />

            <Stack.Screen name={ROUTES.NOTIFICATION_LIST}
                component={NotificationList}
                options={{
                    title: 'ddssssss',
                    headerShown: true,
                }}
            />

            <Stack.Screen name={ROUTES.ACCOUNT}
                component={Account}
                options={{
                    headerBackground: () => (
                        <Image
                            style={styles.Header}
                            source={require('../assets/image/Header1.png')}
                        />

                    ),

                    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
                    headerTitle: '',
                    headerShown: true,
                    headerLeft: () => {
                        return headerLeftComponent('Xác minh tài khoản');
                    },
                }}
            />


        </Stack.Navigator> : <LoadingReact />


    );
}

const styles = StyleSheet.create({
    Header: {
        height: 100,
        width: '100%',
        backgroundColor: 'white',

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        ...StyleSheet.absoluteFillObject,
    },
    iconLef: {
        width: 40,
        height: 40,
        // marginTop: 80,
        //  marginLeft: 20
    },
    headerBox: {
        width: '100%',
        height: 200,
        position: 'relative',
        zIndex: 1,
        resizeMode: 'cover',
    },
    iconRight: {
        width: 40,
        height: 40,
    },
    container: {
        height: 90,
        width: '100%',
        backgroundColor: 'white',

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        ...StyleSheet.absoluteFillObject,

    },
    headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
    headerLeft: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 16,
    },
    headerText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
        paddingLeft: 10,
        paddingBottom: 2,
    },

    iconBackStyle: {
        width: 32,
        height: 32,
    },
    textBannerWhite: {
        color: '#323232',
        fontSize: 18,
        paddingLeft: 8,
        paddingTop: 4,
        fontWeight: 600,
    },
    headerWhite: {
        height: 85,
        width: '100%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        ...StyleSheet.absoluteFillObject,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    headerLeftWhite: {
        flexDirection: 'row',
        paddingTop: 12.5,
        paddingLeft: 16,
    },
    headerTextWhite: {
        fontSize: 20,
        color: '#323232',
        fontWeight: '600',
        paddingLeft: 10,
        paddingBottom: 2,
    },
    headerRightContainer: { flexDirection: 'column', marginRight: 15, marginTop: 6 },
    iconHeaderRight: { color: '#0288D1', width: 24, height: 24, alignSelf: 'center' },
    textHeaderRight: { fontSize: 13, fontWeight: 400, color: '#0288D1', alignSelf: 'center', paddingTop: 3 },
});
export default HomeNavigator;
