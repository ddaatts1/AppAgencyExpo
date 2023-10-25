import BaseService from ".././base.service";


export  default function UserMissionService(){

    const  {post,get} = BaseService()

    const MissionMonth = async ()=>{
        return await get(`/user/mission`)
    }

    return{
        MissionMonth,
    }
}
