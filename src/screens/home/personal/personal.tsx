import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Button,
  Dimensions,
} from 'react-native';
import { ImagePickerAvatar } from './image-picker-avatar';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ROUTES, STYLES, SVG } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import ItemAmbassador from '../../../components/personal/itemAmbassador';
import PercentageBar from '../../../components/personal/percentageBar';
import BottonNavigation from '../../../components/personal/bottonNavigation';
import useLogin from '../../auth/useLogin';
import usePersonal from './usePersonal';
import { StorageHelper } from '../../../constants/storageHelper';
import Clipboard from '@react-native-community/clipboard';
import useCommon from '../../../constants/useCommon';
import LoadingReact from '../../../components/commons/loading';

const Personal = ({ navigation }: any) => {
  let dimensions = Dimensions.get('window');
  const { participantUp } = useCommon();
  let imageWidth = dimensions.width;
  let imageHeght = dimensions.height;

  const { logout } = useLogin();
  const { dataUser, isLoadingUser, User } = usePersonal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        User();
      } catch (error) { }
    };

    fetchData();
  }, []);

  const onClipboard = async (item: string) => {
    return await Clipboard.setString(item);
  };
  console.log("dataUser?.support_director?.fullname:", dataUser?.support_director?.fullname)
  return (
    <>
      {isLoadingUser ? (
        <ScrollView style={styles.main}>
          <View style={styles.container}>
            <SVG.Header width="100%" />
            <View style={styles.content}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#14B0FC',
                }}>
                <View>
                  <View style={styles.screen}>
                    <ImagePickerAvatar
                      avatar={dataUser.avatar}
                      fullname={dataUser.fullname}
                      dob={dataUser.dob}
                    />

                    {/* <ImagePickerAvatar uri={snapshotImg} onPress={() => setVisible(true)} /> */}
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Đại lý: {dataUser?.fullname}{' '}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 14 }}>
                    {participantUp(dataUser?.agencyType)}
                  </Text>
                </View>
              </View>

              <Text style={{ color: 'white', fontSize: 14, paddingTop: 18 }}>
                Link giới thiệu
              </Text>

              <View
                style={{
                  borderRadius: 8,
                  flexDirection: 'row',
                  height: 40,
                  backgroundColor: '#FFFFFF1A',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingLeft: 12,

                    justifyContent: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: 'white', fontSize: 14 }}>
                    {dataUser?.affiliate}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => onClipboard(dataUser?.affiliate)}>
                  <View
                    style={{
                      paddingRight: 6,
                      justifyContent: 'center',
                    }}>
                    <SVG.Icon_copy_white height={25} width={25} />
                  </View>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  paddingTop: 18,
                  fontWeight: 'bold',
                }}>
                Thông tin bảo trợ và người chỉ định{' '}
              </Text>

              <View
                style={{
                  paddingTop: 12, paddingBottom: 12
                }}>

                {dataUser?.sponsor?.fullname != undefined && <View style={styles.pesionalItem}>
                  <SVG.Pesional_item1
                    width={imageWidth}
                    style={{ position: 'absolute' }}
                  />

                  <Text
                    numberOfLines={1}
                    style={[styles.textfontSize14, { fontWeight: 'bold' }]}>
                    Người bảo trợ (người giới thiệu)
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Họ và tên:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.sponsor?.fullname}
                    </Text>
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Số điện thoại:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.sponsor?.telephone}
                    </Text>{' '}
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize12}>
                    Hãy liên hệ người bảo trợ trên khi bạn cần giúp đỡ!
                  </Text>
                </View>}
                {dataUser?.support_director?.fullname != undefined && <View style={styles.pesionalItem}>
                  <SVG.Pesional_item2
                    width={imageWidth}
                    style={{ position: 'absolute' }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.textfontSize14, { fontWeight: 'bold' }]}>
                    Người chỉ định (người quản lý)
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Họ và tên:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.support_director?.fullname}
                    </Text>
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Số điện thoại:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.support_director?.telephone}
                    </Text>{' '}
                  </Text>
                </View>


                }
                {dataUser?.manager?.fullname != undefined && <View style={[styles.pesionalItem, { marginBottom: 12 }]}>
                  <SVG.Pesional_item3
                    width={imageWidth}
                    style={{ position: 'absolute' }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.textfontSize14, { fontWeight: 'bold' }]}>
                    Giám đốc hỗ trợ
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Họ và tên:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.manager?.fullname}
                    </Text>
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Số điện thoại:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.manager?.telephone}
                    </Text>{' '}
                  </Text>
                  <Text numberOfLines={1} style={styles.textfontSize14}>
                    Chức danh:{' '}
                    <Text style={styles.textblue}>
                      {dataUser?.manager?.telephone}
                    </Text>{' '}
                  </Text>
                </View>}

              </View>
            </View>
            <View style={{ zIndex: -1, marginTop: -12 }}>
              <LinearGradient
                colors={['#EEFAFF', '#EEFAFF']}
                // style={styles.linearGradient}
                start={{ y: 0.0, x: 0.0 }}
                end={{ y: 1.0, x: 0.0 }}>
                <View
                  style={{
                    paddingTop: 20,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <SVG.Icon_wave_column style={{ justifyContent: 'center' }} />
                    <Text
                      style={{
                        textAlignVertical: 'bottom',
                        color: '#0288D1',
                        fontSize: 18,
                        fontWeight: 'bold',
                        paddingLeft: 10,
                      }}>
                      Điều kiện lên cấp{' '}
                    </Text>
                  </View>
                  <Text
                    style={{ color: '#323232', fontSize: 16, paddingTop: 12 }}>
                    Để lên Đại sứ 1, bạn vui lòng hoàn thành 1 trong 3 điều kiện
                    sau:{' '}
                  </Text>
                  <ItemAmbassador color={'#0288D1'}>
                    <Text
                      style={{
                        color: '#0288D1',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Tổng đơn hàng nhập tháng này{' '}
                    </Text>
                    <PercentageBar
                      numerator={dataUser?.totalBill}
                      denominator={dataUser?.groupSales}
                      type={''}
                      height={20}
                      backgroundColor={'#CAECFF'}
                      completedColor={'#0288D1'}
                      percentage={'65%'}
                    />
                  </ItemAmbassador>
                  <ItemAmbassador color={'#22B265'}>
                    <Text
                      style={{
                        color: '#22B265',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Quản lý 3 đại sứ trực tiếp đồng danh hiệu (hoặc lớn hơn){' '}
                    </Text>

                    <PercentageBar
                      numerator={dataUser?.countChild}
                      denominator={dataUser?.recruitment_agency}
                      type={''}
                      height={20}
                      backgroundColor={'#D8F3E1'}
                      completedColor={'#22B265'}
                      percentage={'65%'}
                    />
                    <Text
                      style={{
                        color: '#22B265',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Doanh số nhóm{' '}
                    </Text>

                    <PercentageBar
                      numerator={
                        dataUser.groupSales < dataUser.groupValueLevelUp
                          ? dataUser.groupSales
                          : 'Max'
                      }
                      denominator={dataUser.groupValueLevelUp}
                      type={'đ'}
                      height={20}
                      backgroundColor={'#D8F3E1'}
                      completedColor={'#22B265'}
                      percentage={'65%'}
                    />
                  </ItemAmbassador>
                  {/* <ItemAmbassador color={"#F18507"}>

                                <Text style={{ color: '#F18507', fontSize: 18, fontWeight: 'bold' }}>Quản lý 4 thành viên
                                    thuộc 4 nhóm khác nhau </Text>

                                <PercentageBar
                                    numerator={1}
                                    denominator={3}
                                    type={"đ"}
                                    height={20}
                                    backgroundColor={"#FFD098"}
                                    completedColor={'#F18507'}
                                    percentage={'65%'}
                                />
                                <Text style={{ color: '#F18507', fontSize: 18, fontWeight: 'bold' }}>Tổng đơn hàng nhập
                                    tháng này </Text>

                                <PercentageBar
                                    numerator={1}
                                    denominator={3}
                                    type={"đ"}
                                    height={20}
                                    backgroundColor={"#FFD098"}
                                    completedColor={'#F18507'}
                                    percentage={'65%'}
                                />
                            </ItemAmbassador> */}

                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.ACCOUNT)}>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_people height={25} width={25} />
                        <Text style={styles.textBottonNavigation}>
                          Tài khoản
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>

                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.ORDER)}>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_order height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Quản lý đơn hàng
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>

                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ROUTES.CHANGE_PASSWORD)
                      }>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_key height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Đổi mật khẩu
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>
                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.BANK)}>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_bank height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Thông tin ngân hàng của bạn
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>
                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.RECEIVER)}>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_verified height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Cài đặt thông tin người nhận hàng
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>
                  {/* <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.ABOUT)}>
                      <View style={{flexDirection: 'row'}}>
                        <SVG.Icon_tooltip height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Về chúng tôi
                        </Text>
                        <SVG.Icon_next
                          style={{marginLeft: 'auto'}}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation> */}
                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(ROUTES.SUPPORT_MANAGEMENT)
                      }>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_contact height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Liên hệ và hỗ trợ
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>

                  <BottonNavigation>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.RULES)}>
                      <View style={{ flexDirection: 'row' }}>
                        <SVG.Icon_book height={30} width={30} />
                        <Text style={styles.textBottonNavigation}>
                          Điều khoản và chính sách
                        </Text>
                        <SVG.Icon_next
                          style={{ marginLeft: 'auto' }}
                          height={30}
                          width={30}
                        />
                      </View>
                    </TouchableOpacity>
                  </BottonNavigation>

                  <TouchableOpacity
                    onPress={() => {
                      logout(navigation);
                    }}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      height: 80,
                      justifyContent: 'center',
                    }}>
                    <SVG.Icon_login
                      height={30}
                      width={30}
                      style={{ alignItems: 'center' }}
                    />
                    <Text style={styles.textBottonNavigation}>Đăng xuất</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            {/* -----------ModalPoup----------------- */}
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default Personal;

const styles = StyleSheet.create({
  pesionalItem: {
    marginTop: 12,
    borderRadius: 18,
    padding: 20,
    position: 'relative',
    height: 122,
    backgroundColor: 'white',
  },
  textfontSize14: {
    color: '#323232',
    fontSize: 14,
    paddingTop: 4,
  },
  textblue: {
    fontWeight: 'bold',
    color: '#0288D1',
  },
  textfontSize12: {
    color: '#323232',
    fontSize: 11,
    paddingTop: 4,
  },
  pesionalItemText: {},
  imageContainer: {
    width: 400,
    height: 200,
    alignItems: 'center',
    borderRadius: 180,
  },
  snapshotImg: {
    width: 400,
    height: 200,
    margin: 16,
  },

  main: {
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: '#14B0FC',
    width: '100%',
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#14B0FC',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  screen: {
    flex: 1,
  },
  dropShadow: {
    borderRadius: 10,
    paddingRight: 12,
    alignItems: 'center',
    borderLeftColor: 'blue',
    height: 160,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textBottonNavigation: {
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#323232',
    fontWeight: 'bold',
    paddingLeft: 12,
  },
});
