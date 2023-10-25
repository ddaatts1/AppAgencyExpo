import BaseService from "./base.service";


export  default function NotificationService (){

    const {post} = BaseService()


    const notificationList = async (data: any)=>{
        return await post("/notification/list",data)
    }
    const notificationDetail = async (data: any)=>{
        return await post("/notification/detail",data)
    }
    const notificationNewDetail = async (params: any)=>{
        return await post(`/notification/new-detail/${params}`)
    }


    const notificationToken = async (data: any)=>{
        return await post(" /notification/token",data)
    }
    const notification= async (data: any)=>{
        return await post("/notification/",data)
    }



    return{
        notificationDetail,
        notification,
        notificationList,
        notificationNewDetail,
        notificationToken
    }
}
