import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useTrainingSchedule from '../../training/training-schedule/useTrainingSchedule';
import LoadingReact from '../../../components/commons/loading';
import ItemChage from '../../../components/card-warehouse/itemChage';
import {SVG} from '../../../constants';
import useCommon from '../../../constants/useCommon';
import Moment from 'moment';
import RenderHTML from 'react-native-render-html';
const ScheduleDetail = ({navigation, route}: any) => {
  const {TrainingDetail, isLoadingTrainingDetail, dataTrainingDetail} =
    useTrainingSchedule();
  const {participantUp, textVN} = useCommon();
  const id = route?.params?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        TrainingDetail(Number(id));
        console.log(id);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  var date = new Date();

  return (
    <>
      {isLoadingTrainingDetail ? (
        <ScrollView style={styles.main}>
          <View
            style={{
              position: 'relative',
              height: 250,
            }}>
            <View
              style={{
                width: '100%',
                height: 250,
                backgroundColor: 'white',
                position: 'absolute',
              }}>
              <Image
                style={styles.headerBox}
                source={{uri: dataTrainingDetail?.image}}
              />
            </View>
            <View style={{position: 'absolute'}}>
              <TouchableOpacity
                style={{
                  marginTop: 40,
                  marginHorizontal: 20,
                }}
                onPress={() => navigation.goBack()}>
                <View>
                  <SVG.Leftcircleo />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{padding: 12}}>
            <ItemChage color={'#0288D1'}>
              <View style={{padding: 12}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.headerTitle}>
                    {dataTrainingDetail?.name}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.text} numberOfLines={2}>
                    Đối tượng tham gia :{' '}
                    {participantUp(dataTrainingDetail?.participantUp)}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingTop: 8,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <SVG.Icon_time_blue height={25} width={25} />
                    <Text style={styles.text}>
                      {' '}
                      {date.getHours()}:{date.getMinutes()}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <SVG.Icon_date_blue height={25} width={25} />
                    <Text numberOfLines={1} style={styles.text}>
                      {' '}
                      {textVN(Moment(date).format('dddd'))}(
                      {Moment(date).format('DD/MM')})
                    </Text>
                  </View>
                </View>
              </View>
            </ItemChage>
          </View>
          <View style={styles.box2}>
            <Text style={styles.title}>Mô tả chương trình:</Text>
            <RenderHTML
              contentWidth={100}
              source={{
                html: dataTrainingDetail?.content,
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerBox: {
    width: '100%',
    // position: 'relative',
    resizeMode: 'stretch',
    height: 250,
    // marginTop: -100
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0288D1',
    marginBottom: 20,
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 20,
  },
  box2: {
    marginLeft: 10,
  },
});

export default ScheduleDetail;
