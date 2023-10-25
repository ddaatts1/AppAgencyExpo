import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Moment from 'moment';
export default function useCommon() {
  const participantUp = (participantUp: any) => {
    // console.log("participantUp-------------", participantUp)
    if (participantUp == null || participantUp == false) {
      return "Chưa định nghĩa";
    } else {
      let data = participantUp.toLowerCase();


      switch (data) {
        case 'new':
          return 'Khách mời';
        case 'collaborator':
          return 'CTV';
        case 'agency1':
          return 'Đại sứ Lãnh đạo';
        case 'agency2':
          return 'Đại sứ Thịnh vượng';
        case 'agency3':
          return 'Đại sứ Gieo hạt';
        case 'agency4':
          return 'Đại sứ Tiên phong';
        case 'mainagency':
          return 'Tổng đại sứ';
        case 'foundercircle':
          return 'FounderCircle';
        case 'fc':
          return 'FounderCircle';
        case 'foundercircleup':
          return 'FC trở lên';
        case 'vfc':
          return 'VFC';
        case 'mainagencyup':
          return 'Tổng đại sứ trở lên';
        case 'agency1up':
          return 'Đại sứ Lãnh đạo trở lên';
        case 'agency2up':
          return 'Đại sứ Thịnh vượng trở lên';
        case 'agency3up':
          return 'Đại sứ Gieo hạt trở lên';
        case 'agency4up':
          return 'Đại sứ Tiên phong trở lên';
        case 'collaboratorup':
          return 'CTV trở lên';
        case 'newup':
          return 'Khách mời trở lên';
        case 'newandagencyup':
          return 'Khách mời và tất cả đại sứ';
        case 'newandallagency':
          return 'Khách mời và tất cả đại sứ';
        case 'all':
          return 'Tất cả';
        case 'allagency':
          return 'Tất cả đại sứ';
        default:
          return 'Chưa định nghĩa';
      }
    }

  };
  const dataTime = [
    {
      textUS: 'Monday',
      textVN: 'Thứ 2',
    },
    {
      textUS: 'Tuesday',
      textVN: 'Thứ 3',
    },
    {
      textUS: 'Wednesday',
      textVN: 'Thứ 4',
    },
    {
      textUS: 'Thursday',
      textVN: 'Thứ 5',
    },
    {
      textUS: 'Friday',
      textVN: 'Thứ 6',
    },
    {
      textUS: 'Saturday',
      textVN: 'Thứ 7',
    },
    {
      textUS: 'Sunday',
      textVN: 'Chủ nhật',
    },
  ];
  const fomatDateDDMMYY = (time: any) => {
    return Moment(time).format('DD/MM/YYYY');
  };

  //    const [day, setDataTraining] = useState() as any;
  const textVN = (textUS: string) => {
    return dataTime?.find((item: any) => item.textUS == textUS)?.textVN;
  };
  const formatD = (number: any) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 9,
    }).format(number);
  };
  const formatVND = (number: any) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 9,
    }).format(number);
  };

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
  return {
    textVN,
    formatD,
    participantUp,
    formatVND,
    fomatDateDDMMYY,
    checkStatus,
  };
}
const styles = StyleSheet.create({
  //   created : Chờ xử lý
  created: {
    backgroundColor: '#0288D1',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
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
});
