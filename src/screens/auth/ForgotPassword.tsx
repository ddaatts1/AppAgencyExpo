import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, TextInput } from 'react-native';
import ModalPoup from '../../components/commons/modalPoup';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, ROUTES, STYLES, SVG } from '../../constants';
import useLogin from './useLogin';
import ErrorText from '../../components/commons/errorText';
import { StorageHelper } from '../../constants/storageHelper';

const ForgotPassword = ({ navigation }: any) => {

  const { forgotPassword, visible, visibleSenMail, setVisibleSenMail, isEmail, setIsEmail } = useLogin()

  const [email, setEmail] = useState('')


  // const [isChechTime, setIsChechTime] = useState(false)
  async function onSubmit() {
    let data = { email: email }

    // isChechTime && forgotPassword(data)
    forgotPassword(data)

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data: any = await StorageHelper.getTimeForgotPass();
        // if (data) {
        //   const pastDate: any = new Date(JSON.parse(data));
        //   const presentTime: any = new Date();
        //   const timeDifference = presentTime - pastDate;
        //   const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        //   if (minutes >= 60) {
        //     setIsChechTime(true)
        //   } else {

        //     setIsEmail("Vui lòng quay lại sau " + (60 - minutes).toString() + " phút.")
        //     setIsChechTime(false)
        //   }

        // } else {
        //   setIsChechTime(true)
        // }
      } catch (error) { }
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <View
          style={{
            height: 150,
            backgroundColor: '#14B0FC',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <SVG.LogoWhite style={{ alignSelf: 'center' }} />
        </View>
        <View style={styles.wFull}>
          <Text style={styles.loginContinueTxt}>Lấy lại mật khẩu</Text>

          <View style={{ paddingTop: 12 }}><Text style={STYLES.text_16.text}>Vui lòng nhập Email đã đăng ký với tài khoản</Text>
            <View style={STYLES.style_input.view}>
              <View style={{ paddingLeft: 10, paddingTop: 15, }}>
                <SVG.Icon_user />
              </View>
              <TextInput
                style={STYLES.style_input.textInput}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            {isEmail && <ErrorText textName={isEmail} />}
          </View>
          <View
            style={{ paddingBottom: 12, paddingTop: 12, height: 120 }} />

          <View style={{ paddingBottom: 12, paddingTop: 12 }}>
            <TouchableOpacity
              onPress={onSubmit}
              style={styles.loginBtn}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}>
                  Lấy lại mật khẩu
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>



            <ModalPoup visible={visible}>
              <Text
                style={{
                  marginVertical: 2,
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#323232',
                  marginBottom: 24,
                }}>
                Bạn vừa gửi yêu cầu, vui lòng kiểm tra email trước khi thử lại
              </Text>

            </ModalPoup>

            <ModalPoup visible={visibleSenMail}>


              <View style={{ alignItems: 'center' }}>
                <SVG.Email />
              </View>

              <Text style={{ marginVertical: 20, fontSize: 16, textAlign: 'center', color: "#323232" }}>
                Vui lòng kiểm tra hòm thư email của bạn để nhận đường link lấy lại mật khẩu
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVisibleSenMail(false)
                  navigation.navigate(ROUTES.LOGIN)
                }}
                style={styles.loginBtn}>
                <View style={{ flexDirection: "row", }}>

                  <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Ok</Text>
                </View>
              </TouchableOpacity>
            </ModalPoup>

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    color: '#525252',
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
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
    marginBottom: 24,
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
});
