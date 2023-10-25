import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Button,
  TextInput,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Appbar } from 'react-native-paper';
import _, { values } from 'lodash';
import {
  EnumNavigatorTraining,
  EnumQuestionStatus,
  EnumQuestionStatusResult,
} from '../../../constants/enum';
import useTraining from '../useTraining';
import { ROUTES, SVG } from '../../../constants';
import { useCountdown } from './useCountdown';
import ModalPoup from '../../../components/commons/modalPoup';
import { Image } from 'react-native';
import ItemChage from '../../../components/card-warehouse/itemChage';
import LoadingReact from '../../../components/commons/loading';
import useQuestion from './useQuestion';
import { RadioButton } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
const Question = ({ navigation, route }: any) => {
  const {
    dataLessons,
    Lessons,
    isLoadingLessons,
    dataLessonsClone,
    itemData,
    setItemData,
    isTimer,
    Mark,
  } = useQuestion();

  const id = route?.params?.id;
  const times = route?.params?.times;
  const [textIndex, setTextIndex] = useState(null) as any;
  const [isModel, setIsModel] = useState(false);
  const [isid, setIsId] = useState(false);
  const [indexData, setIndexData] = useState(1);

  // const [minutes, seconds] = useCountdown(10);
  const [minutes, seconds] = useCountdown(Number(times) * 60);
  const [toal, setTotal] = useState(0);
  const [toalCorrect, setTotalCorrect] = useState(0);
  const [isResult, setisResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ischeckResult, setIscheckResult] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      console.log()
      try {
        Lessons(Number(id));
      } catch (error) { }
    };
    fetchData();
  }, [id, isid]);
  const Submit = () => {
    let textIndex = '';
    dataLessonsClone.map((data: any, index: any) => {
      if (data?.type == 1) {
        if (data?.checkResult == null) {
          const PresentIdex = dataLessonsClone[index];
          const dataPresentIdex = {
            ...PresentIdex,
            index: EnumQuestionStatusResult.NoAnswer,
          };
          dataLessonsClone[index] = dataPresentIdex;

          textIndex = textIndex + (index + 1) + ',';
        } else {
          if (
            data?.checkResult?.trim().toLowerCase() ==
            data?.title?.trim().toLowerCase()
          ) {
            const PresentIdex = dataLessonsClone[index];
            const dataPresentIdex = {
              ...PresentIdex,
              index: EnumQuestionStatusResult.Correct,
            };
            dataLessonsClone[index] = dataPresentIdex;
          } else {
            const PresentIdex = dataLessonsClone[index];
            const dataPresentIdex = {
              ...PresentIdex,
              index: EnumQuestionStatusResult.Wrong,
            };
            dataLessonsClone[index] = dataPresentIdex;
          }
        }
      } else {
        if (data?.checkResult == null) {
          const PresentIdex = dataLessonsClone[index];
          const dataPresentIdex = {
            ...PresentIdex,
            index: EnumQuestionStatusResult.NoAnswer,
          };
          dataLessonsClone[index] = dataPresentIdex;

          textIndex = textIndex + (index + 1) + ',';
        } else {
          if (data?.checkResult == data?.result) {
            const PresentIdex = dataLessonsClone[index];
            const dataPresentIdex = {
              ...PresentIdex,
              index: EnumQuestionStatusResult.Correct,
            };
            dataLessonsClone[index] = dataPresentIdex;
          } else {
            const PresentIdex = dataLessonsClone[index];
            const dataPresentIdex = {
              ...PresentIdex,
              index: EnumQuestionStatusResult.Wrong,
            };
            dataLessonsClone[index] = dataPresentIdex;
          }
        }
      }
    });
    // setItemData({ ...item, index: 1, checkResult: null, result: null, explainResult: "", correctResult: "", wrongResult: "" })
    let length = dataLessonsClone.filter(
      (item: any) =>
        item.checkResult != null && item.checkResult === item.result,
    );

    let sum = length?.reduce(function (prev: any, current: any) {
      return prev + +current?.question_score;
    }, 0);
    setTotal(dataLessonsClone?.length);
    setTotalCorrect(length.length);
    let datalesson = {
      lesson_id: id,
      score: sum,
      progress: (sum / 10) * 100,
      duration: 2,
    };
    Mark(datalesson);
    setTextIndex(textIndex);
    setIsModel(true);
  };

  const NextQuestion = (index: any) => {
    if (ischeckResult) {
      if (dataLessonsClone.length > indexData) {
        const FutureIndex = dataLessonsClone[indexData - 1];
        const dataFutureIndex = {
          ...FutureIndex,
          index: SetIndexBack(FutureIndex?.index),
        };
        dataLessonsClone[indexData - 1] = dataFutureIndex;
        const PresentIndex = dataLessonsClone[indexData];
        const datafake = {
          ...PresentIndex,
          index: SetIndexNext(PresentIndex?.index),
        };
        setItemData(datafake);
        dataLessonsClone[indexData] = datafake;
        setIndexData(index + indexData);
      }
    } else {
      if (dataLessonsClone.length > indexData) {
        const FutureIndex = dataLessonsClone[indexData - 1];
        const dataFutureIndex = {
          ...FutureIndex,
          index: EnumQuestionStatus.FutureIndex,
        };
        dataLessonsClone[indexData - 1] = dataFutureIndex;
        const PresentIndex = dataLessonsClone[indexData];
        const datafake = {
          ...PresentIndex,
          index: EnumQuestionStatus.PresentIndex,
        };
        setItemData(datafake);
        dataLessonsClone[indexData] = datafake;
        setIndexData(index + indexData);
      }
    }
  };
  const BackQuestion = (index: any) => {
    if (ischeckResult) {
      const indexItem = indexData - index;
      if (indexItem > 0) {
        const PastIndex = dataLessonsClone[indexItem];
        const dataPastIndex = {
          ...PastIndex,
          index: SetIndexBack(PastIndex?.index),
        };
        dataLessonsClone[indexItem] = dataPastIndex;

        const PresentIndex = dataLessonsClone[indexItem - 1];
        const datafakePresentIndex = {
          ...PresentIndex,
          index: SetIndexNext(PresentIndex?.index),
        };
        setItemData(datafakePresentIndex);
        dataLessonsClone[indexItem - 1] = datafakePresentIndex;

        setIndexData(indexData - index);
      }
    } else {
      const indexItem = indexData - index;
      if (indexItem > 0) {
        const PastIndex = dataLessonsClone[indexItem];
        const dataPastIndex = {
          ...PastIndex,
          index: EnumQuestionStatus.PastIndex,
        };
        dataLessonsClone[indexItem] = dataPastIndex;

        const PresentIndex = dataLessonsClone[indexItem - 1];
        const datafakePresentIndex = {
          ...PresentIndex,
          index: EnumQuestionStatus.PresentIndex,
        };
        setItemData(datafakePresentIndex);
        dataLessonsClone[indexItem - 1] = datafakePresentIndex;

        setIndexData(indexData - index);
      }
    }
  };
  // PastIndex,//tương lai
  // PresentIndex,//hiện tại
  // FutureIndex,//quá khứ
  const StyleColor = (state: any) => {
    switch (state) {
      case EnumQuestionStatus.FutureIndex:
        return styles.FutureIndex;
      case EnumQuestionStatus.PastIndex:
        return styles.PastIndex;
      case EnumQuestionStatus.PresentIndex:
        return styles.PresentIndex;
      default:
        return null;
    }
  };
  const SetIndexNext = (index: any) => {
    switch (index) {
      case EnumQuestionStatusResult.NoAnswer:
        return EnumQuestionStatusResult.NoAnswerFocus;
      case EnumQuestionStatusResult.Correct:
        return EnumQuestionStatusResult.CorrectFocus;
      case EnumQuestionStatusResult.Wrong:
        return EnumQuestionStatusResult.WrongFocus;
      default:
        return null;
    }
  };
  const SetIndexBack = (index: any) => {
    switch (index) {
      case EnumQuestionStatusResult.NoAnswerFocus:
        return EnumQuestionStatusResult.NoAnswer;
      case EnumQuestionStatusResult.CorrectFocus:
        return EnumQuestionStatusResult.Correct;
      case EnumQuestionStatusResult.WrongFocus:
        return EnumQuestionStatusResult.Wrong;
      default:
        return null;
    }
  };
  const StyleColorResult = (state: any) => {
    switch (state) {
      case EnumQuestionStatusResult.NoAnswer:
        return styles.NoAnswer;
      case EnumQuestionStatusResult.Correct:
        return styles.Correct;
      case EnumQuestionStatusResult.CorrectFocus:
        return styles.CorrectFocus;
      case EnumQuestionStatusResult.NoAnswerFocus:
        return styles.NoAnswerFocus;
      case EnumQuestionStatusResult.Wrong:
        return styles.Wrong;
      case EnumQuestionStatusResult.WrongFocus:
        return styles.WrongFocus;
      default:
        return null;
    }
  };
  const ItemResult = (checkResult: any, result: any, dataItem: any) => {
    switch (checkResult) {
      case null:
        return EnumQuestionStatusResult.NoAnswer;

      case result:
        return result === dataItem?.id
          ? EnumQuestionStatusResult.Correct
          : EnumQuestionStatusResult.NoAnswer;

      default:
        return checkResult === dataItem?.id
          ? EnumQuestionStatusResult.Wrong
          : EnumQuestionStatusResult.NoAnswer;
    }
  };

  const itemQuestion = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#C4C4C4',
          borderTopColor: '#C4C4C4',
          paddingVertical: 12,
        }}>
        {dataLessonsClone?.map((data: any, i: any) => {
          return (
            <TouchableOpacity
              key={i + 's'}
              onPress={() => { }}
              style={{
                marginHorizontal: 4,
                borderRadius: 20,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={
                  ischeckResult
                    ? StyleColorResult(data.index)
                    : StyleColor(data.index)
                }>
                {i + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  let dimensions = Dimensions.get('window');

  let imageWidth = dimensions.width;
  let imageHeght = dimensions.height;

  return (
    <>
      {isLoadingLessons ? (
        <View style={{ backgroundColor: 'white' }}>
          <Appbar.Header
            style={{
              backgroundColor: 'white',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderBottomColor: '#F3F3F3',
              borderBottomWidth: 2,
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 20,
                  paddingLeft: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <SVG.Leftcircleo style={styles.iconLef} />
                </TouchableOpacity>
                {isTimer && (
                  <View style={{ paddingTop: 3, paddingLeft: 12 }}>
                    <SVG.Icon_time height={23} width={23} />
                  </View>
                )}
                {isTimer && (
                  <Text
                    style={{
                      color: '#323232',
                      fontSize: 20,
                    }}>
                    {!isResult ? (
                      <>
                        {minutes}:{seconds}
                      </>
                    ) : (
                      '60:00'
                    )}
                  </Text>
                )}

              </View>
            </View>
            {!isResult ? (
              ischeckResult ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    backgroundColor: '#0288D1',
                    padding: 10,
                    marginRight: 12,
                    borderRadius: 12,
                  }}>
                  <Text style={{ color: 'white' }}>Kết thúc</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => Submit()}
                  style={{
                    backgroundColor: '#0288D1',
                    padding: 10,
                    marginRight: 12,
                    borderRadius: 12,
                  }}>
                  <Text style={{ color: 'white' }}>Nộp bài</Text>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: '#0288D1',
                  padding: 10,
                  marginRight: 12,
                  borderRadius: 12,
                }}>
                <Text style={{ color: 'white' }}>Kết thúc</Text>
              </TouchableOpacity>
            )}
          </Appbar.Header>
          <ScrollView>
            <View style={[styles.main, { height: imageHeght - 65 }]}>
              <View>{itemQuestion()}</View>

              {!isResult ? (
                <>
                  <View style={styles.container}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#0288D1',
                        fontWeight: 'bold',
                        paddingTop: 12,
                        textAlignVertical: 'center',
                        textAlign: 'center',
                      }}>
                      {itemData?.title}
                    </Text>
                    <RenderHTML
                      contentWidth={100}
                      source={{
                        html: itemData?.content,
                      }}
                    />
                    {itemData?.type == 3 && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={styles.image}
                          source={require('../../../assets/image/schedule.png')}
                        />
                      </View>
                    )}
                    {itemData?.type == 1 && (
                      <>
                        <TextInput
                          style={[
                            {
                              height: 160,
                              textAlignVertical: 'top',
                              borderColor: '#C2C2C2',
                              borderWidth: 1,
                              borderRadius: 16,
                            },
                          ]}
                          onChangeText={text => {
                            const index = dataLessonsClone[indexData - 1];

                            const data = {
                              ...index,
                              checkResult: text.trim(),
                              result: index?.title,
                            };
                            dataLessonsClone[indexData - 1] = data;
                          }}
                          multiline={true}
                          numberOfLines={8}
                          keyboardType="default"
                          value={itemData?.checkResult}
                        />
                        {ischeckResult && itemData?.checkResult != null && (
                          <View
                            style={{
                              backgroundColor: '#EEFAFF',
                              padding: 12,
                              marginTop: 12,
                              borderRadius: 12,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                textDecorationLine: 'underline',
                                color: '#000',
                                fontWeight: 'bold',
                              }}>
                              Đáp án:
                            </Text>

                            <Text style={{ color: '#009C10' }}>
                              Đáp án chính xác là:{itemData?.title}
                            </Text>

                            {itemData?.checkResult != itemData.title && (
                              <Text style={{ color: 'red' }}>
                                Đáp án của bạn là:{itemData?.checkResult}
                              </Text>
                            )}

                            <Text
                              style={{
                                fontSize: 14,
                                textDecorationLine: 'underline',
                                color: '#000',
                                fontWeight: 'bold',
                              }}>
                              Giải thích đáp án:
                            </Text>
                            <RenderHTML
                              contentWidth={100}
                              source={{
                                html: itemData?.explainResult,
                              }}
                            />
                          </View>
                        )}
                      </>
                    )}
                    {itemData?.type == 2 && (
                      <View>
                        {ischeckResult ? (
                          <>
                            {itemData?.answers.map((data: any, index: any) => {
                              let itemResult = ItemResult(
                                itemData?.checkResult,
                                itemData?.result,
                                data,
                              );

                              return (
                                <View style={styles.indexQuestion} key={index}>
                                  <View style={styles.styleIcon}>
                                    {itemResult ==
                                      EnumQuestionStatusResult.Correct && (
                                        <SVG.Icon_correct />
                                      )}

                                    {itemResult ==
                                      EnumQuestionStatusResult.NoAnswer && (
                                        <SVG.Icon_no_nswer />
                                      )}

                                    {itemResult ==
                                      EnumQuestionStatusResult.Wrong && (
                                        <SVG.Icon_wrong />
                                      )}
                                  </View>

                                  {itemResult ==
                                    EnumQuestionStatusResult.Correct && (
                                      <Text style={{ color: '#009C10' }}>
                                        {' '}
                                        {data?.content}
                                      </Text>
                                    )}
                                  {itemResult ==
                                    EnumQuestionStatusResult.Wrong && (
                                      <Text style={{ color: '#D51E03' }}>
                                        {' '}
                                        {data?.content}
                                      </Text>
                                    )}
                                  {itemResult ==
                                    EnumQuestionStatusResult.NoAnswer && (
                                      <Text style={{ color: '#000' }}>
                                        {' '}
                                        {data?.content}
                                      </Text>
                                    )}
                                </View>
                              );
                            })}
                            {itemData?.checkResult != null && (
                              <View
                                style={{
                                  backgroundColor: '#EEFAFF',
                                  padding: 12,
                                  marginTop: 12,
                                  borderRadius: 12,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: '#000',
                                    fontWeight: 'bold',
                                  }}>
                                  Đáp án:
                                </Text>

                                <Text style={{ color: '#009C10' }}>
                                  Đáp án chính xác là:{itemData?.correctResult}
                                </Text>

                                {itemData?.checkResult != itemData.result && (
                                  <Text style={{ color: 'red' }}>
                                    Đáp án của bạn là:{itemData?.wrongResult}
                                  </Text>
                                )}

                                <Text
                                  style={{
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    color: '#000',
                                    fontWeight: 'bold',
                                  }}>
                                  Giải thích đáp án:
                                </Text>
                                <RenderHTML
                                  contentWidth={100}
                                  source={{
                                    html: itemData?.explainResult,
                                  }}
                                />
                              </View>
                            )}
                          </>
                        ) : (
                          <RadioButton.Group
                            onValueChange={value => {
                              const index = dataLessonsClone[indexData - 1];
                              const result = index?.answers?.find(
                                (x: any) => x.type == 1,
                              );
                              const checkResult = index?.answers?.find(
                                (x: any) => x.id == value,
                              );
                              const data = {
                                ...index,
                                checkResult: value,
                                result: result?.id,
                                explainResult: index?.explain,
                                correctResult: result?.content,
                                wrongResult: checkResult?.content,
                              };
                              dataLessonsClone[indexData - 1] = data;
                            }}
                            value={
                              dataLessonsClone[indexData - 1]?.checkResult
                            }>
                            {itemData?.answers.map((data: any, index: any) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomColor: '#EEEEEE',
                                    borderBottomWidth: 1,
                                  }}>
                                  <RadioButton
                                    value={data.id}
                                    color="#0288D1"
                                  />
                                  <Text>{data?.content}</Text>
                                </View>
                              );
                            })}
                          </RadioButton.Group>
                        )}
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      bottom: 0,
                      position: 'absolute',
                      width: imageWidth,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        BackQuestion(1);
                      }}
                      style={{
                        backgroundColor: '#E3F2FD',
                        padding: 12,
                        marginHorizontal: 12,
                        width: '40%',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          alignSelf: 'center',
                          color: '#0288D1',
                        }}>
                        Trở lại
                      </Text>
                    </TouchableOpacity>
                    {indexData == dataLessonsClone.length ? (
                      ischeckResult ? (
                        <TouchableOpacity
                          onPress={() => navigation.goBack()}
                          style={{
                            backgroundColor: '#0288D1',
                            padding: 12,
                            marginHorizontal: 12,
                            width: '40%',
                            borderRadius: 12,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              alignSelf: 'center',
                              color: '#FFFFFF',
                            }}>
                            Kết thúc
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            Submit();
                          }}
                          style={{
                            backgroundColor: '#0288D1',
                            padding: 12,
                            marginHorizontal: 12,
                            width: '40%',
                            borderRadius: 12,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              alignSelf: 'center',
                              color: '#FFFFFF',
                            }}>
                            Nộp bài
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          NextQuestion(1);
                        }}
                        style={{
                          backgroundColor: '#0288D1',
                          padding: 12,
                          marginHorizontal: 12,
                          width: '40%',
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            alignSelf: 'center',
                            color: '#FFFFFF',
                          }}>
                          Tiếp theo
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              ) : (
                <>
                  <View style={{ alignItems: 'center', paddingTop: 24 }}>
                    <SVG.Icon_verified_green height={90} width={90} />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#191818',
                      fontWeight: 'bold',
                    }}>
                    Chúc mừng bạn!
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      color: '#191818',
                    }}>
                    Đã hoàn thành bài kiểm tra của mình!
                  </Text>
                  <View style={{ margin: 12 }}>
                    <ItemChage color={'#0288D1'}>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          color: '#191818',
                          paddingTop: 12,
                        }}>
                        Bạn đã trả lời đúng {toalCorrect} trên tổng số {toal}{' '}
                        câu!
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 12,
                        }}>
                        <SVG.Icon_Ellipse height={35} width={35} />
                        <Text
                          style={{
                            fontSize: 24,
                            paddingLeft: 12,
                            color: '#000000',
                          }}>
                          {toalCorrect}/{toal}
                        </Text>
                      </View>
                    </ItemChage>
                  </View>
                  <View
                    style={{
                      bottom: 0,
                      position: 'absolute',
                      width: imageWidth,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        isid ? setIsId(false) : setIsId(true);
                        setIndexData(1);
                        setisResult(false);
                      }}
                      style={{
                        backgroundColor: '#E3F2FD',
                        padding: 12,
                        marginHorizontal: 12,
                        width: '40%',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          alignSelf: 'center',
                          color: '#0288D1',
                        }}>
                        Làm lại
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        const FutureIndex = dataLessonsClone[0];
                        const dataFutureIndex = {
                          ...FutureIndex,
                          index: SetIndexNext(FutureIndex?.index),
                        };
                        dataLessonsClone[0] = dataFutureIndex;
                        setItemData(dataFutureIndex);
                        setIscheckResult(true);
                        setIndexData(1);
                        setisResult(false);
                      }}
                      style={{
                        backgroundColor: '#0288D1',
                        padding: 12,
                        marginHorizontal: 12,
                        width: '40%',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          alignSelf: 'center',
                          color: '#FFFFFF',
                        }}>
                        Đáp án
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
            <ModalPoup visible={isModel}>
              <View style={{ alignItems: 'center' }}>
                <SVG.Icon_complain />
              </View>
              {textIndex && (
                <Text
                  style={{
                    backgroundColor: '#FCB62F',
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderRadius: 12,
                    marginVertical: 12,
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#191818',
                  }}>
                  Bạn vẫn chưa hoàn thành câu: {textIndex}
                </Text>
              )}

              <Text
                style={{
                  marginVertical: 12,
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#191818',
                }}>
                Bạn có muốn nộp bài không?
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
                    setIsModel(false);
                  }}
                  style={{
                    backgroundColor: '#E3F2FD',
                    padding: 12,
                    marginHorizontal: 12,
                    width: '40%',
                    borderRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      color: '#0288D1',
                    }}>
                    Trở lại
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsModel(false);
                    setisResult(true);
                  }}
                  style={{
                    backgroundColor: '#0288D1',
                    padding: 12,
                    marginHorizontal: 12,
                    width: '40%',
                    borderRadius: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      color: '#FFFFFF',
                    }}>
                    Nộp bài
                  </Text>
                </TouchableOpacity>
              </View>
            </ModalPoup>
          </ScrollView>
        </View>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default Question;
