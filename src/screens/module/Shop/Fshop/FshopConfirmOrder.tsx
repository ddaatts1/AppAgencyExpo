import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import InfoPayment from '../../Discount/InfoPayment';
import {ROUTES, SVG} from '../../../../constants';
import HrDash from '../../../../components/HrDash';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import routes from '../../../../constants/routes';
import Hr from '../../../../components/commons/Hr';
import ModalPoup from '../../../../components/commons/modalPoup';
import formatPriceVND, {formatPriceVNDShop} from '../../../group/formatMoney';
import {StorageHelper} from '../../../../services/api/auth';
import {useFutureLang} from '../../../context/StartUpProvider';
import {SERVICE_FTL, SERVICE_KIDS} from '../../../../constants/service';
import useReceiver from '../../../home/personal/useReceiver';
import generateSignedQueryString, {generateSignedFshop} from '../../../card-warehouse/change-card/generateSignedQueryString';
import useOrder from '../useOrder';
import LoadingReact from '../../../../components/commons/loading';
import {Loading} from '../../../group/group-create/GroupCreate';
import Toast from 'react-native-simple-toast';


const FshopConfirmOrder = ({route}: any) => {
    const {item, quantity, color, size} = route?.params;

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const {futureLang} = useFutureLang();
    const {orderOther,otherOrderData,isOrderOther} = useOrder();
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS;
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState();

    const [addressNotFound,setAddressNotFound] = useState(false);
    const {
        Receiver,
        isLoading,
        setFullname,
        setDistrict,
        setCity,
        fullname,
        city,
        districts,
        telephone,
        setTelephone,
        address,
        setAddress,
        isChecked,
        setIsChecked,
    } = useReceiver();


    useFocusEffect(
        React.useCallback(() => {
            Receiver().then(()=>address ? ' ' : setAddressNotFound(true));
        }, [])
    );

    const [orderSuccess, setOrderSuccess] = useState(false);
    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    async function handleOrder() {
        // const userData = await StorageHelper.getUser();
        // console.log("userData: " + JSON.stringify(userData))
        const sign = generateSignedFshop({
            customer_name: fullname,
            customer_phone: telephone,
            total_amount: (item?.price_discount || item?.value) * quantity,
        });
        const data = {
            service: service,
            customer_name: fullname,
            customer_phone: telephone,
            customer_address: address,
            city: city?.id,
            district: districts?.id,
            save_address: address,
            total_amount: (item?.price_discount || item?.value) * quantity,
            sign: sign,
            order_detail: [
                {
                    id: item?.id,
                    quantity: quantity,
                },
            ],
        };

        console.log('data: ' + JSON.stringify(data));
        orderOther(data);


    }

    useEffect(()=>{

        if (otherOrderData){
            console.log('otherOrderData: ' + JSON.stringify(otherOrderData));
            if (otherOrderData.status == 200){
                setOrderSuccess(true);
            }
        else {
                setError(true);
                setErrorMessage(otherOrderData?.message);
            }
        }
    },[otherOrderData]);


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.infoPayment}>
                    <InfoPayment/>
                </View>
                <View style={styles.box}>
                    <SVG.Hr style={styles.Hr}/>
                    <Text style={[styles.headerTitle, {color: '#323232'}]}>Sản phẩm</Text>
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.product}>
                            {/*<Image style={{width: '20%', resizeMode: 'center' }} source={require('../../../../assets/image/Balo.png')}/>*/}
                            {isImage(item?.image) ?
                                <Image style={styles.image} source={{uri: item?.image}}/> :
                                <Image style={styles.image}
                                       source={require('../../../../assets/image/Balo.png')}/>}

                            <View style={{width: '65%', marginLeft: 10}}>
                                <Text style={{
                                    fontFamily: 'Roboto',
                                    fontSize: 16,
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    color:'#000000',
                                }}>
                                    x{quantity} {item?.product_name}
                                </Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: '80%'}}>
                                        <View style={styles.priceDiscount}>
                                            <SVG.VND/>
                                            <Text style={{
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                                color:'#525252',
                                            }}>{formatPriceVNDShop(item?.value)}</Text>
                                        </View>
                                        <View style={styles.priceActual}>
                                            <SVG.VND/>
                                            <Text style={{color: 'red'}}>{formatPriceVNDShop(item?.price_discount)}</Text>
                                        </View>
                                    </View>
                                    <View style={{width: '20%', justifyContent: 'flex-end'}}>
                                        <Text>size <Text style={{color: '#000000'}}>{size}</Text></Text>
                                    </View>
                                    {/*<View style={{width: '20%', justifyContent: 'flex-end'}}>*/}
                                    {/*    <Text>Màu {color}</Text>*/}
                                    {/*</View>*/}
                                </View>
                            </View>
                        </View>
                    </View>

                    <HrDash/>
                    <View style={{width: '96%', flexDirection: 'row', marginBottom: 4, marginTop: 24}}>
                        <View style={{width: '48%', flexDirection: 'row', alignItems: 'center'}}>
                            <SVG.Icon_total_wallet/>
                            <Text style={{color:'#000000'}}>Tổng số tiền </Text>
                        </View>
                        <View style={styles.price}>
                            <SVG.VND/>
                            <Text>{formatPriceVNDShop(quantity * (item?.price_discount || item?.value))}</Text>
                        </View>
                    </View>
                    {/*<View style={{width: '96%',flexDirection: 'row', marginBottom: 4}}>*/}
                    {/*    <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>*/}
                    {/*        <SVG.Icon_sale_percent/>*/}
                    {/*        <Text>Tổng tiền sau giảm</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={styles.price}>*/}
                    {/*        <SVG.VND />*/}
                    {/*        <Text style={{}}>*/}
                    {/*            50000*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={{width: '96%',flexDirection: 'row'}}>*/}
                    {/*    <View style={{width: '48%', flexDirection: 'row', alignItems: 'center' }}>*/}
                    {/*        <SVG.Icon_Shipping/>*/}
                    {/*        <Text>Phí xử lí và vận chuyển</Text>*/}
                    {/*    </View>*/}
                    {/*    <View style={styles.price}>*/}
                    {/*        <SVG.VND />*/}
                    {/*        <Text style={{}}>*/}
                    {/*            30000*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={{width: '96%', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            width: '48%',
                            fontSize: 16,
                            marginTop: 16,
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontWeight: '600',
                        }}>
                            TỔNG THANH TOÁN:
                        </Text>
                        <View style={styles.price}>
                            <SVG.VND/>
                            <Text style={{fontSize: 18, color: '#D51E03'}}>
                                {formatPriceVNDShop(quantity * (item?.price_discount || item?.value))}
                            </Text>
                        </View>
                    </View>
                    <View style={{width: '95%', marginBottom: 24, marginTop: 24}}>
                        <Text style={[styles.headerTitle, {color: '#039BE5', marginBottom: 4}]}>Ghi chú</Text>
                        <TextInput
                            style={{backgroundColor: '#EEFAFF', borderRadius: 16}}
                            numberOfLines={3}
                            multiline={true}
                        />
                    </View>
                    <HrDash/>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginRight: 10,
                        marginTop: 24,
                    }}>
                        <Text style={{fontSize: 20, color: '#323232', fontWeight: '700'}}>Thông tin hỗ trợ</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#323232', fontSize: 18}}>Zalo/SĐT: </Text>
                            <Text style={{color: '#323232', fontWeight: '700', fontSize: 18}}>035 695 9812</Text>
                        </View>
                        <Text style={{color: '#323232', fontSize: 18}}>Mrs.Trần Nhung kế toán Future Lang</Text>
                        <View style={{
                            width: '95%',
                            justifyContent: 'center',
                            marginBottom: 26,
                            alignItems: 'center',
                            marginTop: 24,
                        }}>
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
                                        fontStyle: 'normal',
                                    }}>Bạn vừa khởi tạo thành công đơn hàng mã </Text>
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    fontWeight: '500',
                                    color: '#323232',
                                }}>{otherOrderData?.data?.orderId} </Text>
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
                                    fontStyle: 'normal',
                                }}>Vui lòng chờ Admin phê duyệt đơn hàng của bạn. Đơn hàng sẽ được gửi đến bạn trong
                                    thời gian gần nhất! </Text>
                            </View>
                        </View>

                        <View style={styles.confirmBtn}>
                            <View style={{width: '100%', flexDirection: 'row',justifyContent:'center'}}>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate(routes.FSHOPCANCELORDER,{
                                        order_Info: otherOrderData?.data,
                                        item:item,
                                        quantity: quantity,
                                        size: size,
                                        type: 3,
                                    })}
                                    style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                                    <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Xác
                                        nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalPoup>

                    <ModalPoup visible={addressNotFound}>
                        <View style={{marginBottom: 44}}>
                            <View style={{marginBottom: 24}} />
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    fontWeight: '400',
                                    color: '#323232',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                }}>Không có thông tin nhận hàng, vui lòng thêm địa chỉ nhận hàng! </Text>
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
                                        fontWeight: '500',
                                    }}>Thoát</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(ROUTES.RECEIVER)}
                                    style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                                    <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalPoup>


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
                                    fontStyle: 'normal',
                                }}>{errorMessage} </Text>
                            </View>
                        </View>

                        <View style={styles.confirmBtn}>
                            <View style={{width: '100%', flexDirection: 'row',justifyContent:'center'}}>

                                <TouchableOpacity
                                    onPress={() => setError(false)}
                                    style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                                    <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalPoup>

                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={{}}>
                    <Text style={{fontSize: 16, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '400',color:'#000000'}}>
                        Tổng số tiền thanh toán:
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <SVG.VND/>
                        <Text style={{fontSize: 18, color: '#D51E03'}}>
                            {formatPriceVND(quantity * (item?.price_discount || item?.value))}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleOrder()} style={styles.button}>
                    {isOrderOther ? <Loading/> : <Text style={styles.confirm}>Đặt hàng</Text>}

                </TouchableOpacity>
            </View>

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
        paddingBottom: 70,
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
        width: '40%',
        backgroundColor: '#0288D1',
        borderRadius: 8,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 30,
        paddingRight: 30,
        marginRight: 20,
        marginLeft: 9,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginBottom: 0,
        marginLeft: 16,
        marginRight: 14,
        backgroundColor: '#ffffff',
    },
    confirm: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
    },
    priceActual: {
        width: '90%',
        flexDirection: 'row',
    },
    textWarning: {
        color: '#323232',
    },
    confirmBtn: {
        width: '100%',
        flexDirection: 'row',
        marginBottom:20,
    },
    image: {
        height: 80,
        width: '20%',
        borderRadius: 12,
        borderTopRightRadius: 12,
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
});

export default FshopConfirmOrder;
