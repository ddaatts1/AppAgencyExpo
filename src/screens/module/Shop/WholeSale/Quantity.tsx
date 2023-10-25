import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { SVG } from '../../../../constants';
import dataDiscount from '../../../../../ultidata/dataDiscount';
import ItemChage from '../../../../components/card-warehouse/itemChage';
import {formatPriceVNDShop} from "../../../group/formatMoney";

const Quantity = (props: any) => {
    const [showInfo, setShowInfo] = useState([]);
    const { data,setOrderDetail,order_detail,isChecked } = props;


    // // Initialize order_detail as a state variable
    // const [order_detail, setOrderDetail] = useState(
    //     data?.map((d: any) => ({
    //         id: d.id,
    //         quantity: 0,
    //     }))
    // );

    const increaseQuantity = (index: number) => {
        if(isChecked){
            return
        }
        const newOrderDetail = [...order_detail];
        newOrderDetail[index].quantity += 1;
        setOrderDetail(newOrderDetail);
    };

    const decreaseQuantity = (index: number) => {
        if(isChecked){
            return
        }
        if (order_detail[index].quantity > 0) {
            const newOrderDetail = [...order_detail];
            newOrderDetail[index].quantity -= 1;
            setOrderDetail(newOrderDetail);
        }
    };

    return (
        <View>
            {data?.map((item, index) => {
                const handleToggleInfo = () => {
                    // Toggle showInfo for the specific item
                    setShowInfo((prev) => {
                        const updatedShowInfo = [...prev];
                        updatedShowInfo[index] = !updatedShowInfo[index];
                        return updatedShowInfo;
                    });
                };
                return (
                    <View key={index} style={styles.container}>
                        <ItemChage color={'#0288D1'}>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: 120,
                                            height: 100,
                                            position: 'relative',
                                            resizeMode: 'stretch',
                                            justifyContent: 'center',
                                            borderRadius: 8,
                                            margin: 7,
                                        }}
                                    />
                                </View>
                                <View>
                                    <View style={{ marginBottom: 5 }}>
                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <Text style={{ fontSize: 16, color: '#323232', width: '65%' }}>{item.name}</Text>

                                        </View>

                                        <View style={{ flexDirection: 'row', position: 'relative', zIndex: 0 }}>
                                            <SVG.VND />
                                            <Text style={{ color: 'red', fontWeight: '700' }}>{formatPriceVNDShop(item.price_discount || item.value)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.quantity}>
                                        <View style={{ width: '20%' }}>
                                            <Text style={{ fontSize: 16, color: '#000' }}>{order_detail[index]?.quantity}</Text>
                                        </View>
                                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <View>
                                                <Pressable onPress={() => decreaseQuantity(index)}>
                                                    <Text style={{ fontSize: 20, color: '#0288D1', paddingHorizontal: 7, borderColor: '#0288D1', borderRadius: 4, borderWidth: 1, marginRight: 6 }}>
                                                        {' '}
                                                        -{' '}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                            <View>
                                                <Pressable onPress={() => increaseQuantity(index)}>
                                                    <Text style={{ fontSize: 20, color: '#0288D1', paddingHorizontal: 4, borderColor: '#0288D1', borderRadius: 4, borderWidth: 1 }}>
                                                        {' '}
                                                        +{' '}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ItemChage>
                        {showInfo[index] ? (
                            <View style={{ position: 'absolute', top: 25, right: 10, zIndex: 999 }}>
                                <Text style={{ padding: 16, borderRadius: 8, backgroundColor: '#F5FCFF', color: '#0288D1', flexWrap: 'wrap', maxWidth: 300 }}>
                                    *{item.tool_tip}
                                </Text>
                            </View>

                        ) : null}

                        <TouchableOpacity onPress={handleToggleInfo}>
                            <View style={{ position: 'absolute', top: 10, right: 0, width: 40, height: 40 }}>
                                <SVG.IconInfo width={12} height={12} />
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '95%',
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#fff',
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
        zIndex: 0,
    },

    quantity: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
    },
});

export default Quantity;
