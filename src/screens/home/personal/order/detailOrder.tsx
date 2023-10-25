import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SVG } from '../../../../constants';
import Clipboard from '@react-native-community/clipboard';
import { useEffect, useState } from 'react';
import useOrder from './useOrder';

import useCommon from '../../../../constants/useCommon';
import ModalPoup from '../../../../components/commons/modalPoup';
import { generateSignedCancelOrder } from '../../../card-warehouse/change-card/generateSignedQueryString';
import { StorageHelper } from '../../../../constants/storageHelper';
import LoadingReact from '../../../../components/commons/loading';
const DetailOrder = ({ route }: any) => {
  const order_id = route?.params?.order_id;
  const type = route?.params?.type;
  const status = route?.params?.status;
  const [isLoading, setIsLoading] = useState(false);
  const { OrderDetail, isLoadingOrderDetail, dataOrderDetail, OrderCancel, isCancelModal, checkModal, setCheckModal, setIsCancelModal } = useOrder();


  const { formatD, formatVND, checkStatus } = useCommon();
  useEffect(() => {
    const fetchData = async () => {
      try {
        OrderDetail({ order_id: order_id });
      } catch (error) { }
    };

    fetchData();
  }, [isLoading]);


  const onCheckCancel = async function () {
    // {
    //     "customer_id": 0,
    //     "type": "1: đơn sỉ, 2: đơn lẻ, 3: đơn hàng khác",
    //     "order_id": "string",
    //     "sign": "type,order_id"
    // }
    const user: any = await StorageHelper.getUser()
    const value = JSON.parse(user);
    const sign = generateSignedCancelOrder({ type: type, order_id: dataOrderDetail?.order?.id })

    const data = {
      customer_id: value?.id,
      type: type,
      order_id: dataOrderDetail?.order?.id,
      sign: sign
    }
    console.log(data)
    OrderCancel(data)

  }
  // const card1 = (order_detail: any) => {
  //   return order_detail.map((item: any, index: any) => {
  //     return (
  //       <View
  //         key={index}
  //         style={{
  //           justifyContent: 'flex-start',
  //           paddingVertical: 12,
  //           backgroundColor: 'white',
  //           marginTop: 1,
  //         }}>
  //         <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
  //           <Image
  //             source={require('../../../../assets/image/logo.jpg')}
  //             style={{ width: 80, height: 80, borderRadius: 10 }}
  //           />

  //           <View style={{ paddingHorizontal: 12 }}>
  //             <Text style={{ fontSize: 16, color: '#323232' }}>
  //               {item.cardType}
  //             </Text>
  //             <Text numberOfLines={1} style={{ fontSize: 15, color: '#323232' }}>
  //               x{item.quantity}
  //             </Text>
  //             <Text style={{ fontSize: 14, color: 'red' }}>
  //               {formatVND(item.price)}
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   });
  // };
  const card = (data: any, order_detail: any) => {
    return (
      <>
        {data.is_le == 2 ? (
          order_detail.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: 'flex-start',
                  paddingVertical: 12,
                  backgroundColor: 'white',
                  marginTop: 1,

                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  {item?.image === null ? <Image
                    source={require('../../../../assets/image/logo.jpg')}
                    style={{ width: 90, height: 90, borderRadius: 10 }}
                  /> : <Image
                    source={{ uri: item?.image }}
                    style={{ width: 90, height: 90, borderRadius: 10 }}
                  />}

                  <View style={{ paddingHorizontal: 12, marginTop: -6 }}>
                    <Text style={{ fontSize: 16, color: '#323232', fontWeight: "bold" }}>
                      {item?.productName}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      x{item?.quantity}
                    </Text>
                    {item?.sizes && <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      Size: {item?.sizes}
                    </Text>}
                    {item?.colors && <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      Màu: {item?.colors}
                    </Text>}
                    <Text style={{ fontSize: 14, color: 'red' }}>
                      {formatVND(item.price)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <>
            {data?.numberOfType1 > 0 && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  paddingVertical: 12,
                  backgroundColor: 'white',
                  marginTop: 1,
                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Image
                    source={require('../../../../assets/image/logo.jpg')}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />

                  <View style={{ paddingHorizontal: 12 }}>
                    <Text style={{ fontSize: 16, color: '#323232' }}>
                      {data.nameOfType1}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      x{data.numberOfType1}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'red' }}>
                      {formatVND(data.amountOfType1)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {data?.numberOfType2 > 0 && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  paddingVertical: 12,
                  backgroundColor: 'white',
                  marginTop: 1,
                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Image
                    source={require('../../../../assets/image/logo.jpg')}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />

                  <View style={{ paddingHorizontal: 12 }}>
                    <Text style={{ fontSize: 16, color: '#323232' }}>
                      {data.nameOfType2}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      x{data.numberOfType2}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'red' }}>
                      {formatVND(data.amountOfType2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {data?.numberOfType3 > 0 && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  paddingVertical: 12,
                  backgroundColor: 'white',
                  marginTop: 1,
                }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Image
                    source={require('../../../../assets/image/logo.jpg')}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />

                  <View style={{ paddingHorizontal: 12 }}>
                    <Text style={{ fontSize: 16, color: '#323232' }}>
                      {data.nameOfType3}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 15, color: '#323232' }}>
                      x{data.numberOfType3}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'red' }}>
                      {formatVND(data.amountOfType3)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </>
    );
  };
  const onClipboard = async (item: string) => {
    return await Clipboard.setString(item);
  };
  const phone = (item: any) => {
    return item.substring(0, item.length - 2) + '**';
  };
  const contact = () => {
    return (


      <>
        {isLoadingOrderDetail ?
          <View style={{ padding: 12 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>
                Số tài khoản:
                <Text
                  style={{
                    color: '#0288D1',
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  876836666{' '}
                </Text>
              </Text>
              <TouchableOpacity onPress={() => onClipboard('876836666')}>
                <View
                  style={{
                    paddingRight: 10,
                    justifyContent: 'center',
                  }}>
                  <SVG.Icon_copy height={20} width={20} color={'#0288D1'} />
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#323232',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Ngân hàng quân đội MBBANK
            </Text>
            <Text
              style={{
                paddingTop: 12,
                color: '#323232',
                fontSize: 16,
              }}>
              Tên tài khoản:{' '}
              <Text
                style={{
                  color: '#323232',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC FUTURELANG
              </Text>
            </Text>
            <View
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                height: 50,
                backgroundColor: '#EEFAFF',
                borderRadius: 10,
                marginHorizontal: 12,
                marginVertical: 24,
              }}>
              <Text style={{ color: '#181818', fontSize: 14 }}>
                Nội dung chuyển khoản:{' '}
                <Text
                  style={{ color: '#D51E03', fontSize: 14, fontWeight: 'bold' }}>
                  Tên + số điện thoại
                </Text>
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  padding: 12,
                  backgroundColor: '#EEFAFF',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: 14,
                    paddingBottom: 12,
                  }}>
                  Quét QR Để thanh toán
                </Text>
                <SVG.Icon_qr />
              </View>
            </View>
          </View>
          : <LoadingReact></LoadingReact>}
      </>
    );
  };
  return (
    <>
      {isLoadingOrderDetail ? (
        <ScrollView style={styles.main}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 12 }}>
              <Text style={{ color: '#181818', fontSize: 16 }}>
                Mã đơn hàng:{' '}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: '#0288D1' }}>
                {dataOrderDetail?.order?.orderId}
              </Text>
            </View>
            {type == 2 && (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 12,
                  alignItems: 'center',
                  height: "auto",
                  backgroundColor: '#EEFAFF',
                  borderRadius: 10,
                  marginHorizontal: 12,
                  marginVertical: 24,
                }}>
                <SVG.Icon_location height={30} width={30} />
                <View>
                  <Text
                    style={{
                      color: '#181818',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Họ tên ({phone(dataOrderDetail?.order?.customerPhone)})
                  </Text>
                  <Text>{dataOrderDetail?.order?.customerAddress}</Text>
                </View>
              </View>
            )}

            <View style={{ paddingHorizontal: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', color: '#0288D1' }}>
                Sản phẩm
              </Text>
              {card(dataOrderDetail?.order, dataOrderDetail?.order_detail)}
            </View>

            <View
              style={{
                paddingVertical: 12,
                borderWidth: 0.7,
                borderStyle: 'dashed',
                borderColor: '#C2C2C2',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                }}>
                <Text
                  style={{
                    color: '#0288D1',
                    textAlignVertical: 'center',
                    height: 32,
                    fontSize: 16,
                    paddingRight: 24,
                    fontWeight: 'bold',
                  }}>
                  Trạng thái đơn hàng
                </Text>
                {checkStatus(status)}
              </View>

              <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                <Text
                  style={{
                    color: '#0288D1',
                    textAlignVertical: 'center',
                    height: 32,
                    fontSize: 16,
                    paddingRight: 24,
                    fontWeight: 'bold',
                  }}>
                  Chi tiết thanh toán
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <SVG.Icon_wallet height={30} width={30} />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#525252',
                        textAlignVertical: 'center',
                      }}>
                      Tổng tiền sản phẩm
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 14,
                      color: '#525252',
                      textAlignVertical: 'center',
                    }}>
                    {dataOrderDetail?.order?.is_le == 0
                      ? formatVND(
                        dataOrderDetail.order.numberOfType1 *
                        dataOrderDetail.order.amountOfType1 +
                        dataOrderDetail.order.numberOfType2 *
                        dataOrderDetail.order.amountOfType2 +
                        dataOrderDetail.order.numberOfType3 *
                        dataOrderDetail.order.amountOfType3,
                      )
                      : formatVND(
                        dataOrderDetail?.order_detail?.reduce(
                          (a: any, b: any) => a + b.price * b.quantity,
                          0,
                        ),
                      )}
                  </Text>
                </View>
                {dataOrderDetail?.order?.discount && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <SVG.Icon_sale height={30} width={30} />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#525252',
                          textAlignVertical: 'center',
                        }}>
                        Chiết khấu:
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: '#525252',
                        textAlignVertical: 'center',
                      }}>
                      {dataOrderDetail?.order?.discount}%
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#525252',
                      textAlignVertical: 'center',
                      fontWeight: 'bold',
                    }}>
                    Số tiền thanh toán:
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: 'red',
                      textAlignVertical: 'center',
                      fontWeight: 'bold',
                    }}>
                    {formatVND(dataOrderDetail.order.totally)}
                  </Text>
                </View>
              </View>
            </View>
            {status == 'created' && contact()}

            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 18,
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 20, color: '#323232', fontWeight: 'bold' }}>
                Thông tin hỗ trợ
              </Text>
              <Text style={{ fontSize: 18, color: '#323232' }}>
                Zalo/SĐT:<Text style={{ fontWeight: 'bold' }}> 035 695 9812</Text>
              </Text>
              <Text style={{ fontSize: 18, color: '#323232' }}>
                Mrs Hồi kế toán FutureLang
              </Text>
              <View
                style={{
                  paddingHorizontal: 12,
                }}>
                <Text style={{ fontSize: 12, color: '#323232' }}>
                  Nhấn
                  <Text style={{ fontSize: 12, color: '#D51E03' }}>
                    {' '}
                    "Đặt hàng"{' '}
                  </Text>
                  đồng nghĩa với việc bàn đồng ý với tất cả các Điều khoản,
                  chính sách của
                  <Text style={{ fontSize: 12, color: '#D51E03' }}>
                    {' '}
                    Startup 4.0.{' '}
                  </Text>
                </Text>
              </View>
            </View>
            {status == 'created' && (
              // <TouchableOpacity onPress={() => onCancel()}>
              <TouchableOpacity
                style={{
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 12,
                  backgroundColor: '#F1F1F1',
                }} onPress={() => setCheckModal(true)}>
                <Text style={{ textAlignVertical: 'center', color: '#525252' }}>
                  Hủy đơn
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <ModalPoup visible={checkModal}>
            {isCancelModal ? <Text style={{ padding: 12, fontSize: 16, textAlign: 'center', color: "#323232", fontWeight: 'bold' }}>
              Đơn hàng {dataOrderDetail?.order?.orderId} đã được huỷ thành công !
            </Text> : <Text style={{ padding: 12, fontSize: 16, textAlign: 'center', color: "#323232", fontWeight: 'bold' }}>
              Bạn có chắc chắn muốn hủy?
            </Text>}

            {!isCancelModal ? <View style={{ flexDirection: "row" }}>
              <TouchableOpacity

                onPress={() => setCheckModal(false)}
                style={styles.Btn}>
                <View style={{ flexDirection: "row", }}>

                  <Text style={{ color: '#0288D1', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Không</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity

                onPress={() => onCheckCancel()}
                style={[styles.Btn, { backgroundColor: '#0288D1', }]}>
                <View style={{ flexDirection: "row", }}>

                  <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Có</Text>
                </View>
              </TouchableOpacity>
            </View> :
              <TouchableOpacity

                onPress={() => {
                  setIsLoading(true)
                  setCheckModal(false)
                }}
                style={[styles.Btna, { backgroundColor: '#0288D1', }]}>
                <View style={{ flexDirection: "row", }}>

                  <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Xác nhận</Text>
                </View>
              </TouchableOpacity>}


          </ModalPoup>
          {/* <ModalPoup visible={isCancelModal}>
            <Text style={{ padding: 12, fontSize: 16, textAlign: 'center', color: "#323232", fontWeight: 'bold' }}>
              Bạn có chắc chắn muốn hủy?
            </Text>



            <TouchableOpacity

              onPress={() => setIsCancelModal(false)}
              style={[styles.Btna, { backgroundColor: '#0288D1', }]}>
              <View style={{ flexDirection: "row", }}>

                <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Xác nhận</Text>
              </View>
            </TouchableOpacity>


          </ModalPoup> */}
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    // paddingHorizontal: 12,
    paddingTop: 20,
    width: '100%',
  },
  Btn: {

    marginBottom: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 55,
    borderRadius: 15,
  },
  Btna: {

    marginBottom: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 15,
  },
});
