import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { SVG } from '../../../constants';
import DiscountList from './DiscountList';
import { Countdown } from '../IncentivePrograms/useCountDown';
import LinearGradient from 'react-native-linear-gradient';

const Discount = () => {
    const [day, hours, minutes, seconds] = Countdown(1300);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.countdown}>
                    <SVG.Timer style={styles.icon} />
                    <Text style={styles.text}>Kết thúc trong</Text>
                    <View>
                    {
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6}}>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                <View style={{flexDirection: 'column'}}>
                                    <LinearGradient
                                        colors={['#85C8FF', '#067CE4']}
                                        start={{x: 0, y: 0}}
                                        end={{x: 0, y: 1}}
                                        style={styles.linearGradient}
                                    >
                                        <View style={styles.timeLeft}>
                                            <Text style={styles.textTimeLeft}>{day}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>

                            </View>

                            <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                <View style={{flexDirection: 'column'}}>
                                    <LinearGradient
                                        colors={['#85C8FF', '#067CE4']}
                                        start={{x: 0, y: 0}}
                                        end={{x: 0, y: 1}}
                                        style={styles.linearGradient}
                                    >
                                        <View style={styles.timeLeft}>
                                            <Text style={styles.textTimeLeft}>{hours}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>

                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                <View style={{flexDirection: 'column'}}>
                                    <LinearGradient
                                        colors={['#85C8FF', '#067CE4']}
                                        start={{x: 0, y: 0}}
                                        end={{x: 0, y: 1}}
                                        style={styles.linearGradient}
                                    >
                                        <View style={styles.timeLeft}>
                                            <Text style={styles.textTimeLeft}>{minutes}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>

                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                <View style={{flexDirection: 'column'}}>
                                    <LinearGradient
                                        colors={['#85C8FF', '#067CE4']}
                                        start={{x: 0, y: 0}}
                                        end={{x: 0, y: 1}}
                                        style={styles.linearGradient}
                                    >
                                        <View style={styles.timeLeft}>
                                            <Text style={styles.textTimeLeft}>{seconds}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>

                            </View>
                        </View>
                        }
                    </View>
                    {/* <Text>00:00:00</Text> */}
                    {/* <CountDownTimer/> */}
                </View>

                <View style={styles.list}>
                    <DiscountList/>
                </View>
            </View>
        </ScrollView>



    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginLeft: 9,
        backgroundColor: '#fff',
    },
    countdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 30,
        marginBottom: 10,
        marginTop: 20,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        width: 16,
        height: 16,
    },
    text: {
        color: '#323232',
        fontSize: 14,
        marginLeft: 2,
        marginRight: 2,
        fontFamily: 'roboto',
    },
    linearGradient: {
        borderRadius: 3,
    },
    timeLeft: {
        padding: 3,
    },
    textTimeLeft: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#fff',
    },

});

export default Discount;
