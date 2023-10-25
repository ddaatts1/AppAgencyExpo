import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import InfoPayment from '../../Discount/InfoPayment';
import { SVG } from '../../../../constants';
import HrDash from '../../../../components/HrDash';
import Gift from '../../Discount/Gift';
import Hr from '../../../../components/commons/Hr';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import routes from '../../../../constants/routes';
import formatPriceVND, {formatPriceVNDShop} from "../../../group/formatMoney";
import useOrder from "../useOrder";
import {AgencyLevel} from "../../../../constants/agencyLevel";
import {generateSignedSingle} from "../../../card-warehouse/change-card/generateSignedQueryString";
import {StorageHelper} from "../../../../services/api/auth";
import {ProductType} from "../../../../constants/enum";
import {useFutureLang} from "../../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../../constants/service";
import ModalPoup from "../../../../components/commons/modalPoup";


const WholeSalePayment = ({route}: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const isImage = (url:any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    const {createdOrder,createNewOrder,isCreatingOrder,orderCheck,orderCheckData} = useOrder()
    const {futureLang} = useFutureLang()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    const order_detail = route?.params?.order_detail
    const  totalAmount = route?.params?.totalAmount
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState()
    console.log("order_detail: "+ JSON.stringify(order_detail))


    useEffect(()=>{
        const fetchData = async ()=>{
            orderCheck({total_amount: totalAmount})

        }
        fetchData()
    },[])

    useEffect(()=>{

        if(orderCheckData){
            console.log("orderCheckData: "+ JSON.stringify(orderCheckData))
        }
    },[orderCheckData])


    async function handleOrder() {

        const totalPrice = totalAmount
        const orderItems = order_detail?.map((product:any, index:any)=>(
            {
                id: product.id,
                quantity: product.quantity
            }
        ))

        const orderDetail ={
            order_detail: orderItems,
            total_amount: totalPrice
        }
     console.log("orderDetail: "+ JSON.stringify(orderDetail))

        orderCombo(orderDetail)


    }

    async function orderCombo(orderDetail:any) {
        try {
            const discount = orderCheckData?.data.discount;

            const totalAmount =(100-discount)/100* orderDetail.total_amount
            const sign = generateSignedSingle({
                service: service,
                type: 1,
                total_amount:totalAmount
            });
            const data = {
                service: service,
                type: 1,
                sign: sign,
                discount: discount,
                order_detail: orderDetail.order_detail,
                total_amount: totalAmount
            };
            console.log("data: " + JSON.stringify(data));
            await  createNewOrder(data);
        } catch (error) {
            console.error('Error processing order:', error);
        }
    }

    useEffect(()=>{

        if(createdOrder){
            console.log("createdOrder: "+ JSON.stringify(createdOrder))
            if(createdOrder.status == 200){
                setOrderSuccess(true)
            }
            else {
                setError(true)
                setErrorMessage(createdOrder?.message)
            }
        }
    },[createdOrder])


    return (
        <View style={styles.container}>

        <ScrollView>

            <View style={{   flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10
            }}>
                {/*<InfoPayment/>*/}
                <Text style={{color:'#000000',fontSize:18,fontWeight:'700',}}>Bạn vui lòng xác nhận thông tin đơn hàng</Text>
            </View>
                <View style={styles.box}>
                    <SVG.Hr style={styles.Hr}/>
                    <Text style={[styles.headerTitle, {color: '#323232'}]}>Sản phẩm</Text>

                    {order_detail && order_detail?.map((product:any,index:any)=>{
                        if(product.quantity > 0) return(                        <View key={index} style={styles.product}>
                                {isImage(product?.image) ?
                                    <Image style={styles.image} source={{uri: product?.image}}/> :
                                    <Image style={{width: '20%', resizeMode: 'center'}} source={require('../../../../assets/image/discount.png')}/>
                                }

                                <View style={{width: '65%', marginLeft: 10}}>
                                    <Text style={{
                                        fontFamily: 'Roboto',
                                        fontSize: 16,
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        color:'#000000'
                                    }}>
                                        {product?.product_name}
                                    </Text>
                                    <View style={{width: '100%',flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{width: '90%'}}>
                                            <View style={styles.priceDiscount}>
                                                <SVG.VND />
                                                {/*<Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>2.045.000</Text>*/}
                                            </View>
                                            <View style={styles.priceActual}>
                                                <SVG.VND/>
                                                <Text style={{color: 'red'}}>{formatPriceVND(product?.price)}</Text>
                                            </View>
                                        </View>
                                        <View style={{width: '10%', justifyContent: 'flex-end'}}>
                                            <Text style={{color:'#000000'}}>x{product?.quantity}</Text>
                                        </View>
                                    </View>


                                </View>
                            </View>
                        )
                    }

                    )}
                    <HrDash/>
                    <View style={{width: '95%' ,flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,backgroundColor: '#EEFAFF', padding: 12, marginTop: 24, marginBottom: 24, borderRadius: 12}}>
                        <SVG.Gift style={{marginRight: 10}}/>
                        <Text style={{color:'#000000'}}>Bạn nhận được chiết khấu của </Text>
                        <Text style={{color: 'red'}}>{orderCheckData&& AgencyLevel[orderCheckData?.data?.type]}</Text>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_total_wallet/>
                            <Text style={{color:'#000000'}}>Tổng tiền sản phẩm</Text>
                        </View>
                        <View style={styles.price}>
                            {/*<SVG.VND style={{color: '#525252'}}/>*/}
                            <Text style={{color:'#000000'}}>{formatPriceVND(totalAmount)}</Text>
                        </View>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>
                            <SVG.Icon_sale_percent/>
                            <Text style={{color:'#000000'}}>Chiết khấu {orderCheckData&& orderCheckData?.data.discount}%</Text>
                        </View>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{color:'#000000'}}>
                                -{orderCheckData && formatPriceVND((orderCheckData?.data.discount/100)*totalAmount)}
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '96%',flexDirection: 'row'}}>
                        <Text style={{width: '48%' , fontSize: 16, marginTop: 16,color:'#000000'}}>
                            Tổng thanh toán:
                        </Text>
                        <View style={styles.price}>
                            <SVG.VND />
                            <Text style={{fontSize: 18, color: '#D51E03'}}>
                                {orderCheckData && formatPriceVND(((100-orderCheckData?.data.discount)/100)*totalAmount)}
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '95%', marginBottom: 24}}>
                        <Text style={[styles.headerTitle, {color: '#039BE5'}]}>Ghi chú</Text>
                        <TextInput
                            style={{backgroundColor: '#EEFAFF', borderRadius: 16,color:'#000000'}}
                            numberOfLines={3}
                            multiline={true}
                         />
                    </View>
                    <HrDash/>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 80, marginTop: 24}}>
                        <Text style={{fontSize: 20, color: '#323232', fontWeight: '500', marginBottom: 26}}>Thông tin hỗ trợ</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#323232', fontSize: 18}}>Zalo/SĐT: </Text>
                            <Text style={{color: '#323232', fontWeight: '500', fontSize: 18}}>035 695 9812</Text>
                        </View>
                        <Text style={{color: '#323232', fontSize: 18}}>Mrs.Trần Nhung kế toán Future Lang</Text>
                    </View>

                    <TouchableOpacity onPress={() => handleOrder()} style={styles.button}>
                            <Text style={styles.confirm}>Đặt hàng</Text>
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

            <ModalPoup visible={error}>
                <View style={{marginBottom: 44}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center',marginBottom:20, alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 18,
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',

                        }}>Lỗi </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '400',
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal'
                        }}>{errorMessage} </Text>
                    </View>
                </View>

                <View style={styles.confirmBtn}>
                    <View style={{width: '100%', flexDirection: 'row',justifyContent:"center"}}>

                        <TouchableOpacity
                            onPress={() => setError(false)}
                            style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                            <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalPoup>

            <ModalPoup visible={orderSuccess}>
                <View style={{marginBottom: 44}}>
                    <View style={{marginBottom: 24}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: '400',
                                color: '#323232',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal'
                            }}>Bạn vừa khởi tạo thành công đơn hàng mã </Text>
                        </View>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#323232'
                        }}>{createdOrder?.data?.orderId} </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 24}}>
                        <SVG.Icon_Success_Order/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '400',
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal'
                        }}>Vui lòng chờ Admin phê duyệt đơn hàng của bạn. Đơn hàng sẽ được gửi đến bạn trong
                            thời gian gần nhất! </Text>
                    </View>
                </View>

                <View style={styles.confirmBtn}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => setOrderSuccess(false)}
                            style={[{backgroundColor: '#fff'}, styles.loginBtn]}>

                            <Text style={{
                                color: '#0288D1',
                                fontSize: 16,
                                paddingLeft: 10,
                                fontWeight: '500'
                            }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(routes.CANCELORDER,{
                                order_Info: createdOrder?.data,
                                order_detail: order_detail,
                                totalAmount: totalAmount,
                                 type: 1,
                                discount: orderCheckData?.data.discount
                            })}
                            style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                            <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Xác
                                nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalPoup>

        </ScrollView>
        </View>

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
        marginTop: 10,
    },
    Hr: {
        width: '100%',
    },
    product: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom:10,
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    confirmBtn: {
        width: '100%',
        flexDirection: 'row',
        marginBottom:20
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
    image: {
        height: 80,
        width: '20%',
        borderRadius: 12,
        borderTopRightRadius: 12,
    },
    priceActual: {
        width: '90%',
        flexDirection: 'row',
    },
    textWarning: {
        color: '#323232',
    },
});

export default WholeSalePayment;
