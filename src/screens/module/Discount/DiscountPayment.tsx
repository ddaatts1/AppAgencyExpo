import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, Pressable, TextInput} from 'react-native';
import { SVG } from '../../../constants';
import InfoPayment from './InfoPayment';
import Gift from './Gift';
import HrDash from '../../../components/HrDash';
import Hr from '../../../components/commons/Hr';
import CustomInput from '../../../components/commons/customInput';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Field } from 'formik';
import routes from '../../../constants/routes';


const DiscountPayment = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <ScrollView>
            <View style={styles.container}>
                <InfoPayment />
                <View style={styles.box}>
                    <SVG.Hr style={styles.Hr}/>
                    <Text style={styles.headerTitle}>Sản phẩm</Text>
                    <View style={styles.product}>
                        <Image style={{width: '20%', resizeMode: 'center'}} source={require('../../../assets/image/discount.png')}/>
                        <View style={{width: '65%', marginLeft: 12}}>
                            <Text style={{fontSize: 16, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '400'}}>Combo Thẻ học Tiếng Anh 3 Năm của FutureLang</Text>
                            <View style={styles.priceDiscount}>
                                <SVG.VND />
                                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>2.045.000</Text>
                            </View>
                            <View style={styles.priceActual}>
                                <SVG.VND/>
                                <Text style={{color: '#D51E03'}}>1.000.000</Text>
                            </View>
                        </View>

                    </View>
                    <HrDash/>
                    <View style={{width: '95%'}}>
                        <Text style={styles.headerTitle}>Quà tặng</Text>
                        <Gift />
                    </View>

                    <View style={{width: '92%',flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,backgroundColor: '#EEFAFF', padding: 12, marginTop: 24, borderRadius: 12}}>
                        <SVG.Gift style={{marginRight: 10}}/>
                        <View style={{width: '70%'}}>
                            <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#0288D1'}}>Bạn được tài khoản đại sứ tiên phong </Text>
                            <Text style={{textAlign: 'center' ,color: '#FF5722'}}>chiết khấu 40%</Text>
                        </View>

                    </View>
                    <View style={{width: '100%'}}>
                        <Text style={styles.headerTitle}>Ghi chú</Text>
                        <TextInput
                            style={{width: '92%' ,backgroundColor: '#EEFAFF', borderRadius: 16}}
                            numberOfLines={3}
                            multiline={true}
                         />
                    </View>
                    <HrDash/>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginRight: 10}}>
                        <Text style={{fontSize: 20, color: '#323232', fontWeight: '700'}}>Thông tin hỗ trợ</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#323232', fontSize: 18}}>Zalo/SĐT: </Text>
                            <Text style={{color: '#323232', fontWeight: '700', fontSize: 18}}>082 442 9990</Text>
                        </View>
                        <Text style={{color: '#323232', fontSize: 18}}>Mrs Hồi kế toán Future Lang</Text>
                        <View style={{width: '95%', justifyContent: 'center', marginBottom: 26, alignItems: 'center', marginTop: 24}}>
                            <Text style={styles.textWarning}>Lưu ý: Xác nhận mua đồng nghĩa với việc bạn đã đồng</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textWarning}> ý với tất cả các </Text>
                                <TouchableOpacity>
                                    <Text style={{color: '#F91414'}}>điều khoản, chính sách </Text>
                                </TouchableOpacity>
                                <Text style={styles.textWarning}>của Startup 4.0</Text>
                            </View>

                        </View>
                    </View>
                    <Hr/>
                    <View style={styles.footer}>
                        <View >
                            <Text style={{fontSize: 16}}>
                                Tổng số tiền thanh toán:
                            </Text>
                            <View style={styles.price}>
                                <SVG.VND />
                                <Text style={{fontSize: 18, color: '#D51E03'}}>
                                    900.000
                                </Text>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.CONFIRMORDER)} style={styles.button}>
                            <Text style={styles.confirm}>Xác nhận mua</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        marginLeft: 16,
    },
    infoPayment: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0288D1',
        marginTop: 10,
        marginBottom: 12,
    },
    Hr: {
        width: '100%',
    },
    product: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',

    },
    priceDiscount: {
        flexDirection: 'row',
        marginTop: 8,
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#0288D1',
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 30,
        paddingRight: 30,
        marginRight: 20,
        marginLeft: 9,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    confirm: {
        color: '#fff',
        fontSize: 16,
    },
    priceActual: {
        flexDirection: 'row',
    },
    textWarning: {
        color: '#323232',
    },
});

export default DiscountPayment;
