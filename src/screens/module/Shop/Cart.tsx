import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import React, {useEffect, useState} from 'react';
import dataDiscount from '../../../../ultidata/dataDiscount';
import {ROUTES, SVG} from '../../../constants';
import {StorageHelper} from "../../../services/api/auth";
import formatPriceVND, {formatPriceVNDShop} from "../../group/formatMoney";
import {ProductType} from "../../../constants/enum";
import {generateSignedFshop, generateSignedSingle} from "../../card-warehouse/change-card/generateSignedQueryString";
import useReceiver from "../../home/personal/useReceiver";
import {ParamListBase, useFocusEffect, useNavigation} from "@react-navigation/native";
import {useFutureLang} from "../../context/StartUpProvider";
import useOrder from "./useOrder";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import Toast from "react-native-simple-toast";
import ModalPoup from "../../../components/commons/modalPoup";
import {StackNavigationProp} from "@react-navigation/stack";
import routes from "../../../constants/routes";


const Cart = () => {
    const { dataCategory, dataShop } = dataDiscount();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [data, setData] = useState(dataCategory);
    const [lists, setLists] = useState(dataShop);
    const [isSelected, setSelection] = useState(false);
    let [quantity, setQuantity] = React.useState(dataShop);
    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    const {futureLang} = useFutureLang()
    const {orderOther,otherOrderData,isOrderOther,createdOrder,createNewOrder,isCreatingOrder,isOrderCheck,orderCheckData,orderCheck} = useOrder()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    const [cart, setCart] = useState();
    const [addressNotFound,setAddressNotFound] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false);

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
        setIsChecked
    } = useReceiver();

    useFocusEffect(
        React.useCallback(() => {
            Receiver()
        }, [])
    );
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartItems = await StorageHelper.getCart();
                if (cartItems) {
                    const filteredCartItems = cartItems.filter(item => item.service === service);

                    setCart(filteredCartItems);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };

        fetchCart();
    }, []);




    function increaseQuantity(item: any) {
        const newQuantity = cart.map((cartItem) => {
            if (cartItem.item.id === item.item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else {
                return cartItem;
            }
        });
        setCart(newQuantity);
    }

    function decreaseQuantity(item: any) {
        const newQuantity = cart.map((cartItem) => {
            if (cartItem.item.id === item.item.id) {
                return { ...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1 };
            } else {
                return cartItem;
            }
        });
        setCart(newQuantity);
    }



    function itemToBuy() {
        let totalPrice = 0;
        const itemArrays = {};

        // Initialize itemArrays with empty arrays for each data.id
        data.forEach(category => {
            itemArrays[category.id] = [];
        });

        cart?.forEach(val => {
            const categoryMatch = data.find(categoryData =>
                val.category === categoryData?.id && categoryData?.selected
            );

            if (categoryMatch) {
                totalPrice += (val.item.price_discount || val.item.value) * val.quantity;
                itemArrays[categoryMatch.id].push(val);
            }
        });

        const result = {
            totalPrice,
            ...itemArrays
        };


        return result;
    }


    // const [data, setData] = useState(false)
    const onChangeValue = (item: any) => {
        const newItem = data.map((val) => {
            if (val.id === item.id) {
                return {...val, selected: !val.selected};
            }
            else {
                return val;
            }
        });
        setData(newItem);
    };

    function handleDelete(id: any) {
        StorageHelper.removeFromCart(id)
        setCart(prevCart => prevCart.filter(item => item.item.id !== id));

    }

    const renderItem = ({item}) => {
            const productType = item.id == 1? ProductType.Card: ProductType.Fshop
    console.log("productType: "+ productType)

        const hasServiceItem = cart?.some(cartItem => cartItem.category == productType);

        if (!hasServiceItem) {
            return null;
        }
        return (
            <>
                <View style={{width: '100%', flexDirection: 'row',  marginLeft: 16}}>
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            <View>
                                <>
                                    <TouchableOpacity  onPress={() => onChangeValue(item)}>
                                        {item.selected === true ? <SVG.Checkbox /> : <SVG.UnCheckbox />}
                                    </TouchableOpacity>
                                </>
                            </View>
                            <View><Text style={styles.textCheckbox}>{item.name}</Text></View>
                            {console.log("item: "+JSON.stringify(item))}
                        </View>
                        {
                        cart?.map((product: any, index: any) => {
                            if(item.id == product.category)
                            return (
                                <View key={index} style={item.selected ? styles.activeProduct : styles.disabledProduct}>
                                {/* <Swipeable renderRightActions={rightSwipe}> */}
                                <View  style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 8, paddingRight: 16 }}>
                                    {/* <View style={{width: '10%'}} /> */}
                                    <View style={{width: '40%'}}>
                                        {   isImage(product?.item.image) ?
                                            <Image style={styles.headerBox} source={{uri: product?.item.image}}/> :
                                            <Image style={styles.headerBox}
                                                   source={require('../../../assets/image/logo.jpg')}/>}
                                        {/*<Image style={{width: '100%'}} source={product?.product.image}/>*/}
                                    </View>
                                    <View style={{width: '50%', marginLeft: 12}}>
                                        <Text style={styles.title}>{product?.item.product_name}</Text>
                                        <Text style={styles.material}> {product?.color && `Mau ${product?.color}`} {product?.size && `, Size ${product?.size}`}</Text>
                                        <View style={styles.price}>
                                            <SVG.VND color="#525252"/>
                                            <Text style={styles.dicountPrice}>{formatPriceVNDShop(product?.item?.value)}</Text>
                                        </View>
                                        <View style={styles.price}>
                                            <SVG.VND color="#D51E03"/>
                                            <Text style={styles.actualPrice}>{formatPriceVNDShop(product?.item?.price_discount||product?.item?.value)}</Text>
                                        </View>
                                        <View style={{width: '100%', flexDirection: 'row', marginTop: 16, marginBottom: 16}}>
                                            <View style={{flexDirection: 'row', width: '35%' }}>
                                                <TouchableOpacity onPress={()=>decreaseQuantity(product)}>
                                                    <View style={{borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 4}}>
                                                        <Text style={{color:'#000000'}}>-</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <View style={{width: '60%' ,height: 24, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 4, marginRight: 4, borderRadius: 4}}>
                                                        {/* <TextInput onChangeText={handleValue} maxLength={4} style={{ }} /> */}
                                                    <Text style={{color:'#000000'}}>{product.quantity}</Text>
                                                </View>
                                                <TouchableOpacity onPress={()=>increaseQuantity(product)}>
                                                    <View style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 4}}>
                                                        <Text style={{color:'#000000'}}>+</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={()=>handleDelete(product?.item.id)}>
                                        <View style={{width: '10%'}}>
                                            <SVG.Icon_Delete/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* </Swipeable> */}
                                </View>

                            );
                        })
                    }
                    </View>
                </View>

            </>
        );
    };

    // function handleDelete (index: any) {
    //     const arr = [...dataDiscount];
    //     arr.splice(index, 1);
    //     setLists(arr);

    // }


    // const scrollX = useRef(new Animated.Value(0)).current;
    // const rightSwipe = () => {
    //     // const scale = scrollX.interpolate({
    //     //     inputRange: [0, 100],
    //     //     outputRange: [0, 1],
    //     // });
    //     return (
    //         <TouchableOpacity style={styles.delete}>
    //             <View>
    //                 <Text style={[styles.textDelete]}>Xóa</Text>
    //             </View>
    //         </TouchableOpacity>
    //     );
    function handleCheckout() {

        const items = itemToBuy()

        console.log("fshop: "+ JSON.stringify(transformToOrderDetail(items[ProductType.Fshop])))
        console.log("Card: "+ JSON.stringify(transformToOrderDetail(items[ProductType.Card])))
        console.log("totalPrice: "+ JSON.stringify(items["totalPrice"]))


        data.forEach((d:any,index:any)=>{
            if(d.id == ProductType.Fshop && d.selected){
                console.log("aa")
                items[ProductType.Fshop].length>0&& orderFshop(transformToOrderDetail(items[ProductType.Fshop]))
            }
            if(d.id == ProductType.Card && d.selected){
                items[ProductType.Card].length >0  && orderSingle(transformToOrderDetail(items[ProductType.Card]))
            }
        })


    }



    async function checkDiscount (totalAmount:any){
      return  await orderCheck({total_amount: totalAmount})

    }


    async function orderSingle(orderDetail) {
        try {
            const discount = await checkDiscount(orderDetail.total_amount);

            const totalAmount =(100-discount)/100* orderDetail.total_amount
            const sign = generateSignedSingle({
                service: service,
                type: 2,
                total_amount:totalAmount
                //(100 - discount)*toatal_amount
            });
            const data = {
                service: service,
                type: 2,
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
            if(createdOrder.status ==200){
                Toast.show("Đặt hàng thành công ")
                 StorageHelper.removeFromCartByCategory(ProductType.Card,service);

            }else {
                Toast.show(createdOrder.message,4)
            }
        }
    },[createdOrder])

    async function orderFshop(orderDetail:any) {

        console.log("======> order Fshop")
        const sign = generateSignedFshop({
            customer_name: fullname,
            customer_phone: telephone,
            total_amount: orderDetail.total_amount
        })
        const data = {
            service: service,
            customer_name: fullname,
            customer_phone: telephone,
            customer_address: address,
            city: city?.id,
            district: districts?.id,
            save_address: address,
            sign: sign,
            ...orderDetail
        }

        console.log("data: " + JSON.stringify(data))
       await orderOther(data)
    }



    useEffect(()=>{

        if(otherOrderData){
            console.log("====> otherOrderData: "+ JSON.stringify(otherOrderData))
            if(otherOrderData.status ==200){
                setOrderSuccess(true)
                Toast.show("Đặt hàng thành công ")
                 StorageHelper.removeFromCartByCategory(ProductType.Fshop,service);
            }else {
                Toast.show(otherOrderData.message)
                setAddressNotFound(true)
            }
        }
    },[otherOrderData])

    function transformToOrderDetail(items) {
        let totalPrice = 0;

        const orderDetail = items.map(item => {
            totalPrice += (item.item.price_discount || item.item.value) * item.quantity;
            return {
                id: item.item.id,
                quantity: item.quantity
            };
        });

        return {
            order_detail: orderDetail,
            total_amount: totalPrice
        };
    }

    // };
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <ScrollView>
                            <FlatList
                                scrollEnabled={false}
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => `key-${item.id}`}
                            />
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

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
                            onPress={()=>setOrderSuccess(false)}
                            style={[{backgroundColor: '#0288D1'}, styles.loginBtn]}>
                            <Text style={{color: '#FFF', fontSize: 16, paddingLeft: 10, fontWeight: '500'}}>Xác
                                nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalPoup>



            <ModalPoup visible={addressNotFound}>
                <View style={{marginBottom: 44}}>
                    <View style={{marginBottom: 24}}>

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                            fontWeight: '400',
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontStyle: 'normal'
                        }}>Không có thông tin nhận hàng, vui lòng thêm địa chỉ nhận hàng! </Text>
                    </View>
                </View>

                <View style={styles.confirmBtn}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(ROUTES.FSHOP)}
                            style={[{backgroundColor: '#fff'}, styles.loginBtn]}>

                            <Text style={{
                                color: '#0288D1',
                                fontSize: 16,
                                paddingLeft: 10,
                                fontWeight: '500'
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

            <View style={styles.footer}>
                <View>
                    <Text style={{ fontSize: 16,color:'#000000' }}>Số tiền thanh toán:</Text>
                    <View style={styles.price}>
                        <SVG.VND />
                        <View>
                            <Text style={{ fontSize: 18, color: '#D51E03' }}>{formatPriceVND(itemToBuy().totalPrice)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleCheckout()}>
                    <Text style={styles.confirm}>Tiến hành đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
    },
    box: {
        width: '100%',
        marginTop: 24,
    },
    checkbox: {
        backgroundColor: '#fff',
        borderColor: '#0398FF',
    },
    price: {
        flexDirection: 'row',

    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
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
    confirm: {
        color: '#fff',
        fontSize: 16,
    },
    delete: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        paddingLeft: 15,
        paddingRight: 16,
    },
    textDelete: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#fff',
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
    headerBox: {
        width: '90%',
        height: 130,
        position: 'relative',
        zIndex: 1,
        resizeMode: 'cover',
        borderRadius:12
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    material: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    activeProduct: {
        opacity: 1,
    },
    confirmBtn: {
        width: '100%',
        flexDirection: 'row',
        marginBottom:20
    },
    disabledProduct: {
        opacity: 0.5,
    },
    dicountPrice: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color:'#000000'
    },
    actualPrice: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#D51E03',
    },
    textCheckbox: {
        marginLeft: 16,
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#0288D1',
    },
});


export default Cart;

