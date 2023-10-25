import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import dataDiscount from '../../../../ultidata/dataDiscount';
import SaledDiscount from './SaledDiscount';



const DiscountListHome = () => {
    const { dataShop } = dataDiscount();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        {dataShop.map((item, index) => {
            return (
                <View key={index} style={styles.box1}>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DISCOUNTDETAIL)}>
                        {/* <View style={{width: '12%'}}> */}
                            <Image style={styles.image} source={item.image}/>
                            <SaledDiscount
                                numerator={1}
                                denominator={3}
                                type={'đ'}
                                height={20}
                                backgroundColor={'#525252'}
                                completedColor={'#0288D1'}
                                percentage={'65%'}
                            />
                            <Text style={styles.title}>{item.title}</Text>
                        {/* </View> */}
                    </TouchableOpacity>
                    <View style={styles.box2}>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            <View>
                                <View style={styles.priceDiscount}>
                                    <SVG.VND color="#525252"/>
                                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 10 }}>{item.price_Discount}</Text>
                                </View>
                                <View style={styles.price}>
                                    <SVG.VND color="#D51E03"/>
                                    <Text style={{color: '#D51E03',fontWeight: '700', fontSize: 12}}>{item.price}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{justifyContent: 'flex-end', marginLeft: 80}} onPress={() => navigation.navigate(ROUTES.CART)}>
                                <View>
                                    <SVG.Shop style={styles.icon3} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            );
        })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    box1: {
        // width: '100%',
        flexDirection: 'column',
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 5,
    },
    box2: {
        width: '100%',
        marginLeft: 3,
    },
    price: {
        flexDirection: 'row',
    },
    icon3: {
        width: 32,
        height: 32,
    },
    priceDiscount: {
        flexDirection: 'row',
    },
    image: {
        width: '100%',
    },
    title: {
        width:'85%',
        fontSize: 14,
        color: '#323232',
        marginLeft: 3,
        marginBottom: 4,
    },
});


export default DiscountListHome;
