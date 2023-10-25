import React, {useEffect} from 'react';

import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {ROUTES, SVG} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import ItemTop3 from './itemTop3';
import useTopsales from './useTopSales';
import LoadingReact from '../../../components/commons/loading';
import Moment from 'moment';
const TopSales = ({navigation}: any) => {
  const {dataCampaign, isLoading, listDetail, TopSales} = useTopsales();

  useEffect(() => {
    const fetchData = async () => {
      try {
        TopSales();
      } catch (error) {}
    };

    fetchData();
  }, []);

  const formatDate = (date: any) => {
    const time = new Date(date);
    return (
      time.getHours() +
      'h' +
      time.getMinutes() +
      ' ngày ' +
      Moment(time).format('DD/MM/YYYY')
    );
  };
  const formatDateTime = (date: any) => {
    const time = new Date(date);
    return (
      time.getHours() +
      ':' +
      time.getMinutes() +
      ':' +
      time.getMilliseconds() +
      ' Ngày ' +
      Moment(time).format('DD/MM/YYYY')
    );
  };
  return (
    <>
      {isLoading ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              <Text style={{color: 'red', fontSize: 24, textAlign: 'center'}}>
                {dataCampaign?.name?.toUpperCase()}{' '}
              </Text>
              {dataCampaign && (
                <Text
                  style={{color: '#323232', fontSize: 16, textAlign: 'center'}}>
                  {dataCampaign?.subtitles}
                </Text>
              )}

              <Text
                style={{
                  color: '#323232',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingTop: 12,
                }}>
                Thời gian diễn ra:
              </Text>
              <Text
                style={{
                  color: '#323232',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                Từ {formatDate(dataCampaign.time_show_start)}
              </Text>
              <Text
                style={{
                  color: '#323232',
                  fontSize: 14,
                  textAlign: 'center',
                }}>
                Đến {formatDate(dataCampaign.time_show_end)}
              </Text>
              <View
                style={{
                  borderBottomColor: '#C2C2C2',
                  borderBottomWidth: 1,
                  paddingTop: 12,
                }}></View>
              <View
                style={{
                  marginTop: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: '#EEFAFF',
                    height: 36,
                    width: 100,
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    navigation.navigate(ROUTES.PROGRAM_RULES, {
                      rules: dataCampaign?.rules,
                    })
                  }>
                  <SVG.Icon_tooltip height={30} width={30} />
                  <Text style={{color: '#0288D1', fontWeight: 'bold'}}>
                    {''} Thể lệ
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 24,
                    color: '#181818',
                    fontSize: 16,
                    textAlign: 'center',
                    fontWeight: 'normal',
                  }}>
                  Thời gian cập nhật: {formatDateTime(dataCampaign.time_start)}
                </Text>
                {listDetail?.map((item: any, idex: any) => {
                  return (
                    <View key={idex + 'listDetail'}>
                      <ItemTop3 index={idex} data={item} />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default TopSales;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 12,
    height: '100%',
  },
});
