import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { COLORS, ROUTES, STYLES, SVG } from '../../constants';
import {
  ParamListBase,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { Switch } from 'react-native-gesture-handler';
import useLogin from './useLogin';
import React, { useState, useEffect, useRef } from 'react';
import { StorageHelper } from '../../constants/storageHelper';
import { UserPass } from '../../services/api/auth.dto';
import ErrorText from '../../components/commons/errorText';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Login = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSwitch, setIsSwitch] = useState(false);
  const [username, setUsetname] = useState('');
  const [password, setPassword] = useState('');
  const [checkInconRight, setInconRight] = useState(true);
  const { login, isPasword, isUsername, setIsUsername,
    setIsPasword } = useLogin();

  const focus = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await StorageHelper.getUsePass();

        // let rule: any = await StorageHelper.getRules();

        if (data) {

          const value = JSON.parse(data);

          if (value.isSwitch == true) {
            setIsSwitch(value.isSwitch);
            setPassword(value.password);
            setUsetname(value.username);
          }

        }
      } catch (error) { }
    };
    fetchData();
  }, [focus]);
  async function onSubmit() {
    login(username, password);
    const dataUserPass: UserPass = {
      isSwitch: isSwitch,
      password: password,
      username: username,
    };
    StorageHelper.clearUsePas();
    StorageHelper.setUsePass(dataUserPass);
  }

  async function checkPassword(text: any) {
    setIsPasword("")
    setPassword(text)
  }
  async function checkUsetname(text: any) {
    setIsUsername("")
    setUsetname(text)
  }

  return (
    <ScrollView style={styles.main}>
      <StatusBar
        backgroundColor="transparent"
        animated={true}
        barStyle={'dark-content'}
        translucent={true}
      />
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
          <Text style={styles.loginContinueTxt}>Đăng nhập</Text>

          <View style={{ paddingTop: 12 }}>
            <Text style={STYLES.text_16.text}>Email hoặc Số điện thoại</Text>
            <View style={STYLES.style_input.view}>
              <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                <SVG.Icon_user />
              </View>
              <TextInput
                style={STYLES.style_input.textInput}
                value={username}
                onChangeText={text => checkUsetname(text)}
              />
            </View>
            {isUsername && <ErrorText textName={isUsername} />}
          </View>

          <View style={{ paddingTop: 12 }}>
            <Text style={STYLES.text_16.text}>Mật khẩu</Text>
            <View style={STYLES.style_input.view}>
              <View style={{ paddingLeft: 10, paddingTop: 15 }}>
                <SVG.Icon_key />
              </View>
              <TextInput
                style={[STYLES.style_input.textInput, { width: '84%' }]}
                secureTextEntry={checkInconRight}
                value={password}
                onChangeText={text => checkPassword(text)}
              />
              <AntDesign
                onPress={() => {
                  checkInconRight ? setInconRight(false) : setInconRight(true);
                }}
                style={[
                  checkInconRight
                    ? STYLES.style_input.icon_right
                    : STYLES.style_input.icon_right_color,
                  {},
                ]}
                name={'eye'}
                size={20}
              />
            </View>
            {isPasword && <ErrorText textName={isPasword} />}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 16,
              paddingTop: 12,
            }}>
            <Switch
              thumbColor={'white'}
              trackColor={{ false: '#767577', true: '#0288D1' }}
              onValueChange={values =>
                values ? setIsSwitch(true) : setIsSwitch(false)
              }
              value={isSwitch}
            />
            <Text style={[{ textAlign: 'left', flex: 1, color: "#525252" }]}> Lưu đăng nhập</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
              <Text style={[{ textAlign: 'right', fontSize: 16, color: "#525252" }]}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingBottom: 12, paddingTop: 12 }}>
            <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name={'logout'} size={25} color="white" />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}>
                  Đăng nhập
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 16,
                paddingTop: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, color: '#525252' }}>
                Bạn chưa có tài khoản?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#0288D1',
                    fontWeight: 'bold',
                  }}>
                  Đăng ký ngay!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
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
