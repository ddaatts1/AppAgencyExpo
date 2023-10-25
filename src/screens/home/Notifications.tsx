import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {ROUTES, SVG} from '../../constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ItemChage from '../../components/card-warehouse/itemChage';
import dataNoti from '../../../ultidata/dataNotification';
import useNotification from "./notification/useNotification";

const Notifications = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const {dataNotifi, dataNotifiCompany} = dataNoti();

    const {notificationData,isFetchingNotification, fetchNotification} = useNotification()
    function handleNavigate(type: any) {
        navigation.navigate(ROUTES.NOTIFICATION_LIST, {
            type: type,
            headerTitle: '',
            headerShown: true,
        });
    }


    useEffect(()=>{

        const fetchData = async ()=>{
            fetchNotification({
                type: 3
            })
        }
        fetchData()
    },[])

    //
    // useEffect(()=>{
    //
    //     if(notificationData){
    //         console.log("notificationData: "+ JSON.stringify(notificationData))
    //     }
    // },[notificationData])


    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    return (
        <View style={styles.container}>
            <View style={{width: '100%', marginTop: 8}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {
                            dataNotifiCompany.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity onPress={()=>{handleNavigate(index+1)}}>
                                            <View  style={{width: '100%', flexDirection: 'row', alignItems: 'center', padding: 16}}>
                                                <View style={{width: '10%'}}>
                                                    <SVG.IconHours width={26.67} height={26.67}/>
                                                </View>
                                                <View style={{width: '75%'}}>
                                                    <Text style={styles.title}>{item.title}</Text>
                                                    {/*<Text>{item.content}</Text>*/}
                                                </View>
                                                <View style={{width: '15%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                    <View style={{backgroundColor: '#D51E03', borderRadius: 44, paddingTop: 4, paddingBottom: 4, paddingLeft: 4.5, paddingRight: 3.5}}>
                                                        <Text style={{color: '#fff'}}>20</Text>
                                                    </View>
                                                    <View style={{marginLeft: 8}}>
                                                        <SVG.Next width={16} height={16} color="#323232"/>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={styles.box} >
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginLeft: 16}}>
                            <View style={{width: '75%'}}><Text style={styles.headerTitle}>Thông báo của bạn</Text></View>
                            {/*<TouchableOpacity>*/}
                            {/*    <View style={{borderRadius: 16, backgroundColor: '#EEFAFF', paddingTop: 6, paddingBottom: 6, paddingLeft: 10, paddingRight: 10}}>*/}
                            {/*        <Text style={styles.readAll}>Đọc tất cả</Text>*/}
                            {/*    </View>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                        {
                            notificationData?.data?.map((item:any, index: any) => {
                                console.log("item: "+ JSON.stringify(item))

                                return (
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.NOTIFICATION_DETAIL,{
                                            id:item.slug
                                        })}>
                                            <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', padding: 16}}>
                                                <View style={{width: '10%'}}>
                                                    {/*<Image source={item.image}/>*/}
                                                    {isImage(item.image)  ? <Image style={styles.image} source={{ uri: item.image }}/> : <Image style = {styles.image} source={require('../../assets/image/logo.jpg')}/>}

                                                </View>
                                                <View style={{width: '80%', marginLeft: 8}}>
                                                    <Text style={styles.title}>{item.title || item.title2}</Text>
                                                    <Text numberOfLines={1} ellipsizeMode="tail">{item.description||item.description2}</Text>
                                                </View>
                                                <View style={{width: '10%', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                    <SVG.Next width={16} height={16} color="#323232"/>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }

                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        marginTop: 24,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    box2: {
        width: '40%',
    },
    image: {
        width: '100%',
        height: 40,
        resizeMode:"cover",
        borderRadius: 4,
    },
    box3: {
        width: '55%',
        flexDirection: 'column',
        marginLeft: 4,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#181818',
    },
    dateTime: {
        flexDirection: 'row',
        marginTop: 30,
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
    headerTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#0288D1',
    },
    readAll: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#0288D1',
    },

});

const styleSeen = (seen:boolean) =>
    StyleSheet.create({
        box1: {
            backgroundColor: seen ? '#EEEEEE' : '#fff',
        },
    });
