import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import { SVG } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { useCountdown } from '../../training/question/useCountdown';
import Hr from '../../../components/commons/Hr';
import ProgramAndDiscount from '../Discount/ProgramAndDiscount';
import usePromotions from "./usePropmotions";
import LoadingReact from "../../../components/commons/loading";
import {formatDateNewDetail} from "../News/NewsDetail";
import {calculateEventStatus} from "../Discount/ProgramAndDiscountComponent";
import {Countdown} from "./useCountDown";
import IncentiveProgramDetail from "./IncentiveProgramDetail";



const IncentiveProgram = ({route}:any) => {

    const id = route?.params?.id
    const {promotionDetailData,getPromotionDetail,isLoadingPromotionDetail} = usePromotions()
    useEffect(()=>{
        if(id){

            const fetchData = async ()=>{
                getPromotionDetail({id:id})
            }

            fetchData()
        }
    },[id])


    useEffect(()=>{

        if(promotionDetailData){
          const evenStatus =  calculateEventStatus(promotionDetailData?.data?.dataDetail?.start_date,promotionDetailData?.data?.dataDetail?.end_date)
            setEventStatus(evenStatus)

            console.log("promotionDetailData: "+ JSON.stringify(promotionDetailData))

        }
        },[promotionDetailData])


    const [eventStatus,setEventStatus] = useState()
    const [day, hours, minutes, seconds] = Countdown(99);
    return (

        <>
            {isLoadingPromotionDetail? <LoadingReact/>: <IncentiveProgramDetail eventStatus={eventStatus} item={promotionDetailData}/>}
        </>



    );
};



const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginLeft: 9,
        backgroundColor: '#fff',
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

export default IncentiveProgram;
