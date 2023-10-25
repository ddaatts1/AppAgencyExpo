import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ROUTES, SVG} from '../../../constants';
import ItemChage from '../../../components/card-warehouse/itemChage';
import data from '../../../../ultidata/data';
import {Enum, EnumCourse, EnumNavigatorTraining} from '../../../constants/enum';

const ItemMyCourse = ({navigation, dataMyCourses}: any) => {
  return dataMyCourses.map((data: any, index: any) => {
    return (
      <ItemChage key={index + 'c'} color={'#0288D1'}>
        <View>
          <View style={{width: '100%'}}>
            <Image style={styles.image} source={{uri: data.image}} />
          </View>
          <Text numberOfLines={3} style={styles.title}>
            {data.name}{' '}
          </Text>
          <Text
            style={{
              color: '#0288D1',
              fontSize: 16,
              paddingHorizontal: 12,
              paddingBottom: 12,
            }}
            numberOfLines={2}>
            {data?.name_teacher}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              paddingBottom: 12,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SVG.Icon_Peoples />
              <Text style={{fontSize: 14, color: '#0288D1'}}>
                {' '}
                {data?.studied}
              </Text>
            </View>

            {data?.charge == 1 ? (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 16,
                  backgroundColor: '#0288D1',
                  height: 36,
                }}
                onPress={() =>
                  navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
                    indexRoute: EnumNavigatorTraining.StartLearning,
                    id: data?.id,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Học ngay{' '}
                  </Text>
                  <SVG.Icon_direction_right />
                </View>
              </TouchableOpacity>
            ) : (
              data?.charge == 0 && (
                <View>
                  <Text
                    style={{
                      color: '#525252',
                      fontSize: 14,
                      textAlign: 'right',
                    }}>
                    {data?.fee_sale}Đ
                  </Text>
                  <Text
                    style={{
                      color: '#D51E03',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {data?.fee}Đ
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      </ItemChage>
    );
  });
};

const styles = StyleSheet.create({
  styleMade: {
    fontSize: 10,
    color: '#ffffff',
    alignSelf: 'flex-start',
    backgroundColor: '#009C10',
    padding: 6,
    borderRadius: 16,
    fontWeight: 'bold',
  }, //đã thực hiện
  styleProcessing: {
    fontSize: 10,
    color: '#ffffff',
    alignSelf: 'flex-start',
    backgroundColor: '#FFB300',
    padding: 6,
    borderRadius: 16,
    fontWeight: 'bold',
  }, // đang thực hiện
  styleUnfulfilled: {
    fontSize: 10,
    color: '#525252',
    alignSelf: 'flex-start',
    backgroundColor: '#C2C2C2',
    padding: 6,
    borderRadius: 16,
    fontWeight: 'bold',
  }, // chưa thực hiện
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
    width: '100%',
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    padding: 12,
    fontSize: 20,
    fontWeight: 'bold',

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
});

export default ItemMyCourse;
