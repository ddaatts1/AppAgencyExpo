

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Animated,
    Modal,
    Button,
    FlatList,
    TextInput,
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { COLORS, ROUTES, SVG } from '../../constants';
import CustomInput from '../../components/commons/customInput';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { EnumIconCustom } from '../../constants/enum';
import { Switch } from 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import ModalPoup from '../../components/commons/modalPoup';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';


const Regulations = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()
    const [visible, setVisible] = React.useState(false);
    const { width } = useWindowDimensions();


    return (

        <ScrollView style={styles.main}>
            <RenderHTML
                contentWidth={width}
                source={source}
            />
        </ScrollView>
    );
};

export default Regulations;
const source = {
    html: `
  <p style='text-align:center;'>
  Chính sách bảo mật thông tin

1. Chúng tôi thu thập những thông tin gì?

Futurelang sẽ thu thập thông tin như tên, địa chỉ email và ảnh đại diện (avatar) của khách hàng để thiết lập hồ sơ cá nhân. Những thông tin này sẽ được lưu trữ trên hệ thống máy chủ của futurelang. Khi đã là học viên, khách hàng sẽ được thêm vào danh sách nhận tin tức, đề xuất đặc biệt hoặc ưu đãi không thường xuyên từ futurelang

Bạn có thể tự chỉnh sửa được tên trong trang quản lý tài khoản. Nếu cần đổi email đăng nhập hoặc số điện thoại, bạn cần gửi yêu cầu cho chúng tôi và trải qua các bước xác thực.2.Chúng tôi sẽ làm gì với thông tin của bạn?

Khi yêu cầu khai báo thông tin cá nhân, futurelang mong muốn cung cấp những dịch vụ thiết thực nhất tới khách hàng Futurelang tôn trọng sự riêng tư và sẽ không bán, cho thuê hay trao đổi tên cũng như thông tin cá nhân của khách hàng với các tổ chức khác ngoài những tổ chức được liệt kê trong điều khoản này.

Các thông tin thu thập thông qua website sẽ giúp cho futurelang:Tư vấn cho khách hàng qua điện thoại.Giải đáp thắc mắc khách hàngCung cấp cho khách hàng thông tin mới nhất về futurelang

Thực hiện các bản khảo sát khách hàngThực hiện các hoạt động quảng bá liên quan đến các khóa học.Bảo mật thông tin cá nhân của khách hàng là ưu tiên của chúng tôi. Chúng tôi luôn bắt kịp những tiêu chuẩn công nghiệp về bảo vệ thông tin cá nhân mà khách hàng cung cấp, kể cả trong thời gian gửi đi và khi chúng tôi nhận thông tin.
  </p>`
};

const styles = StyleSheet.create({
    main: {
        paddingTop: 40,

    }
});



