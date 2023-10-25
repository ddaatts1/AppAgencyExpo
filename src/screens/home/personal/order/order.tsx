import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ROUTES, SVG } from '../../../../constants';
import { EnumOder, EnumOderBottom } from '../../../../constants/enum';
import {
  ParamListBase,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useOrder from './useOrder';
import LoadingReact from '../../../../components/commons/loading';
import useCommon from '../../../../constants/useCommon';
import data from '../../../../../ultidata/data';
import { StorageHelper } from '../../../../constants/storageHelper';
import useLogin from '../../../auth/useLogin';

const Order = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { Order, isLoading, dataOrder } = useOrder();
  const [type, setType] = useState(0);
  const { formatD, fomatDateDDMMYY } = useCommon();
  const [isActivated, setIsActivated] = useState(false);
  const { getRulesStorage } = useLogin();
  //EnumOderBottom.Order_handle==0:
  function handleSubmit(type: any) {
    setType(type);
  }

  const focus = useIsFocused();
  useEffect(() => {

    const fetchData = async () => {
      try {


        const intro: any = await StorageHelper.getRules();
        const user: any = await StorageHelper.getUser();
        let ruleJson = JSON.parse(intro);
        let userJson = JSON.parse(user);
        let ruleItem = ruleJson?.findIndex(
          (item: any) => item.email === userJson?.email,
        );

        if (ruleItem >= 0) {
          if (ruleJson[ruleItem]?.product) {
            if (ruleJson[ruleItem]?.product == EnumOder.FutureLang) {
              // console.log("FTL", ruleJson[ruleItem])
              Order({ service: 'FTL' });
            } else if (ruleJson[ruleItem]?.product == EnumOder.FKids) {
              //  console.log("KIDS", ruleJson[ruleItem])
              Order({ service: 'FTL' });
            }

          } else {
            //  console.log("FTL---------", ruleJson[ruleItem])
            return Order({ service: 'FTL' });
          }
        }





      } catch (error) { }
    };

    fetchData();
  }, [focus]);
  const checkType = (item: any) => {
    switch (item) {
      case 1:
        return <Text style={styles.stylesCar}>Thẻ học</Text>;
      case 2:
        return <Text style={styles.stylesShop}>Thẻ shop</Text>;
      default:
        return <Text style={styles.stylesCar}>Thẻ học</Text>;
    }
  };

  //   created : Chờ xử lý
  // processing : Đang xử lý
  // shipping : Đang vận chuyển
  // approved|received : Đã hoàn thành
  // cancelled : Đã hủy
  // return : Hoàn đơn
  // refunded : Đã hoàn tiền

  const checkStatus = (item: any) => {
    switch (item) {
      case 'created':
        return <Text style={styles.created}>Chờ xử lý</Text>;
      case 'processing':
        return <Text style={styles.processing}>Đang xử lý</Text>;
      case 'shipping':
        return <Text style={styles.shipping}>Đang vận chuyển</Text>;
      case 'approved':
        return <Text style={styles.approvedAndReceived}>Đã hoàn thành</Text>;
      case 'received':
        return <Text style={styles.approvedAndReceived}>Đã hoàn thành</Text>;
      case 'cancelled':
        return <Text style={styles.cancelled}>Đã hủy</Text>;
      case 'return':
        return <Text style={styles.return}>Hoàn đơn</Text>;
      default:
        return <Text style={styles.refunded}>Đã hoàn tiền</Text>;
    }
  };

  const ItemOrder = (data: any, key: any) => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          padding: 18,
          backgroundColor: 'white',
        }}
        key={key}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../../../assets/image/logo.jpg')}
            style={{ width: 80, height: 80, borderRadius: 10 }}
          />

          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0288D1' }}>
              Mã đơn hàng: {data.orderId}
            </Text>
            <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold' }}>
              {formatD(data.totally)}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {checkType(data.type)}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlignVertical: 'center', height: 32 }}>
            Ngày tạo: {fomatDateDDMMYY(data.updatedAt)}
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingBottom: 8,
                marginTop: -40,
              }}>
              {checkStatus(data.status)}
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.DETAIL_ORDER, {
                  order_id: data.id,
                  type: data.type,
                  status: data.status,
                })
              }
              style={{
                height: 32,
                borderWidth: 0.5,
                borderColor: '#0288D1',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
              }}>
              <SVG.Icon_exclamationcircleo color="#0288D1" />
              <Text style={styles.textDetail}> Chi tiết đơn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <ScrollView style={styles.main}>
          {dataOrder.map((item: any, index: any) => {
            return ItemOrder(item, index);
          })}
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  //   created : Chờ xử lý
  created: {
    backgroundColor: '#0288D1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  // processing : Đang xử lý
  processing: {
    backgroundColor: '#0288D1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  // shipping : Đang vận chuyển
  shipping: {
    backgroundColor: '#7853BC',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  // approved|received : Đã hoàn thành
  approvedAndReceived: {
    backgroundColor: '#009C10',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },

  // cancelled : Đã hủy
  cancelled: {
    backgroundColor: '#D51E03',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  // return : Hoàn đơn
  return: {
    backgroundColor: '#F17400',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  // refunded : Đã hoàn tiền
  refunded: {
    backgroundColor: '#FFB300',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#FFFFFF',
  },

  stylesShop: {
    backgroundColor: '#F6DBFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#9500C9',
  },
  stylesCar: {
    backgroundColor: '#EAFFEC',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#009C10',
  },

  textBotton: {
    color: '#323232',
    fontSize: 12,
    marginTop: 8,
  },
  image: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 80,
    marginHorizontal: 6,
    padding: 6,
    marginTop: 40,
  },
  main: {
    //  backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',

    width: '100%',
  },
  textDetail: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#0288D1',
  },
});
