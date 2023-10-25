import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView} from 'react-native';
import dataCommunity from '../../../../ultidata/dataCommunity';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../../constants';
import useArchives from "../Mission/useArchies";
import Toast from "react-native-simple-toast";
import {SvgUri} from "react-native-svg";


const Community = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const {communitiesData,getCommunities,isLoadingCommunities,tickArchives,tickedArchivesData,isTickingArchives} = useArchives()



    useEffect(()=>{

        const fetchData = async ()=>{
            getCommunities({
                required: 0
            })
        }

        fetchData()
    },[])

    // useEffect(()=>{
    //
    //     if(tickedArchivesData){
    //         console.log("tickedArchivesData:"+ JSON.stringify(tickedArchivesData))
    //     }
    // },[tickedArchivesData]);

    const openLink = (url:any,id:any)=>{

        const tick = async ()=>{
            tickArchives({
                id:id
            })
        }

        tick()

        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    Toast.show('Lỗi')
                    console.error(`Can't handle url: ${url}`);
                } else {
                    console.log(`Opened URL: ${url}`);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }



    const renderImage = (item:any) => {
        if (item.image) {
            if (item.image.endsWith('.svg')) {
                return (
                    <SvgUri
                        width={48}
                        height={48}

                        uri={item.image}
                    />
                );
            } else {
                return (
                    <Image
                        style={{ width: 48, height: 48, borderRadius: 10 }}
                        source={{ uri: item.image }}
                    />
                );
            }
        } else {
            return (
                <Image
                    style={{ width: 48, height: 48, borderRadius: 10 }}
                    source={require('../../../assets/image/Fb.png')}
                />
            );
        }
    };


    return (
        <ScrollView   contentContainerStyle={{ flexGrow: 1,justifyContent:'center' }} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                    {communitiesData?.data?.slice(0, Math.ceil(communitiesData.data.length / 2)).map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => openLink(item.link, item.id)}>
                                <View style={styles.box}>
                                    {/*<Image style={styles.icon} source={{ uri: item.image }} alt={'startup'} />*/}
                                    {renderImage(item)}
                                    <Text style={styles.text} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {communitiesData?.data?.slice(Math.ceil(communitiesData.data.length / 2)).map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => openLink(item.link, item.id)}>
                                <View style={styles.box}>
                                    {/*<Image style={styles.icon} source={{ uri: item.image }} alt={'startup'} />*/}
                                    {renderImage(item)}
                                    <Text style={styles.text} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 7,
        marginRight: 16,
        // justifyContent:'flex-start',

    },
    icon: {
        width: 48,
        height: 48,
        marginBottom: 8,
        borderRadius:10
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'roboto',
        color: '#323232',
        marginBottom: 20,
        textAlign: 'center',
        width: 100,
    },
});
export default Community;
