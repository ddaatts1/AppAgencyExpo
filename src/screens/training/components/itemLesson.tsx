import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ROUTES, SVG } from '../../../constants';
import ItemChage from '../../../components/card-warehouse/itemChage';
import {
  EnumNavigatorTraining,
  EnumStatusTraining,
} from '../../../constants/enum';
import ModalPoup from '../../../components/commons/modalPoup';

const ItemLesson = ({ navigation, dataItem, key, type, setId }: any) => {
  const [ischeckdown, setIscheckdown] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [isModelQuestion, setIsModelQuestion] = useState(false);
  const [idQuestion, setIdQuestion] = useState() as any;
  const [timeQuestion, setTimeQuestion] = useState() as any;

  const onPressNext = (data: any) => {
    if (type) {
      console.log(data?.id);
      if (data?.type == EnumStatusTraining.Video) {
        setId(data?.id);
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
  };

  const itemLeve = (data: any) => {
    return data?.map((item: any, index: any) => {
      return (
        <TouchableOpacity onPress={() => onPressNext(item)} key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderLeftColor: '#0288D1',
              borderLeftWidth: 3,
              paddingVertical: 8,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={
                  item?.lesson_progress == 100
                    ? styles.percentFull
                    : styles.percent
                }>
                {item?.lesson_progress}%{' '}
              </Text>

              <Text style={{ color: '#000000', fontSize: 16 }}> {item.name}</Text>
            </View>
            <Text style={styles.styleText}>
              {item?.lesson_score}/{item?.lesson_total_score}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: '#C2C2C2',
              borderBottomWidth: 1,
              marginLeft: 24,
              marginTop: -1,
            }}></View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      <ItemChage color={'#0288D1'} key={key}>
        <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                ischeckdown ? setIscheckdown(false) : setIscheckdown(true);
              }}>
              {ischeckdown ? <SVG.Icon_down_small /> : <SVG.Icon_left_small />}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                color: '#181818',
                fontWeight: 'bold',
                paddingHorizontal: 12,
              }}>
              {dataItem?.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 12,
            }}>
            <Text style={{ color: '#000000', fontSize: 16 }}>
              Tiến trình: {dataItem?.section_progress}%
            </Text>
            <Text style={{ color: '#000000', fontSize: 16 }}>
              Tổng điểm: {dataItem?.section_score}/10
            </Text>
          </View>
        </View>
      </ItemChage>
      <View style={{ paddingHorizontal: 16 }}>
        {ischeckdown && itemLeve(dataItem?.lessons)}
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
            <Text style={{ fontSize: 16, alignSelf: 'center', color: '#FFFFFF' }}>
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
          Nhấn Nộp bài khi hoàn thành hoặc hệ thống sẽ tự động nộp bài của bạn
          khi hết giờ!
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
            <Text style={{ fontSize: 16, alignSelf: 'center', color: '#0288D1' }}>
              Trở lại
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.QUESTION_NAVIGATOR, {
                indexRoute: EnumNavigatorTraining.Question,
                id: idQuestion,
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
            <Text style={{ fontSize: 16, alignSelf: 'center', color: '#FFFFFF' }}>
              Làm bài
            </Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>
    </>
  );
};

const styles = StyleSheet.create({
  styleText: {
    fontSize: 16,
    color: '#0288D1',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  percent: {
    height: 25,
    width: 25,
    fontSize: 8,
    color: '#0288D1',
    backgroundColor: '#E3F2FD',
    textAlign: 'center',
    borderRadius: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginLeft: -14,
  },
  percentFull: {
    height: 25,
    width: 25,
    fontSize: 8,
    color: '#FFFFFF',
    backgroundColor: '#0288D1',
    textAlign: 'center',
    borderRadius: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginLeft: -14,
  },
});

export default ItemLesson;
