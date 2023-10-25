import BaseService from "./base.service";

export default function OrderService() {
    const { post, get } = BaseService();

    const CreateOrder = async (data: any) => {
        return await post("/order/create", data);
    }

    const OrderOther = async (data: any) => {
        return await post("/order/other", data);
    }

    const OrderCancel = async (data: any) => {
        return await post("/order/cancel", data);
    }

    const OrderDetail = async (data: any) => {
        return await post("/order/detail", data);
    }

    const OrderListCard = async (data: any) => {
        return await post("/order/list-card", data);
    }

    const OrderListProduct = async (params: any) => {
        return await post("/order/list-product", null, { params });
    }

    const OrderCheck = async (data: any) => {
        return await post("/order/check", data);
    }

    const OrderAddress = async () => {
        return await post("/order/address");
    }

    const OrderReceived = async (data: any) => {
        return await post("/order/received", data);
    }

    const OrderListUserTransfer = async () => {
        return await post("/order/list-user/transfer");
    }

    const OrderLevel = async () => {
        return await post("/order/level");
    }

    const OrderTransfer = async (data: any) => {
        return await post("/order/transfer", data);
    }

    const Order = async (data: any) => {
        return await post("/order/", data);
    }

    const OrderCategories = async (data:any)=>{
        return await post("/order/categories",data)
    }

    const OrderProduct = async (data:any)=>{
        return await post("/order/product",data)
    }

    return {
        CreateOrder,
        OrderOther,
        OrderCancel,
        OrderDetail,
        OrderListCard,
        OrderListProduct,
        OrderCheck,
        OrderAddress,
        OrderReceived,
        OrderListUserTransfer,
        OrderLevel,
        OrderTransfer,
        Order,
        OrderCategories,
        OrderProduct
    };
}
