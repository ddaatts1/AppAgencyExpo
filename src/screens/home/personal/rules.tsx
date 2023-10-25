import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Rules = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 12,
          }}>
          Chính sách bảo mật thông tin
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          1. Chúng tôi thu thập những thông tin gì?
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          Futurelang sẽ thu thập thông tin như tên, địa chỉ email và ảnh đại
          diện (avatar) của khách hàng để thiết lập hồ sơ cá nhân. Những thông
          tin này sẽ được lưu trữ trên hệ thống máy chủ của futurelang. Khi đã
          là học viên, khách hàng sẽ được thêm vào danh sách nhận tin tức, đề
          xuất đặc biệt hoặc ưu đãi không thường xuyên từ futurelang
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          Bạn có thể tự chỉnh sửa được tên trong trang quản lý tài khoản. Nếu
          cần đổi email đăng nhập hoặc số điện thoại, bạn cần gửi yêu cầu cho
          chúng tôi và trải qua các bước xác thực.2.Chúng tôi sẽ làm gì với
          thông tin của bạn?
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          Khi yêu cầu khai báo thông tin cá nhân, futurelang mong muốn cung cấp
          những dịch vụ thiết thực nhất tới khách hàng Futurelang tôn trọng sự
          riêng tư và sẽ không bán, cho thuê hay trao đổi tên cũng như thông tin
          cá nhân của khách hàng với các tổ chức khác ngoài những tổ chức được
          liệt kê trong điều khoản này.
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          Các thông tin thu thập thông qua website sẽ giúp cho futurelang:Tư vấn
          cho khách hàng qua điện thoại.Giải đáp thắc mắc khách hàngCung cấp cho
          khách hàng thông tin mới nhất về futurelang
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,

            marginTop: 12,
          }}>
          Thực hiện các bản khảo sát khách hàngThực hiện các hoạt động quảng bá
          liên quan đến các khóa học.Bảo mật thông tin cá nhân của khách hàng là
          ưu tiên của chúng tôi. Chúng tôi luôn bắt kịp những tiêu chuẩn công
          nghiệp về bảo vệ thông tin cá nhân mà khách hàng cung cấp, kể cả trong
          thời gian gửi đi và khi chúng tôi nhận thông tin.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Rules;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  container: {
    width: '100%',

    marginHorizontal: 12,
  },
});
