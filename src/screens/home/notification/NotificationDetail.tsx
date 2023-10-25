import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity, Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ROUTES, SVG} from '../../../constants';
import LoadingReact from '../../../components/commons/loading';
import {useIsFocused} from '@react-navigation/native';
import AutoHeightWebView from "react-native-autoheight-webview";
import useNews from "../../module/News/useNews";
import {formatDateNewDetail} from "../../module/News/NewsDetail";
import useNotification from "./useNotification";


const NotificationDetail = ({navigation, route}: any) => {

    const {id} = route?.params
    console.log("slug: "+ id)

    const {
     newNotificationDetailData,fetchNewNotificationDetail,isFetchingNewNotificationDetail
    } = useNotification();
    const focus = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchNewNotificationDetail(id);
            } catch (error) {
            }
        };
        fetchData();
    }, [focus]);




    useEffect(() => {

        const fetchNewDetail = async () => {
            fetchNewNotificationDetail(id)
        }
        fetchNewDetail()
    }, [id])

    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    useEffect(() => {
        if (newNotificationDetailData) {
            console.log("newNotificationDetailData: "+ JSON.stringify(newNotificationDetailData))
            if (newNotificationDetailData?.data?.image) {
                // navigation.setOptions({
                //     headerBackground: () => (
                //         <Image style={styles.headerBox} source={{uri: newNotificationDetailData?.data?.image}}/>
                //     )
                // });

                navigation.setOptions({
                    headerBackground: () => (
                        isImage(newNotificationDetailData?.data?.image) ?
                            <Image style={styles.headerBox} source={{uri: newNotificationDetailData?.data?.image}}/> :
                            <Image style={styles.headerBox}
                                   source={require('../../../assets/image/logo.jpg')}/>

                    ),
                });

            }

        }
    }, [newNotificationDetailData])


    const customJs = `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'body { font-size: 30px; }';
        document.head.appendChild(style);
      });
    </script>
  `;


    // const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            {isFetchingNewNotificationDetail ? <LoadingReact/> : <ScrollView>
                <View style={styles.box1}>
                    <View style={styles.dateTime}>
                        <SVG.IconMonth/>
                        <Text style={styles.text}>{formatDateNewDetail(newNotificationDetailData?.data?.date_post)} </Text>
                        {/*<Text style={styles.text}></Text>*/}
                    </View>
                    <View style={styles.contentNews}>
                        <View style={{marginBottom: 16}}>
                            <Text style={styles.headerTitle}>{newNotificationDetailData?.data?.title}</Text>
                        </View>
                        <View style={{marginBottom: 16}}>
                            <Text style={styles.title}>{newNotificationDetailData?.data?.description}</Text>
                        </View>

                        <AutoHeightWebView
                            style={{
                                width: Dimensions.get('window').width - 15,
                                marginTop: 20,
                                flex: 1
                            }}
                            customStyle={`
                                          p {
                                            font-size: 25px;
                                    
                                          }
                                        `}
                            files={[{
                                href: 'cssfileaddress',
                                type: 'text/css',
                                rel: 'stylesheet'
                            }]}
                            source={{html: newNotificationDetailData?.data?.content|| ""}}
                            scalesPageToFit={true}
                            // viewportContent={'width=device-width, user-scalable=no'}

                        />
                    </View>
                    {/*<View style={styles.hr}/>*/}
                </View>
            </ScrollView>
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        zIndex: 999,
    },
    box1: {
        width: '95%',
        flexDirection: 'column',
        marginTop: 150,
        marginBottom: 16,
        marginLeft: 10,
        paddingTop: 7,
        elevation: 0.2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#0288D1',
    },
    dateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 50,
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#525252',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#323232',
    },
    box2: {
        marginLeft: 10,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        marginBottom: 40,
    },
    contentNews: {
        width: '100%',
        marginBottom: 42,
        marginTop: 16,
    },
    hr: {
        width: '100%',
        borderBottomColor: '#0288D1',
        borderBottomWidth: 2,
    },
    recommend: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0288D1',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 42,
        paddingLeft: 40,
        marginRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
    },
    titleNews: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        color: '#181818',
    }, headerBox: {
        height: 200,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        resizeMode: 'cover',
    }


});

export default NotificationDetail;



