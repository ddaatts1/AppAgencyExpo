import BaseService from "./base.service";


export  default  function PromotionsService (){

    const {post} = BaseService()


    const Promotions = async ()=>{
        return await post("/promotions/")
    }

    const PromotionsDetail = async (params:any)=>{
        return await post("/promotions/detail",null, {params})
    }


    return{
        PromotionsDetail,
        Promotions
    }

}
