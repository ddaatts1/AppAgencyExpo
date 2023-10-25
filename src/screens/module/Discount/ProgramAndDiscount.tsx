import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dataProgramAndDiscount from '../../../../ultidata/dataProgramAndDiscount';
import LinearGradient from 'react-native-linear-gradient';
import { ROUTES } from '../../../constants';
import CountDown from "react-native-countdown-component";
import {useCountdown} from "../../training/question/useCountdown";
import usePromotions from "../IncentivePrograms/usePropmotions";
import {Countdown} from "../IncentivePrograms/useCountDown";
import ProgramAndDiscountComponent from "./ProgramAndDiscountComponent";


const ProgramAndDiscount = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const {promotionData,getPromotions} = usePromotions()


    useEffect(()=>{

        const fetchData = async ()=>{
            getPromotions()
        }
        fetchData()
    },[])





    return (
        promotionData?.data?.map((item: any, index: any) => {
            return (
                <ProgramAndDiscountComponent key={index} item={item} index={index}></ProgramAndDiscountComponent>
            );
        })
    );
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
    statusDiscount: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
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
export default ProgramAndDiscount;
