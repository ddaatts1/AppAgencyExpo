import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto, UserPass } from "../services/api/auth.dto";


export const StorageHelper = {
    clearSession() {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
        AsyncStorage.removeItem("cart");
        AsyncStorage.removeItem("cartCount");
        AsyncStorage.removeItem("cartCountFTL");
        AsyncStorage.removeItem("cartCountKIDS");
        this.removeReceiver()

    },
    async clearUsePas() {
        await AsyncStorage.removeItem("userPass");

    },

    setDistrict: (data: any) => {
        AsyncStorage.setItem("district", data);
    },
    setTimeForgotPass: (data: any) => {
        AsyncStorage.setItem("timeForgotPass", data);
    },
    getTimeForgotPass: () => {
        return AsyncStorage.getItem("timeForgotPass");
    },
    async clearTimeForgotPass() {
        await AsyncStorage.removeItem("timeForgotPass");

    },
    getDistrict: () => {
        return AsyncStorage.getItem("district");
    },

    getUsePass: async () => {
        return await AsyncStorage.getItem("userPass")
    },
    removeDistrict() {
        AsyncStorage.removeItem("district");

    },
    setRules: (item: string) => {
        AsyncStorage.setItem("rule", item);

    },
    removeRules: () => {
        AsyncStorage.removeItem("rule");

    },
    getRules: () => {
        return AsyncStorage.getItem("rule");

    },
    setReceiver: (item: string) => {
        AsyncStorage.setItem("receiver", item);

    },
    removeReceiver: () => {
        AsyncStorage.removeItem("receiver");

    },
    getReceiver: () => {
        return AsyncStorage.getItem("receiver");

    },
    setBank: (item: string) => {
        AsyncStorage.setItem("bank", item);

    },
    removeBank: () => {
        AsyncStorage.removeItem("bank");

    },
    getBank: () => {
        return AsyncStorage.getItem("bank");

    },

    setUsePass: async (userPass: UserPass) => {
        await AsyncStorage.setItem("userPass", JSON.stringify(userPass));
    },

    getToken: () => {
        return AsyncStorage.getItem("token");
    },
    setToken: (token: string) => {
        AsyncStorage.setItem("token", token);
    },
    setUser: (user: any) => {
        AsyncStorage.setItem("user", JSON.stringify(user));
    },
    getUser: () => {
        try {
            if (!AsyncStorage) {
                return;
            }
            const _result = AsyncStorage.getItem("user");
            return _result;
        } catch (err) {
            console.log("error parse user: ");
        }
    }

};
