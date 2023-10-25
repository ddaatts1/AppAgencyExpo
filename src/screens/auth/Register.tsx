import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  Button,
  FlatList,
  TextInput,
  Linking
} from 'react-native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { COLORS, ROUTES, STYLES, SVG } from '../../constants';
import CustomInput from '../../components/commons/customInput';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import ModalPoup from '../../components/commons/modalPoup';
import CustomSearchDropdown from '../../components/commons/customSearchDropdown';
import useLogin from './useLogin';
import ErrorText from '../../components/commons/errorText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingReact from '../../components/commons/loading';
import Hyperlink from 'react-native-hyperlink';
import CustomLocation from '../../components/commons/customLocation';
import CustomSearchLG from '../../components/commons/CustomSerchLG';
import {
  useIsFocused,
} from '@react-navigation/native';
const Register = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const {

    province,
    register,
    isIntroModel,
    setIntroModel,
    old,
    fullname,
    email,
    telephone,
    password,
    confirmPassword,
    city,
    districts,
    isLodingRegister,
    setTelephone,
    dataProvince,
    setCity,
    isLoading, isDistrict,
    dataDistricts,
    getDataProvinces,
    getDistricts,
    setOld,
    setEmail,

    setFullname, setPassword, setDistricts, setConfirmPassword,
  } = useLogin();

  const [olds, setOlds] = useState('');
  const [fullnames, setFullnames] = useState('');
  const [emails, setEmails] = useState('');
  const [telephones, setTelephones] = useState('');
  const [passwords, setPasswords] = useState('');
  const [confirmPasswords, setConfirmPasswords] = useState('');
  const [citys, setCitys] = useState()
  const [valueDistricts, setValueDistrict] = useState();
  const [referCode, setReferCode] = useState('');
  const [isNewPasswordIcon, setIsNewPasswordIcon] = useState(true);
  const [isConfirmPasswordIcon, setIsConfirmPasswordIcon] = useState(true);


  const onIntro = async () => {
    setIntroModel(false);
    navigation.navigate(ROUTES.LOGIN, {
      id: 1,
    });
  };
  async function checktelephones(text: any) {
    if (text.charAt(0) === '0') {
      setTelephones(text)
      if (/^\d+$/.test(text) && text.length >= 8 && text.length <= 12) {
        setTelephone('');
      } else {
        setTelephone('Số điện thoại không hợp lệ');
      }
    } else {
      setTelephone('SĐT không bắt đầu bằng 0');
    }



  }
  async function setValueCity(id: any) {
    setCitys(id)
    getDistricts(id)
  }
  async function onSubmit() {

    const data = {
      old: referCode,
      fullname: fullnames,
      telephone: telephones,
      email: emails,
      city: citys == undefined ? null : citys,
      district: districts == undefined ? null : districts,
      password: passwords,
      confirmPassword: confirmPasswords,
      type: 'App',
    };
    if (telephone == "" || telephone == undefined) {
      await register(data, referCode);
    }

  }
  useEffect(() => {
    const fetchData = async () => {
      await getDataProvinces();
    };
    fetchData();
  }, []);

  const handlePress = () => {
    Linking.openURL('https://startup40.com/posts/chinh-sach-va-dieu-khoan/25');
  };
  // setPassword,setDistricts,setConfirmPassword
  const CheckValue = (text: any, type: any) => {
    if (type == 'city') {
      return setCity('')
    } else if (type == 'district') {
      setValueDistrict(text)
      return setDistricts('');
    } else if (type == 'old') {
      setReferCode(text)
      return setOld('');
    } else if (type == 'fullnames') {
      setFullnames(text)
      return setFullname('');
    } else if (type == 'emails') {
      setEmails(text)
      return setEmail('');
    } else if (type == 'passwords') {
      setPasswords(text)
      return setPassword('');
    } else if (type == 'confirmPasswords') {
      setConfirmPasswords(text)
      return setConfirmPassword('');
    }

  };
  return (
    <>
      {isLoading ? (
        <ScrollView style={styles.main}>
          <View style={styles.container}>
            <View
              style={{
                backgroundColor: '#14B0FC',
                justifyContent: 'center',
                flexDirection: 'column',
                paddingBottom: 50,
              }}>
              <SVG.Header width="100%" style={styles.container} />
              <SVG.LogoWhite style={{ alignSelf: 'center' }} />
            </View>
            <View style={styles.wFull}>
              <Text style={styles.loginContinueTxt}>Đăng ký</Text>



              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  Mã giới thiệu<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_barcode />
                  </View>
                  <TextInput
                    style={STYLES.style_input.textInput}
                    value={referCode}
                    onChangeText={text => {
                      CheckValue(text, 'old')
                    }}
                  />
                </View>
                {old && <ErrorText textName={old} />}
              </View>

              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  Họ và tên<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_user />
                  </View>
                  <TextInput
                    style={STYLES.style_input.textInput}
                    value={fullnames}
                    onChangeText={text => CheckValue(text, 'fullnames')}
                  />
                </View>
                {fullname && <ErrorText textName={fullname} />}
              </View>



              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  Số điện thoại<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_phone_blue />
                  </View>
                  <TextInput
                    style={STYLES.style_input.textInput}
                    value={telephones}
                    keyboardType="numeric"
                    onChangeText={text => checktelephones(text)}
                  />
                </View>
                {telephone && <ErrorText textName={telephone} />}
              </View>


              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  email<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_mail />
                  </View>
                  <TextInput
                    style={STYLES.style_input.textInput}
                    value={emails}
                    onChangeText={text => CheckValue(text, 'emails')}
                  />
                </View>
                {email && <ErrorText textName={email} />}
              </View>

              <View >
                <CustomLocation
                  isIconLeft={true}
                  iconLeft={<SVG.Icon_location />}
                  value={citys}
                  data={dataProvince}
                  isIcon
                  isValid={true}
                  name="city"
                  title="Tỉnh/Thành phố"
                  setValue={setValueCity}
                />
              </View>
              {city && <ErrorText textName={city} />}

              {isDistrict ? <CustomLocation
                isIconLeft={true}
                iconLeft={<SVG.Icon_location />}
                value={valueDistricts}
                data={dataDistricts}
                isIcon
                isValid={isDistrict}
                name="district"
                title="Quận/Huyện"
                setValue={setValueDistrict}
              /> : <View>
                <Text
                  style={[
                    STYLES.text_16.text,
                    { paddingTop: 12 },
                  ]}>
                  Quận/Huyện
                  <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={[styles.viewDiplay, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }]}>
                  <SVG.Icon_location height={25} width={25} />
                  <SVG.Icon_next_grey height={25} width={25} />
                </View></View>}
              {districts && <ErrorText textName={districts} />}

              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  Mật khẩu<Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_key />
                  </View>
                  <TextInput
                    style={[STYLES.style_input.textInput, { width: '80%' }]}
                    secureTextEntry={isNewPasswordIcon}
                    value={passwords}
                    onChangeText={text => CheckValue(text, 'passwords')}
                  />
                  <AntDesign
                    onPress={() => {
                      isNewPasswordIcon
                        ? setIsNewPasswordIcon(false)
                        : setIsNewPasswordIcon(true);
                    }}
                    style={[
                      isConfirmPasswordIcon
                        ? STYLES.style_input.icon_right
                        : STYLES.style_input.icon_right_color,
                      {},
                    ]}
                    name={'eye'}
                    size={20}
                  />
                </View>
                {password && <ErrorText textName={password} />}
              </View>
              <View style={{ paddingTop: 12 }}>
                <Text style={STYLES.text_16.text}>
                  Xác nhận mật khẩu mới
                  <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <View style={STYLES.style_input.view}>
                  <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                    <SVG.Icon_key />
                  </View>
                  <TextInput
                    style={[STYLES.style_input.textInput, { width: '80%' }]}
                    secureTextEntry={isConfirmPasswordIcon}
                    value={confirmPasswords}
                    onChangeText={text => CheckValue(text, 'confirmPasswords')}
                  />
                  <AntDesign
                    onPress={() => {
                      isConfirmPasswordIcon
                        ? setIsConfirmPasswordIcon(false)
                        : setIsConfirmPasswordIcon(true);
                    }}
                    style={[
                      isConfirmPasswordIcon
                        ? STYLES.style_input.icon_right
                        : STYLES.style_input.icon_right_color,
                      {},
                    ]}
                    name={'eye'}
                    size={20}
                  />
                </View>
                {confirmPassword && (
                  <ErrorText textName={confirmPassword} />
                )}
              </View>


              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  textAlign: 'center',
                }}>
                Lưu ý: Bằng việc đăng ký bạn đã đồng ý với tất cả các

                <TouchableOpacity onPress={handlePress}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#F91414',
                      textDecorationLine: 'underline',
                    }}>
                    {' '}
                    điều khoản, chính sách
                  </Text></TouchableOpacity>
                {' '}
                bảo mật thông tin.
              </Text>
              <View style={{ paddingBottom: 12, paddingTop: 12 }}>
                <TouchableOpacity
                  onPress={onSubmit}
                  style={styles.loginBtn}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name={'logout'} size={25} color="white" />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        paddingLeft: 10,
                      }}>
                      Đăng ký
                    </Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 16,
                    paddingTop: 12,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[{ fontSize: 16, color: '#525252' }]}>
                    Bạn đã có tài khoản?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#0288D1',
                        fontWeight: 'bold',
                      }}>
                      Đăng nhập ngay!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>



            </View>

            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ModalPoup visible={isIntroModel}>
                <View style={{ alignItems: 'center' }}>
                  <SVG.Email />
                </View>

                <Text
                  style={{
                    marginVertical: 20,
                    fontSize: 20,
                    textAlign: 'center',
                    color: '#009C10',
                  }}>
                  Đăng ký thành công
                </Text>
                <TouchableOpacity
                  onPress={() => onIntro()}
                  style={styles.loginBtn}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 16,
                        paddingLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      Ok
                    </Text>
                  </View>
                </TouchableOpacity>
              </ModalPoup>
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    color: '#525252',
  },
  viewDiplay: {
    width: '100%',
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#EEEEEE',
    borderColor: '#EEFAFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  appBar: {
    height: 192,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  haveAccountButton: {
    alignSelf: 'center',
  },

  ///
  main: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: '#0288D1',
    paddingTop: 25,
    paddingBottom: 25,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles

  linearGradient: {
    width: '100%',
    borderRadius: 15,
  },
  loginBtn: {
    marginBottom: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
    marginTop: -12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },

  mr7: {
    marginRight: 7,
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },

  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});


