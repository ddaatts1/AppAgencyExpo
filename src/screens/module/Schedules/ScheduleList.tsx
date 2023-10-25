import {
    StyleSheet,
    View,
    Text,
    Pressable,
    TouchableOpacity,
  } from 'react-native';
  import React, { useState } from 'react';
import Hr from '../../../components/commons/Hr';
import ScheduleListHome from './ScheduleListHome';
import { ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScheduleListOff from './ScheduleOff';
import { Enum } from '../../../constants/enum';


const Schedules = () => {
    const [type, setType] = React.useState(0);
    //Enum.Online==0:
    function handleSubmit(type: any) {
        setType(type);

    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.tab}>
                    <TouchableOpacity
                        onPress={() => handleSubmit(Enum.Online)}
                        style={[styles.button1, Enum.Online === type ? ({ backgroundColor: '#0288D1' }) : ({ backgroundColor: '#F5FCFF' })]}
                    >
                        <Text style={[styles.text, Enum.Online === type ? ({ color: 'white' }) : ({ color: '#525252' })]}>Online</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSubmit(Enum.Offline)}
                        style={[styles.button1, Enum.Offline === type ? ({ backgroundColor: '#0288D1' }) : ({ backgroundColor: '#F5FCFF' })]}
                    >
                        <Text style={[styles.text, Enum.Offline === type ? ({ color: 'white' }) : ({ color: '#525252' })]}>Offline</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.box}>
                    <Text style={styles.headerTitle}>Chương trình tổng quan</Text>
                    <View>
                        {
                            Enum.Online === type ? <ScheduleListHome/> : <ScheduleListOff/>
                        }
                    </View>
                    <Hr/>
                    <View>
                        <Text style={styles.headerTitle}>Chương trình dành cho bạn</Text>
                        {
                            Enum.Online === type ? <ScheduleListHome/> : <ScheduleListOff/>
                        }
                    </View>
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
    tab: {
        width: '95%',
        marginTop: 50,
        marginLeft: 9,
        marginRight: 9,
        backgroundColor: '#F5FCFF',
        borderRadius: 53,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button1: {
        width: '50%',
        borderRadius: 55,
        padding: 15,
    },
    text: {
        textAlign: 'center',
    },
    box: {
        width: '95%',
        marginTop: 30,
        marginLeft: 9,
        marginRight: 9,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderRadius: 16,
        borderWidth: 2,
        marginBottom: 16,
        paddingTop: 7,
        paddingBottom: 7,
        elevation: 0.1,
    },
    box2: {
        width: '50%',
        flexDirection: 'column',
        margin: 3,
    },
    box3: {
        width: '100%',
        flexDirection: 'column',
    },
    button: {
        width: '93%',
        marginLeft: 12,
        marginTop: 10,
        borderRadius: 12,
        backgroundColor: '#0288D1',
        padding: 12,
    },
    program: {
        borderRadius: 12,
        margin: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 10,
    },
    layout1: {
        width: '100%',
        flexDirection: 'row',
    },
    layout2: {
        flexDirection: 'column',
    },
    image: {
        width: 175,
        height: 90,
        borderRadius: 4,
        marginLeft: 15,
        marginRight: 10,
    },
    title: {
        width: '50%',
        fontSize: 14,
        fontWeight: '500',
    },
    object: {
        marginTop: 60,
        color: '#0288D1',
    },
    dateTime: {
        flexDirection: 'row',
        marginTop: 10,
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
        paddingRight: 7,
    },
});
export default Schedules;
