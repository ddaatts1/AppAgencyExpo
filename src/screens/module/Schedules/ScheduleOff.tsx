import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES, SVG } from '../../../constants';
import data from '../../../../ultidata/data';
import ItemChage from '../../../components/card-warehouse/itemChage';

// Lich online
const ScheduleListOff = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { dataSchedule } = data();
    return (
        dataSchedule.map((item, index) => {
            return (
                <View key={index}>
                    <ItemChage color="#0288D1">
                        <View style={styles.box1}>
                            <Pressable onPress={() => navigation.navigate(ROUTES.SCHEDULEDETAIL)}>
                                <View style={styles.box2} >
                                    <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={styles.image} source={item.image} />
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.object}>
                                            {item.object}
                                        </Text>
                                    </View>

                            </View>
                            </Pressable>
                            <View style={styles.box3}>
                                <View style={{width:'50%', justifyContent: 'center', alignItems: 'center'}}>
                                    <Pressable style={styles.button} onPress={() => navigation.navigate(ROUTES.SCHEDULEDETAIL)}>
                                        <Text style={{color: '#fff'}}>Tham gia</Text>
                                    </Pressable>
                                </View>
                                <View style={{width: '50%'}}>

                                    <View style={styles.dateTime}>
                                        <View style={styles.date}>
                                        <SVG.IconMonth/>
                                            <Text>Thứ 2(06/03)</Text>
                                        </View>
                                        <View style={styles.time}>
                                            <SVG.IconHours/>
                                            <Text>20:00</Text>
                                        </View>
                                    </View>
                                    <View style={styles.location}>
                                        <SVG.Icon_location />
                                        <Text>TP Hồ Chí Minh</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </ItemChage>
                </View>
            );
        })
    );
};

const styles = StyleSheet.create({
    box1: {
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 4,
        paddingBottom: 7,
        paddingRight: 5,
        elevation: 0.1,
    },
    box2: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 7,
    },
    box3: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: '87%',
        borderRadius: 12,
        backgroundColor: '#0288D1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    image: {
        width: 165,
        height: 90,
        borderRadius: 4,
        marginRight: 10,
    },
    title: {

        fontSize: 14,
        fontWeight: '500',
        marginRight: 30,
        color: '#323232',
    },
    object: {
        color: '#0288D1',
        marginBottom: 3,
    },
    dateTime: {
        width: '50%',
        flexDirection: 'row',
        marginBottom: 12,
    },
    time: {
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 7,
        alignItems: 'center',
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        flexDirection: 'row',
    },
});

export default ScheduleListOff;
