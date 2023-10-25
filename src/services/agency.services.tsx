import BaseService from "./base.service";
import data from "../../ultidata/data";


export  default function AgencyService(){

    const {get,post} = BaseService()

    const agencyTeam = async(id: Number,data:any)=>{
        return await post(`/agency/${id}/team`, data)
    }

    const  agencyDetail = async  (id: Number)=>{
        return await post(`/agency/${id}`)
    }


    const agencyOffWork =async (data: any)=>{
        return await post('/agency/off-work',data)
    }

    const agencyList = async (data:any)=>{
        return await post('/agency/list',data)
    }

    const agencyCreate=async (data:any)=>{
        return await post('/agency/create',data)
    }

    const agencyUpdate = async (data:any, id:any)=>{
        return await post(`/agency/${id}/update`,data)
    }

    return{
    agencyCreate,
        agencyDetail,
        agencyList,
        agencyTeam,
        agencyOffWork,
        agencyUpdate
    }
}
