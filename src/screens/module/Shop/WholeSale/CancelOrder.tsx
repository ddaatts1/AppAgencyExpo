import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Clipboard } from 'react-native';
import InfoPayment from '../../Discount/InfoPayment';
import { SVG } from '../../../../constants';
import HrDash from '../../../../components/HrDash';
import Gift from '../../Discount/Gift';
import Hr from '../../../../components/commons/Hr';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import ModalPoup from '../../../../components/commons/modalPoup';
import routes from '../../../../constants/routes';
import formatPriceVND from "../../../group/formatMoney";
import { generateSignedCancelOrder } from "../../../card-warehouse/change-card/generateSignedQueryString";
import Toast from "react-native-simple-toast";
import { StorageHelper } from "../../../../services/api/auth";
import useOrder from "../useOrder";


const CancelOrder = ({ route }: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [cancelOrderPopup, setCancelOrderPopup] = useState(false);
    const [cancelOrderSuccess, setCancelOrderSuccess] = useState(false);
    const [name_phone, setName_Phone] = useState('')
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    const {
        order_Info,
        order_detail,
        totalAmount,
        type,
        discount
    } = route?.params


    const { cancelOrder, cancelledOrder, isCancellingOrder } = useOrder()


    // console.log("order_Info: "+ JSON.stringify(order_Info))
    // console.log("order_detail: "+ JSON.stringify(order_detail))
    // console.log("totalAmount: "+ JSON.stringify(totalAmount))
    // console.log("type: "+ JSON.stringify(type))
    // console.log("discount: "+ JSON.stringify(discount))
    const getUser = async () => {
        const user = await StorageHelper.getUser()
        return user
    }

    async function handleCancel() {

        const user = await getUser()
        // {
        //     "customer_id": 0,
        //     "type": "1: đơn sỉ, 2: đơn lẻ, 3: đơn hàng khác",
        //     "order_id": "string",
        //     "sign": "type,order_id"
        // }
        // console.log("user: "+ JSON.stringify(user))

        const sign = generateSignedCancelOrder({ type: type, order_id: order_Info.id })
        const data = {
            customer_id: user.id,
            type: type,
            order_id: order_Info.id,
            sign: sign
        }

        await cancelOrder(data)

    }

    useEffect(() => {

        const fetchUserData = async () => {
            const user = await getUser()
            setName_Phone(user.fullname + user.telephone)
        }
        fetchUserData()


    }, [])

    useEffect(() => {

        if (cancelledOrder) {
            console.log("cancelledOrder: " + JSON.stringify(cancelledOrder))
            if (cancelledOrder.status == 200) {
                setCancelOrderSuccess(true)
            } else {
                Toast.show(cancelledOrder.message)
            }


        }
    }, [cancelledOrder])

    function handleCopy() {
        Clipboard.setString(name_phone);
        Toast.show("Copied")
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.infoPayment}>
                    {/*<InfoPayment/>*/}
                </View>
                <View style={styles.box}>
                    <SVG.Hr style={styles.Hr} />
                    <View style={{ marginBottom: 16, marginTop: 24 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.title}>Số tài khoản: </Text>
                            <Text style={styles.numberCode}>876836666</Text>
                            <SVG.Icon_copy />
                        </View>
                        <View>
                            <Text style={styles.content}>Ngân hàng quân đội MBBANK</Text>
                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <Text style={styles.title}>Tên tài khoản: </Text>
                                <Text style={styles.content}>CÔNG TY CỔ PHẦN TẬP ĐOÀN</Text>
                            </View>
                            <Text style={styles.content}>CÔNG NGHỆ GIÁO DỤC FUTURELANG</Text>
                        </View>
                        <View style={{
                            width: '95%',
                            flexDirection: 'row',
                            paddingTop: 16,
                            paddingBottom: 16,
                            paddingLeft: 12,
                            paddingRight: 12,
                            backgroundColor: '#EEFAFF',
                            marginTop: 16,
                            borderRadius: 8
                        }}>
                            <Text style={styles.title}>Nội dung chuyển khoản: </Text>

                            <ScrollView horizontal>
                                <Text onPress={() => handleCopy()} numberOfLines={1} style={{
                                    color: '#D51E03',
                                    fontFamily: 'Roboto',
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    overflow: 'scroll'
                                }}>{name_phone}09090909</Text>
                            </ScrollView>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                width: '55%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#EEFAFF',
                                marginTop: 16,
                                marginBottom: 16,
                                padding: 9.37,
                                borderRadius: 4.69
                            }}>
                                <Text style={styles.titleQR}>Quét QR Để thanh toán</Text>
                                <Image source={require('../../../../assets/image/QR.png')} />
                            </View>
                        </View>
                        <View style={{
                            width: '95%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#EEFAFF',
                            borderRadius: 16,
                            padding: 8
                        }}>
                            <View style={{ width: '90%', flexDirection: 'row' }}>
                                <Text style={styles.title}>Mã đơn hàng: </Text>
                                <Text style={styles.numberCode}>{order_Info?.orderId}</Text>
                            </View>
                            <View style={{ width: '10%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <SVG.Icon_copy style={{ color: '#0288D1' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {order_detail && order_detail?.map((product: any, index: any) => {
                        if (product.quantity > 0) {
                            return (
                                <View key={index} style={styles.product}>
                                    {/*<Image style={{width: '20%', resizeMode: 'center'}}*/}
                                    {/*       source={require('../../../../assets/image/discount.png')}/>*/}
                                    {isImage(product?.image) ?
                                        <Image style={styles.image} source={{ uri: product?.image }} /> :
                                        <Image style={{ width: '20%', resizeMode: 'center' }}
                                            source={require('../../../../assets/image/discount.png')} />
                                    }
                                    <View style={{ width: '65%', marginLeft: 10 }}>
                                        <Text style={{ marginBottom: 16, color: '#000000' }}>{product.product_name}</Text>
                                        <View style={styles.priceActual}>
                                            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                                                <SVG.VND />
                                                <Text style={{ color: 'red' }}>{formatPriceVND(product.price)}</Text>
                                            </View>
                                            <View style={{ width: '10%', justifyContent: 'flex-end' }}>
                                                <Text style={{ color: '#000000' }}>x{product.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            )
                        }

                    })}
                    <HrDash />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#EEFAFF',
                        padding: 12,
                        marginTop: 10,
                        marginBottom: 24,
                        borderRadius: 12
                    }}>
                        {/*<SVG.Gift style={{marginRight: 10}}/>*/}
                        {/*<Text>Bạn nhận được chiết khấu của </Text>*/}
                        <Text style={{ color: '#0288D1', fontWeight: '700' }}>Chi tiết thanh toán </Text>
                    </View>
                    <View style={{ width: '96%', flexDirection: 'row' }}>
                        <View style={{ width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_total_wallet />
                            <Text style={{ color: '#000000' }}>Tổng tiền sản phẩm</Text>
                        </View>
                        <View style={styles.price}>
                            {/*<SVG.VND style={{color: '#525252'}}/>*/}
                            <Text style={{ color: '#000000' }}>{formatPriceVND(totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={{ width: '96%', flexDirection: 'row' }}>
                        <View style={{ width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_sale_percent />
                            <Text style={{ color: '#000000' }}>Chiết khấu {discount}%</Text>
                        </View>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{ color: '#000000' }}>
                                -{formatPriceVND((discount / 100) * totalAmount)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: '96%', flexDirection: 'row', marginTop: 16 }}>
                        <Text style={{ width: '48%', fontSize: 16, color: '#000000' }}>
                            Tổng thanh toán:
                        </Text>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{ fontSize: 18, color: '#D51E03' }}>
                                {formatPriceVND(((100 - discount) / 100) * totalAmount)}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={styles.headerTitle}>Ghi chú</Text>
                        <TextInput
                            style={{
                                justifyContent: 'flex-start',
                                backgroundColor: '#EEFAFF',
                                borderRadius: 16,
                                color: '#000000'
                            }}
                            numberOfLines={3}
                            multiline={true}
                        />
                    </View>
                    <HrDash />
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: 80,
                        marginTop: 16
                    }}>
                        <Text style={{ fontSize: 20, color: '#323232', fontWeight: '500', marginBottom: 26 }}>Thông tin hỗ
                            trợ</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#323232', fontSize: 18 }}>Zalo/SĐT: </Text>
                            <Text style={{ color: '#323232', fontWeight: '500', fontSize: 18 }}>035 695 9812</Text>
                        </View>
                        <Text style={{ color: '#323232', fontSize: 18 }}>Mrs.Trần Nhung kế toán Future Lang</Text>
                    </View>
                    <TouchableOpacity onPress={() => setCancelOrderPopup(true)} style={styles.button}>
                        <Text style={styles.confirm}>Hủy đơn</Text>
                    </TouchableOpacity>


                </View>
                <ModalPoup visible={cancelOrderPopup}>
                    <Text style={{ marginVertical: 20, fontSize: 16, textAlign: 'center', color: '#323232' }}>
                        Bạn có chắc chắn muốn hủy?
                    </Text>
                    <View style={{ width: '100%', flexDirection: 'row', marginBottom: 24 }}>
                        <TouchableOpacity
                            onPress={() => setCancelOrderPopup(false)}
                            style={[{ backgroundColor: '#fff' }, styles.loginBtn]}>

                            <Text style={{
                                color: '#0288D1',
                                fontSize: 16,
                                paddingLeft: 10,
                                fontWeight: '500'
                            }}>Không</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleCancel()}
                            style={[{ backgroundColor: '#0288D1' }, styles.loginBtn]}>
                            <Text style={{ color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500' }}>Có</Text>
                        </TouchableOpacity>
                    </View>
                </ModalPoup>

                <ModalPoup visible={cancelOrderSuccess}>
                    <View style={{ marginBottom: 57 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '400',
                                color: '#323232',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal'
                            }}>Đơn hàng </Text>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '500',
                                color: '#323232'
                            }}>{order_Info?.orderId} </Text>
                        </View>

                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>đã được
                            huỷ thành công !</Text>
                    </View>


                    <View style={styles.confirmBtn}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routes.WHOLE_SALE)}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác
                                nhận</Text>
                        </TouchableOpacity>
                    </View>
                </ModalPoup>
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
        marginBottom: 10
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    price: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#000000'
    },
    button: {
        backgroundColor: '#FFF2F0',
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 30,
        paddingRight: 30,
        marginRight: 20,
        marginLeft: 9,
        marginBottom: 29,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    confirm: {
        color: '#D51E03',
        fontSize: 16,
        textAlign: 'center',
    },
    priceActual: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    textWarning: {
        color: '#323232',
    },
    numberCode: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#0288D1',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    image: {
        height: 80,
        width: '20%',
        borderRadius: 12,
        borderTopRightRadius: 12,
    },
    content: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#323232',
    },
    titleQR: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#000000',
        marginBottom: 11,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '50%',
        borderRadius: 12,
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
        marginBottom: 10
    },
});

export default CancelOrder;
