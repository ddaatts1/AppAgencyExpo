import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import dataFshop from '../../../../../ultidata/dataFshop';
import {ROUTES, SVG} from '../../../../constants';
import {useFutureLang} from "../../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../../constants/service";
import useOrder from "../useOrder";
import {formatPriceVNDShop} from "../../../group/formatMoney";
import {ProductType} from "../../../../constants/enum";
import {StorageHelper} from "../../../../services/api/auth";
import Toast from "react-native-simple-toast";

const FshopList = (props: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const cat_id = props?.cat_id
    const setId = props?.setId
    const {

        setOtherItem,
        setOtherAddToCart,
        setColorArr,
        setSizeArr,
        setSelectedColor,
        setSelectedSize
    } = props

    console.log("cat_id: " + cat_id)
    const {futureLang} = useFutureLang()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    const {orderProductData, fetchOrderProduct, isLoadingOrderProductData} = useOrder()
    useEffect(() => {

        if (cat_id) {

            const fetchData = async () => {
                const data = {
                    cat_id: cat_id,
                    service: service
                }
                console.log("data: " + JSON.stringify(data))
                fetchOrderProduct(data)
            }
            fetchData()
        }
    }, [cat_id])


    useEffect(() => {
        if (orderProductData) {
            console.log("orderProductData: " + JSON.stringify(orderProductData))

        }
    }, [orderProductData])
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);


    function handleClick(item: any) {
        setOtherItem(item)
        const fetchedColors = Object.values(JSON.parse(item.colors || '[]') || []);
        const fetchedSizes = Object.values(JSON.parse(item?.sizes || '[]') || []);
        const firstOnColor = fetchedColors.find(color => color.size !== null && color.status === 'on');
        setSelectedColor(firstOnColor?.color || undefined);

        const firstOnSize = fetchedSizes.find(size => size.size !== null && size.status === 'on');
        setSelectedSize(firstOnSize?.size || undefined);
        setColorArr(fetchedColors)
        setSizeArr(fetchedSizes)
    }


    return (
        orderProductData?.data?.map((item: any, index: any) => {
            return (
                <View key={index} style={styles.box1}>

                    <TouchableOpacity onPress={() => setId(item.id)}
                    >
                        {/*<Image style={styles.image} source={item.image}/>*/}
                        {isImage(item.image) ? <Image style={styles.image} source={{uri: item.image}}/> :
                            <Image style={styles.image} source={require('../../../../assets/image/news.png')}/>}

                        <Text style={styles.title}>{item.product_name}</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft: 3}}>
                        <Text style={{
                            fontFamily: 'Roboto',
                            fontSize: 12,
                            fontStyle: 'normal',
                            fontWeight: '400',
                            color:'#000000'
                        }}>{item.solded}</Text>
                    </View>
                    <View style={styles.box2}>
                        <View>
                            {item.price_discount !== undefined && item.price_discount !== 0 && (
                                <View style={styles.priceDiscount}>
                                    <SVG.VND color={'#525252'}/>
                                    <Text style={{
                                        textDecorationLine: 'line-through',
                                        textDecorationStyle: 'solid',
                                        color:'#525252'
                                    }}>{formatPriceVNDShop(item.value)}</Text>
                                </View>
                            )}
                            <View style={styles.price}>
                                <SVG.VND color={'#D51E03'}/>
                                <Text
                                    style={{color: 'red'}}>{formatPriceVNDShop(item.price_discount || item.value)}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleClick(item)}>
                                <SVG.Shop style={styles.icon3}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        })
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    box1: {
        // width: '45%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: 5,
        marginRight: 12,
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderWidth: 2,
        borderTopLeftRadius: 12,
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
        width: 182,
        height: 150,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontSize: 14,
        color: '#323232',
        marginLeft: 3,
    },
});

export default FshopList;
