import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SVG } from '../../../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import routes from '../../../constants/routes';
import ModalPoup from '../../../components/commons/modalPoup';

const Rule = () => {
    const [show, setShow] = useState(true);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.box}>
                    <View style={styles.document}>
                        <SVG.Rule/>
                        <Text style={styles.title}>Quy định công ty</Text>
                    </View>
                    <View style={{width: '93%'}}>
                        <Text style={styles.content}>
                            Kính gửi: Quý Đối tác - Đại sứ - Khách hàng,

                            Bước sang năm mới 2023, toàn thể đội ngũ Ban lãnh đạo và nhân viên Công ty CP Tập Đoàn Công Nghệ Giáo Dục FutureLang xin trân trọng gửi tới Quý vị cùng gia đình một: “Năm mới tràn ngập Sức Khỏe - Hạnh Phúc - Thành Công”!

                            Xin chân thành cảm ơn Quý vị đã luôn tin tưởng, lựa chọn FutureLang là đối tác, cũng như người đồng hành tin cậy trong suốt thời gian qua.

                            Với xu thế hội nhập, tiếng Anh đã trở thành một hành trang thiết yếu của công dân toàn cầu. Nhằm mang lại hiệu quả đào tạo và học tập tiếng Anh cao nhất cho giáo viên và học sinh, FutureLang không ngừng nỗ lực phát triển những chương trình đào tạo hỗ trợ tối đa cho các nhà trường, trung tâm ngoại ngữ, và tổ chức giáo dục. Bên cạnh đó FutureLang mở ra cho chúng ta cơ hội để hợp tác kinh doanh tăng thu nhập và lan tỏa giá trị tới cộng đồng.

                            Sự tin tưởng và yêu mến của  Quý Đối tác - Đại sứ - Khách hàng chính là niềm tự hào và thành công lớn nhất của FutureLang. Chúng tôi xin cam kết sẽ không ngừng nỗ lực nâng cấp và đa dạng hóa sản phẩm để tạo ra những chương trình đào tạo chất lượng nhất. Chúng tôi luôn lắng nghe và mong muốn có được sự góp ý của Quý Đối tác - Đại sứ - Khách hàng để sản phẩm, dịch vụ của Công ty ngày hoàn thiện nhất.

                            Chúng tôi rất mong sẽ tiếp tục nhận được sự tin tưởng đồng hành cũng như ủng hộ của  Quý Đối tác - Đại sứ - Khách hàng trong năm mới Quý Mão và trong những năm tới.  Chúng tôi rất vinh dự và tự hào được chung tay với tất cả Quý vị trong nỗ lực cùng nhau thực hiện sứ mệnh “Giúp 50 triệu người giao tiếp thành thạo tiếng Anh”.

                        </Text>
                        <TouchableOpacity
                            style={styles.confirm}
                            onPress={() => navigation.navigate(routes.HOME)}>
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                    <ModalPoup visible={show}>
                        <View style={{width: '100%', marginBottom: 18, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{width: '60%', marginBottom: 63}}>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontStyle: 'normal', fontWeight: '400', color: '#323232' }}>Vui lòng đọc hết và
                                        kéo xuống dưới để  xác nhận!
                                </Text>
                            </View>
                            <View style={styles.confirmBtn}>
                                <TouchableOpacity
                                    onPress={() =>setShow(false)}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: '500', fontStyle: 'normal' }}>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalPoup>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        marginLeft: 16,
    },
    document: {
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 16,
        color: '#0288D1',
        marginLeft: 10,
    },
    content: {
        fontSize: 14,
        fontWeight: '400',
        margin: 10,
    },
    confirm: {
        width: '90%',
        backgroundColor: '#2196F3',
        borderRadius: 12,
        marginLeft: 20,
        marginTop: 150,
        marginBottom: 30,
        padding: 10,
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    loginBtn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        width: '50%',
        borderRadius: 12,
    },
    confirmBtn: {
        width: '60%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0288D1',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 32,
        paddingLeft: 32,
        borderRadius: 12,
    },
});

export default Rule;
