import BaseService from "./base.service";


export  default function SupportService(){

    const {post} = BaseService()



    const feedback = async (data:any)=>{
        return await post("/supports/feedback",data)
    }


    return{
        feedback
    }
}
