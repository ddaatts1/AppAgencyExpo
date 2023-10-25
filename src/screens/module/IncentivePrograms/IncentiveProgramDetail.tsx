import React, {useState} from 'react';
import {Countdown} from './useCountDown';
import LoadingReact from '../../../components/commons/loading';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {formatDateNewDetail} from '../News/NewsDetail';
import LinearGradient from 'react-native-linear-gradient';
import Hr from '../../../components/commons/Hr';
import ProgramAndDiscount from '../Discount/ProgramAndDiscount';
import AutoHeightWebView from 'react-native-autoheight-webview';
import ProgramAndDiscountComponent from '../Discount/ProgramAndDiscountComponent';


export  default function  IncentiveProgramDetail(props:any){

    const item = props.item;
    const eventStatus = props.eventStatus;
    const [day, hours, minutes, seconds] = Countdown(eventStatus?.timeBetween);
    return (
        <>
            {
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.box}>
                            <View >
                                <View style={{width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.title, {color: '#0288D1'}]}> {item?.data?.dataDetail?.name}</Text>
                                    <Text style={styles.content}>Từ {formatDateNewDetail(item?.data?.dataDetail?.start_date)} đến {formatDateNewDetail(item?.data?.dataDetail?.end_date)}</Text>
                                </View>
                            </View>

                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                {
                                    eventStatus && (eventStatus.status == 1 ?
                                        <View style={{marginRight: 8}}>
                                            <View>
                                                <View style={{width: '100%', paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8, borderRadius: 4,  backgroundColor: '#EEFAFF'}}>
                                                    <Text style={styles.statusDiscount2}>Sắp diễn ra</Text>
                                                </View>
                                            </View>
                                        </View>

                                        :
                                        (eventStatus.status == 2) ?
                                            <View style={{marginRight: 8}}>
                                                <View style={{width: '100%', paddingTop: 4, paddingBottom: 4,paddingLeft: 8, paddingRight: 8, borderRadius: 4, backgroundColor: '#FFF2F0'}}>
                                                    <Text style={styles.statusDiscount1}>Đang diễn ra</Text>
                                                </View>
                                            </View>
                                            :
                                            <View style={{marginRight: 8}}>
                                                <View style={{width: '100%', paddingTop: 4, paddingBottom: 4,paddingLeft: 8, paddingRight: 8, borderRadius: 4, backgroundColor: '#C2C2C2'}}>
                                                    <Text style={styles.statusDiscount3}>Đã kết thúc</Text>
                                                </View>
                                            </View>)

                                }
                                {
                                    eventStatus && (eventStatus.status == 1 ?
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
                                        (eventStatus.status == 2) ?
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
                                            : '')}


                            </View>
                            <View style={{marginBottom: 21}}>
                                <Text style={[styles.title, {color: '#30607a'}]}>Mô tả chương trình :</Text>
                                <AutoHeightWebView
                                    key={item?.data?.dataDetail?.id}
                                    style={{
                                        width: Dimensions.get('window').width - 15,
                                        marginTop: 20,
                                        flex: 1,
                                    }}
                                    customStyle={`
                                          // *{
                                          //   font-size: 13px;
                                          //
                                          // }
                                        `}
                                    files={[{
                                        href: 'cssfileaddress',
                                        type: 'text/css',
                                        rel: 'stylesheet',
                                    }]}
                                    source={{html: item?.data?.dataDetail?.content || ''}}
                                    scalesPageToFit={false}

                                />

                                {/*{console.log(item?.data?.dataDetail?.content)}*/}
                                {/*<Text style={[styles.title, {color: '#323232'}]}>Gói Đại Lý nhập sỉ FutureMap</Text>*/}
                                {/*<Text>Dành riêng cho đại sứ FutureLang</Text>*/}
                                {/*<Image style={{ width: '95%', resizeMode: 'stretch', height: 194,borderTopRightRadius: 6, borderTopLeftRadius: 6, marginTop: 16}} source={require('../../../assets/image/ProgramAndDiscount.png')}/>*/}
                            </View>
                            <Hr/>
                            <View style={{width:'100%', marginTop: 24}}>
                                <View>
                                    <Text style={[styles.title, {color: '#0288D1', marginBottom: 16}]}>Các ưu đãi khác</Text>
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{flexDirection: 'row'}}>
                                        {item?.data?.relate?.map((i:any,index:any)=>(
                                         <ProgramAndDiscountComponent key={index} item={i} index={index}/>
                                        ))}
                                        {/*<ProgramAndDiscount/>*/}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
        </>




    );
}




const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginLeft: 9,
        backgroundColor: '#fff',
         minHeight:Dimensions.get('window').height,
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
        width: '100%',
        marginTop: 16,
        justifyContent: 'center',
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
    title: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    content: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#323232',
    },

});
