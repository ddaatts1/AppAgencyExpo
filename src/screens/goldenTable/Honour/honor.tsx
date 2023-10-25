import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ItemChage from '../../../components/card-warehouse/itemChage';
import useTopsales from '../topSale/useTopSales';
import LoadingReact from '../../../components/commons/loading';
import {ROUTES} from '../../../constants';

const Honor = ({navigation, route}: any) => {
  let dimensions = Dimensions.get('window');

  let imageWidth = dimensions.width;
  let imageHeght = dimensions.height;
  const [texSearch, setTextSearch] = useState('');
  const {listHonoures, Honoures, isLoadingHonoures, isLoadingSearch} =
    useTopsales();
  useEffect(() => {
    const fetchData = async () => {
      try {
        Honoures('');
      } catch (error) {}
    };

    fetchData();
  }, []);
  const itemHonoures = (data: any, key: any) => {
    return (
      <ItemChage color={'#0288D1'} key={key}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.HONOUR_DETAIL, {
              data: {
                name: data.name,
                content: data.content,
                date: data.date_post,
              },
            });
            // console.log('dfsdfsd');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.image} source={{uri: data.image}} />
            <View>
              <Text
                style={{
                  color: '#181818',
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: imageWidth - 210,
                }}>
                {data.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ItemChage>
    );
  };
  const Search = () => {
    Honoures(texSearch);
  };
  return (
    <>
      {isLoadingHonoures ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}>
                <TextInput
                  style={{
                    borderColor: '#C2C2C2',
                    borderWidth: 1,
                    borderRadius: 12,
                    width: imageWidth - 150,
                  }}
                  placeholder="Nhập tên đại sứ, số điện thoại"
                  value={texSearch}
                  onChangeText={text => setTextSearch(text)}
                />
                <TouchableOpacity
                  onPress={() => Search()}
                  style={{
                    backgroundColor: '#0288D1',
                    borderRadius: 12,
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 12,
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      Tìm Kiếm
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {listHonoures.map((item: any, index: any) => {
                return isLoadingSearch ? (
                  itemHonoures(item, index)
                ) : (
                  <LoadingReact />
                );
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

export default Honor;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 12,
    height: '100%',
    backgroundColor: 'white',
  },
  image: {
    // backgroundColor: 'blue',
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
});
