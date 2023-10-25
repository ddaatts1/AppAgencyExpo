import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {ParamListBase, useFocusEffect, useNavigation} from '@react-navigation/native';
import { ROUTES, SVG } from '../../../constants';
import ItemChage from '../../../components/card-warehouse/itemChage';
import data from '../../../../ultidata/data';
import { EnumCourse, EnumONOFF } from '../../../constants/enum';
import routes from '../../../constants/routes';

// Lich online
const ScheduleListHome = () => {
    const { dataSchedule } = data();
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const statusItem = (item: Number) => {
        if (item == EnumONOFF.ON) {
            return 'Online ';
        } else if (item == EnumONOFF.OFF) {
            return 'Offline';
        }


    };
    return (
        dataSchedule.slice(0, 3).map((item, index) => {
            return (
                <ItemChage key={index} color={'#0288D1'} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.SCHEDULEDETAIL)}>
                    <View style={{ width: '100%' , padding: 10, flexDirection: 'row' }}>
                        <View style={{width: '50%'}}>
                            <Image style={styles.image} source={item.image} />
                        </View>

                        <View style={{width: '50%'}}>
                            <Text style={styles.title}>Bí kíp ứng dụng chat GPT </Text>

                            <Text style={item.status == EnumONOFF.ON ? styles.online : styles.offline}>
                                {statusItem(item.status)}
                            </Text>

                        </View>

                    </View>
                    </TouchableOpacity>


                    <View style={{ width: '100%' ,flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 12 }}>
                        <TouchableOpacity style={{width: '42%',marginTop: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#0288D1', height: 36 }} onPress={() => navigation.navigate(ROUTES.SCHEDULEDETAIL)}>

                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tham gia</Text>

                        </TouchableOpacity>


                        <View style={{ paddingHorizontal: 10, width: '58%' }}>
                            <Text style={{ color: '#0288D1', fontSize: 12 }} numberOfLines={2}>{item.object} </Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <SVG.Icon_time_blue />
                                    <Text style={{ color: '#525252', fontSize: 12 }}> 20:00</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <SVG.Icon_date_blue />
                                    <Text numberOfLines={1} style={{ color: '#525252', fontSize: 12 }}> Thứ 2(06/03)</Text>
                                </View>
                            </View>
                        </View>


                    </View>



                    {/* <Pressable onPress={() => navigation.navigate(ROUTES.SCHEDULEDETAIL)}>
                            <View style={styles.box2} >
                                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={styles.image} source={item.image} />
                                </View>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </Pressable>
                        <View style={styles.box3}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable style={styles.button} onPress={() => navigation.navigate(ROUTES.SCHEDULEDETAIL)}>
                                    <Text style={{ color: '#fff' }}>Tham gia</Text>
                                </Pressable>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.object}>
                                    {item.object}
                                </Text>
                                <View style={styles.dateTime}>
                                    <View style={styles.date}>
                                        <Image source={require('../../../assets/image/month.png')} />
                                        <Text>Thứ 2(06/03)</Text>
                                    </View>
                                    <View style={styles.time}>
                                        <Image source={require('../../../assets/image/hours.png')} />
                                        <Text>20:00</Text>
                                    </View>
                                </View>

                            </View>
                        </View> */}

                </ItemChage >
            );
        })
    );
};

const styles = StyleSheet.create({
    online: { fontSize: 10, color: '#009C10', alignSelf: 'flex-start', backgroundColor: '#EAFFEC', padding: 6, borderRadius: 16, fontWeight: 'bold', marginTop: 8 },
    offline: { fontSize: 10, color: 'red', alignSelf: 'flex-start', backgroundColor: '#FFEAEA', padding: 6, borderRadius: 16, fontWeight: 'bold', marginTop: 8 },

    box1: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderRadius: 16,
        borderWidth: 2,
        marginBottom: 16,
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
        width: '100%',
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
        height: 90,
        borderRadius: 12,
        marginRight: 10,

    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#323232',

    },
    object: {
        color: '#0288D1',
        fontSize: 12,
        marginBottom: 3,
    },
    dateTime: {
        width: '50%',
        flexDirection: 'row',
    },
    time: {
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 7,
        alignItems: 'center',
        fontSize: 12,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
    },
    textOnl: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#009C10',
    },
    textOff: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#D51E03',
    },
});

export default ScheduleListHome;
