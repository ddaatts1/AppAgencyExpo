import { useState } from 'react';
import Moment from 'moment';
import _, { values } from 'lodash';
import useLogin from '../../../auth/useLogin';
import PersonalService from '../../../../services/personal/personal.service';

export default function useOrder() {
  const [dataOrder, SetDataOrder] = useState() as any;
  const [dataOrderDetail, SetDataOrderDetail] = useState() as any;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOrderDetail, setIsLoadingOrderDetail] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const { order, orderCancel, orderDetail } = PersonalService();
  const Order = async function (data: any) {
    try {
      const result = await order(data);
      if (result.status == 200) {
        SetDataOrder(result.data);
        setIsLoading(true);
      }
    } catch (err: any) {

    } finally {
    }
  };
  const OrderCancel = async function (data: any) {
    try {


      const result = await orderCancel(data);

      if (result.status == 200) {
        setIsCancelModal(true)
      }
    } catch (err: any) {
      console.log("err=========", err)

    } finally {
    }
  };

  const OrderDetail = async function (data: any) {
    try {
      setIsLoadingOrderDetail(false)
      const result = await orderDetail(data);
      if (result.status == 200) {
        console.log(result.data)

        SetDataOrderDetail(result.data);
        setIsLoadingOrderDetail(true);
      }
    }
    catch (err: any) {

    } finally {
    }
  };

  return {
    Order,
    OrderCancel,
    isLoading,
    OrderDetail,
    dataOrder,
    dataOrderDetail,
    isLoadingOrderDetail, checkModal, isCancelModal, setCheckModal, setIsCancelModal
  };
}
