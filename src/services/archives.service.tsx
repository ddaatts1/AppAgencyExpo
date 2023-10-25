import BaseService from "./base.service";


export  default function ArchivesService(){

    const  {post,get} = BaseService()



    const ArchivesDetail = async (id: any)=>{
        return await post(`/archives/${id}`)
    }

    const ArchivesRequired = async ()=>{
        return await post("/archives/required")
    }

    const ArchivesTick = async (data:any)=>{
        return await post("/archives/tick",data)
    }

    const communities = async (data:any)=>{
        return await post("/communities/",data)
    }



    return{
        ArchivesDetail,
        ArchivesRequired,
        ArchivesTick,
        communities
    }
}
