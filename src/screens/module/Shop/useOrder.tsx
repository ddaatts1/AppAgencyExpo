import { useState } from 'react';
import OrderService from "../../../services/order.service";

export default function useOrder() {
    const {
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
    } = OrderService();


    const [orderCategoriesData,setOrderCategoriesData] = useState(null)
    const [isLoadingOrderCategoriesData,setIsLoadingOrderCategoriesData]  =useState(false)

    const [orderProductData,setOrderProductData ] = useState(null)
    const [isLoadingOrderProductData,setIsLoadingOrderProductData] = useState(false)

    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [createdOrder, setCreatedOrder] = useState(null);

    const [isFetchingOrderDetail, setIsFetchingOrderDetail] = useState(false);
    const [orderDetailData, setOrderDetailData] = useState(null);

    const [isCancellingOrder, setIsCancellingOrder] = useState(false);
    const [cancelledOrder, setCancelledOrder] = useState(null);

    const [isOrderOther, setIsOrderOther] = useState(false);
    const [otherOrderData, setOtherOrderData] = useState(null);

    const [isOrderListCard, setIsOrderListCard] = useState(false);
    const [orderListCardData, setOrderListCardData] = useState(null);

    const [isOrderListProduct, setIsOrderListProduct] = useState(false);
    const [orderListProductData, setOrderListProductData] = useState(null);

    const [isOrderCheck, setIsOrderCheck] = useState(false);
    const [orderCheckData, setOrderCheckData] = useState(null);

    const [isOrderAddress, setIsOrderAddress] = useState(false);
    const [orderAddressData, setOrderAddressData] = useState(null);

    const [isOrderReceived, setIsOrderReceived] = useState(false);
    const [orderReceivedData, setOrderReceivedData] = useState(null);

    const [isOrderListUserTransfer, setIsOrderListUserTransfer] = useState(false);
    const [orderListUserTransferData, setOrderListUserTransferData] = useState(null);

    const [isOrderLevel, setIsOrderLevel] = useState(false);
    const [orderLevelData, setOrderLevelData] = useState(null);

    const [isOrderTransfer, setIsOrderTransfer] = useState(false);
    const [orderTransferData, setOrderTransferData] = useState(null);

    const [isFetchingOrder, setIsFetchingOrder] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const createNewOrder = async (data) => {
        try {
            setIsCreatingOrder(true);
            const response = await CreateOrder(data);
            setCreatedOrder(response);
        } catch (error) {
            setCreatedOrder(error);

            console.error('Error creating order:', error);
        } finally {
            setIsCreatingOrder(false);
        }
    };

    const fetchOrderDetail = async (data) => {
        try {
            setIsFetchingOrderDetail(true);
            const response = await OrderDetail(data);
            setOrderDetailData(response);
        } catch (error) {
            console.error('Error fetching order detail:', error);
        } finally {
            setIsFetchingOrderDetail(false);
        }
    };

    const cancelOrder = async (data) => {
        try {
            setIsCancellingOrder(true);
            const response = await OrderCancel(data);
            setCancelledOrder(response);
        } catch (error) {
            setCancelledOrder(error);

            console.error('Error cancelling order:', error);
        } finally {
            setIsCancellingOrder(false);
        }
    };

    const orderOther = async (data) => {
        try {
            setIsOrderOther(true);
            const response = await OrderOther(data);
            setOtherOrderData(response);
        } catch (error) {
           setOtherOrderData(error)
        } finally {
            setIsOrderOther(false);
        }
    };

    const orderListCard = async (data) => {
        try {
            setIsOrderListCard(true);
            const response = await OrderListCard(data);
            setOrderListCardData(response);
        } catch (error) {
            console.error('Error performing OrderListCard:', error);
        } finally {
            setIsOrderListCard(false);
        }
    };

    const orderListProduct = async (params) => {
        try {
            setIsOrderListProduct(true);
            const response = await OrderListProduct(params);
            setOrderListProductData(response);
        } catch (error) {
            console.error('Error performing OrderListProduct:', error);
        } finally {
            setIsOrderListProduct(false);
        }
    };

    const orderCheck = async (data) => {
        try {
            setIsOrderCheck(true);
            const response = await OrderCheck(data);
            setOrderCheckData(response);
            if(response.status ==200){
                return response?.data?.discount
            }
            return 0

        } catch (error) {
            console.error('Error performing OrderCheck:', error);
            return 0

        } finally {
            setIsOrderCheck(false);
        }
    };

    const orderAddress = async () => {
        try {
            setIsOrderAddress(true);
            const response = await OrderAddress();
            setOrderAddressData(response);
        } catch (error) {
            console.error('Error performing OrderAddress:', error);
        } finally {
            setIsOrderAddress(false);
        }
    };

    const orderReceived = async (data) => {
        try {
            setIsOrderReceived(true);
            const response = await OrderReceived(data);
            setOrderReceivedData(response);
        } catch (error) {
            console.error('Error performing OrderReceived:', error);
        } finally {
            setIsOrderReceived(false);
        }
    };

    const orderListUserTransfer = async () => {
        try {
            setIsOrderListUserTransfer(true);
            const response = await OrderListUserTransfer();
            setOrderListUserTransferData(response);
        } catch (error) {
            console.error('Error performing OrderListUserTransfer:', error);
        } finally {
            setIsOrderListUserTransfer(false);
        }
    };

    const orderLevel = async () => {
        try {
            setIsOrderLevel(true);
            const response = await OrderLevel();
            setOrderLevelData(response);
        } catch (error) {
            console.error('Error performing OrderLevel:', error);
        } finally {
            setIsOrderLevel(false);
        }
    };

    const orderTransfer = async (data) => {
        try {
            setIsOrderTransfer(true);
            const response = await OrderTransfer(data);
            setOrderTransferData(response);
        } catch (error) {
            console.error('Error performing OrderTransfer:', error);
        } finally {
            setIsOrderTransfer(false);
        }
    };

    const fetchingOrder = async (data)=>{
        try {
            setIsFetchingOrder(true);
            const response = await Order(data);
            setOrderData(response);
        } catch (error) {
            console.error('Error performing Order:', error);
        } finally {
            setIsFetchingOrder(true);
            (false);
        }
    }


    const fetchOrderCategories = async  (data:any)=>{
        try {
            setIsLoadingOrderCategoriesData(true)
            const result = await OrderCategories(data)
            setOrderCategoriesData(result)

        }catch (e){
            setOrderCategoriesData(e)
        }finally {
            setIsLoadingOrderCategoriesData(false)
        }
    }

    const fetchOrderProduct = async (data:any)=>{
        try {
            setIsLoadingOrderProductData(true)
            const  result  = await OrderProduct(data)
            setOrderProductData(result)
        }catch (e){
            setOrderProductData(e)
        }finally {
            setIsLoadingOrderProductData(false)
        }
    }


    return {
        isCreatingOrder,
        createdOrder,
        createNewOrder,
        isFetchingOrderDetail,
        orderDetailData,
        fetchOrderDetail,
        isCancellingOrder,
        cancelledOrder,
        cancelOrder,
        isOrderOther,
        otherOrderData,
        orderOther,
        isOrderListCard,
        orderListCardData,
        orderListCard,
        isOrderListProduct,
        orderListProductData,
        orderListProduct,
        isOrderCheck,
        orderCheckData,
        orderCheck,
        isOrderAddress,
        orderAddressData,
        orderAddress,
        isOrderReceived,
        orderReceivedData,
        orderReceived,
        isOrderListUserTransfer,
        orderListUserTransferData,
        orderListUserTransfer,
        isOrderLevel,
        orderLevelData,
        orderLevel,
        isOrderTransfer,
        orderTransferData,
        orderTransfer,
        fetchingOrder,
        orderData,
        fetchOrderCategories,
        orderCategoriesData,
        isLoadingOrderCategoriesData,
        fetchOrderProduct,
        orderProductData,
        isLoadingOrderProductData
    };
}
