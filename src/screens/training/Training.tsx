import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, ROUTES, SVG } from '../../constants';
import ItemChage from '../../components/card-warehouse/itemChage';
import ScheduleListHome from '../module/Schedules/ScheduleListHome';
import Course from './components/course';
import PercentageBar from '../../components/personal/percentageBar';
import { EnumNavigatorTraining } from '../../constants/enum';

const Training = ({ navigation }: any) => {
  return (


    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>

          <Text style={{ color: '#0288D1', fontSize: 18, paddingVertical: 12, fontWeight: 'bold', }}>Tài liệu đào tạo</Text>

          <ItemChage color={"#0288D1"} >
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", padding: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <SVG.Iocn_product_documentation />
                <Text style={{ fontSize: 14, color: "#323232", fontWeight: "bold", paddingHorizontal: 12 }}>Tài liệu về sản phẩm</Text>
              </View>

              <TouchableOpacity style={{ paddingHorizontal: 12, backgroundColor: "#0288D1", borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>

                <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "bold", paddingRight: 12 }}>Tải về</Text><SVG.Icon_white_download />

              </TouchableOpacity>
            </View>

          </ItemChage>
          <ItemChage color={"#0288D1"} >
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", padding: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <SVG.Icon_business_documents />
                <Text style={{ fontSize: 14, color: "#323232", fontWeight: "bold", paddingHorizontal: 12 }}>Tài liệu Kinh Doanh</Text>
              </View>

              <TouchableOpacity style={{ paddingHorizontal: 12, backgroundColor: "#0288D1", borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>

                <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "bold", paddingRight: 12 }}>Tải về</Text><SVG.Icon_white_download />

              </TouchableOpacity>
            </View>

          </ItemChage>

          <TouchableOpacity style={{ borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>

            <Text style={{ fontSize: 18, color: "#0288D1", fontWeight: "bold", paddingRight: 20 }}>Lịch đào tạo</Text>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 14, color: "#0288D1", fontWeight: "bold", paddingRight: 10 }}>Xem tất cả</Text>
              <SVG.Icon_next_blue height={25} width={25} />
            </View>


          </TouchableOpacity>
          <ScheduleListHome />
          <TouchableOpacity style={{ borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }} onPress={() => navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
            indexRoute: EnumNavigatorTraining.TrainingDetail,
            name: "Khóa học của bạn"
          })}>

            <Text style={{ fontSize: 18, color: "#0288D1", fontWeight: "bold", paddingRight: 20 }}>Khóa học của bạn</Text>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 14, color: "#0288D1", fontWeight: "bold", paddingRight: 10 }}>Xem tất cả</Text>
              <SVG.Icon_next_blue height={25} width={25} />
            </View>


          </TouchableOpacity>
          <Course navigation={navigation} name={"Khóa học của bạn"} />
          <TouchableOpacity style={{ borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }} onPress={() => navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
            indexRoute: EnumNavigatorTraining.FutureAcademy,
            name: "FutureAcademy",
          })}>

            <Text style={{ fontSize: 18, color: "#0288D1", fontWeight: "bold", paddingRight: 20 }}>FutureAcademy</Text>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 14, color: "#0288D1", fontWeight: "bold", paddingRight: 10 }}>Xem tất cả</Text>
              <SVG.Icon_next_blue height={25} width={25} />
            </View>
          </TouchableOpacity>
          <Course navigation={navigation} name={"FutureAcademy"} />
        </View>

      </View>

    </ScrollView>
    // <View style={styles.view}>
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate(ROUTES.TRAINING_SCHEDULE)}
    //     // name={ROUTES.SETTINGS_NAVIGATOR}
    //     //component={CustomerNavigator}
    //     style={styles.button}
    //     activeOpacity={0.8}>
    //     <Text style={styles.buttonText}>Lịch đào tạo</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate(ROUTES.TRAINING_FUTURE_ACADEMY)}
    //     // name={ROUTES.SETTINGS_NAVIGATOR}
    //     //component={CustomerNavigator}
    //     style={styles.button}
    //     activeOpacity={0.8}>
    //     <Text style={styles.buttonText}>Future Academy</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

export default Training;
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    height: "100%"
  },
  container: {

    paddingHorizontal: 12,
  },

});