const datafake =
  '[{ "id": 1, "name": "Thành phố Hà Nội" }, { "id": 2, "name": "Tỉnh Hà Giang" }, { "id": 4, "name": "Tỉnh Cao Bằng" }, { "id": 6, "name": "Tỉnh Bắc Kạn" }, { "id": 8, "name": "Tỉnh Tuyên Quang" }, { "id": 10, "name": "Tỉnh Lào Cai" }, { "id": 11, "name": "Tỉnh Điện Biên" }, { "id": 12, "name": "Tỉnh Lai Châu" }, { "id": 14, "name": "Tỉnh Sơn La" }, { "id": 15, "name": "Tỉnh Yên Bái" }, { "id": 17, "name": "Tỉnh Hòa Bình" }, { "id": 19, "name": "Tỉnh Thái Nguyên" }, { "id": 20, "name": "Tỉnh Lạng Sơn" }, { "id": 22, "name": "Tỉnh Quảng Ninh" }, { "id": 24, "name": "Tỉnh Bắc Giang" }, { "id": 25, "name": "Tỉnh Phú Thọ" }, { "id": 26, "name": "Tỉnh Vĩnh Phúc" }, { "id": 27, "name": "Tỉnh Bắc Ninh" }, { "id": 30, "name": "Tỉnh Hải Dương" }, { "id": 31, "name": "Thành phố Hải Phòng" }, { "id": 33, "name": "Tỉnh Hưng Yên" }, { "id": 34, "name": "Tỉnh Thái Bình" }, { "id": 35, "name": "Tỉnh Hà Nam" }, { "id": 36, "name": "Tỉnh Nam Định" }, { "id": 37, "name": "Tỉnh Ninh Bình" }, { "id": 38, "name": "Tỉnh Thanh Hóa" }, { "id": 40, "name": "Tỉnh Nghệ An" }, { "id": 42, "name": "Tỉnh Hà Tĩnh" }, { "id": 44, "name": "Tỉnh Quảng Bình" }, { "id": 45, "name": "Tỉnh Quảng Trị" }, { "id": 46, "name": "Tỉnh Thừa Thiên Huế" }, { "id": 48, "name": "Thành phố Đà Nẵng" }, { "id": 49, "name": "Tỉnh Quảng Nam" }, { "id": 51, "name": "Tỉnh Quảng Ngãi" }, { "id": 52, "name": "Tỉnh Bình Định" }, { "id": 54, "name": "Tỉnh Phú Yên" }, { "id": 56, "name": "Tỉnh Khánh Hòa" }, { "id": 58, "name": "Tỉnh Ninh Thuận" }, { "id": 60, "name": "Tỉnh Bình Thuận" }, { "id": 62, "name": "Tỉnh Kon Tum" }, { "id": 64, "name": "Tỉnh Gia Lai" }, { "id": 66, "name": "Tỉnh Đắk Lắk" }, { "id": 67, "name": "Tỉnh Đắk Nông" }, { "id": 68, "name": "Tỉnh Lâm Đồng" }, { "id": 70, "name": "Tỉnh Bình Phước" }, { "id": 72, "name": "Tỉnh Tây Ninh" }, { "id": 74, "name": "Tỉnh Bình Dương" }, { "id": 75, "name": "Tỉnh Đồng Nai" }, { "id": 77, "name": "Tỉnh Bà Rịa - Vũng Tàu" }, { "id": 79, "name": "Thành phố Hồ Chí Minh" }, { "id": 80, "name": "Tỉnh Long An" }, { "id": 82, "name": "Tỉnh Tiền Giang" }, { "id": 83, "name": "Tỉnh Bến Tre" }, { "id": 84, "name": "Tỉnh Trà Vinh" }, { "id": 86, "name": "Tỉnh Vĩnh Long" }, { "id": 87, "name": "Tỉnh Đồng Tháp" }, { "id": 89, "name": "Tỉnh An Giang" }, { "id": 91, "name": "Tỉnh Kiên Giang" }, { "id": 92, "name": "Thành phố Cần Thơ" }, { "id": 93, "name": "Tỉnh Hậu Giang" }, { "id": 94, "name": "Tỉnh Sóc Trăng" }, { "id": 95, "name": "Tỉnh Bạc Liêu" }, { "id": 96, "name": "Tỉnh Cà Mau" }]';
