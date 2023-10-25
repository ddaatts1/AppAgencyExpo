import PromotionsService from "../../../services/promotions.service";
import {useState} from "react";


export  default function usePromotions(){

    const {Promotions,PromotionsDetail} = PromotionsService()

    const [promotionData,setPromotionData] = useState()
    const [isLoadingPromotion,setIsLoadingPromotion]  = useState(false)

    const [promotionDetailData,setPromotionDetailData] = useState()
    const [isLoadingPromotionDetail,setIsLoadingPromotionDetail] = useState(false)


    const getPromotions = async ()=>{
        try {
            setIsLoadingPromotion(true)

            const result = await  Promotions()
            setPromotionData(result)
        }catch (e){
            setPromotionData(e)

        }
        finally {
            setIsLoadingPromotion(false)
        }
    }


    const getPromotionDetail = async (params:any)=>{
        try {
            setIsLoadingPromotionDetail(true)

            const result = await  PromotionsDetail(params)
            setPromotionDetailData(result)
        }catch (e){
            setPromotionDetailData(e)

        }
        finally {
            setIsLoadingPromotionDetail(false)
        }
    }



    return{
        getPromotions,
        getPromotionDetail,
        promotionData,
        promotionDetailData,
        isLoadingPromotion,
        isLoadingPromotionDetail
    }


}
