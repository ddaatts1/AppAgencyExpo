import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import ItemChage from '../../../components/card-warehouse/itemChage';
import {
  EnumLearning,
  EnumNavigatorTraining,
  EnumQuestionStatus,
  EnumStatusTraining,
} from '../../../constants/enum';
import useTraining from '../useTraining';
import ModalPoup from '../../../components/commons/modalPoup';
import { set } from 'lodash';
import PercepercentageBarCourse from '../components/percentageBarCourse';
import ItemLesson from '../components/itemLesson';
import LoadingReact from '../../../components/commons/loading';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import useCommon from '../../../constants/useCommon';

const StartLearning = ({ navigation, route }: any) => {
  const {
    isLoadingCoursesDetail,
    dataCoursesDetail,
    setStartLearning,
    CoursesDetail,
  } = useTraining();
  const { width } = useWindowDimensions();
  const { participantUp } = useCommon();
  const id = route?.params?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        CoursesDetail(Number(id));
      } catch (error) { }
    };
    fetchData();
  }, [id]);
  // const source = {
  //   html: `
  //   <p><iframe src=\"//player.vimeo.com/video/555031856?title=0&amp;amp;byline=0\" width=\"425\" height=\"350\" allowfullscreen=\"allowfullscreen\"></iframe></p>`
  // };
  const [isModel, setIsModel] = useState(false);
  return (
    <>
      {isLoadingCoursesDetail ? (
        <>
          <ScrollView style={{ marginBottom: 24 }}>
            <View style={styles.main}>
              <View style={{ position: 'relative' }}>
                <TouchableOpacity
                  style={{
                    marginTop: 40,
                    marginHorizontal: 20,

                    position: 'absolute',
                    zIndex: 1,
                  }}
                  onPress={() => navigation.goBack()}>
                  <View>
                    <SVG.Leftcircleo />
                  </View>
                </TouchableOpacity>

                <Image
                  style={styles.headerBox}
                  source={{ uri: dataCoursesDetail?.image }}
                />
              </View>
              <View style={styles.containers}>
                <ItemChage color={'#0288D1'}>
                  <View style={{ padding: 12 }}>
                    <Text
                      style={{
                        color: '#0288D1',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {dataCoursesDetail?.name}
                    </Text>
                    <RenderHtml
                      contentWidth={100}
                      source={{
                        html: dataCoursesDetail?.content,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 12,
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {dataCoursesDetail?.name_teacher}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SVG.Icon_Peoples />
                      <Text style={{ fontSize: 14, color: '#181818' }}>
                        {' '}
                        {dataCoursesDetail?.studied} người học
                      </Text>
                    </View>
                  </View>
                </ItemChage>
                <ItemChage color={'#0288D1'}>
                  <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
                    <Text style={styles.styleDaiXu}>
                      {participantUp(dataCoursesDetail?.participant)}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SVG.Icon_time_black />
                      <Text style={{ fontSize: 14, color: '#181818' }}>
                        {' '}
                        Sở hữu khóa học trọn đời
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SVG.Icon_certificate />
                      <Text style={{ fontSize: 14, color: '#181818' }}>
                        {' '}
                        Cấp chứng nhận hoàn thành
                      </Text>
                    </View>

                    <View
                      style={{
                        borderBottomColor: '#C2C2C2',
                        borderBottomWidth: 2,
                        paddingTop: 12,
                      }}></View>
                    <PercepercentageBarCourse
                      numerator={dataCoursesDetail?.course_progress}
                      courseScore={dataCoursesDetail?.course_score}
                      denominator={100}
                      height={10}
                      backgroundColor={'#01579B'}
                      completedColor={'#0288D1'}
                      percentage={'65%'}
                    />
                  </View>
                </ItemChage>
                <ItemChage color={'#0288D1'}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 12,
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Giới thiệu
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Nội dung khóa học
                    </Text>
                  </View>
                </ItemChage>
                <View style={{ paddingHorizontal: 12 }}>
                  <Text
                    style={{
                      color: '#0288D1',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Mô tả chương trình:
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{
                      html: dataCoursesDetail?.content,
                    }}
                  />
                </View>
              </View>
              <View style={{ height: 24, backgroundColor: '#E3F2FD' }}></View>
              <View style={styles.container}>
                {dataCoursesDetail?.sections &&
                  dataCoursesDetail?.sections.map((data: any, index: any) => {
                    return (
                      <View key={index + 'd'}>
                        <ItemLesson
                          navigation={navigation}
                          dataItem={data}
                          key={index + 'item'}
                          type={false}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: '#FFFFFF',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#D51E03',
                borderRadius: 12,
                height: 50,
                width: '90%',
              }}
              onPress={() => {
                let status = dataCoursesDetail?.sections[0]?.lessons[0]?.type;
                console.log('status', status);
                if (status == EnumStatusTraining.Video) {
                  navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
                    indexRoute: EnumNavigatorTraining.LearningDetail,
                    data: dataCoursesDetail,
                    id: dataCoursesDetail?.sections[0]?.lessons[0]?.id,
                  });
                }
                if (status == EnumStatusTraining.Question) {
                  navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
                    indexRoute: EnumNavigatorTraining.Question,
                    data: dataCoursesDetail,
                  });
                }
                if (status == EnumStatusTraining.Rights) {
                }
              }}>
              <Text style={{ color: '#FFFFFF' }}>VÀO HỌC NGAY d</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default StartLearning;

const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    position: 'relative',
    resizeMode: 'stretch',
    height: 250,
    // marginTop: -100
  },
  styleMade: {
    fontSize: 10,
    color: '#ffffff',
    alignSelf: 'flex-end',
    backgroundColor: '#009C10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }, //đã thực hiện
  styleDaiXu: {
    fontSize: 16,
    color: '#0288D1',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }, //đã thực hiện
  styleUnfulfilled: {
    fontSize: 10,
    color: '#525252',
    alignSelf: 'flex-end',
    backgroundColor: '#C2C2C2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }, // chưa thực hiện

  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingBottom: 28,
  },
  containers: {
    borderTopLeftRadius: 12,
    paddingHorizontal: 8,
    paddingBottom: 28,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
    marginTop: -24,
    paddingTop: 10,
  },
});
