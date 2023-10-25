import {Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ROUTES, SVG} from "../../../constants";
import BoxShadow from "../../../components/commons/commonBoxShadow";
import CommonButton from "../../../components/commons/commonButton";
import Clipboard from "@react-native-community/clipboard";
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share'
import {THANK_YOU} from "../../../constants/thank_you";

const ResultCreateAccount = ({navigation, route}: { navigation: any, route: any }) => {


    const {name, phone, expiredAt, cardCode, gmail, cardName} = route?.params


    const copyAllToClipboard = () => {
        const allContent = `Họ tên: ${name}\nSố điện thoại: ${phone}\nGmail: ${gmail}\nMã thẻ: ${cardCode}`;
        Clipboard.setString(allContent);
    };

    const shareContent = () => {
        const contentToShare = `Họ tên: ${name}\nSố điện thoại: ${phone}\nGmail: ${gmail}\nMã thẻ: ${cardCode}`;

            const options ={
                message:contentToShare,
                url:THANK_YOU
            }



        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && Toast.show("lỗi")
            });



    };


    function showToast() {
        Toast.show('copied');
    }


    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    <View style={styles.footerButtonContainer}>
                        <Text style={styles.footerBlackText}>
                            Chúc mừng bạn đã kích hoạt thành công gói
                        </Text>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <Text style={styles.footerBoldText}>
                                {cardName}
                            </Text>
                            <Text style={styles.footerBlackText}> </Text>
                            <Text style={styles.footerBlackText}>
                                cho học viên
                            </Text>
                        </View>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <SVG.Icon_success style={{width: 162, height: 162}}></SVG.Icon_success>
                    </View>
                    <View style={{flex: 1, marginVertical: 24}}>
                        <View style={styles.groupShadow}>
                            <View style={styles.groupBorder}>
                                <SVG.Icon_copy style={styles.iconCopy}></SVG.Icon_copy>
                                <TouchableOpacity onPress={() => {
                                    copyAllToClipboard();
                                    showToast()
                                }}><Text style={styles.textCopy}>Copy</Text></TouchableOpacity>

                            </View>
                            <BoxShadow title={'Họ tên'} content={name} isBlack={true}></BoxShadow>
                            <BoxShadow title={'Số điện thoại'} content={phone} isBlack={true}></BoxShadow>
                            <BoxShadow title={'Gmail'} content={gmail} isBlack={true}></BoxShadow>
                            <BoxShadow title={'Mã thẻ'} content={cardCode} isBlack={true}></BoxShadow>
                            {/*<BoxShadow title={'Ngày hết hạn'} content={expiredAt} isBlack={true}></BoxShadow>*/}
                        </View>
                    </View>
                    <View style={styles.centerTextContainer}>
                        <Text style={styles.footerBlackText}>
                            Hãy tải thư cảm ơn về và gửi cho khách hàng!
                        </Text>
                    </View>
                    <View style={styles.containerThank}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.textThank}>Thư cảm ơn</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                            <TouchableOpacity onPress={shareContent}>
                                <SVG.IconShare style={{color: '#0288D1', marginRight: 8}} />
                            </TouchableOpacity>
                            <SVG.IconDownloadNotRound
                                style={{color: '#0288D1', marginLeft: 8}}></SVG.IconDownloadNotRound>
                        </View>

                    </View>
                    <View style={{padding: 12, backgroundColor: '#EEFAFF', borderRadius: 8}}>
                        <Image
                            style={{
                                width: '100%',
                                position: 'relative',
                                resizeMode: 'stretch',
                                justifyContent: 'center'
                            }}
                            source={require('../../../assets/image/thank_you.png')}
                        />
                    </View>
                    <View style={{paddingBottom: 47}}>
                        <CommonButton handleSubmit={() => navigation.navigate(ROUTES.CUSTOMER_NAVIGATOR)}
                                      text={'Về trang quản lý'}></CommonButton>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

export default ResultCreateAccount;
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff'
    },
    container: {
        width: '100%',
    },
    wFull: {
        width: '92%',
        marginTop: 18,
        marginHorizontal: 16,
        borderRadius: 25,
    },
    footerButtonContainer: {
        flexDirection: 'column',
        paddingTop: 12,
        paddingBottom: 47,
        textAlign: 'center',
        alignItems: 'center'
        //paddingLeft: 16,
    },
    centerTextContainer: {
        flexDirection: 'column',
        paddingBottom: 8,
        textAlign: 'center',
        alignItems: 'center'
        //paddingLeft: 16,
    },
    footerBlackText: {
        fontSize: 16,
        color: '#323232',
        paddingBottom: 2,
    },
    footerBoldText: {
        fontSize: 16,
        color: '#323232',
        paddingBottom: 2,
        fontWeight: 'bold'
    },
    groupShadow: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        //...StyleSheet.absoluteFillObject,
        shadowColor: '#0288D1',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
        paddingVertical: 11,
        paddingHorizontal: 12,
    },
    groupBorder: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        borderColor: '#0288D1',
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: '#EEFAFF',
        marginBottom: 10
    },
    iconCopy: {width: 16, height: 16, color: '#0288D1'},
    textCopy: {fontSize: 12, fontWeight: 500, paddingLeft: 4, justifyContent: 'center', alignItems: 'center',color:'#000000'},
    containerThank: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEFAFF',
        padding: 12,
        borderRadius: 8
    },
    textThank: {
        fontSize: 16,
        color: '#0288D1',
        fontWeight: 500,
    }
});
