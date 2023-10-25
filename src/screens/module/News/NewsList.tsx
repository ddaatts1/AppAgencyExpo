import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect} from 'react';
import Hr from '../../../components/commons/Hr';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dataNews from '../../../../ultidata/dataNews';
import { ROUTES } from '../../../constants';
import useNews from "./useNews";
import {red50} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import LoadingReact from "../../../components/commons/loading";

const NewList = (props:any) => {
    const  slug  = props?.slug
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    const {getNewCategory,dataNewCategory,isLoadingNewCategory} = useNews()

    useEffect(()=>{

        const fetchData =async ()=>{
           await getNewCategory({
               category: slug
           })
        }

        fetchData()
    },[slug])


    return (
        <View style={styles.container}>
            {isLoadingNewCategory? <LoadingReact/>:            <View style={styles.box}>
                {dataNewCategory && dataNewCategory.map((item: any, index: any) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(ROUTES.NEWSDETAIL,{
                            slug: item.slug
                        })}>
                            <View style={styles.box1}>
                                <View style={{width: '40%', marginRight: 18}}>
                                    {isImage(item.image) ? <Image style={styles.image}  source={{ uri: item.image }}/>: <Image style = {styles.image} source={require('../../../assets/image/logo.jpg')}/>}



                                </View>
                                <View style={{width: '60%'}}>
                                    <Text style={styles.headerTitle}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            }
        </View>
    );
};



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
        fontWeight: '500',
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#181818',
    },
});
export default NewList;
