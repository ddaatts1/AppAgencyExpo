import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ROUTES, SVG} from '../../../../constants';
import FshopList from '../Fshop/FshopListAll';
import ModalPoup from '../../../../components/commons/modalPoup';
import routes from '../../../../constants/routes';
import Hr from '../../../../components/commons/Hr';
import ModalPoupFshop from '../../../../components/commons/modalPopupFshop';
import useOrder from "../useOrder";
import useCard from "../../../card-warehouse/useCard";
import {useFutureLang} from "../../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../../constants/service";
import {formatPriceVNDShop} from "../../../group/formatMoney";
import AutoHeightWebView from "react-native-autoheight-webview";
import LoadingReact from "../../../../components/commons/loading";
import {grey50} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import Toast from "react-native-simple-toast";
import {StorageHelper} from "../../../../services/api/auth";
import {ProductType} from "../../../../constants/enum";
import {Screen} from "react-native-screens";
import ModalAddToCartSuccess from "../../../../components/commons/modalAddToCartSuccess";

const FshopDetail = ({route}: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [id,setId] =useState( route?.params?.id)
    const cat_id = route?.params?.cat_id
    const category = route?.params?.category
    const [limit, setLimit] = useState(false);
    const [buy, setBuy] = useState(false);
    const [addToCart, setAddToCart] = useState(false)
    let [quantity, setQuantity] = React.useState(1);
    const [actualPrice, setActualPrice] = useState(1000000);
    const {futureLang} = useFutureLang()
    const {fetchingCardDetail, fetchingCardDetailData, isFetchingCardDetail} = useCard()
    const service = futureLang ? SERVICE_FTL : SERVICE_KIDS
    const [otherAddToCart, setOtherAddToCart] = useState(false)
    const [otherItem, setOtherItem] = useState()

    const fakeColor = [
        {
            color: "do", status: 'off'
        },
        {
            color: "xanh", status: 'on'
        },
        {
            color: "tim", status: 'off'
        }
    ]

    const fakeSize = [
        {
            size: "XL", status: 'on'
        },
        {
            size: "XXL", status: 'on'
        },
        {
            size: "XXXL", status: 'off'
        }
    ]
    const [colorArr, setColorArr] = useState()
    const [sizeArr, setSizeArr] = useState()
    const [selectedColor, setSelectedColor] = useState()
    const [selectedSize, setSelectedSize] = useState()
    const [addSuccess,setAddSuccess] =useState(false)

    useEffect(() => {
        fetchData(id)
    }, [id])


    const fetchData = async (item_id:any) => {
        const data = {
            service: service,
            id: item_id
        }
        fetchingCardDetail(data)
    }


    useEffect(() => {

        console.log("selectedColor: " + selectedColor)
    }, [selectedColor])

    useEffect(() => {

        if (fetchingCardDetailData) {
            // console.log("fetchingCardDetailData: " + JSON.stringify(fetchingCardDetailData))
            navigation.setOptions({
                headerBackground: () => (
                    isImage(fetchingCardDetailData?.data?.image) ?
                        <Image style={styles.headerBox} source={{uri: fetchingCardDetailData?.data?.image}}/> :
                        <Image style={styles.headerBox}
                               source={require('../../../../assets/image/logo.jpg')}/>

                ),
            });

            const fetchedColors = Object.values(JSON.parse(fetchingCardDetailData?.data?.colors || '[]') || []);
            const fetchedSizes = Object.values(JSON.parse(fetchingCardDetailData?.data?.sizes || '[]') || []);


            const firstOnColor = fetchedColors.find(color => color.size !== null && color.status === 'on');
            setSelectedColor(firstOnColor?.color || undefined);

            const firstOnSize = fetchedSizes.find(size => size.size !== null && size.status === 'on');
            setSelectedSize(firstOnSize?.size || undefined);
            setColorArr(fetchedColors)
            setSizeArr(fetchedSizes)
        }
    }, [fetchingCardDetailData])

    const renderedColors = (colors: any) => {

        return (
            <View style={{flexDirection: 'row'}}>
                {colors.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity disabled={item.status != 'on'} onPress={() => setSelectedColor(item.color)}>
                            <View
                                style={[styles.type, item.color === selectedColor && {
                                    borderColor: '#1E88E5',
                                    borderWidth: 1
                                }]}>
                                <Text
                                    style={item.status == 'on' ? item.color == selectedColor ? {color: '#0288D1'} : {color: '#000000'} : {color: '#747171'}}>{item.color}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

        )
    }


    const renderedSize = (size: any) => {

        return (
            <View style={{flexDirection: 'row'}}>
                {size.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity disabled={item.status != 'on'} onPress={() => setSelectedSize(item.size)}>
                            <View
                                style={[styles.type, item.size === selectedSize && {
                                    borderColor: '#1E88E5',
                                    borderWidth: 1
                                }]}>
                                <Text
                                    style={item.status == 'on' ? item.size == selectedSize ? {color: '#0288D1'} : {color: '#000000'} : {color: '#747171'}}>{item.size}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>

        )
    }

    //chưa đạt tối thiểu 2 thẻ
    const [minium, setMinium] = useState(false);
    const handleValue = (value: string) => {
        const parsedQty = Number.parseInt(value);
        if (Number.isNaN(parsedQty)) {
            setQuantity(0); //setter for state
        } else if (parsedQty > 10) {
            setQuantity(10);
        } else if (parsedQty < 0) {
            setQuantity(0);
        }
        // else {
        //     setQuantity(parsedQty.toString());
        // }
    };

    useEffect(()=>{

        if(otherItem){
            setOtherAddToCart(true)
        }
    },[otherItem])

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

    function valueQuantity() {

        let totalValue = quantity * actualPrice;
        if (quantity === 1) {
            return setMinium(true);
        } else if (totalValue > 1000000000) {
            return setLimit(true);
        } else {
            return navigation.navigate(routes.FSHOPCONFIRMORDER);
        }
    }

    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    function handleBuy() {
        if (selectedColor && selectedSize) {
            navigation.navigate(ROUTES.FSHOPCONFIRMORDER, {
                item: fetchingCardDetailData?.data,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize
            })
        } else {
            Toast.show("Vui lòng chọn kích cỡ và màu săc !")
        }
    }

    function handleAddToCart(it: any) {
        const item = {
            item: it,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize,
            category: category,
            service:service
        }
        StorageHelper.addToCart(item)
        setAddToCart(false)
        setOtherAddToCart(false)
        Toast.show("Đã thêm vào giỏ hàng")
        setAddSuccess(true)
    }

    return (
        <View style={styles.container}>
            {isFetchingCardDetail ? <LoadingReact/> : <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.box}>
                        <Text style={styles.headerTitle}>
                            {fetchingCardDetailData?.data?.product_name}
                        </Text>
                        <View style={styles.price}>
                            {fetchingCardDetailData?.data?.price_discount !== undefined && fetchingCardDetailData?.data?.price_discount !== 0 &&
                            <View style={styles.priceDiscount}>
                                <SVG.VND color="#525252"/>
                                <Text style={{
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                    color: '#525252'
                                }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.value)}</Text>
                            </View>}

                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                <View style={styles.priceActual}>
                                    <SVG.VND color="#D51E03"/>
                                    <Text style={{
                                        color: '#D51E03',
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.price_discount !== undefined && fetchingCardDetailData?.data?.price_discount !== 0 ? fetchingCardDetailData?.data?.price_discount : fetchingCardDetailData?.data?.value)}</Text>
                                </View>
                                <View style={{width: '30%'}}>
                                    <Text style={{
                                        fontFamily: 'Roboto',
                                        fontSize: 14,
                                        fontStyle: 'normal',
                                        fontWeight: '400'
                                    }}>Đã bán 262</Text>
                                </View>
                            </View>
                        </View>
                        <Hr/>

                        <View style={{width: '100%'}}>
                            <Text style={styles.titleQuantity}>Số lượng</Text>
                            <View style={{flexDirection: 'row' }}>
                                <TouchableOpacity onPress={decreaseQuantity}>
                                    <View style={{borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 24}}>
                                        <Text style={{color:'#000000'}}>-</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{width:'10%', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 4, marginRight: 4}}>
                                    {/* <TextInput onChangeText={handleValue} maxLength={4} style={{ }} /> */}
                                    <Text style={{color:'#000000'}}>{quantity}</Text>
                                </View>
                                <TouchableOpacity onPress={increaseQuantity}>
                                    <View style={{borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 24, height: 24}}>
                                        <Text style={{color:'#000000'}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.box2}>
                            <Text style={[styles.title, {fontWeight: '600'}]}>Mô tả sản phẩm</Text>
                            {/*<Text style={styles.content}>*/}
                            <AutoHeightWebView
                                style={{
                                    width: Dimensions.get('window').width - 15,
                                    marginTop: 20,
                                    flex: 1
                                }}
                                customStyle={`
                                          p {

                                          }
                                        `}
                                files={[{
                                    href: 'cssfileaddress',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{html: fetchingCardDetailData?.data?.description || ""}}
                                // scalesPageToFit={true}
                                // viewportContent={'width=device-width, user-scalable=no'}

                            />
                            {/*</Text>*/}
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
                            <View style={{width: '70%'}}>
                                <Text style={[styles.title, {fontWeight: '400'}]}>Các sản phẩm khác</Text>
                            </View>
                            <View style={{
                                width: '25%',
                                backgroundColor: '#EEFAFF',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 4,
                                paddingBottom: 4,
                                paddingRight: 8,
                                paddingLeft: 8,
                                borderRadius: 4
                            }}>
                                <TouchableOpacity onPress={() => navigation.navigate(routes.FSHOP)}>
                                    <Text style={[styles.sub_header, {fontWeight: '400'}]}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom: 100}}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <FshopList cat_id={cat_id} setOtherItem={setOtherItem}
                                           setOtherAddToCart={setOtherAddToCart}
                                           setColorArr={setColorArr}
                                           setSizeArr={setSizeArr}
                                           setSelectedColor={setSelectedColor}
                                           setSelectedSize={setSelectedSize}
                                           setId={setId}
                                />
                            </ScrollView>
                        </View>


                    </View>
                    {/* <ModalPoup visible={minium}>
                    <View style={{marginBottom: 64}}>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>Số lượng thẻ chưa đạt tối thiểu 2 thẻ. Vui lòng chọn lại!</Text>
                    </View>

                    <View style={styles.confirmBtn}>
                        <TouchableOpacity
                            onPress={() => setMinium(false)}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </ModalPoup> */}
                    <ModalAddToCartSuccess addSuccess={addSuccess} setAddSuccess={setAddSuccess}></ModalAddToCartSuccess>

                    <ModalPoupFshop visible={addToCart}>
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '25%'}}>
                                {isImage(fetchingCardDetailData?.data?.image) ?
                                    <Image style={styles.image} source={{uri: fetchingCardDetailData?.data?.image}}/> :
                                    <Image style={styles.image}
                                           source={require('../../../../assets/image/BaloFuturelang.png')}/>}

                            </View>
                            <View style={{width: '65%', marginLeft: 12}}>
                                <View>
                                    <Text style={{color:'#000000'}}>{fetchingCardDetailData?.data?.product_name}</Text>
                                </View>
                                <View style={styles.price}>
                                    <View style={styles.priceDiscount}>
                                        <SVG.VND color="#525252"/>
                                        <Text style={{
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color: '#525252'
                                        }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.value)}</Text>
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={styles.priceActual}>
                                            <SVG.VND color="#D51E03"/>
                                            <Text style={{
                                                color: '#D51E03',
                                                fontSize: 18,
                                                fontWeight: '600'
                                            }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.price_discount || fetchingCardDetailData?.data?.value)}</Text>
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
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Kích cỡ</Text>
                            </View>
                            {sizeArr && renderedSize(sizeArr)}

                        </View>
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Màu sắc</Text>
                            </View>
                            {colorArr && renderedColors(colorArr)}

                        </View>
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
                        <View style={{width: '95%'}}>
                            <TouchableOpacity onPress={() => handleAddToCart(fetchingCardDetailData?.data)}
                                              style={styles.foot2}>
                                <Text style={styles.textFoot2}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalPoupFshop>

                    <ModalPoupFshop visible={otherAddToCart}>
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '25%'}}>
                                {isImage(otherItem?.image) ?
                                    <Image style={styles.image} source={{uri: otherItem?.image}}/> :
                                    <Image style={styles.image}
                                           source={require('../../../../assets/image/BaloFuturelang.png')}/>}

                            </View>
                            <View style={{width: '65%', marginLeft: 12}}>
                                <View>
                                    <Text style={{color:'#000000'}}>{otherItem?.product_name}</Text>
                                </View>
                                <View style={styles.price}>
                                    <View style={styles.priceDiscount}>
                                        <SVG.VND color="#525252"/>
                                        <Text style={{
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color: '#525252'
                                        }}>{formatPriceVNDShop(otherItem?.value)}</Text>
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={styles.priceActual}>
                                            <SVG.VND color="#D51E03"/>
                                            <Text style={{
                                                color: '#D51E03',
                                                fontSize: 18,
                                                fontWeight: '600'
                                            }}>{formatPriceVNDShop(otherItem?.price_discount || otherItem?.value)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setOtherAddToCart(false)}>
                                <View style={{width: '5%'}}>
                                    <SVG.Icon_close/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Kích cỡ</Text>
                            </View>
                            {sizeArr && renderedSize(sizeArr)}

                        </View>
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Màu sắc</Text>
                            </View>
                            {colorArr && renderedColors(colorArr)}

                        </View>
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
                        <View style={{width: '95%'}}>
                            <TouchableOpacity onPress={() => handleAddToCart(otherItem)}
                                              style={styles.foot2}>
                                <Text style={styles.textFoot2}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalPoupFshop>

                    <ModalPoupFshop visible={buy}>
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '25%'}}>
                                {isImage(fetchingCardDetailData?.data?.image) ?
                                    <Image style={styles.image} source={{uri: fetchingCardDetailData?.data?.image}}/> :
                                    <Image style={styles.image}
                                           source={require('../../../../assets/image/BaloFuturelang.png')}/>}

                            </View>
                            <View style={{width: '65%', marginLeft: 12}}>
                                <View>
                                    <Text style={{color:'#000000'}}>{fetchingCardDetailData?.data?.product_name}</Text>
                                </View>
                                <View style={styles.price}>
                                    <View style={styles.priceDiscount}>
                                        <SVG.VND color="#525252"/>
                                        <Text style={{
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                            color: '#525252'
                                        }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.value)}</Text>
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={styles.priceActual}>
                                            <SVG.VND color="#D51E03"/>
                                            <Text style={{
                                                color: '#D51E03',
                                                fontSize: 18,
                                                fontWeight: '600'
                                            }}>{formatPriceVNDShop(fetchingCardDetailData?.data?.price_discount || fetchingCardDetailData?.data?.value)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setBuy(false)}>
                                <View style={{width: '5%'}}>
                                    <SVG.Icon_close/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Kích cỡ</Text>
                            </View>
                            {sizeArr && renderedSize(sizeArr)}

                        </View>
                        <View style={{marginTop: 16}}>
                            <View style={{marginBottom: 12}}>
                                <Text style={[styles.sub_header, {fontWeight: '500'}]}>Màu sắc</Text>
                            </View>
                            {colorArr && renderedColors(colorArr)}

                        </View>
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
                        <View style={{width: '95%'}}>
                            <TouchableOpacity onPress={() => handleBuy()}
                                              style={styles.foot2}>
                                <Text style={styles.textFoot2}>Mua ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalPoupFshop>
                    {/* <ModalPoup visible={limit}>
                <View style={{marginBottom: 64}}>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: '400', color: '#323232' }}>Đơn hàng vượt quá giá trị tối đa 1 tỉ VND. Vui lòng đặt lại.</Text>
                </View>


                <View style={styles.confirmBtn}>
                    <TouchableOpacity
                        onPress={() =>setLimit(false)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: 'bold' }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ModalPoup> */}

                </ScrollView>
                <View style={styles.footer}>
                    <View style={{
                        width: '30%',
                        backgroundColor: '#EEFAFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 9,
                        paddingBottom: 9,
                        borderRadius: 12,
                        marginRight: 8
                    }}>
                        <TouchableOpacity style={styles.foot1} onPress={() => setAddToCart(true)}>
                            <SVG.Icon_Shopping style={{width: '40%', marginLeft: 5, marginRight: 10}}/>
                            <Text style={styles.textFoot1}>
                                Thêm vào giỏ hàng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '60%'}}>
                        <TouchableOpacity onPress={() =>{ category == ProductType.Fshop?  setBuy(true): handleAddToCart(fetchingCardDetailData?.data)}} style={styles.foot2}>
                            <Text style={styles.textFoot2}>
                                Mua ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 130,
    },
    box: {
        width: '100%',
        marginLeft: 16,
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
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    priceActual: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        marginBottom: 24,
    },

    image: {
        height: 100,
        width: 80,
        borderRadius: 12,
        borderTopRightRadius: 12,
    },
    button: {
        width: '94%',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 32,
        paddingRight: 32,
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

        color: '#0288D1',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
    },
    content: {
        width: '95%',
        marginRight: 16,
        fontSize: 14,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    box2: {
        width: '100%',
        marginTop: 12,
        marginBottom: 12,
    },
    textContent: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
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
    sub_header: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        color: '#0288D1',
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
    },
    foot1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBox: {
        width: '100%',
        height: 200,
        position: 'relative',
        zIndex: 1,
        resizeMode: 'cover',
    },
    textFoot1: {
        width: '60%',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#0288D1',
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
    confirmBtn: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        marginBottom: 16,
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
    },
    type: {
        borderRadius: 4,
        // borderColor: '#181616',
        color: '#000000',
        marginRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#EEEEEE'
    },
});

export default FshopDetail;
