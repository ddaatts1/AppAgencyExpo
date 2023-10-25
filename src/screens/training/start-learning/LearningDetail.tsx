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
import ItemLesson from '../components/itemLesson';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import useStartLearning from './useStartLearning';
import LoadingReact from '../../../components/commons/loading';
import {
  EnumNavigatorTraining,
  EnumStatusTraining,
} from '../../../constants/enum';
import ModalPoup from '../../../components/commons/modalPoup';

const LearningDetail = ({ navigation, route }: any) => {
  const { dataLessons, Lessons, isLoadingLessons, Mark, title, id, setId } =
    useStartLearning();
  const listData = route?.params?.data;

  const [listIndex, setListIndex] = useState([]) as any;
  const [isModel, setIsModel] = useState(false);
  const [isModelQuestion, setIsModelQuestion] = useState(false);
  const [idQuestion, setIdQuestion] = useState() as any;
  const [timeQuestion, setTimeQuestion] = useState() as any;

  useEffect(() => {

    !id && setId(route?.params?.id);
    setListIndex([]);
    listData?.sections.map((item: any) => {
      item?.lessons.map((indexs: any) => {
        setListIndex((oldArray: any) => [...oldArray, indexs]);
      });
    });

    const fetchData = async () => {
      try {
        Lessons(Number(id));
      } catch (error) { }
    };
    fetchData();
  }, [id]);
  const Next = () => {
    listIndex.map((item: any, index: any) => {
      let data = listIndex[index + 1];
      if (item?.id === id) {
        let datalesson = {
          lesson_id: id,
          score: 10,
          progress: 100,
          duration: 2,
        };
        Mark(datalesson);
        if (data?.type == EnumStatusTraining.Video) {
          setId(data.id);
          //Lessons(Number(data.id));
          //   id = ;
          //   navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
          //     indexRoute: EnumNavigatorTraining.LearningDetail,
          //     data: listData,
          //     id: data.id,
          //   });
        }
        if (data?.type == EnumStatusTraining.Question) {
          navigation.navigate(ROUTES.QUESTION_NAVIGATOR, {
            indexRoute: EnumNavigatorTraining.Question,
            id: data?.id,
          });
        }
        if (data?.type == EnumStatusTraining.Rights) {
          if (data?.check_exam == 1) {
            setIdQuestion(data?.id);
            setTimeQuestion(data?.time_limit);
            setIsModelQuestion(true);
          } else {
            setIsModel(true);
          }
        }
      }
    });
  };
  const Back = () => {
    listIndex.map((item: any, index: any) => {
      let data = listIndex[index - 1];
      if (item?.id === id) {
        let datalesson = {
          lesson_id: id,
          score: 10,
          progress: 100,
          duration: 2,
        };
        data && Mark(datalesson);
        console.log('data--------------------', data);
        if (data?.type == EnumStatusTraining.Video) {
          console.log('data?.type', data?.type);
          setId(data.id);
          //   navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
          //     indexRoute: EnumNavigatorTraining.LearningDetail,
          //     data: listData,
          //     id: data.id,
          //   });
        }
        if (data?.type == EnumStatusTraining.Question) {
          navigation.navigate(ROUTES.QUESTION_NAVIGATOR, {
            indexRoute: EnumNavigatorTraining.Question,
            id: data?.id,
          });
        }
        if (data?.type == EnumStatusTraining.Rights) {
          if (data?.check_exam == 1) {
            setIdQuestion(data?.id);
            setTimeQuestion(data?.time_limit);
            setIsModelQuestion(true);
          } else {
            setIsModel(true);
          }
        }
      }
    });
  };

  // const customHTML = `<h1>Mô tả bài học: Thủ tướng Trung Quốc Lý Cường bắt tay Thủ tướng Phạm Minh Chính tại lễ đón chính thức ở Đại lễ đường Nhân dân Bắc Kinh</h1>\r\n<p>&nbsp;</p>\r\n<p><iframe title=\"YouTube video player\" src=\"https://www.youtube.com/embed/5RfPi3KvfB8\" width=\"100%\" height=\"450
  // \" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe></p>`;
  return (
    <>
      {isLoadingLessons ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={[styles.container, { marginTop: 24 }]}>
              <WebView
                javaScriptEnabled={true}
                scrollEnabled={false}
                // allowsFullscreenVideo={true}
                allowsInlineMediaPlayback={true}
                scalesPageToFit={true}
                style={{ width: '100%', height: 250, fontSize: 30 }}
                source={{ html: dataLessons?.content }}
              />

              {/* <View style={{ position: "relative", justifyContent: "center", alignItems: "center", marginTop: 24, paddingHorizontal: 12 }}>
                        <TouchableOpacity style={{
                            justifyContent: "center",
                            position: 'absolute',
                            zIndex: 1,
                            alignItems: "center"

                        }} onPress={() => navigation.goBack()}>
                            <View>
                                <SVG.Icon_play />
                            </View>
                        </TouchableOpacity>

                        <Image style={styles.headerBox} source={require('../../../assets/image/BannerHome.png')} />
                    </View> */}
            </View>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#E3F2FD',
                    alignItems: 'center',
                    marginHorizontal: 12,
                    borderRadius: 12,
                    padding: 6,
                  }}
                  onPress={() => Back()}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SVG.Icon_next_left />
                    <Text style={{ color: '#0288D1', fontSize: 14 }}>
                      Bài trước
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#0288D1',
                    alignItems: 'center',
                    marginHorizontal: 12,
                    borderRadius: 12,
                    padding: 6,
                  }}
                  onPress={() => Next()}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                      Bài tiếp
                    </Text>
                    <SVG.Icon_next_right />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 12 }}>
                <Text
                  style={{ color: '#0288D1', fontSize: 18, fontWeight: 'bold' }}>
                  {title}
                </Text>
                <Text style={{ color: '#181818', fontSize: 16, paddingTop: 12 }}>
                  {dataLessons?.title}
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: '#C2C2C2',
                borderBottomWidth: 2,
                paddingTop: 12,
              }}></View>
            <View style={styles.container}>
              <Text
                style={{
                  color: '#0288D1',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingHorizontal: 12,
                }}>
                Danh sách khóa học
              </Text>

              {listData?.sections &&
                listData?.sections.map((data: any, index: any) => {
                  return (
                    <ItemLesson
                      navigation={navigation}
                      dataItem={data}
                      key={index}
                      type={true}
                      setId={setId}
                    />
                  );
                })}
            </View>
          </View>
          <ModalPoup visible={isModel}>
            <View style={{ alignItems: 'center' }}>
              <SVG.Icon_warning_red height={90} width={90} />
            </View>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 16,
                textAlign: 'center',
                color: '#191818',
                fontWeight: 'bold',
              }}>
              Bạn chưa đủ điều kiện để làm bài kiểm tra!
            </Text>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 16,
                textAlign: 'center',
                color: '#191818',
              }}>
              Hãy tiếp tục học và làm bài tập để làm bài kiểm tra nhé!
            </Text>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setIsModel(false)}
                style={{
                  backgroundColor: '#0288D1',
                  padding: 12,
                  marginHorizontal: 12,
                  width: '50%',
                  borderRadius: 12,
                  marginBottom: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{ fontSize: 16, alignSelf: 'center', color: '#FFFFFF' }}>
                  Tôi đã hiểu
                </Text>
              </TouchableOpacity>
            </View>
          </ModalPoup>

          <ModalPoup visible={isModelQuestion}>
            <View style={{ alignItems: 'center' }}>
              <SVG.Icon_warning_red height={90} width={90} />
            </View>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 16,
                textAlign: 'center',
                color: '#191818',
                fontWeight: 'bold',
              }}>
              Bắt đầu tính thời gian làm bài!
            </Text>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 16,
                textAlign: 'center',
                color: '#191818',
              }}>
              Bạn sẽ có {timeQuestion} phút để hoàn thành bài Đánh giá của mình
            </Text>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 16,
                textAlign: 'center',
                color: '#191818',
              }}>
              Nhấn Nộp bài khi hoàn thành hoặc hệ thống sẽ tự động nộp bài của
              bạn khi hết giờ!
            </Text>
            <View
              style={{
                bottom: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsModelQuestion(false);
                }}
                style={{
                  backgroundColor: '#E3F2FD',
                  padding: 12,
                  marginHorizontal: 12,
                  width: '40%',
                  borderRadius: 12,
                }}>
                <Text
                  style={{ fontSize: 16, alignSelf: 'center', color: '#0288D1' }}>
                  Trở lại
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log("--------------timeQuestion", timeQuestion)
                  navigation.navigate(ROUTES.QUESTION_NAVIGATOR, {
                    indexRoute: EnumNavigatorTraining.Question,
                    id: id,
                    times: timeQuestion,
                  });


                }}
                style={{
                  backgroundColor: '#0288D1',
                  padding: 12,
                  marginHorizontal: 12,
                  width: '40%',
                  borderRadius: 12,
                }}>
                <Text
                  style={{ fontSize: 16, alignSelf: 'center', color: '#FFFFFF' }}>
                  Làm bài
                </Text>
              </TouchableOpacity>
            </View>
          </ModalPoup>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default LearningDetail;
const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    height: 190,
    position: 'relative',
    resizeMode: 'stretch',
    // marginTop: -100
  },
  main: {
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 12,
  },
});
