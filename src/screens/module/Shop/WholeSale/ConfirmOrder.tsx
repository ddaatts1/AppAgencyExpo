import React, { useState } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import InfoPayment from '../../Discount/InfoPayment';
import { SVG } from '../../../../constants';
import HrDash from '../../../../components/HrDash';
import Gift from '../../Discount/Gift';
import Hr from '../../../../components/commons/Hr';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import routes from '../../../../constants/routes';
import ModalPoup from '../../../../components/commons/modalPoup';


const ConfirmOrder = () => {
    const [orderSuccess, setOrderSuccess] = useState(false);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginTop: 24}}>
                <View style={{width: '95%', justifyContent: 'center', alignItems: 'center', marginBottom: 16}}>
                    <Text style={{
                        fontFamily: 'Roboto',
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: '600',
                        color: '#323232',
                    }}>Bạn vui lòng xác nhận thông tin đơn hàng</Text>
                </View>
                <View style={styles.box}>
                    <SVG.Hr style={styles.Hr}/>
                    <Text style={styles.headerTitle}>Sản phẩm</Text>
                    <View style={styles.product}>
                        <Image style={{width: '20%', resizeMode: 'center'}} source={require('../../../../assets/image/discount.png')}/>
                        <View style={{width: '50%', marginLeft: 10}}>
                            <Text>Combo Thẻ học Tiếng Anh 3 Năm</Text>
                            <View style={{width: '100%',flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{width: '75%'}}>
                                    <View style={styles.priceDiscount}>
                                        <SVG.VND />
                                        <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>2.045.000</Text>
                                    </View>
                                    <View style={styles.priceActual}>
                                        <SVG.VND/>
                                        <Text style={{color: 'red'}}>1.000.000</Text>
                                    </View>
                                </View>
                                <View style={{width: '20%', justifyContent: 'flex-end'}}>
                                    <Text>x10</Text>
                                </View>
                            </View>


                        </View>
                    </View>
                    <HrDash/>
                    <View style={{marginTop: 16}}>
                        <Gift />
                    </View>

                    <View style={{flexDirection: 'row', backgroundColor: '#EEFAFF', padding: 12, marginTop: 10, borderRadius: 12}}>
                        <SVG.Gift style={{marginRight: 10}}/>
                        <Text>Bạn nhận được chiết khấu của </Text>
                        <Text style={{color: 'red'}}>Đại sứ 2</Text>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_total_wallet/>
                            <Text>Tổng tiền sản phẩm</Text>
                        </View>
                        <View style={styles.price}>
                            <SVG.VND style={{color: '#525252'}}/>
                            <Text >10.000.000</Text>
                        </View>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_sale_percent/>
                            <Text>Chiết khấu 30%</Text>
                        </View>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{}}>
                                -900.000
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <Text style={{width: '48%' ,fontSize: 16}}>
                            Tổng thanh toán:
                        </Text>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{fontSize: 18, color: '#D51E03'}}>
                                9.100.000
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '95%', marginBottom: 16}}>
                        <Text style={styles.headerTitle}>Ghi chú</Text>
                        <TextInput
                            style={{backgroundColor: '#EEFAFF', borderRadius: 16}}
                            numberOfLines={3}
                            multiline={true}
                         />
                    </View>
                    <HrDash/>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 80, marginTop: 16 }}>
                        <Text style={{fontSize: 20, color: '#323232', fontWeight: '700', marginBottom: 26}}>Thông tin hỗ trợ</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#323232', fontSize: 18}}>Zalo/SĐT: </Text>
                            <Text style={{color: '#323232', fontWeight: '700', fontSize: 18}}>035 695 9812</Text>
                        </View>
                        <Text style={{color: '#323232', fontSize: 18}}>Mrs.Trần Nhung kế toán Future Lang</Text>
                    </View>
                    <TouchableOpacity onPress={() => setOrderSuccess(true)} style={styles.button}>
                            <Text style={styles.confirm}>Xác nhận mua</Text>
                    </TouchableOpacity>
                    <View style={{width: '95%', justifyContent: 'center', marginBottom: 26, alignItems: 'center', marginTop: 4}}>
                        <Text style={styles.textWarning}>Xác nhận mua đồng nghĩa với việc bạn đã đồng ý với </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textWarning}>tất cả các </Text>
                            <TouchableOpacity>
                                <Text style={{color: '#F91414'}}>điều khoản, chính sách </Text>
                            </TouchableOpacity>
                            <Text style={styles.textWarning}>của Startup 4.0</Text>
                        </View>

                    </View>

                </View>
                <ModalPoup visible={orderSuccess}>
                    <View style={{marginBottom: 44}}>
                        <View style={{marginBottom: 24}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232', fontFamily: 'Roboto', fontStyle: 'normal' }}>Bạn vừa khởi tạo thành công đơn hàng mã </Text>
                            </View>
                            <Text style={{fontSize: 16, textAlign: 'center', fontWeight: '500', color: '#323232' }}>ABC67WWX </Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 24}}>
                            <SVG.Icon_Success_Order/>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232', fontFamily: 'Roboto', fontStyle: 'normal' }}>Vui lòng chờ Admin phê duyệt đơn hàng của bạn. Mã thẻ sẽ về kho thẻ của bạn nếu đơn hàng của bạn được phê duyệt thành công </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                            onPress={() => navigation.navigate(routes.CANCELORDER)}>
                        <View style={styles.confirmBtn}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                        </View>
                    </TouchableOpacity>
                </ModalPoup>
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
        marginLeft: 10,
    },
    infoPayment: {
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0288D1',
        marginTop: 10,
        marginBottom: 10,
    },
    Hr: {
        width: '100%',
    },
    product: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    price: {
        width: '48%',
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    confirm: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    priceActual: {
        flexDirection: 'row',
    },
    textWarning: {
        color: '#323232',
    },
    confirmBtn: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
        marginBottom: 16,
      },
});

export default ConfirmOrder;
