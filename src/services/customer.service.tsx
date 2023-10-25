import BaseService from "./base.service";


export default function CustomerService() {

    const {get, post} = BaseService()

    const CustomerUpdate = async (data: any) => {
        return await post('/customer/update', data)
    }

    const CustomerTrials = async (data:any,params: any) => {
        return await post('/customer/trials', data, {params})
    }

    const CustomerRegister = async (data: any) => {
        return await post('/customer/register', data)
    }

    const CustomerPremium = async (data:any,params: any) => {
        return await post('/customer/premium', data, {params})
    }

    const ImportTrialStudy = async (data: any) => {
        return await post('/customer/import-trial-study', data)
    }

    const CustomerExists = async (data: any) => {
        return await post('/customer/exists', data)
    }

    const CustomerDetail = async (data: any) => {
        return await post('/customer/detail', data)
    }

    const CustomerActiveCardCode = async (data: any) => {
        return await post('/customer/active-cardcode', data)
    }

    return{
        CustomerDetail,
        CustomerExists,
        CustomerPremium,
        CustomerTrials,
        CustomerActiveCardCode,
        CustomerRegister,
        CustomerUpdate,
        ImportTrialStudy
    }

}
