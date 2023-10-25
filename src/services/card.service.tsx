import BaseService from "./base.service";


export default function CardService(){

    const {post,get} = BaseService()

    const getStudentCard = async function (cardCode: String
                                           , used:Number
                                           , cardId:Number
                                           , page:Number
                                           , limit: Number
                                           ,data:any) {

        const params = {
            cardCode,
            used,
            cardId,
            page,
            limit
        };

        return await post('/cardcode/studentcard', data, { params });
    };



    const expose = async function (data:any){
        return await post('/cardcode/expose',data)
    }

    const exportTrial = async function(data:any
                                       , cardCode:String
                                       ,used : Number
                                       , cardId: Number){

        const params={
            cardCode,
            used,
            cardId
        }

        return await post('/cardcode/export-trials',data,{params})
    }


    const changeCardCode = async function(data:any){
        return await post('/cardcode/change',data)
    }

    const exchangeHistory = async function(data:any){
        return await post('/cardcode/exchange-history',data)
    }

    const createTrialCode = async  function (data:any){
        return await post('/cardcode/create-trials-code',data)
    }

    const createTrial = async function(data:any){
        return await post('/cardcode/create-trials',data)
    }

    const getListTrial = async  function (data:any){
        return await  post('/cardcode/list-trials',data)
    }

    const getAllCard = async function(){
        return await post('/cardcode/all');
    }

    const getListCard = async function(data:any){
        return await post('/cardcode/list',data)
    }

    const myAccount = async  function(){
        return await get('/user/me');
    }

    const getCardDetail = async (data: any)=>{
        return await post("/cardcode/detail",data)
    }


    return {
        getStudentCard,
        expose,
        exportTrial,
        changeCardCode,
        exchangeHistory,
        createTrialCode,
        createTrial,
        getListTrial,
        getAllCard,
        getListCard,
        myAccount,
        getCardDetail

    };
}
