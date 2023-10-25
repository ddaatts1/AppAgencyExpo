import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import dataCommunity from '../../../../ultidata/dataCommunity';
import { SVG } from '../../../constants';

const Community = () => {
    return (
        <View style={styles.container}>
            <View style={{width: '100%', marginTop: 24, marginLeft: 16, marginBottom: 300}}>
            {dataCommunity.map((item, index) => {
                return (
                    <TouchableOpacity key={index}>
                        <View style={{width: '93%', flexDirection: 'row', backgroundColor: '#fff', marginBottom: 8, padding: 8, borderRadius: 16, alignItems: 'center'}}>
                            <View style={{width: '10%'}}>
                                <Image source={item.image}/>
                            </View>
                            <View style={{width: '85%'}}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                            <View style={{width: '5%'}}>
                                <SVG.Icon_next color="#525252"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#EEFAFF',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#323232',
        marginLeft: 8,
    },
});
export default Community;
