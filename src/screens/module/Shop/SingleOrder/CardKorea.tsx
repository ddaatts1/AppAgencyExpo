import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import dataSingleProduct from '../../../../../ultidata/dataSingleProduct';
import { ROUTES, SVG } from '../../../../constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ItemChage from '../../../../components/card-warehouse/itemChage';

const CardKorea = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 16}}>
                {dataSingleProduct.map((item: any, index:any) => {
                    return (
                    <View key={index}>
                        <View style={styles.box1}>
                            <ItemChage color={'#0288D1'} >
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SINGLEORDERDETAIL)}>
                                <Image style={styles.image} source={item.image}/>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <View style={styles.box2}>
                                <View >
                                    <View style={styles.priceDiscount}>
                                        <SVG.VND color={'#525252'}/>
                                        <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.price_Discount}</Text>
                                    </View>
                                    <View style={styles.price}>
                                        <SVG.VND color={'#D51E03'}/>
                                        <Text style={{color: 'red'}}>{item.price}</Text>
                                    </View>
                                </View>
                                <View>
                                    <SVG.Shop style={styles.icon3} />
                                </View>
                            </View>
                            <View style={{marginLeft: 5, marginTop: 8}}>
                                <Text>{item.saled}</Text>
                            </View>
                            </ItemChage>
                        </View>

                    </View>
                    );
                })}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },

    box1: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: 6,
        paddingBottom: 5,
        marginLeft: 10,
    },
    box2: {
        width: '100%',
        flexDirection: 'row',
        marginLeft: 3,
        marginTop: 8,
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
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontSize: 14,
        color: '#323232',
        marginLeft: 3,
    },
});

export default CardKorea;
