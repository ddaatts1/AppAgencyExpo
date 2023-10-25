import BaseService from '../base.service';

export default function PersonalService() {
  const {post, get, postFormData} = BaseService();

  const getUser = async function () {
    return await get('/user/me');
  };
  const changePassword = async function (data: any) {
    return await post('/user/change-password', data);
  };
  const updateProfile = async function (data: any) {
    return await post('/user/update-profile', data);
  };
  const postBank = async function () {
    return await post('/bank');
  };
  const updateBank = async function (data: any) {
    return await post('/user/bank', data);
  };

  const requestKYC = async function () {
    return await post('/user/kyc-request');
  };
  const orderCancel = async function (data: any) {
    return await post('/order/cancel', data);
  };

  const order = async function (data: any) {
    console.log(data);
    return await post('/order', data);
  };
  const orderDetail = async function (data: any) {
    return await post('/order/detail', data);
  };
  return {
    getUser,
    AuthServiceChangePassword: changePassword,
    AuthServiceUpdateProfile: updateProfile,
    postBank,
    updateBank,
    AuthServiceRequestKYC: requestKYC,
    order,
    orderCancel,
    orderDetail,
  };
}
