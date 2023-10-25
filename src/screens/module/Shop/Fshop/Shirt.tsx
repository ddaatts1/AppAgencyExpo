import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import dataFshop from '../../../../../ultidata/dataFshop';
import { ROUTES, SVG } from '../../../../constants';

const Shirt = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <ScrollView>
            <View style={styles.container}>
        {
            dataFshop.map((item: any, index: any) => {
                return (
                    <View key={index} style={styles.box1}>

                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DISCOUNTDETAIL)}>
                        <Image style={styles.image} source={item.image}/>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                        <View style={{marginLeft: 3}}>
                            <Text style={{fontFamily: 'Roboto', fontSize: 12, fontStyle: 'normal', fontWeight: '400'}}>{item.solded}</Text>
                        </View>
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
                    </View>
                );
            })
        }
        </View>
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

export default Shirt;
