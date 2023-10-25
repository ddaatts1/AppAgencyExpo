import BaseService from "./base.service";


export default function DepartmentsService (){

    const {post,get} = BaseService ()

    const PersonalRequest = async (body:any)=>{
        return await post("/departments/personnel/request",body)
    }

    const PersonalList = async (data:any)=>{
        return await post('/departments/personnel',data)
    }


    const DepartmentsDetailSales = async (params:any)=>{
        return await  post("/departments/detail/sales",null, {params})
    }


    const DepartmentsDetail = async (params: any)=>{
        return await post("/departments/detail",null, {params})
    }

    const DepartmentsDismiss = async (params: any)=>{
        return await post("/departments/dismiss",null, {params})
    }

    const DepartmentsSearch = async (params: any)=>{
        return await post("/departments/search",null, {params})
    }

    const DepartmentsSales = async (params: any)=>{
        return await post("/departments/sales",null, {params})
    }

    const DepartmentsAddOrder = async (data: any)=>{
        return await post("/departments/add-order",data)
    }


    const DepartmentsListPersonal = async (params: any)=> {
        return await post("/departments/list/personnel", null, {params})

    }

    const DepartmentsList = async (params: any)=> {
        return await post("/departments", null, {params})

    }










    return{
        DepartmentsAddOrder,
        DepartmentsDismiss,
        DepartmentsSearch,
        DepartmentsDetail,
        DepartmentsDetailSales,
        DepartmentsList,
        DepartmentsListPersonal,
        DepartmentsSales,
        PersonalList,
        PersonalRequest

    }
}
