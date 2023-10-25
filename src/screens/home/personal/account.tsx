import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SVG } from '../../../constants';
import DatePicker from 'react-native-date-picker';
import ModalPoup from '../../../components/commons/modalPoup';
import Moment from 'moment';
import ImagePicker, {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from 'react-native-image-picker';
import useAccount from './useAccount';
import LoadingReact from '../../../components/commons/loading';
import CustomSearchLG from '../../../components/commons/CustomSerchLG';
import { EnumKYC } from '../../../constants/enum';
import ErrorText from '../../../components/commons/errorText';
import _, { values } from "lodash";

import Tooltip from 'react-native-walkthrough-tooltip';

const Account = ({ route }: any) => {
  let dimensions = Dimensions.get('window');

  let imageWidth = dimensions.width;
  let hight = dimensions.height;
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [showImage, setShowImage] = useState(false);
  const [islod, setisLod] = useState(false);

  const onPressDate = () => {
    setOpen(false);
    setDob(Moment(date).format('DD/MM/YYYY'));
    if (date >= new Date()) {

      setIsDate("Ngày sinh không hợp lệ")
    } else {
      setIsDate()
    }
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
    modelKYC,
    setModelKYC,
    setStatus,
    isModal,
    setIsModal,
    getDataDistrict,
    setIsIdentityCard,
    isIdentityCard,
  } = useAccount();
  const [isFullname, setIsFullname] = useState() as any;
  const [isDate, setIsDate] = useState() as any;

  const [isCity, setIsCity] = useState() as any;
  const [isDistrict, setIsDistrict] = useState() as any;
  const [isImageBeforeCard, setIsImageBeforeCard] = useState() as any;
  const [isImageAfterCard, setIsImageAfterCard] = useState() as any;
  const [isIdentityAddress, setIsIdentityAddress] = useState() as any;
  const [toolTipVisible, setToolTipVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await User();
        // console.log('modelKYC---------------', modelKYC);
      } catch (error) { }
    };

    fetchData();
  }, [islod]);

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

  const CheckValue = (text: any, type: any) => {
    if (type == 'city') {
      setCity(text)
      if (!_.isEmpty(city)) {
        setDistrict()
        getDataDistrict(text);
      }
      return setIsCity("")
    } else if (type == 'district') {

      setDistrict(text)
      return setIsDistrict("")
    } else if (type == 'fullname') {
      setFullname(text)
      return setIsFullname('');
    } else if (type == 'identityCard') {
      setIdentityCard(text)
      return setIsIdentityCard('');
    } else if (type == 'identityAddress') {
      setIdentityAddress(text)
      return setIsIdentityAddress('');
    } else if (type == 'imageAfterCard') {
      setImageAfterCard(text)
      return setIsImageAfterCard('');
    } else if (type == 'imageBeforeCard') {
      setImageBeforeCard(text)
      return setIsImageBeforeCard('');
    } else if (type == 'date') {
      setDate(text)
      return setIsDate('');
    }

  };
  async function onSubmit(type: any) {
    console.log(date)

    if (_.isEmpty(fullname) || _.isEmpty(identityCard) || _.isEmpty(Moment(date).format('DD/MM/YYYY')) || _.isEmpty(city) || _.isEmpty(districts) || _.isEmpty(identityAddress) || _.isEmpty(imageAfterCard) || _.isEmpty(imageBeforeCard)) {
      console.log(date)
      if (_.isEmpty(identityCard)) {
        setIsIdentityCard("Trường bắt buộc")
      }
      if (_.isEmpty(fullname)) {
        setIsFullname("Trường bắt buộc")
      }
      if (_.isEmpty(date)) {
        setIsDate("Trường bắt buộc")
      }
      if (_.isEmpty(city)) {
        setIsCity("Trường bắt buộc")
      }
      if (_.isEmpty(districts)) {
        setIsDistrict("Trường bắt buộc")
      }
      if (_.isEmpty(identityAddress)) {
        setIsIdentityAddress("Trường bắt buộc")
      }
      if (_.isEmpty(imageAfterCard)) {
        setIsImageAfterCard("Trường bắt buộc")
      }
      if (_.isEmpty(imageBeforeCard)) {
        setIsImageBeforeCard("Trường bắt buộc")
      }
    } else {
      console.log("identityAddress", identityAddress)
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
      if (_.isEmpty(isDate)) {
        console.log("vào rồi ")
        await UpdateProfile(dataAcount, type);
      }

    }


  }
  async function checkCity(id: any) {

    CheckValue(id, "city")

  }
  async function checkDistricts(id: any) {

    CheckValue(id, "district")

  }


  async function checkTaxIdentification(text: any) {
    if (/^\d+$/.test(text.trim()) || text === '') {

      setTaxIdentification(text)

    }
  }

  async function checkIdentityCard(text: any) {

    if (/^\d+$/.test(text) || text === '') {

      CheckValue(text, 'identityCard')

    }
  }

  const submitBotton = (status: any) => {
    if (status == EnumKYC.completedStatus) {
      return (
        <TouchableOpacity
          onPress={() => onSubmit(null)}
          style={styles.loginBtn}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Lưu thông tin cập nhật
          </Text>
        </TouchableOpacity>
      );
    } else if (status == EnumKYC.initialStatus) {
      return (
        <TouchableOpacity onPress={() => onSubmit(1)} style={styles.loginBtn}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Gửi duyệt KYC
          </Text>
        </TouchableOpacity>
      );
    } else if (status == EnumKYC.standbyStatus) {
      return (
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: '#E3F2FD' }]}>
          <Text style={{ color: '#0288D1', fontSize: 16, paddingLeft: 10 }}>
            Đang chờ duyệt KYC
          </Text>
        </TouchableOpacity>
      );
    } else if (status == EnumKYC.incompleteStatus) {
      return (
        <TouchableOpacity onPress={() => onSubmit(1)} style={styles.loginBtn}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Gửi duyệt KYC
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
  const CheckstatuStyle = (type: any) => {
    if (status == EnumKYC.initialStatus) {
      return true;
    } else if (status == EnumKYC.standbyStatus) {
      return false;
    } else if (status == EnumKYC.incompleteStatus) {
      return true;
    } else if (status == EnumKYC.completedStatus) {
      return type == 0 ? false : true;
    }
  };
  const CheckstatuPointerEvents = (type: any) => {
    if (status == EnumKYC.initialStatus) {
      return 'auto';
    } else if (status == EnumKYC.standbyStatus) {
      return 'none';
    } else if (status == EnumKYC.incompleteStatus) {
      return 'auto';
    } else if (status == EnumKYC.completedStatus) {
      return type == 0 ? 'none' : 'auto';
    }
  };

  return (
    <ScrollView style={styles.main}>
      {isLoading ? (
        <View style={styles.container}>



          <View style={styles.content}>

            <View
              pointerEvents={CheckstatuPointerEvents(0)}
              style={CheckstatuStyle(0) ? styles.boxWhite : styles.boxGrey}>
              <Text style={styles.textInput}>
                Họ tên<Text style={{ color: 'red' }}>*</Text>
              </Text>

              <TextInput
                style={{
                  width: '70%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#323232',
                }}
                contextMenuHidden={true}
                onChangeText={text => CheckValue(text, 'fullname')}
                value={fullname}
              />
            </View>
            <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
              {isFullname && <ErrorText textName={isFullname} />}</View>

            <View
              pointerEvents={CheckstatuPointerEvents(0)}
              style={CheckstatuStyle(0) ? styles.boxWhite : styles.boxGrey}>
              <Text style={styles.textInput}>
                Email<Text style={{ color: 'red' }}>*</Text>
              </Text>
              <Text style={[styles.textInput, { fontWeight: 'bold' }]}>
                {email}
              </Text>
            </View>


            <View
              pointerEvents={CheckstatuPointerEvents(0)}
              style={CheckstatuStyle(0) ? styles.boxWhite : styles.boxGrey}>
              <Text style={styles.textInput}>
                Số điện thoại<Text style={{ color: 'red' }}>*</Text>
              </Text>

              <Text style={[styles.textInput, { fontWeight: 'bold' }]}>
                {telephone}
              </Text>
            </View>

            <View style={{ height: 12 }}></View>
            <View
              pointerEvents={CheckstatuPointerEvents(0)}
              style={
                CheckstatuStyle(0)
                  ? { backgroundColor: 'white', marginTop: 12 }
                  : { backgroundColor: '#EEEEEE', marginTop: 12 }
              }>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View
                  style={{
                    flexDirection: 'row',

                    height: 50,
                    justifyContent: 'space-between',
                    marginTop: 2,
                    paddingHorizontal: 12,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.textInput}>
                    Ngày sinh<Text style={{ color: 'red' }}>*</Text>
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
                {isDate && <ErrorText textName={isDate} />}</View>

            </View>

            <View
              pointerEvents={CheckstatuPointerEvents(0)}
              style={CheckstatuStyle(0) ? styles.boxWhite : styles.boxGrey}>
              <Text style={styles.textInput}>
                Số CMND/CCCD<Text style={{ color: 'red' }}>*</Text>
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
                onChangeText={text => checkIdentityCard(text)}
                value={identityCard}
              />
              <View style={{ justifyContent: 'center' }}>
                <SVG.Icon_edit height={25} width={25} />
              </View>
            </View>
            <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
              {isIdentityCard && <ErrorText textName={isIdentityCard} />}</View>
            <View
              pointerEvents={CheckstatuPointerEvents(1)}
              style={
                CheckstatuStyle(1)
                  ? { backgroundColor: 'white', marginTop: 2 }
                  : { backgroundColor: '#EEEEEE', marginTop: 2 }
              }>
              <CustomSearchLG
                isIconLeft={true}
                iconLeft={<SVG.Icon_location />}
                value={city}
                data={dataProvince}
                isIcon
                isValid={true}
                name="city"
                title="Tỉnh/Thành phố"
                setValue={checkCity}
              />
              <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
                {isCity && <ErrorText textName={isCity} />}</View>
            </View>
            <View
              pointerEvents={CheckstatuPointerEvents(1)}
              style={
                CheckstatuStyle(1)
                  ? { backgroundColor: 'white', marginTop: 2 }
                  : { backgroundColor: '#EEEEEE', marginTop: 2 }
              }>
              <CustomSearchLG
                isIconLeft={true}
                iconLeft={<SVG.Icon_location />}
                value={districts}
                data={dataDistrict}
                isIcon
                isValid={true}
                name="district"
                title="Quận/Huyện"
                setValue={checkDistricts}
              />
              <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
                {isDistrict && <ErrorText textName={isDistrict} />}</View>
            </View>
            <View
              pointerEvents={CheckstatuPointerEvents(0)}
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
                <Text style={{ color: '#323232', fontSize: 16 }}>
                  CMND/ CCCD mặt trước<Text style={{ color: 'red' }}>*</Text>
                </Text>

                {imageBeforeCard == null ? (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(1)}
                    style={styles.image}>
                    <SVG.Icon_upload
                      height={80}
                      width={80}
                      style={{ paddingVertical: 12 }}
                    />

                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                        paddingLeft: 10,
                      }}>
                      Nhấn để tải ảnh lên
                    </Text>
                    <View style={{ backgroundColor: "white" }}>
                      {isImageBeforeCard && <ErrorText textName={isImageBeforeCard} />}</View>

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
                <Text style={{ color: '#323232', fontSize: 16 }}>
                  CMND/ CCCD mặt sau<Text style={{ color: 'red' }}>*</Text>
                </Text>
                {imageAfterCard == null ? (
                  <TouchableOpacity
                    onPress={() => openSelectAVata(2)}
                    style={styles.image}>
                    <SVG.Icon_upload
                      height={80}
                      width={80}
                      style={{ paddingVertical: 12 }}
                    />

                    <Text
                      style={{
                        color: '#323232',
                        fontSize: 16,
                        paddingLeft: 10,
                      }}>
                      Nhấn để tải ảnh lên
                    </Text>
                    <View style={{ backgroundColor: "white" }}>
                      {isImageAfterCard && <ErrorText textName={isImageAfterCard} />}</View>
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
              pointerEvents={CheckstatuPointerEvents(0)}
              style={CheckstatuStyle(0) ? styles.boxWhite : styles.boxGrey}>
              <Text style={styles.textInput}>
                Nơi cấp <Text style={{ color: 'red' }}>*</Text>
              </Text>

              <TextInput
                style={{
                  width: '70%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#323232',
                }}
                onChangeText={text => CheckValue(text, "identityAddress")}
                value={identityAddress}
              />


            </View>
            <View style={{ backgroundColor: "white", paddingBottom: 8 }}>
              {isIdentityAddress && <ErrorText textName={isIdentityAddress} />}</View>
            <View
              pointerEvents={CheckstatuPointerEvents(1)}
              style={[
                CheckstatuStyle(1) ? styles.boxWhite : styles.boxGrey,
                { marginTop: 24 },
              ]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.textInput}>MST cá nhân</Text>

                <TouchableOpacity onPress={() => { toolTipVisible ? setToolTipVisible(false) : setToolTipVisible(true) }}>
                  <SVG.Icon_group height={20} width={20} />
                </TouchableOpacity>
              </View>


              <TextInput
                style={{
                  width: '60%',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: '#0288D1',
                  marginLeft: 14,
                }}
                keyboardType="numeric"
                onChangeText={text => checkTaxIdentification(text)}
                value={taxIdentification}
              />

              <View style={{ justifyContent: 'center' }}>
                <SVG.Icon_edit height={25} width={25} />
              </View>
            </View>

            {toolTipVisible &&
              <TouchableOpacity onPress={() => { setToolTipVisible(false) }}>
                <View style={{ height: "auto", width: 250, backgroundColor: "#0288D1", margin: 12, borderRadius: 12, padding: 8 }}>
                  <View style={[styles.triangle, { marginLeft: 80, borderBottomColor: "#0288D1", }]} />
                  <Text style={{ color: "white", top: -12 }}>Theo quy định thuế của Việt Nam, vui lòng cung cấp chính xác Mã số thuế Thu nhập cá nhân "TNCN" để đảm bảo quyền lợi quyết toán hoàn thuế TNCN cuối năm, nếu có.</Text>
                </View></TouchableOpacity>}



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
          textColor='#323232'
          onDateChange={data => setDate(data)}
        />
        <TouchableOpacity onPress={onPressDate} style={styles.loginTime}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Xác Nhận
          </Text>
        </TouchableOpacity>
      </ModalPoup>

      <ModalPoup visible={modelKYC}>
        <View style={{ alignItems: 'center' }}>
          <SVG.Icon_warning_red height={65} width={65} />
        </View>
        <Text
          style={{
            marginVertical: 12,
            fontSize: 18,
            textAlign: 'center',
            color: '#323232',
          }}>
          Ghi chú: Bạn chưa được duyệt KYC bởi vì ảnh CCCD bị mờ. Xin vui lòng
          upload lại ảnh CCCD.
        </Text>
        <TouchableOpacity
          style={styles.loginTime}
          onPress={() => {
            setModelKYC(false);
          }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Tôi đã hiểu
          </Text>
        </TouchableOpacity>
      </ModalPoup>
      <ModalPoup visible={isModal}>
        <View style={{ alignItems: 'center' }}>
          <SVG.Icon_success height={65} width={65} />
        </View>
        <Text
          style={{
            marginVertical: 4,
            fontSize: 14,
            textAlign: 'center',
            color: '#03AA00',
          }}>
          Yêu cầu xác minh danh tính đã được gửi!
        </Text>
        <Text
          style={{
            marginBottom: 12,
            fontSize: 14,
            textAlign: 'center',
            color: '#323232',
          }}>
          Vui lòng chờ admin kiểm duyệt!
        </Text>
        <TouchableOpacity
          style={styles.loginTime}
          onPress={() => {
            setIsModal(false);
            islod ? setisLod(false) : setisLod(true);
          }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
            Xác Nhận
          </Text>
        </TouchableOpacity>
      </ModalPoup>

    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  triangle: {

    top: -25,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",

  },
  boxWhite: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    marginTop: 2,
    justifyContent: 'space-between',

    paddingHorizontal: 12,
  },
  boxGrey: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 2,
    paddingHorizontal: 12,
  },
  loginBtn: {
    marginTop: 120,
    marginHorizontal: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  loginTime: {
    paddingTop: 12,
    marginHorizontal: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  image: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 12,
    padding: 12,
  },
  imageUpload: {
    alignItems: 'center',

    borderRadius: 10,
    marginTop: 12,
    padding: 12,
  },

  main: {
    backgroundColor: '#EEFAFF',
    height: '100%',
  },
  container: {
    width: '100%',
  },
  content: {
    paddingTop: 35,
    height: '100%',
  },
  textInput: {
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#323232',
  },
});
