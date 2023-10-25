import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import discount from '../../../../ultidata/dataDiscount';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import dataDiscount from '../../../../ultidata/dataDiscount';
import dataComboCard from '../../../../ultidata/dataComboCard';

const DiscountList = () => {
    const {dataDiscountList} = dataDiscount();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        dataDiscountList.map((item, index) => {
            return (
                <View key={index} style={styles.box1}>
                    <Image style={styles.image} source={item.image}/>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DISCOUNTDETAIL)}>
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                    <View style={styles.box2}>
                        <View >
                            <View style={styles.priceDiscount}>
                                <SVG.VND color={'#525252'}/>
                                <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.priceActual}</Text>
                            </View>
                            <View style={styles.price}>
                                <SVG.VND color={'#D51E03'}/>
                                <Text style={{color: 'red'}}>{item.priceDiscount}</Text>
                            </View>
                        </View>
                        <View>
                            <SVG.Shop style={styles.icon3} />
                        </View>
                    </View>
                </View>
            );
        })
    //     <View style={styles.container}>
    //         <ScrollView style={{flexGrow: 1}}
    //  nestedScrollEnabled={true}>
    //         <SafeAreaView>
    //             <FlatList
    //                 numColumns={2}
    //                 data={discount}
    //                 keyExtractor={((item, index) => {return index.toString();})}
    //                 renderItem={({item})=> {
    //                     return (
                            // <View style={styles.box1}>
                            //     <Image style={styles.image} source={item.image}/>
                            //     <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DISCOUNTDETAIL)}>
                            //         <Text style={styles.title}>{item.title}</Text>
                            //     </TouchableOpacity>
                            //     <View style={styles.box2}>
                            //         <View >
                            //             <View style={styles.priceDiscount}>
                            //                 <SVG.VND />
                            //                 <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.price_Discount}</Text>
                            //             </View>
                            //             <View style={styles.price}>
                            //                 <SVG.VND/>
                            //                 <Text style={{color: 'red'}}>{item.price}</Text>
                            //             </View>
                            //         </View>
                            //         <View>
                            //             <SVG.Shop style={styles.icon3} />
                            //         </View>
                            //     </View>
                            // </View>
    //                     );
    //                 }}
    //             />
    //         </SafeAreaView>

    //         </ScrollView>

    //     </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    box1: {
        width: '45%',
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
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontSize: 14,
        color: '#323232',
        marginLeft: 3,
    },
});

export default DiscountList;
