import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import dataFshop from '../../../../../ultidata/dataFshop';
import { ROUTES, SVG } from '../../../../constants';
import useOrder from "../useOrder";
import LoadingReact from "../../../../components/commons/loading";
import formatPriceVND, {formatPriceVNDShop} from "../../../group/formatMoney";
import useCard from "../../../card-warehouse/useCard";
import ModalPoupFshop from "../../../../components/commons/modalPopupFshop";
import {ProductType} from "../../../../constants/enum";
import {StorageHelper} from "../../../../services/api/auth";
import Toast from "react-native-simple-toast";
import {useFutureLang} from "../../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../../constants/service";
import ModalAddToCartSuccess from "../../../../components/commons/modalAddToCartSuccess";
import {set} from "react-hook-form";

const SingleCardAll = ({route,onAddToCartSuccess}:any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [addToCart,setAddToCart] = useState(false)
    const [chosenItem,setChosenItem] = useState()

    const {futureLang} = useFutureLang()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    // const {orderProductData,fetchOrderProduct,isLoadingOrderProductData} = useOrder()
    const [addSuccess,setAddSuccess] =useState(false)
    const {fetchListCardInfo,listcardInfo,isFetchingListCardInfo} = useCard()

    const [colorArr, setColorArr] = useState()
    const [sizeArr, setSizeArr] = useState()
    const [selectedColor, setSelectedColor] = useState()
    const [selectedSize, setSelectedSize] = useState()

    useEffect(()=>{

        if(chosenItem){
            console.log("chosenItem: "+ JSON.stringify(chosenItem))
            setAddToCart(true)
        }
    },[chosenItem])

    useEffect(()=>{

        const fetchData = async () => {
            const data = {
                type: 1,
                service: service
            }
            console.log("data: " + JSON.stringify(data))
            fetchListCardInfo(data)
        }
        fetchData()
    },[])


    useFocusEffect(
        React.useCallback(() => {

            const fetchData = async () => {
                const data = {
                    type: 1,
                    service: service
                }
                fetchListCardInfo(data)
            }
            fetchData()

        }, [])
    );


    useEffect(()=>{
        if(listcardInfo){

        }
    },[listcardInfo])
    let [quantity, setQuantity] = React.useState(1);

    const isImage = (url:any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    const renderedColors = (colors: any) => {

        return (
            <View style={{flexDirection: 'row'}}>
                {colors.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity disabled={item.status != 'on'} onPress={() => setSelectedColor(item.color)}>
                            <View
                                style={[styles.type,  item.color === selectedColor && { borderColor: '#1E88E5', borderWidth: 1 }]}>
                                <Text style={item.status == 'on'? item.color == selectedColor? {color:'#0288D1'}:{color:'#000000'}:{color:'#747171'}}>{item.color}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

        )
    }


    function increaseQuantity() {
        quantity += 1;
        return setQuantity(quantity);
    }

    function decreaseQuantity() {
        if (quantity > 0) {
            quantity -= 1;
            return setQuantity(quantity);
        } else if (quantity === 0) {
            return setQuantity(0);
        }
    }
   async function handleAddToCart() {
        const item={
            item:chosenItem,
            quantity: quantity,
            color: selectedColor,
            size:selectedSize,
            category:ProductType.Card,
            service:service
        }
        StorageHelper.addToCart(item)
        setAddToCart(false)
        Toast.show("Đã thêm vào giỏ hàng")
        setAddSuccess(true)
       onAddToCartSuccess()

    }

    const renderedSize = (size: any) => {

        return (
            <View style={{flexDirection: 'row'}}>
                {size.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity disabled={item.status != 'on'} onPress={() => setSelectedSize(item.size)}>
                            <View
                                style={[styles.type,  item.size === selectedSize && { borderColor: '#1E88E5', borderWidth: 1 }]}>
                                <Text style={item.status == 'on'? item.size == selectedSize? {color:'#0288D1'}:{color:'#000000'}:{color:'#747171'}}>{item.size}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

        )
    }

    function handleClick(item: any) {
        setChosenItem(item)
        setQuantity(1)
        const fetchedColors = Object.values(JSON.parse(item.colors || '[]')||[]);
        const fetchedSizes =Object.values(JSON.parse(item?.sizes || '[]') || []);
        const firstOnColor = fetchedColors.find(color => color.size !== null && color.status === 'on');
        setSelectedColor( firstOnColor?.color || undefined);

        const firstOnSize = fetchedSizes.find(size => size.size !== null && size.status === 'on');
        setSelectedSize( firstOnSize?.size || undefined);
        setColorArr(fetchedColors)
        setSizeArr(fetchedSizes)
    }

    return (
        <ScrollView>
            {isFetchingListCardInfo? <LoadingReact/>:
                <View style={styles.container}>
                    {
                        listcardInfo?.map((item: any, index: any) => {
                            return (
                                <View key={index} style={styles.box1}>

                                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FSHOPDETAIL,{
                                        id: item.id,
                                        cat_id: item.cat_id,
                                        category: ProductType.Card
                                    })}>
                                        {isImage(item.image)?<Image  style={styles.image} source={{uri:item.image}}/>: <Image  style={styles.image} source={require('../../../../assets/image/news.png')}/>  }

                                        <Text style={styles.title}>{item.product_name}</Text>
                                    </TouchableOpacity>

                                    <View style={styles.box2}>
                                        <View >
                                            {item.price_discount !== undefined && item.price_discount !== 0 && (
                                                <View style={styles.priceDiscount}>
                                                    <SVG.VND color={'#525252'}/>
                                                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:"#000000" }}>{formatPriceVNDShop(item.value)}</Text>
                                                </View>
                                            )}

                                            <View style={{marginLeft: 3}}>
                                                <Text style={{fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '400',color:'#000000'}}>Đã bán 1k</Text>
                                            </View>
                                            <View style={styles.price}>
                                                <SVG.VND color={'#D51E03'}/>
                                                <Text style={{color: 'red'}}>{formatPriceVNDShop(item.price_discount || item.value)}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{position:"absolute",right:10,bottom:10}}>
                                        <TouchableOpacity onPress={()=>handleClick(item)}>
                                            <SVG.Shop style={styles.icon3} />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            );
                        })
                    }
                </View>
            }
            <ModalPoupFshop visible={addToCart}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width: '25%'}}>
                        {isImage(chosenItem?.image) ?
                            <Image style={styles.imageP} source={{uri: chosenItem?.image}}/> :
                            <Image style={styles.imageP}
                                   source={require('../../../../assets/image/BaloFuturelang.png')}/>}

                    </View>
                    <View style={{width: '65%', marginLeft: 12}}>
                        <View>
                            <Text style={{color:'#000000'}}>{chosenItem?.product_name}</Text>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.priceDiscount}>
                                <SVG.VND color="#525252"/>
                                <Text style={{
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    color: '#525252'
                                }}>{formatPriceVNDShop(chosenItem?.value)}</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                <View style={styles.priceActual}>
                                    <SVG.VND color="#D51E03"/>
                                    <Text style={{
                                        color: '#D51E03',
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>{formatPriceVNDShop(chosenItem?.price_discount || chosenItem?.value)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setAddToCart(false)}>
                        <View style={{width: '5%'}}>
                            <SVG.Icon_close/>
                        </View>
                    </TouchableOpacity>
                </View>
                {/*<View style={{marginTop: 16}}>*/}
                {/*    <View style={{marginBottom: 12}}>*/}
                {/*        <Text style={[styles.sub_header, {fontWeight: '500'}]}>Kích cỡ</Text>*/}
                {/*    </View>*/}
                {/*    {sizeArr&& renderedSize(sizeArr)}*/}

                {/*</View>*/}
                {/*<View style={{marginTop: 16}}>*/}
                {/*    <View style={{marginBottom: 12}}>*/}
                {/*        <Text style={[styles.sub_header, {fontWeight: '500'}]}>Màu sắc</Text>*/}
                {/*    </View>*/}
                {/*    {colorArr && renderedColors(colorArr)}*/}

                {/*</View>*/}
                <View style={{width: '100%', flexDirection: 'row', marginTop: 16, marginBottom: 16}}>
                    <Text style={styles.titleQuantity}>Số lượng</Text>
                    <View style={{flexDirection: 'row', width: '35%'}}>
                        <TouchableOpacity onPress={decreaseQuantity}>
                            <View style={{
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 24,
                                height: 24,
                                borderRadius: 4
                            }}>
                                <Text style={{color:'#000000'}}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{
                            width: '30%',
                            height: 24,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 4,
                            marginRight: 4,
                            borderRadius: 4
                        }}>
                            {/* <TextInput onChangeText={handleValue} maxLength={4} style={{ }} /> */}
                            <Text style={{color:'#000000'}}>{quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={increaseQuantity}>
                            <View style={{
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 24,
                                height: 24,
                                borderRadius: 4
                            }}>
                                <Text style={{color:'#000000'}}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{width: '95%', marginBottom:40}}>
                    <TouchableOpacity  onPress={() => handleAddToCart()}
                                       style={styles.foot2}>
                        <Text style={styles.textFoot2}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoupFshop>
            <ModalAddToCartSuccess addSuccess={addSuccess} setAddSuccess={setAddSuccess}></ModalAddToCartSuccess>


        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
    },

    box1: {
        width: '45%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: 5,
        marginRight: 4,
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderWidth: 2,
        borderRadius: 12,
        borderTopRightRadius: 12,
        paddingBottom: 5,
    },
    box2: {
        width: '100%',
        flexDirection: 'row',
        marginLeft: 3,
    },
    price: {
        flexDirection: 'row',
    },
    icon3: {
        width: 32,
        height: 32,
        marginLeft: 60,
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    image: {
        height:200,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: "cover"
    },
    imageP: {
        height: 100,
        width: 80,
        borderRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontSize: 14,
        color: '#323232',
        marginLeft: 3,
    },
    priceActual: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sub_header: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        color: '#0288D1',
    },
    type: {
        borderRadius: 4,
        // borderColor: '#181616',
        color:'#000000',
        marginRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#EEEEEE'
    },
    titleQuantity: {
        width: '65%',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#0288D1',
        marginBottom: 12,
    },
    textFoot2: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#fff',
    },
    foot2: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: 12,
    },
});

export default SingleCardAll;
