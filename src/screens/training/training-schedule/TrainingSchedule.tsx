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
import ScheduleListHome from '../../module/Schedules/ScheduleListHome';
import Course from '../components/course';
import { EnumNavigatorTraining, EnumONOFF } from '../../../constants/enum';
import ItemChage from '../../../components/card-warehouse/itemChage';
import useTrainingSchedule from './useTrainingSchedule';
import LoadingReact from '../../../components/commons/loading';
import Moment from 'moment';
import useCommon from '../../../constants/useCommon';
const TrainingSchedule = ({ navigation, name }: any) => {
  const { Training, isLoadingTraining, dataTraining } = useTrainingSchedule();
  const { participantUp, textVN } = useCommon();
  useEffect(() => {
    const fetchData = async () => {
      try {
        Training();
      } catch (error) { }
    };
    fetchData();
  }, []);

  const statusItem = (item: Number) => {
    if (item == EnumONOFF.ON) {
      return 'Online ';
    } else if (item == EnumONOFF.OFF) {
      return 'Offline';
    }
  };

  const ItemTraining = (data: any, key: any) => {
    var date = new Date(data?.tranning_date);

    return (
      <ItemChage key={key} color={'#0288D1'}>
        <View style={{ padding: 10, flexDirection: 'row', width: '50%' }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.TRAINING_SCHEDULE_DETAIL, {
                id: data?.id,
              })
            }>
            {/* navigation.navigate(ROUTES.QUESTION_NAVIGATOR, {
          indexRoute: EnumNavigatorTraining.Question,
          id: data?.id,
        }); */}
            <Image style={styles.image} source={{ uri: data.image }} />
          </TouchableOpacity>
          <View >
            <Text style={styles.title}>{data?.name} </Text>

            <Text
              style={
                data?.type == EnumONOFF.ON ? styles.online : styles.offline
              }>
              {statusItem(data?.type)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 12,
            paddingBottom: 12,
          }}>
          <TouchableOpacity
            style={{
              marginTop: 8,
              width: '48%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              backgroundColor: '#0288D1',
              height: 36,
            }}
            onPress={() =>
              navigation.navigate(ROUTES.SCHEDULEDETAIL, {
                id: data?.id,
              })
            }>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tham gia</Text>
          </TouchableOpacity>

          <View style={{ paddingHorizontal: 10, width: '50%' }}>
            <Text style={{ color: '#0288D1', fontSize: 12 }} numberOfLines={2}>
              Đối tượng: {participantUp(data?.participantUp)}
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 8,
              }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <SVG.Icon_time_blue />
                <Text style={{ color: '#525252', fontSize: 12 }}>
                  {' '}
                  {date.getHours()}:{date.getMinutes()}
                </Text>
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <SVG.Icon_date_blue />
                <Text
                  numberOfLines={1}
                  style={{ color: '#525252', fontSize: 12 }}>
                  {' '}
                  {textVN(Moment(date).format('dddd'))}(
                  {Moment(date).format('DD/MM')})
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ItemChage>
    );
  };
  return (
    <>
      {isLoadingTraining ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              {dataTraining?.map((item: any, index: any) => {
                return ItemTraining(item, index);
              })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default TrainingSchedule;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 12,
  },
  online: {
    fontSize: 10,
    color: '#009C10',
    alignSelf: 'flex-start',
    backgroundColor: '#EAFFEC',
    padding: 6,
    borderRadius: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  offline: {
    fontSize: 10,
    color: 'red',
    alignSelf: 'flex-start',
    backgroundColor: '#FFEAEA',
    padding: 6,
    borderRadius: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },

  box1: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#rgba(0, 78, 170, 0.15)',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    paddingTop: 4,
    paddingBottom: 7,
    paddingRight: 5,
    elevation: 0.1,
  },
  box2: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 7,
  },
  box3: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#0288D1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: 160,
    height: 90,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {

    fontSize: 14,
    fontWeight: '500',
    color: '#323232',
  },
  object: {
    color: '#0288D1',
    fontSize: 12,
    marginBottom: 3,
  },
  dateTime: {
    width: '50%',
    flexDirection: 'row',
  },
  time: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingRight: 7,
    alignItems: 'center',
    fontSize: 12,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
  },
  textOnl: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#009C10',
  },
  textOff: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#D51E03',
  },
});
