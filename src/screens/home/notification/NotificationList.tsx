import React, {useEffect} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ROUTES, SVG} from "../../../constants";
import useNotification from "./useNotification";
import {black} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import LoadingReact from "../../../components/commons/loading";


export  default  function NotificationList ({route,navigation}: any){

    const {type} = route?.params
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    useEffect(() => {
        navigation.setOptions({
            tabBarLabel: 'Thông báo',
            headerBackground: () => (
                <Image
                    style={styles.Header}
                    source={require('../../../assets/image/Header1.png')}
                />
            ),
            headerTitleStyle: { marginTop: 30, color: '#FFFFFF', fontSize: 18 },
            headerTitle: '',
            headerShown: true,
            headerRight: () => {
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 15, marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.CART)}
                                style={styles.iconRight}
                            >
                                <SVG.Cart />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            },
            headerLeft: () => {
                return headerLeftComponent(type ==1? 'Thông báo từ công ty': "Thông báo từ hệ thống"); // Make sure you define headerLeftComponent
            },
        });
    }, []);

    const headerLeftComponent = (text: string) => (
        <View style={{ flex: 1 }}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <SVG.Leftcircleo style={styles.iconLef} />
                    </View>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.headerText1}>
                        {text}
                    </Text>
                </View>
            </View>

        </View>
    );


    const {fetchNotification,notificationData,isFetchingNotification} = useNotification()

    useEffect(()=>{
        console.log("ahihi")
        const fetchData = async ()=>{
            fetchNotification({
                type:type
            })
        }

        fetchData()
    },[])

useEffect(()=>{

    if(notificationData){
        console.log("notificationData: "+ JSON.stringify(notificationData))
    }
},[notificationData])





    return(
        <ScrollView style={styles.container}>
            {isFetchingNotification? <LoadingReact/>:            <View style={styles.box}>

                {notificationData?.data?.map((item: any, index: any) => {

                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(ROUTES.NOTIFICATION_DETAIL,{
                            id:item.slug
                        })}>
                            <View style={styles.box1}>
                                <View style={{width: '40%', marginRight: 18}}>
                                    {isImage(item.image)  ? <Image style={styles.image} source={{ uri: item.image }}/> : <Image style = {styles.image} source={require('../../../assets/image/logo.jpg')}/>}
                                </View>
                                <View style={{ flexDirection: 'column', width: '50%' }}>
                                    <Text style={styles.headerTitle}>{item.title||item.title2}</Text>
                                    <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                                        {item.description }
                                    </Text>
                                    <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NOTIFICATION_DETAIL,{
                                            id:item.id
                                        })}>
                                            <Text style={{color: "#0288D1"}}>Xem chi tiết</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                })}
            </View>
            }
        </ScrollView>
    )
}





const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '95%',
        marginLeft: 9,
        marginRight: 9,
        marginBottom: 300,
        marginTop: 24,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        width: '95%',
        marginTop: 50,
        marginLeft: 9,
        marginRight: 9,
        backgroundColor: '#fff',
        borderRadius: 53,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    button1: {
        width: '50%',
        borderRadius: 55,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    image: {
        // width: '40%',
        // borderRadius: 8,
        resizeMode: 'cover',
        width: 160,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    headerText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#0288D1',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#181818',
    },
    Header: {
        // height: 100,
        width: '100%',
        // backgroundColor: 'white',

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        ...StyleSheet.absoluteFillObject,
    },  headerLeft: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 16,
    }, iconLef: {
        width: 40,
        height: 40,

        // marginTop: 80,
        //  marginLeft: 20
    },headerText1: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
        paddingLeft: 10,
        paddingBottom: 2,
    }, description: {
        marginTop: 10,
        marginLeft: 5,
        color: '#000000',
        overflow: "hidden"
    }

});
