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
import useTopsales from '../topSale/useTopSales';
import {SVG} from '../../../constants';
import Itemagency from './itemEgency';
import LoadingReact from '../../../components/commons/loading';
import {DataTable} from 'react-native-paper';
import useCommon from '../../../constants/useCommon';
const AgencyList = () => {
  let dimensions = Dimensions.get('window');

  let imageWidth = dimensions.width;
  let imageHeght = dimensions.height;
  const [texSearch, setTextSearch] = useState('') as any;
  const [value, setValue] = useState('') as any;
  const {
    isLoadingCompanySearch,
    listCompany,
    isLoadingCompany,
    Company,
    dataProvince,
  } = useTopsales();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          name: texSearch,
          city: value,
        };

        Company(data);
      } catch (error) {}
    };

    fetchData();
  }, [value]);
  const {participantUp} = useCommon();
  const onSearch = () => {
    const data = {
      name: texSearch,
      city: value,
    };
    isLoadingCompanySearch ? Company(data) : null;
  };
  const phone = (item: any) => {
    return item.substring(0, item.length - 2) + '**';
  };
  return (
    <>
      {isLoadingCompany ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              <View style={{alignItems: 'center', paddingTop: 12}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#007DD3'}}>
                  Danh sách đại sứ FutureLang
                </Text>
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',

                  borderColor: '#C2C2C2',
                  borderWidth: 1,
                  borderRadius: 12,
                }}>
                <TextInput
                  style={{
                    width: imageWidth - 75,
                  }}
                  value={texSearch}
                  placeholder="Nhập tên đại sứ, số điện thoại"
                  onChangeText={text => setTextSearch(text)}
                />
                <TouchableOpacity
                  onPress={() => onSearch()}
                  style={{
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 12,
                  }}>
                  <SVG.Icon_search_blue />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', paddingTop: 12}}>
                <View style={{justifyContent: 'center', paddingRight: 12}}>
                  <Text style={{fontSize: 14}}>Tìm theo Tỉnh / Thành phố</Text>
                </View>
                <View style={{width: imageWidth - 204}}>
                  <Itemagency
                    data={dataProvince}
                    titleSelect="Chọn Tỉnh/Thành  Phố"
                    labelField="name"
                    valueField="id"
                    value={value}
                    setValue={setValue}
                  />
                </View>
              </View>
              {isLoadingCompanySearch ? (
                <ScrollView horizontal style={{paddingTop: 12}}>
                  <DataTable>
                    <DataTable.Header
                      style={{
                        backgroundColor: '#007DD3',
                        borderRadius: 8,
                        paddingHorizontal: 8,
                      }}>
                      <DataTable.Title style={styles.header}>
                        <Text style={styles.tableHeading}> Tên đại lý</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.header}>
                        <Text style={styles.tableHeading}> Số điện thoại</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.header}>
                        <Text style={styles.tableHeading}> Cấp đại sứ</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.header}>
                        <Text style={styles.tableHeading}> Quận / Huyện</Text>
                      </DataTable.Title>
                      <DataTable.Title style={styles.header}>
                        <Text style={styles.tableHeading}>
                          {' '}
                          Tỉnh / Thành phố
                        </Text>
                      </DataTable.Title>
                    </DataTable.Header>
                    {listCompany?.map((item: any, index: any) => {
                      return (
                        <DataTable.Row
                          key={index + 'listCompany'}
                          style={
                            index % 2 == 0
                              ? {
                                  borderTopColor: '#00A6FF',
                                  borderTopWidth: index == 0 ? 0 : 1,
                                }
                              : {
                                  backgroundColor: '#71CEFF0D',
                                  borderTopColor: '#00A6FF',
                                  borderTopWidth: 1,
                                }
                          }>
                          <DataTable.Cell style={styles.header}>
                            {item?.fullname}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.header}>
                            {phone(item?.telephone)}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.header}>
                            {participantUp(item?.agencyType)}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.header}>
                            {item?.district}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.header}>
                            {item?.city}
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    })}

                    {/* <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                      console.log(page);
                    }}
                    label="1-2 of 6"
                  /> */}
                  </DataTable>
                </ScrollView>
              ) : (
                <View style={{height: 200}}>
                  <LoadingReact />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default AgencyList;
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

  tableHeading: {
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    width: 250,
  },
});
