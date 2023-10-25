import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ROUTES} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCountdown} from '../../training/question/useCountdown';
import {Countdown} from '../IncentivePrograms/useCountDown';


export  default  function ProgramAndDiscountComponent(props:any){

    const {item,index} = props;
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { status, timeBetween } = calculateEventStatus(
        item.start_date,
        item.end_date
    );



    const isUpcoming = status === 1;
    const isOngoing = status === 2;
    const isEnded = status === 3;



    // useEffect(()=>{
    //     console.log("================> name: "+ item)
    //     console.log(calculateEventStatus(item.start_date,item.end_date))
    //     console.log("content: "+ JSON.stringify(item.content))
    //
    // },[])


    const [day, hours, minutes, seconds] = Countdown(timeBetween);
    const isImage = (url:any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    return (
        <View key={index}>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,marginRight: 6, borderRadius: 6, borderWidth: 1, borderColor: '#EEEEEE'}}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.INCENTIVEPROGRAMS,{
                    id: item.id,
                })}>
                    <View >
                        {isImage(item?.image) ?
                            <Image style={{borderTopRightRadius: 6, borderTopLeftRadius: 6, width:200,height:100}} source={{uri:item?.image}}/>
                            :
                            <Image style={{borderTopRightRadius: 6, borderTopLeftRadius: 6, width:200,height:100}} source={{uri:'https://5501513-s3user.s3.cloudstorage.com.vn/agency/07758PICwCJrIvudi1e4Z_PIC2018.png_860.png'}}/>
                        }
                    </View>
                    <View style={{width: '93%'}}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: '100%'}}>

                    {isUpcoming && (
                        <View>
                            <View style={{ width: '100%', paddingTop: 4, paddingBottom: 4, backgroundColor: '#EEFAFF' }}>
                                <Text style={styles.statusDiscount2}>Sắp diễn ra</Text>
                            </View>
                        </View>
                    )}
                    { isOngoing && (
                        <View>
                            <View style={{ width: '100%', paddingTop: 4, paddingBottom: 4, backgroundColor: '#FFF2F0' }}>
                                <Text style={styles.statusDiscount1}>Đang diễn ra</Text>
                            </View>
                        </View>
                    )}
                    {isEnded && (
                        <View>
                            <View style={{ width: '100%', paddingTop: 4, paddingBottom: 4, backgroundColor: '#C2C2C2' }}>
                                <Text style={styles.statusDiscount3}>Đã kết thúc</Text>
                            </View>
                        </View>
                    )}

                    {
                        (isUpcoming) ?
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
                                    <View>
                                        <Text>Ngày</Text>
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
                                    <View>
                                        <Text>Giờ</Text>
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
                                    <View>
                                        <Text>Phút</Text>
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
                                    <View>
                                        <Text>Giây</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            (isOngoing) ?
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 6}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <LinearGradient
                                                colors={['#FF4F4F', '#D31900', '#EB1B00']}
                                                start={{x: 0, y: 0}}
                                                end={{x: 0, y: 1}}
                                                style={styles.linearGradient}
                                            >
                                                <View style={styles.timeLeft}>
                                                    <Text style={styles.textTimeLeft}>{day}</Text>
                                                </View>
                                            </LinearGradient>
                                            <View>
                                                <Text>Ngày</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <LinearGradient
                                                colors={['#FF4F4F', '#D31900', '#EB1B00']}
                                                start={{x: 0, y: 0}}
                                                end={{x: 0, y: 1}}
                                                style={styles.linearGradient}
                                            >
                                                <View style={styles.timeLeft}>
                                                    <Text style={styles.textTimeLeft}>{hours}</Text>
                                                </View>
                                            </LinearGradient>
                                            <View>
                                                <Text>Giờ</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <LinearGradient
                                                colors={['#FF4F4F', '#D31900', '#EB1B00']}
                                                start={{x: 0, y: 0}}
                                                end={{x: 0, y: 1}}
                                                style={styles.linearGradient}
                                            >
                                                <View style={styles.timeLeft}>
                                                    <Text style={styles.textTimeLeft}>{minutes}</Text>
                                                </View>
                                            </LinearGradient>
                                            <View>
                                                <Text>Phút</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 8}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <LinearGradient
                                                colors={['#FF4F4F', '#D31900', '#EB1B00']}
                                                start={{x: 0, y: 0}}
                                                end={{x: 0, y: 1}}
                                                style={styles.linearGradient}
                                            >
                                                <View style={styles.timeLeft}>
                                                    <Text style={styles.textTimeLeft}>{seconds}</Text>
                                                </View>
                                            </LinearGradient>
                                            <View>
                                                <Text>Giây</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                : ''}


                </View>
            </View>

        </View>

    );
}



export const calculateEventStatus = (startDate, endDate) => {
    const currentDate = new Date();
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (currentDate < startDate) {
        // Event has not started yet
        const timeBetween = Math.floor((startDate - currentDate) / 1000);
        return { status: 1, timeBetween };
    } else if (currentDate >= startDate && currentDate <= endDate) {
        // Event is ongoing
        const timeBetween = Math.floor((endDate - currentDate) / 1000);
        return { status: 2, timeBetween };
    } else {
        // Event has ended
        return { status: 3, timeBetween: 0 };
    }
};




const styles = StyleSheet.create({
    text: {
        marginTop: 6,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },
    statusDiscount1: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#D51E03',
    },
    statusDiscount2: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#0288D1',
    },
    statusDiscount3: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#525252',
    },
    textTimeLeft: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#fff',
    },
    timeLeft: {
        padding: 3,
    },
    linearGradient: {
        borderRadius: 3,
    },
});
