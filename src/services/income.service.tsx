import BaseService from "./base.service";



export default function IncomeService(){

    const {post,get} = BaseService()

    const IncomeWallet = async (data:any)=>{
        return await post("/income/wallets",data)
    }


    const IncomeCommissions = async (data:any)=>{
        return await post("/income/commissions",data)
    }

    const IncomeBonus = async (data: any)=>{
        return await post("/income/bonus",data)
    }


    const IncomeRevenue  = async (data:any)=>{
        return await post("/income/revenue",data)
    }

    return{
        IncomeBonus,
        IncomeWallet,
        IncomeRevenue,
        IncomeCommissions
    }
}

