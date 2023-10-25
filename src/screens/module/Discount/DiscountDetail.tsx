import React from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import Gift from './Gift';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CountDownTimer from '../../../components/commons/countDownTimer';


const DiscountDetail = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.box}>
                        <Text style={styles.headerTitle}>
                            Combo Thẻ học tiếng Anh 3 Năm FutureLang
                        </Text>
                        <View style={styles.countTime}>
                            <View style={styles.quality}>
                                <Text style={styles.textContent}>Đã bán
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'Roboto',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        color: '#323232',
                                        marginLeft: 4,
                                    }}
                                >
                                    5 combo
                                </Text>
                            </View>
                            <View style={styles.time}>
                                <SVG.Timer  style={styles.iconTime}/>
                                <Text style={styles.textContent}>Kết thúc trong</Text>
                                {/* <CountDownTimer /> */}
                            </View>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.priceDiscount}>
                                <SVG.VND/>
                                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>2.045.000</Text>
                            </View>
                            <View style={styles.priceActual}>
                                <SVG.VND/>
                                <Text style={{color: '#D51E03', fontSize: 18, fontWeight: '600'}}>1.000.000</Text>
                            </View>
                        </View>
                        <View style={styles.box2}>
                            <Text style={styles.title}>Mô tả sản phẩm</Text>
                            <Text style={styles.content}>Thẻ học tiếng Anh 3 năm FutureLang dành cho các học viên dốt tiếng Anh, cải thiện khả năng đọc - nói - viết - nghe tiếng Anh cực kì tốt.</Text>
                        </View>
                        <View style={{marginBottom: 24, marginLeft: 16}}>
                            <Text style={styles.title}>Quà tặng</Text>
                            <Gift/>
                        </View>
                        <Pressable
                            onPress={() => navigation.navigate(ROUTES.DISCOUNTPAYMENT)}
                            style={styles.button}>
                            <Text style={styles.textStyle}>Xác nhận mua</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 120,
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        paddingTop: 30,
    },
    countTime: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEFAFF',
        padding: 12,
        marginBottom: 8,
    },
    quality: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 10,
    },
    time: {
        width: '40%',
        flexDirection: 'row',
    },
    iconTime: {
        width: 16,
        height: 16,
        marginRight: 2,
    },
    headerTitle: {
        width: '80%',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
        marginBottom: 8,
        marginLeft: 16,
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    priceActual: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        marginLeft: 16,
    },
    button: {
        width: '94%',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 32,
        paddingRight: 32,
        marginLeft: 16,
        marginBottom: 28,
        borderRadius: 12,
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
    title: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#0288D1',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
    },
    content: {
        marginRight: 16,
        fontSize: 14,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    box2: {
        marginTop: 12,
        marginLeft: 16,
        marginBottom: 12,
    },
    textContent: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
});

export default DiscountDetail;
