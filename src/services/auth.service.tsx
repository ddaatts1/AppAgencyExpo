

import { LoginDto, SessionDto } from "./api/auth.dto";
import BaseService from "./base.service";


export default function AuthService() {
    const { post, get } = BaseService()

    const login = async function (data: LoginDto) {
        return await post("/auth/login", data)
    }
    const logout = async function () {
        return await post("/auth/logout")
    }
    const forgotPassword = async function (data: any) {

        return await post("/auth/forgot-password", data)
    }
    const getProvince = async function () {
        return await get("/location/provinces")

    }
    const getDistrict = async function (id: Number) {
        return await get("/location/provinces/" + id)

    }
    const register = async function (data: any, referCode: String) {
        console.log(data)
        return await post("/auth/register/" + referCode, data)
    }

    return {
        AuthServiceLogin: login,
        AuthServiceLogout: logout,
        AuthServiceForgotPassword: forgotPassword, getProvince, getDistrict,
        AuthServiceRegister: register,

    };
}
