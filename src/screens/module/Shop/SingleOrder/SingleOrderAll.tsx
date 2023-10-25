import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Quantity from './Quantity';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DiscountListHome from '../../Discount/DiscountListHome';
import Hr from '../../../../components/commons/Hr';
import { ROUTES, SVG } from '../../../../constants';
import CountDownTimer from '../../../../components/commons/countDownTimer';
import LanguageTabNavigator from '../../../../navigations/LanguageTab';
import LinearGradient from 'react-native-linear-gradient';
import { useCountdown } from '../../../training/question/useCountdown';
import { EnumLearnCard } from '../../../../constants/enum';
import CardEng from './CardEng';
import CardChina from './CardChina';
import CardJapan from './CardJapan';
import CardKorea from './CardKorea';


const SingleOrderAll = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [day, hours, minutes, seconds] = useCountdown(1200);
    const [type, setType] = React.useState(0);
    function handleSubmit(type: any) {
        setType(type);

    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center' ,marginBottom: 10, marginTop: 40}}>
                <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <Text style={styles.headerTitle}>Ưu đãi cho bạn</Text>
                        </View>
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
                                    </View>
                                </View>
                            </View>

                        </View>

                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <DiscountListHome/>
                </ScrollView>
                {/* <LanguageTabNavigator/> */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.tab}>
                    <TouchableOpacity
                        onPress={() => handleSubmit(EnumLearnCard.All)}
                        style={[styles.button, EnumLearnCard.All === type ? ({ backgroundColor: '#F5FCFF', borderStyle: 'solid', borderBottomWidth: 2, borderBottomColor: '#0288D1' }) : ({ borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#525252' })]}
                    >
                        <Text style={[styles.text, EnumLearnCard.All === type ? ({ color: '#0288D1' }) : ({ color: '#525252' })]}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSubmit(EnumLearnCard.English)}
                        style={[styles.button, EnumLearnCard.English === type ? ({ backgroundColor: '#F5FCFF', borderStyle: 'solid', borderBottomWidth: 2, borderBottomColor: '#0288D1' }) : ({ borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#525252' })]}
                    >
                        <Text style={[styles.text, EnumLearnCard.English === type ? ({ color: '#0288D1' }) : ({ color: '#525252' })]}>Tiếng Anh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSubmit(EnumLearnCard.Chinese)}
                        style={[styles.button, EnumLearnCard.Chinese === type ? ({ backgroundColor: '#F5FCFF', borderStyle: 'solid', borderBottomWidth: 2, borderBottomColor: '#0288D1' }) : ({ borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#525252' })]}
                    >
                        <Text style={[styles.text, EnumLearnCard.Chinese === type ? ({ color: '#0288D1' }) : ({ color: '#525252' })]}>Tiếng Trung</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSubmit(EnumLearnCard.Japanese)}
                        style={[styles.button, EnumLearnCard.Japanese === type ? ({ backgroundColor: '#F5FCFF', borderStyle: 'solid', borderBottomWidth: 2, borderBottomColor: '#0288D1' }) : ({ borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#525252' })]}
                    >
                        <Text style={[styles.text, EnumLearnCard.Japanese === type ? ({ color: '#0288D1' }) : ({ color: '#525252' })]}>Tiếng Nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSubmit(EnumLearnCard.Korean)}
                        style={[styles.button, EnumLearnCard.Korean === type ? ({ backgroundColor: '#F5FCFF', borderStyle: 'solid', borderBottomWidth: 2, borderBottomColor: '#0288D1' }) : ({ borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#525252' })]}
                    >
                        <Text style={[styles.text, EnumLearnCard.Korean === type ? ({ color: '#0288D1' }) : ({ color: '#525252' })]}>Tiếng Hàn</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                <View>
                    <View>
                        {
                            EnumLearnCard.All === type ? <CardEng /> : ''
                        }
                    </View>
                    <View>
                        {
                            EnumLearnCard.English === type ? <CardEng /> : ''
                        }
                    </View>
                    <View>
                        {
                            EnumLearnCard.Chinese === type ? <CardChina /> : ''
                        }
                    </View>
                    <View>
                        {
                            EnumLearnCard.Japanese === type ? <CardJapan /> : ''
                        }
                    </View>
                    <View>
                        {
                            EnumLearnCard.Korean === type ? <CardKorea /> : ''
                        }
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0288D1',
        marginLeft: 7,
        marginRight: 5,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 10,
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
    tab: {
        width: '100%',
        marginTop: 50,
        borderRadius: 53,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 10,
    },
});

export default SingleOrderAll;
