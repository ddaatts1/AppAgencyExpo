import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Linking} from 'react-native';
import {ROUTES, SVG} from '../../../constants';
import Hr from '../../../components/commons/Hr';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import useArchives from './useArchies';
import LoadingReact from '../../../components/commons/loading';
import useMission from './useMission';
import CommonItemMission from '../../../components/commons/commonItemMission';
import Toast from 'react-native-simple-toast';
import {SvgUri} from 'react-native-svg';
import { EnumKYC } from '../../../constants/enum';


const Mission = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [hidden, setHidden] = useState(true);
    const [verification, setVerification] = React.useState(false);
    const [join, setJoin] = React.useState(false);
    const [document, setDocument] = React.useState(false);
    const [mission, setMission] = React.useState(false);
    const [missionLastMonth, setMissionLastMonth] = React.useState(false);
    const [course, setCourse] = React.useState(false);

    const {requiredMissionMonthData, fetchMissionMonth, isFetchingMissionMonth} = useMission();

    const {
        requiredArchivesData,
        fetchRequiredArchives,
        isFetchingRequiredArchives,
        communitiesData,
        getCommunities,
        isLoadingCommunities,
        tickArchives,
    } = useArchives();


    const openLink = (url: any, id: any) => {

        const tick = async () => {
            tickArchives({
                id: id,
            });
        };

        tick();

        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    Toast.show('Lỗi');
                    console.error(`Can't handle url: ${url}`);
                } else {
                    console.log(`Opened URL: ${url}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    useEffect(() => {
        fetchMissionMonth();
      }, []);

    return (
        <View>
            <View style={styles.wFull}>
                <LinearGradient
                    colors={['#5AB2FF', '#3789D1']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ACCOUNT)}>
                        <View style={styles.headerDisplay}>
                            <View style={{width: '10%'}}>
                                {
                                    verification ? <SVG.IconDropDownClose style={styles.iconDropDown}/>
                                        : <SVG.IconNextWhite style={styles.iconDropDown}/>
                                }
                            </View>
                            {
                                EnumKYC.initialStatus ?
                                    <Text style={styles.textTab}>
                                    Tài khoản của bạn chưa được xác minh. Vui lòng Xác minh !
                                    </Text> : ''


                            }
                            {
                                EnumKYC.standbyStatus ?
                                <Text style={styles.textTab}>
                                Bạn đã gửi yêu cầu xác minh danh tính thành công, vui lòng chờ duyệt!
                                </Text> : ''
                            }
                            {
                                EnumKYC.completedStatus ?
                                hidden
                                :
                                <Text style={styles.textTab}>
                                    Tài khoản của bạn chưa được xác minh. Vui lòng Xác minh !
                                </Text>
                            }

                            <View style={styles.iconTab}>
                                <SVG.IconCheck style={{marginLeft: 20}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
            <View style={styles.wFull}>
                <LinearGradient
                    colors={['#3FBD79', '#1D884E']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity onPress={() => {
                        setJoin(!join);
                        getCommunities({
                            required: 1,
                        });
                    }}>
                        <View style={[styles.headerDisplay, {paddingTop: 5, paddingBottom: 5}]}>
                            <View style={{width: '10%'}}>
                                {
                                    join ? <SVG.IconDropDownClose style={styles.iconDropDown}/>
                                        : <SVG.IconNextWhite style={styles.iconDropDown}/>
                                }
                            </View>
                            <Text style={styles.textTab}>
                                Tham gia các nhóm hỗ trợ bạn
                            </Text>
                            <View style={styles.iconTab}>
                                <SVG.IconSupport/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                {
                    join ?
                        <View style={{marginTop: 8}}>
                            {isLoadingCommunities ? <View style={styles.box1}>
                                <TouchableOpacity
                                    style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}

                                >
                                    <View style={{width: '10%'}}>
                                        {/* <SVG.Thank color="#FDB138" style={styles.icon} /> */}
                                    </View>
                                    <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>
                                        <LoadingReact/>
                                    </Text>
                                </TouchableOpacity>
                            </View> : communitiesData?.data?.map((item: any, index: any) => {
                                const renderImage = () => {
                                    if (item.image) {
                                        if (item.image.endsWith('.svg')) {
                                            return (
                                                <SvgUri
                                                    width={32}
                                                    height={32}
                                                    uri={item.image}
                                                />
                                            );
                                        } else {
                                            return (
                                                <Image
                                                    style={{ width: 32, height: 32, borderRadius: 10 }}
                                                    source={{ uri: item.image }}
                                                />
                                            );
                                        }
                                    } else {
                                        return (
                                            <Image
                                                style={{ width: 32, height: 32, borderRadius: 10 }}
                                                source={require('../../../assets/image/Fb.png')}
                                            />
                                        );
                                    }
                                };
                                return (
                                    <React.Fragment key={index}>
                                        <View style={styles.box1}>
                                            <View style={{ width: '10%' }}>
                                                {renderImage()}
                                            </View>
                                            <Text numberOfLines={2} style={{
                                                width: '62%',
                                                fontSize: 12,
                                                color: '#323232',
                                                fontFamily: 'roboto',
                                            }}>{item.name}</Text>
                                            <TouchableOpacity onPress={() => openLink(item.link, item.id)} style={{
                                                width: '27%',
                                                backgroundColor: '#0288D1',
                                                padding: 6,
                                                borderRadius: 12,
                                                marginLeft: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'roboto' }}>Tham gia ngay</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Hr />
                                    </React.Fragment>
                                );
                            })}


                        </View>
                        : null
                }
            </View>
            <View style={styles.wFull}>
                <LinearGradient
                    colors={['#A780EF', '#7853BC']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity onPress={() => {
                        setDocument(!document);
                        fetchRequiredArchives();
                    }}>
                        <View style={[styles.headerDisplay, {paddingTop: 5}]}>
                            <View style={{width: '10%'}}>
                                {
                                    document ? <SVG.IconDropDownClose style={styles.iconDropDown}/>
                                        : <SVG.IconNextWhite style={styles.iconDropDown}/>
                                }
                            </View>
                            <Text style={styles.textTab}>
                                Tài liệu bắt buộc cho người mới
                            </Text>
                            <View style={styles.iconTab}>
                                <SVG.IconDocument style={{marginLeft: 20}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                {
                    document ?
                        <View style={{marginTop: 8}}>
                            {isFetchingRequiredArchives ? <View style={styles.box1}>
                                    <TouchableOpacity
                                        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}

                                    >
                                        <View style={{width: '10%'}}>
                                            {/* <SVG.Thank color="#FDB138" style={styles.icon} /> */}
                                        </View>
                                        <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>
                                            <LoadingReact/>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                : requiredArchivesData &&
                                requiredArchivesData?.data?.map((d: any, index: number) => (
                                    <React.Fragment key={index}>
                                        <View style={styles.box1}>
                                            <TouchableOpacity
                                                style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                                                onPress={() =>
                                                    navigation.navigate(ROUTES.THANKLETTER, {
                                                        id: d.id,
                                                    })
                                                }
                                            >
                                                <View style={{width: '10%'}}>
                                                    {/* <SVG.Thank color="#FDB138" style={styles.icon} /> */}
                                                    <Image style={{borderRadius: 10, width: 30, height: 30}}
                                                           source={{uri: d.image}}/>
                                                </View>
                                                <Text style={{
                                                    width: '62%',
                                                    fontSize: 12,
                                                    color: '#323232',
                                                    fontFamily: 'roboto',
                                                }}>
                                                    {d.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Hr/>
                                    </React.Fragment>
                                ))

                            }


                            {/*<View style={styles.box1}>*/}
                            {/*    <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate(ROUTES.TERM)}>*/}
                            {/*    <View style={{width: '10%'}}>*/}
                            {/*        <SVG.Term style={styles.icon} />*/}
                            {/*    </View>*/}
                            {/*    <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>Điều khoản và quy chế</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            {/*<Hr/>*/}
                            {/*<View style={styles.box1}>*/}
                            {/*<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate(ROUTES.CONTRACT)}>*/}
                            {/*    <View style={{width: '10%'}}>*/}
                            {/*    <SVG.Contract color="#D51E03" style={styles.icon} />*/}
                            {/*    </View>*/}
                            {/*    <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>Hợp đồng điện tử</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            {/*<Hr/>*/}
                            {/*<View style={styles.box1}>*/}
                            {/*<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate(ROUTES.CULTURE)}>*/}
                            {/*    <View style={{width: '10%'}}>*/}
                            {/*    <SVG.Culture style={styles.icon} />*/}
                            {/*    </View>*/}
                            {/*    <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>Văn hóa công ty</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            {/*<Hr/>*/}
                            {/*<View style={styles.box1}>*/}
                            {/*<TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate(ROUTES.RULE)}>*/}
                            {/*    <View style={{width: '10%'}}>*/}
                            {/*    <SVG.Rule color="#12C802" style={styles.icon} />*/}
                            {/*    </View>*/}
                            {/*    <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>Quy định công ty</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            {/*<Hr/>*/}
                        </View>
                        : null
                }
            </View>
            <View style={styles.wFull}>
                <LinearGradient
                    colors={['#EEBC3D', '#EA8221']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity onPress={() => setCourse(!course)}>
                        <View style={[styles.headerDisplay, {paddingTop: 7, paddingBottom: 7}]}>
                            <View style={{width: '10%'}}>
                                {
                                    course ? <SVG.IconDropDownClose style={styles.iconDropDown}/>
                                        : <SVG.IconNextWhite style={styles.iconDropDown}/>
                                }
                            </View>
                            <Text style={styles.textTab}>
                                Khóa học cần thực hiện
                            </Text>
                            <View style={styles.iconTab}>
                                <SVG.IconCourse style={{marginLeft: 20}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                {
                    course ?
                        <View style={{marginTop: 8}}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.imageSlide}>
                                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.COURSE)}>
                                        <Image resizeMode="stretch" source={require('../../../assets/tintuc.png')}/>
                                        <Text style={styles.textTitle}>Sales Master K05</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.imageSlide}>
                                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.COURSE)}>
                                        <Image resizeMode="stretch" source={require('../../../assets/tintuc.png')}/>
                                        <Text style={styles.textTitle}>Sales Master K05</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.imageSlide}>
                                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.COURSE)}>
                                        <Image resizeMode="stretch" source={require('../../../assets/tintuc.png')}/>
                                        <Text style={styles.textTitle}>Sales Master K05</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>
                        : null
                }
            </View>
            {
                requiredMissionMonthData?.data.show_quest_last_month != 0 ?
                <View style={styles.wFull}>
                    <LinearGradient
                        colors={['#FC9B6B', '#CC5C26']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.linearGradient}
                    >
                        <TouchableOpacity onPress={() => {
                            setMissionLastMonth(!missionLastMonth);
                        }}>
                            <View style={[styles.headerDisplay]}>
                                <View style={{width: '10%'}}>
                                    {
                                        missionLastMonth ? <SVG.IconDropDownClose style={styles.iconDropDown} />
                                            :
                                        <SVG.IconNextWhite style={styles.iconDropDown}/>
                                    }
                                </View>
                                <Text style={styles.textTab}>
                                    {'Nhiệm vụ tháng ' + requiredMissionMonthData?.data.discount_last_month.id + '\n(Thực hiện 1 trong ' + requiredMissionMonthData?.data.count_quest_last_month + ' nhiệm vụ)'}
                                </Text>
                                <View style={styles.iconTab}>
                                    <SVG.Icon_Mission_Month style={{marginLeft: 20}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                {
                    missionLastMonth ? (
                        !(requiredMissionMonthData?.data.quest_card_activation == 1
                            || requiredMissionMonthData?.data.quest_enter_card == 1
                            || requiredMissionMonthData?.data.quest_connect_agency == 1) ?
                            <View>
                        {isFetchingMissionMonth ? <View style={styles.box1}>
                                    <TouchableOpacity
                                        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}

                                    >
                                        <View style={{width: '10%'}}>
                                            {/* <SVG.Thank color="#FDB138" style={styles.icon} /> */}
                                        </View>
                                        <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>
                                            <LoadingReact/>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                : requiredMissionMonthData &&
                                <React.Fragment>
                                        <View style={styles.box1}>
                                            <TouchableOpacity
                                                style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}
                                                // onPress={() =>
                                                //     navigation.navigate(ROUTES.THANKLETTER, {
                                                //         id: d.id,
                                                //     })
                                                // }
                                            >
                                                <CommonItemMission svg={<SVG.MissionActive/>} text={'Kích hoạt ' + requiredMissionMonthData?.data.discount_last_month.odd_card_sale + ' thẻ lẻ'} />
                                                <CommonItemMission svg={<SVG.MissionInput/>} text={'Nhập tối thiểu ' + requiredMissionMonthData?.data.discount_last_month.odd_card_purchase + ' thẻ'} />
                                                <CommonItemMission svg={<SVG.MissionConnection/>} isNoBorder={true} text={'Kết nối ' + requiredMissionMonthData?.data.discount_last_month.recruitment_agency + ' đại sứ mới'} />
                                            </TouchableOpacity>
                                        </View>

                                    </React.Fragment>
                                            }
                    </View>
                    : <View style={{paddingTop: 12}}>
                        <LinearGradient
                            colors={['#268824', '#268824']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.linearGradient}
                        >
                            <View style={[styles.headerDisplay]}>
                                    <View style={{width: '10%'}}>
                                        <SVG.MissionCompleted style={styles.iconDropDown}/>
                                    </View>
                                    <Text style={styles.textTab}>
                                        {'Chúc mừng bạn đã hoàn thành nhiệm vụ tháng ' + requiredMissionMonthData?.data.discount_last_month.id + '!'}
                                    </Text>
                                    <View style={styles.iconTab}>
                                        <SVG.Icon_Mission_Month style={{marginLeft: 20}}/>
                                    </View>
                                </View>
                        </LinearGradient>
                    </View>
                    ) : null

                }
                </View> : null
            }
            <View style={styles.wFull}>
                <LinearGradient
                    colors={['#FC9B6B', '#CC5C26']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity onPress={() => {
                        setMission(!mission);
                    }}>
                        <View style={[styles.headerDisplay]}>
                            <View style={{width: '10%'}}>
                                {
                                    mission ? <SVG.IconDropDownClose style={styles.iconDropDown} />
                                        :
                                    <SVG.IconNextWhite style={styles.iconDropDown}/>
                                }
                            </View>
                            <Text style={styles.textTab}>
                                {'Nhiệm vụ tháng ' + requiredMissionMonthData?.data.discount.id + '\n(Thực hiện 1 trong ' + requiredMissionMonthData?.data.count_quest + ' nhiệm vụ)'}
                            </Text>
                            <View style={styles.iconTab}>
                                <SVG.Icon_Mission_Month style={{marginLeft: 20}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                {
                    mission ? (
                        !(requiredMissionMonthData?.data.quest_card_activation == 1
                            || requiredMissionMonthData?.data.quest_enter_card == 1
                            || requiredMissionMonthData?.data.quest_connect_agency == 1) ?
                            <View>
                        {isFetchingMissionMonth ? <View style={styles.box1}>
                                    <TouchableOpacity
                                        style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}

                                    >
                                        <View style={{width: '10%'}}>
                                            {/* <SVG.Thank color="#FDB138" style={styles.icon} /> */}
                                        </View>
                                        <Text style={{width: '62%', fontSize: 12, color: '#323232', fontFamily: 'roboto'}}>
                                            <LoadingReact/>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                : requiredMissionMonthData &&
                                <React.Fragment>
                                        <View style={styles.box1}>
                                            <TouchableOpacity
                                                style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}
                                                // onPress={() =>
                                                //     navigation.navigate(ROUTES.THANKLETTER, {
                                                //         id: d.id,
                                                //     })
                                                // }
                                            >
                                                <CommonItemMission svg={<SVG.MissionActive/>} text={'Kích hoạt ' + requiredMissionMonthData?.data.discount.odd_card_sale + ' thẻ lẻ'} />
                                                <CommonItemMission svg={<SVG.MissionInput/>} text={'Nhập tối thiểu ' + requiredMissionMonthData?.data.discount.odd_card_purchase + ' thẻ'} />
                                                <CommonItemMission svg={<SVG.MissionConnection/>} isNoBorder={true} text={'Kết nối ' + requiredMissionMonthData?.data.discount.recruitment_agency + ' đại sứ mới'} />
                                            </TouchableOpacity>
                                        </View>

                                    </React.Fragment>
                                            }
                    </View>
                    : <View style={{paddingTop: 12}}>
                        <LinearGradient
                            colors={['#268824', '#268824']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.linearGradient}
                        >
                            <View style={[styles.headerDisplay]}>
                                    <View style={{width: '10%'}}>
                                        <SVG.MissionCompleted style={styles.iconDropDown}/>
                                    </View>
                                    <Text style={styles.textTab}>
                                        {'Chúc mừng bạn đã hoàn thành nhiệm vụ tháng ' + requiredMissionMonthData?.data.discount.id + '!'}
                                    </Text>
                                    <View style={styles.iconTab}>
                                        <SVG.Icon_Mission_Month style={{marginLeft: 20}}/>
                                    </View>
                                </View>
                        </LinearGradient>
                    </View>
                    ) : null

                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    wFull: {
        width: '92%',
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 12,
    },
    headerDisplay: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingLeft: 15,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    icon: {
        width: 32,
        height: 32,
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        fontStyle: 'normal',
        marginTop: 3,
        color: '#323232',
        fontFamily: 'roboto',
    },
    imageSlide: {
        paddingRight: 8,
    },
    iconDropDown: {
        width: 25,
        height: 25,
    },
    linearGradient: {
        borderRadius: 8,
    },
    iconTab: {
        width: '20%',
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textTab: {
        width: '62%',
        color: '#fff',
        marginRight: 7,
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'roboto',
        textAlign: 'left',
    },
});
export default Mission;