const styles = StyleSheet.create({
  indexQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    padding: 5,
  },
  styleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
  iconLef: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 80,
    //  marginLeft: 20
  },
  PastIndex: {
    fontSize: 18,
    backgroundColor: 'white',
    color: '#000000',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  FutureIndex: {
    fontSize: 18,
    backgroundColor: 'white',
    color: '#009C10',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  PresentIndex: {
    fontSize: 18,
    backgroundColor: '#009C10',
    color: '#FFFFFF',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  Correct: {
    fontSize: 18,
    backgroundColor: 'white',
    color: '#009C10',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //kết quả đúng
  CorrectFocus: {
    fontSize: 18,
    backgroundColor: '#009C10',
    color: '#FFFFFF',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //kết quả đúng focus
  Wrong: {
    fontSize: 18,
    backgroundColor: 'white',
    color: 'red',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //kết quả sai
  WrongFocus: {
    fontSize: 18,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //kết quả sai focus
  NoAnswer: {
    fontSize: 18,
    backgroundColor: 'white',
    color: '#000000',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //không trả lời kết quả
  NoAnswerFocus: {
    fontSize: 18,
    backgroundColor: '#000000',
    color: 'white',
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  }, //không trả lời kết quả focus

  main: {
    flex: 1,

    backgroundColor: 'white',
  },
  container: {
    bottom: 0, //Here is the trick

    paddingHorizontal: 12,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#dbdbdb',
    padding: 10,
  },
});
