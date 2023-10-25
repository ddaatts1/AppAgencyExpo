import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import Quantity from './Quantity';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DiscountListHome from '../../Discount/DiscountListHome';
import Hr from '../../../../components/commons/Hr';
import { ROUTES, SVG } from '../../../../constants';
import CountDownTimer from '../../../../components/commons/countDownTimer';
import routes from '../../../../constants/routes';
import dataDiscount from '../../../../../ultidata/dataDiscount';
import ModalPoup from '../../../../components/commons/modalPoup';
import useCard from '../../../card-warehouse/useCard';
import {useFutureLang} from '../../../context/StartUpProvider';
import {SERVICE_FTL, SERVICE_KIDS} from '../../../../constants/service';
import {StorageHelper} from '../../../../services/api/auth';
import {AgencyLevel} from "../../../../constants/agencyLevel";
import formatPriceVND from "../../../group/formatMoney";
import useOrder from "../useOrder";


const ShopWholeSale = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    //quá giá trị tối đa 1 tỉ
    const [limit, setLimit] = useState(false);
    //chưa đạt tối thiểu 2 thẻ
    const [minium, setMinium] = useState(false);
    //chưa chọn thẻ
    const [noSelect, setNoSelect] = useState(false);
    const [totalAmount,setTotalAmount] = useState(0)
    let value: number = 0;
    let quantityTotal: number = 0;
    const {orderCheck,orderCheckData,isOrderCheck} = useOrder()
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            orderCheck({total_amount: totalAmount})

        }
        fetchData()
    },[totalAmount])
    const getUser = async ()=>{
        const  user = await StorageHelper.getUser();
        return user;
    };

    //
    const [productCount,setProductCount] = useState(0);

    useFocusEffect(
        React.useCallback(() => {

            fetchCartCount();
        }, [])
    );

    const fetchCartCount = async () => {
        try {
            if (futureLang){
                const cartCount = await StorageHelper.getCartCountFTL();
                console.log('Cart count ftl:', cartCount);
                setProductCount(cartCount);
            } else {
                const cartCount = await StorageHelper.getCartCountKIDS();
                console.log('Cart count kids:', cartCount);
                setProductCount(cartCount);
            }

        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    function IconWithBadge({ badgeCount }: { badgeCount: any }) {
        return (

            <View>
                {badgeCount > 0 && (

                    <View style={{
                        position: 'absolute',
                        right: 5,
                        top: -45,
                        borderRadius: 6,
                        backgroundColor: 'red',
                        width: 17,
                        height: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: '500' }}>{badgeCount}</Text>
                    </View>
                )}

            </View>
        );
    }

    function HomeIconWithBadge(props: any) {

        return <IconWithBadge {...props} badgeCount={props.count} />;
    }

    useEffect(() => {

        console.log('=======> product count: ' + JSON.stringify( productCount));
        navigation.setOptions({

            headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
            headerTitle: '',
            headerShown: true,
            headerRight: () => {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 15, marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.CART)}
                            >
                                <SVG.Cart />
                            </TouchableOpacity>
                            <HomeIconWithBadge count={productCount}/>

                        </View>
                    </View>
                );
            },

        });
    }, [productCount]);

    //

    useEffect(() => {
        const logUserData = async () => {
            const userData = await getUser();
            if (userData) {
                console.log('User Data:', JSON.stringify(userData));
            } else {
                console.log('User data not found in AsyncStorage.');
            }
        };

        logUserData();
    }, []);

    const {fetchListCardInfo,listcardInfo,isFetchingListCardInfo} = useCard();
    const {futureLang} = useFutureLang();
    const [order_detail, setOrderDetail] = useState([]);
    const [isChecked,setIsChecked] = useState(false)
    useEffect(()=>{


        const data = {
            type: 0,
            service: futureLang ? SERVICE_FTL : SERVICE_KIDS,

        };


        const fetchData = async ()=>{
            fetchListCardInfo(data);
        };

        fetchData();
    },[]);

    useEffect(()=>{

        if (listcardInfo){
            console.log('listcardInfo: ' + JSON.stringify(listcardInfo));

            // Initialize order_detail as a state variable
            setOrderDetail(listcardInfo?.map((d: any) => ({
                id: d.id,
                quantity: 0,
                price: d.price_discount || d.value,
                product_name: d.name,
                image: d.image,
            })));

        }
    },[listcardInfo]);


    function handleOrder(){
            return navigation.navigate(routes.WHOLE_PAYMENT,{
            order_detail: order_detail,
            totalAmount: totalAmount,
        });
    }


    function handleOption() {

        order_detail.map((item, index) => {
            value += (item.quantity * item.price);
            quantityTotal += item.quantity;
        });
        //check gía trị của quantity
        if (value > 1000000000) {
            return setLimit(true);
        } else if (quantityTotal < 2 && quantityTotal > 0) {
            return setMinium(true);
        } else if (quantityTotal === 0) {
            return setNoSelect(true);
        } else {
            setIsChecked(true)

            setTotalAmount(value)


        }
    }

    useEffect(() => {
        if (isChecked) {
            scrollViewRef.current.scrollTo({ y: 200, animated: true });
        }
    }, [isChecked]);
    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                {/*<View style={{width: '100%', flexDirection: 'row', alignItems: 'center' ,marginBottom: 10, marginTop: 40}}>*/}
                {/*    <View style={{width: '70%',flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*        <View>*/}
                {/*            <Text style={styles.headerTitle}>Ưu đãi cho bạn</Text>*/}
                {/*        </View>*/}
                {/*        <View>*/}
                {/*            /!* <CountDownTimer /> *!/*/}
                {/*        </View>*/}

                {/*    </View>*/}
                {/*    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DISCOUNT)} style={{width: '30%'}}>*/}
                {/*    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 8}}>*/}
                {/*        <Text style={{marginRight: 5, color: '#0288D1', fontWeight: '600'}}>Vào cửa hàng</Text>*/}
                {/*        <SVG.Next/>*/}
                {/*    </View>*/}
                {/*    </TouchableOpacity>*/}

                {/*</View>*/}
                {/*<View style={{marginBottom: 24}}>*/}
                {/*    <ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
                {/*        <DiscountListHome/>*/}
                {/*    </ScrollView>*/}
                {/*</View>*/}

                <Hr />
                <View>
                    <View style={{marginTop: 16}}>
                        <Text style={styles.headerTitle}>Cửa hàng sỉ</Text>
                        {listcardInfo && <Quantity isChecked={isChecked} order_detail={order_detail} setOrderDetail={setOrderDetail} data={listcardInfo}/> }
                    </View>
                    {!isChecked && <View style={{width: '90%',backgroundColor: '#0288D1', borderRadius: 12, padding: 12, marginLeft: 20, marginBottom: 30}}>
                        <Pressable  onPress={() => handleOption()}>
                            <Text style={{textAlign: 'center', color: '#fff'}}>Kiểm tra đơn hàng</Text>
                        </Pressable>
                    </View>}



                    {isChecked && <View style={{paddingLeft:5}}>
                        <View style={{width: '95%' ,flexDirection: 'row'}}>
                            <Text style={{color:'#0288D1',fontWeight:'bold',marginBottom:20}}>Chi tiết thanh toán </Text>
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
                            <Text style={{width: '48%' , fontSize: 16, marginTop: 16,color:'#000000',fontWeight:'bold'}}>
                                Số tiền thanh toán:
                            </Text>
                            <View style={styles.price}>
                                <SVG.VND />
                                <Text style={{fontSize: 18, color: '#D51E03'}}>
                                    {orderCheckData && formatPriceVND(((100-orderCheckData?.data.discount)/100)*totalAmount)}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 80, marginTop: 24}}>
                            <Text style={{fontSize: 20, color: '#323232', fontWeight: '500', marginBottom: 26}}>Thông tin hỗ trợ</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: '#323232', fontSize: 18}}>Zalo/SĐT: </Text>
                                <Text style={{color: '#323232', fontWeight: '500', fontSize: 18}}>035 695 9812</Text>
                            </View>
                            <Text style={{color: '#323232', fontSize: 18}}>Mrs.Trần Nhung kế toán Future Lang</Text>
                        </View>

                    </View>}




                </View>

            </ScrollView>
            {isChecked && <View style={{
                width: '90%',
                backgroundColor: '#0288D1',
                borderRadius: 12,
                padding: 12,
                marginLeft: 20,
                marginTop: 30,
                position: 'absolute',
                bottom: 0
            }}>
                <Pressable onPress={() => handleOrder()}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>Đặt hàng</Text>
                </Pressable>
            </View>}

            <ModalPoup visible={noSelect}>
                <View style={{marginBottom: 64}}>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>Vui lòng nhập số lượng thẻ</Text>
                </View>

                <TouchableOpacity
                    onPress={() =>setNoSelect(false)}>
                    <View style={styles.confirmBtn}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                    </View>
                </TouchableOpacity>
            </ModalPoup>
            <ModalPoup visible={minium}>
                <View style={{marginBottom: 64}}>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>Số lượng thẻ chưa đạt tối thiểu 2 thẻ. Vui lòng chọn lại!</Text>
                </View>


                <View style={styles.confirmBtn}>
                    <TouchableOpacity
                        onPress={() =>setMinium(false)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup>
            <ModalPoup visible={limit}>
                <View style={{marginBottom: 64}}>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>Đơn hàng vượt quá giá trị tối đa 1 tỉ VND. Vui lòng đặt lại.</Text>
                </View>


                <View style={styles.confirmBtn}>
                    <TouchableOpacity
                        onPress={() =>setLimit(false)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0288D1',
        marginLeft: 7,
        marginRight: 5,
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
    },     price: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

});

export default ShopWholeSale;
