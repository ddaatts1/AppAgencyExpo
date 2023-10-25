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
import PercepercentageBarCourse from './percentageBarCourse';
import data from '../../../../ultidata/data';
import {WebView} from 'react-native-webview';
import {Enum, EnumCourse, EnumNavigatorTraining} from '../../../constants/enum';

const Document = ({navigation, dataArchives}: any) => {
  const {Coures} = data();

  return dataArchives?.map((item: any, index: any) => {
    return (
      <ItemChage key={index} color={'#0288D1'}>
        <View style={{padding: 10, height: 145}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <Image style={styles.image} source={{uri: item.image}} />
            </View>
            <View style={{width: '50%'}}>
              <Text numberOfLines={4} style={styles.title}>
                {' '}
                {item.name}{' '}
              </Text>

              <TouchableOpacity
                style={{
                  bottom: 0,
                  marginTop: 8,
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  backgroundColor: '#0288D1',
                  height: 36,
                }}
                onPress={() =>
                  navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
                    indexRoute: EnumNavigatorTraining.DocumentDetail,
                    name: 'Tài liệu',
                    id: item?.id,
                  })
                }>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Xem ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ItemChage>
    );
  });
};

const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#323232',
    height: 80,
  },
});

export default Document;
