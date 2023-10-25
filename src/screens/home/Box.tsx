import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, Linking } from 'react-native';
import React, {useEffect} from 'react';
import Hr from '../../components/commons/Hr';
import ScheduleListHome from '../module/Schedules/ScheduleListHome';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES, SVG } from '../../constants';
import Function from '../module/Function';
import DiscountListHome from '../module/Discount/DiscountListHome';
import Community from '../module/Community/Community';
import Slider from './SliderHome';
import Mission from '../module/Mission/Mission';
import ProgramAndDiscount from '../module/Discount/ProgramAndDiscount';
import { useFutureLang } from '../context/StartUpProvider';
import useNews from '../module/News/useNews';



const Box = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const { futureLang, setFutureLang } = useFutureLang();
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    const { news, dataNews } = useNews();

    useEffect(() => {

        const fetchNew = async () => {
            news();
        };

        fetchNew();
    }, []);



    return (
        <View style={styles.boxContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cart}>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CART)}>
                        <SVG.IconShopHome style={styles.iconRight} />
                    </TouchableOpacity>
                </View>


                <Slider />
                <View style={styles.box}>
                    <View style={styles.layout1}>
                        <View style={{ width: '55%' }}>
                            <Text style={styles.label}>Sản phẩm quản lí</Text>
                        </View>
                        <View style={{ width: '45%' }}>
                            <TouchableOpacity onPress={() => setFutureLang(!futureLang)} style={[styles.touchableOpacity, styleEnabled(futureLang).border]}>
                                {futureLang ?
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '20%' }}><Image style={styles.icon} source={require('../../assets/iconSwap.png')} /></View>
                                        <View style={{ width: '80%' }}><Image style={styles.image} source={require('../../assets/LogoFutureLang.png')} /></View>
                                    </View> :
                                    <View style={{ width: '100%', flexDirection: 'row-reverse', alignItems: 'center' }}>
                                        <View style={{ width: '20%' }}><SVG.IconSwapRed style={styles.icon} /></View>
                                        <View style={{ width: '80%' }}><Image style={styles.image} source={require('../../assets/image/FKid.png')} /></View>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.layout2}>
                        <View style={styles.function}><Function /></View>
                    </View>
                </View>
                <Hr />
                <View style={styles.box}>
                    <Text style={[styles.label, { marginBottom: 16 }]}>Nhiệm vụ của bạn</Text>
                    <Mission />
                </View>
                <Hr />
                <View style={styles.box}>
                    <View style={styles.label1}>
                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Lịch sắp tới</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate(ROUTES.SCHEDULELIST)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.viewMore}>Xem tất cả</Text>
                                </View>
                                <View>
                                    <SVG.Next color="#0288D1" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, marginRight: 10 }}>
                        <ScheduleListHome />
                    </View>
                </View>
                <Hr />
                <View style={styles.box}>
                    <View style={styles.layout4}>
                        <View style={[styles.label1, { width: '75%' }]}>
                            <Text style={styles.label}>Ưu đãi cho bạn</Text>
                            <TouchableOpacity style={styles.TouchableOpacity1}><Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>Sắp diễn ra</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ width: '25%' }} onPress={() => navigation.navigate(ROUTES.DISCOUNT)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.viewMore}>Vào cửa hàng</Text>
                                </View>
                                <View>
                                    <SVG.Next color="#0288D1" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 12, marginTop: 16 }}>
                            <DiscountListHome />
                        </View>
                    </ScrollView>
                </View>
                <Hr />
                <View style={{ width: '100%', marginTop: 24 }}>
                    <View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: '80%' }}>
                                <Text style={styles.label}>
                                    Chương trình và ưu đãi
                                </Text>
                            </View>
                            {/* <TouchableOpacity style={{width: '20%'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View>
                                        <Text style={styles.viewMore}>Xem tất cả</Text>
                                    </View>
                                    <View>
                                        <SVG.Next color="#0288D1"/>
                                    </View>
                                </View>
                            </TouchableOpacity> */}
                        </View>

                    </View>
                    <View style={{ width: '100%', marginTop: 16, marginLeft: 16, marginBottom: 24 }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <ProgramAndDiscount />
                        </ScrollView>

                    </View>
                </View>
                <Hr />
                <View style={{ width: '100%', flexDirection: 'row', padding: 16, backgroundColor: '#F6FCFF' }}>
                    <View>
                        <Text style={styles.label}>SaleKit cho bạn</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1Gfzvc-Vu-BHWAJmi1czLdIO71_wmS3w8T7kJFJqAMvE/edit#gid=0')} >
                            <View style={styles.saleKits}>
                                <SVG.IconNextWhite />
                                <Text style={{ color: 'white', fontSize: 16, paddingLeft: 10, fontWeight: '500' }}>Xem ngay</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '40%' }}>
                        <SVG.Icon_Sale_Kit />
                    </View>
                </View>
                <Hr />
                <View style={styles.box}>
                    <View style={styles.label1}>
                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Tin tức</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate(ROUTES.ALL)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.viewMore}>Xem tất cả</Text>
                                </View>
                                <View>
                                    <SVG.Next color="#0288D1" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', marginTop: 16 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {dataNews && dataNews?.map((d: any, index: any) => (
                                <View key={index} style={styles.news}>
                                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NEWSDETAIL, {
                                        slug: d.slug,
                                    })}>
                                        <Image style={{ marginLeft: 15, height: 150, width: 200, borderRadius: 10, resizeMode: 'cover' }} source={isImage(d.image) ? { uri: d.image } : require('../../assets/image/logo.jpg')} />
                                        <View style={styles.textContainer}>
                                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>{d.title}</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/*<View style={styles.news}>*/}
                            {/*    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NEWSDETAIL)}>*/}
                            {/*        <Image resizeMode="stretch" source={require('../../assets/tintuc.png')} />*/}
                            {/*        <Text style={styles.text}>Đào tạo khởi nghiệp thời số hóa</Text></TouchableOpacity>*/}
                            {/*</View>*/}
                        </ScrollView>
                    </View>
                </View>

                <Hr />
                <View style={styles.box}>
                    <View style={styles.community}>
                        <Text style={styles.text1}>Tham gia cộng đồng</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Community />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        zIndex: 1,
        backgroundColor: '#fff',
    },
    box: {
        position: 'relative',
        width: '100%',
        marginBottom: 10,
        marginTop: 24,
        // backgroundColor: 'gray',
    },
    community: {
    },
    layout1: {
        width: '95%',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        // alignItems: 'center',
        borderRadius: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
    },
    touchableOpacity: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 16,
        padding: 5,
        marginRight: 11,
    },
    icon: {
        width: 32,
        height: 32,
    },
    image: {
        width: 120,
        height: 40,
    },
    label: {
        fontSize: 18,
        color: '#0288D1',
        fontWeight: '600',
        marginLeft: 16,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
    },
    layout2: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        paddingRight: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    layout3: {
        flexDirection: 'row',
        backgroundColor: '#5AB2FF',
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: '#F3F3F3',
    },
    function: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        marginBottom: 12,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        // height: 20,
    },
    inputSearchStyle: {
        // height: 40,
        fontSize: 16,
    },
    label1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    TouchableOpacity1: {
        width: 90,
        backgroundColor: '#D51E03',
        borderRadius: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        marginLeft: 8,
    },
    layout4: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    saleKits: {
        width: '80%',
        backgroundColor: '#0288D1',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        margin: 12,
        borderRadius: 12,
    },
    text1: {
        textAlign: 'center',
        fontSize: 16,
        color: '#0288D1',
        fontWeight: '600',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 3,
        color: '#323232',
        fontFamily: 'roboto',
    },
    imageFunction: {
        width: 80,
        height: 80,
    },
    news: {
        marginLeft: 9,
    },
    box1: {
        marginBottom: 20,
    },
    iconRight: {
        width: 40,
        height: 40,

    },
    cart: {
        position: 'absolute',
        top: 20,
        left: 350,
        zIndex: 999,
    },
    viewMore: {
        color: '#0288D1',
    }, textContainer: {
        width: 200,
        overflow: 'hidden',
        marginLeft: 16,
    },

});

const styleEnabled = (futureLang: boolean) =>
    StyleSheet.create({
        border: {
            borderColor: futureLang ? '#039BE5' : '#D51E03',
        },
    });


export default Box;

