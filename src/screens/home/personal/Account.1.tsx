import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SVG} from '../../../constants';
import DatePicker from 'react-native-date-picker';
import ModalPoup from '../../../components/commons/modalPoup';
import Moment from 'moment';
import {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import useAccount from './useAccount';
import LoadingReact from '../../../components/commons/loading';
import CustomSearchLG from '../../../components/commons/CustomSerchLG';
import {EnumKYC} from '../../../constants/enum';
import {styles} from './account';

export const Account = ({route}: any) => {
  let dimensions = Dimensions.get('window');

  let imageWidth = dimensions.width;
  let hight = dimensions.height;
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [showImage, setShowImage] = useState(false);

  const onPressDate = () => {
    setOpen(false);
    setDob(Moment(date).format('DD/MM/YYYY'));
  };
  const {
    UpdateProfile,
    User,
    isLoading,
    setFullname,
    setDob,
    setDistrict,
    setCity,
    setIdentityCard,
    setIdentityAddress,
    setTaxIdentification,
    setImageBeforeCard,
    setImageAfterCard,
    fullname,
    dob,
    city,
    districts,
    identityCard,
    imageBeforeCard,
    imageAfterCard,
    identityAddress,
    taxIdentification,
    email,
    telephone,
    dataDistrict,
    dataProvince,
    status,
  } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        User();
      } catch (error) {}
    };

    fetchData();
  }, []);

  const options: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo' as MediaType,
    includeBase64: true,
  };
  const onButtonImageLibrary = React.useCallback((index: any) => {
    if (index == 1) {
      launchImageLibrary(options, response => {
        if (response.assets) {
          const imageAssetsArray = response.assets[0].base64;

          setImageBeforeCard('data:image/png;base64,' + imageAssetsArray);
        }
      });
    } else {
      launchImageLibrary(options, response => {
        if (response.assets) {
          const imageAssetsArray = response.assets[0].base64;

          setImageAfterCard('data:image/png;base64,' + imageAssetsArray);
        }
      });
    }

    setShowImage(true);
  }, []);

  const openSelectAVata = async (type: number) => {
    onButtonImageLibrary(type);
  };
  async function onSubmit() {
    const dataAcount = {
      fullname: fullname,
      dob: Moment(date).format('YYYY-MM-DD'),
      city: Number(city),
      district: Number(districts),
      imageBeforeCard: imageBeforeCard,
      identityAddress: identityAddress,
      imageAfterCard: imageAfterCard,
      identityCard: identityCard,
      taxIdentification: taxIdentification,
    };
    console.log('data----------------', dataAcount);
    await UpdateProfile(dataAcount);
  }

  const submitBotton = (status: any) => {
    if (status == EnumKYC.completedStatus) {
      return (
        <TouchableOpacity onPress={() => onSubmit()} style={styles.loginBtn}>
          <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10}}>
            Lưu thông tin cập nhật
          </Text>
        </TouchableOpacity>
      );
    } else if (status == EnumKYC.initialStatus) {
      return (
        <TouchableOpacity onPress={() => onSubmit()} style={styles.loginBtn}>
          <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10}}>
            Gửi duyệt KY
          </Text>
        </TouchableOpacity>
      );
    } else if (status == EnumKYC.standbyStatus) {
      return (
        <TouchableOpacity
          style={[styles.loginBtn, {backgroundColor: '#E3F2FD'}]}>
          <Text style={{color: '#0288D1', fontSize: 16, paddingLeft: 10}}>
            Đang chờ duyệt KYC
          </Text>
        </TouchableOpacity>
      );
    }
  };
  // export enum EnumKYC {
  //   initialStatus, // trạng thái ban đầu
  //   standbyStatus, //Trạng thái chờ duyệt
  //   incompleteStatus, //Chưa cập nhật xong thông tin
  //   completedStatus, //hoàn thành đã duyệt
  // }
  const status1 = (type: any) => {
    if (status == EnumKYC.initialStatus) {
      return type == 0 ? styles.boxWhite : 'auto';
    } else if (status == EnumKYC.standbyStatus) {
      return type == 0 ? styles.boxGrey : 'none';
    } else if (status == EnumKYC.incompleteStatus) {
      return type == 0 ? styles.boxWhite : 'auto';
    } else if (status == EnumKYC.completedStatus) {
      return type == 0 ? styles.boxGrey : 'none';
    }
  };

  return (
    <ScrollView style={styles.main}>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.content}>
            <View pointerEvents={status1(1)} style={status1(0)}>
              <Text style={styles.textInput}>
                Họ tên<Text style={{color: 'red'}}>*</Text>
              </Text>

              <TextInput
                style={{
                  width: '70%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#323232',
                }}
                contextMenuHidden={true}
                onChangeText={text => setFullname(text)}
                value={fullname}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                justifyContent: 'space-between',
                marginTop: 2,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.textInput}>
                Email<Text style={{color: 'red'}}>*</Text>
              </Text>
              <Text style={[styles.textInput, {fontWeight: 'bold'}]}>
                {email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                justifyContent: 'space-between',
                marginTop: 2,
                marginBottom: 12,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.textInput}>
                Số điện thoại<Text style={{color: 'red'}}>*</Text>
              </Text>

              <Text style={[styles.textInput, {fontWeight: 'bold'}]}>
                {telephone}
              </Text>
            </View>

            <TouchableOpacity onPress={() => setOpen(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: 50,
                  justifyContent: 'space-between',
                  marginTop: 2,
                  paddingHorizontal: 12,
                  alignItems: 'center',
                }}>
                <Text style={styles.textInput}>
                  Ngày sinh<Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#0288D1',
                      fontSize: 14,
                    }}>
                    {dob}
                  </Text>
                  <SVG.Icon_next_grey height={25} width={25} />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                justifyContent: 'space-between',
                marginTop: 2,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.textInput}>
                Số CMND/CCCD<Text style={{color: 'red'}}>*</Text>
              </Text>

              <TextInput
                style={{
                  width: '60%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#0288D1',
                  marginLeft: 14,
                }}
                keyboardType="numeric"
                onChangeText={text => setIdentityCard(text)}
                value={identityCard}
              />
              <View style={{justifyContent: 'center'}}>
                <SVG.Icon_edit height={25} width={25} />
              </View>
            </View>
            <CustomSearchLG
              isIconLeft={true}
              iconLeft={<SVG.Icon_location />}
              value={city}
              data={dataProvince}
              isIcon
              isValid={true}
              name="city"
              title="Tỉnh/Thành phố"
              setValue={setCity}
            />
            <CustomSearchLG
              isIconLeft={true}
              iconLeft={<SVG.Icon_location />}
              value={districts}
              data={dataDistrict}
              isIcon
              isValid={true}
              name="district"
              title="Quận/Huyện"
              setValue={setDistrict}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 12,
              }}>
              <View
                style={{
                  paddingTop: 12,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#323232', fontSize: 16}}>
                  CMND/ CCCD mặt trước<Text style={{color: 'red'}}>*</Text>
                </Text>

                {imageBeforeCard == null ? (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(1)}
                    style={styles.image}>
                    <SVG.Icon_upload
                      height={80}
                      width={80}
                      style={{paddingVertical: 12}}
                    />

                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                        paddingLeft: 10,
                      }}>
                      Nhấn để tải ảnh lên
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(1)}
                    style={styles.imageUpload}>
                    {imageBeforeCard && (
                      <View
                        style={{
                          width: imageWidth / 2 - 24,
                        }}>
                        <Image
                          resizeMode="cover"
                          resizeMethod="scale"
                          source={{
                            uri: imageBeforeCard,
                          }}
                          style={{
                            width: imageWidth / 2 - 24,
                            height: 100,
                            alignItems: 'center',
                            // position: 'absolute'
                          }}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        right: 0,
                        position: 'absolute',
                        height: 110,
                        paddingHorizontal: 13,

                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                      }}>
                      <SVG.Icon_download_white height={35} width={35} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  paddingTop: 12,
                  alignItems: 'center',
                  paddingLeft: 6,
                }}>
                <Text style={{color: '#323232', fontSize: 16}}>
                  CMND/ CCCD mặt sau<Text style={{color: 'red'}}>*</Text>
                </Text>
                {imageAfterCard == null ? (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(2)}
                    style={styles.image}>
                    <SVG.Icon_upload
                      height={80}
                      width={80}
                      style={{paddingVertical: 12}}
                    />

                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                        paddingLeft: 10,
                      }}>
                      Nhấn để tải ảnh lên
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(2)}
                    style={styles.imageUpload}>
                    {imageAfterCard && (
                      <View
                        style={{
                          width: imageWidth / 2 - 24,
                        }}>
                        <Image
                          resizeMode="cover"
                          resizeMethod="scale"
                          source={{
                            uri: imageAfterCard,
                          }}
                          style={{
                            width: imageWidth / 2 - 24,
                            height: 100,
                            alignItems: 'center',
                            //  position: 'absolute'
                          }}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        right: 0,
                        position: 'absolute',
                        height: 110,
                        paddingHorizontal: 13,

                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                      }}>
                      <SVG.Icon_download_white height={35} width={35} />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                justifyContent: 'space-between',
                marginTop: 24,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.textInput}>
                Nơi cấp <Text style={{color: 'red'}}>*</Text>
              </Text>

              <TextInput
                style={{
                  width: '70%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#323232',
                }}
                onChangeText={text => setIdentityAddress(text)}
                value={identityAddress}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 50,
                justifyContent: 'space-between',
                marginTop: 2,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.textInput}>MST cá nhân</Text>

              <TextInput
                style={{
                  width: '60%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#0288D1',
                  marginLeft: 14,
                }}
                onChangeText={text => setTaxIdentification(text)}
                value={taxIdentification}
              />
              <View style={{justifyContent: 'center'}}>
                <SVG.Icon_edit height={25} width={25} />
              </View>
            </View>
            {submitBotton(status)}
            {/* <TouchableOpacity
                      onPress={() => onSubmit()}
                      style={styles.loginBtn}>
                      <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10}}>
                        Lưu thông tin cập nhật
                      </Text>
                    </TouchableOpacity> */}
          </View>
        </View>
      ) : (
        <LoadingReact />
      )}

      <ModalPoup visible={open}>
        <View
          style={{
            paddingTop: 0,
            paddingBottom: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderColor: '#0288D1',
          }}>
          <Text
            style={{
              color: '#0288D1',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Ngày tháng năm sinh của bạn
          </Text>
        </View>

        <DatePicker
          mode="date"
          date={date}
          onDateChange={data => setDate(data)}
        />
        <TouchableOpacity onPress={onPressDate} style={styles.loginTime}>
          <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10}}>
            Xác Nhận
          </Text>
        </TouchableOpacity>
      </ModalPoup>
    </ScrollView>
  );
};
