
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { STYLES, SVG } from '../../../constants';
import * as yup from 'yup';
import usePersonal from './usePersonal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ErrorText from '../../../components/commons/errorText';
import { useState } from 'react';
import ModalPoup from '../../../components/commons/modalPoup';
import useLogin from '../../auth/useLogin';
import { ScrollView } from 'react-native-gesture-handler';

const ChangePassword = ({ navigation }: any) => {
  const { ChangePassword, isPassword, setiSPassword, isNewPassword, setIsNewPassword, iSConfirmPassword, setisConfirmPassword, iSChangePassword } = usePersonal();
  const { logout } = useLogin()
  const [password, setPassword] = useState('');
  const [isPasswordIcon, setIsPasswordIcon] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [isNewPasswordIcon, setIsNewPasswordIcon] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordIcon, setIsConfirmPasswordIcon] = useState(true);

  async function onSubmit() {

    if (password.length > 32 || newPassword.length > 32 || password.length < 6 || newPassword.length < 6 || newPassword != confirmPassword) {
      password.length > 32 || password.length < 6 ? setiSPassword("Mật khẩu yêu cầu độ dài 6 - 32 kí tự") : setiSPassword("")
      newPassword.length > 32 || newPassword.length < 6 ? setIsNewPassword("Mật khẩu yêu cầu độ dài 6 - 32 kí tự") : setIsNewPassword("")
      if (newPassword != confirmPassword) {

        setisConfirmPassword("Mật khẩu không trùng khớp")
      } else {
        setisConfirmPassword("")
      }
    } else {
      const data = {
        password: password,
        newPassword: newPassword,
      };
      await ChangePassword(data);
    }




  }

  const CheckValue = (text: any, type: any) => {
    if (type == 'password') {
      setPassword(text)
      return setiSPassword('')
    } else if (type == 'newPassword') {
      setNewPassword(text)
      return setIsNewPassword('');
    } else if (type == 'confirmPassword') {
      setConfirmPassword(text)
      return setisConfirmPassword('');
    }

  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>

        <View style={{ paddingTop: 12 }}><Text style={STYLES.text_16.text}>Mật khẩu hiện tại<Text style={{ color: "red" }}>*</Text></Text>
          <View style={STYLES.style_input.view}>
            <View style={{ paddingLeft: 10, paddingTop: 15, }}>
              <SVG.Icon_key />
            </View>
            <TextInput
              style={[STYLES.style_input.textInput, { width: "80%" }]}
              secureTextEntry={isPasswordIcon}
              value={password}
              onChangeText={text => CheckValue(text, "password")}
            />
            <AntDesign
              onPress={() => {
                isPasswordIcon ? setIsPasswordIcon(false) : setIsPasswordIcon(true);
              }}
              style={
                [isPasswordIcon
                  ? STYLES.style_input.icon_right
                  : STYLES.style_input.icon_right_color,
                {}]
              }
              name={"eye"}
              size={20}
            />
          </View>
          {isPassword && <ErrorText textName={isPassword} />}

        </View>
        <View style={{ paddingTop: 12 }}><Text style={STYLES.text_16.text}>Mật khẩu mới<Text style={{ color: "red" }}>*</Text></Text>
          <View style={STYLES.style_input.view}>
            <View style={{ paddingLeft: 10, paddingTop: 15, }}>
              <SVG.Icon_key />
            </View>
            <TextInput
              style={[STYLES.style_input.textInput, { width: "80%" }]}
              secureTextEntry={isNewPasswordIcon}
              value={newPassword}
              onChangeText={text => CheckValue(text, "newPassword")}
            />
            <AntDesign
              onPress={() => {
                isNewPasswordIcon ? setIsNewPasswordIcon(false) : setIsNewPasswordIcon(true);
              }}
              style={
                [isConfirmPasswordIcon
                  ? STYLES.style_input.icon_right
                  : STYLES.style_input.icon_right_color,
                {}]
              }
              name={"eye"}
              size={20}
            />
          </View>
          {isNewPassword && <ErrorText textName={isNewPassword} />}

        </View>
        <View style={{ paddingTop: 12 }}><Text style={STYLES.text_16.text}>Xác nhận mật khẩu mới<Text style={{ color: "red" }}>*</Text></Text>
          <View style={STYLES.style_input.view}>
            <View style={{ paddingLeft: 10, paddingTop: 15, }}>
              <SVG.Icon_key />
            </View>
            <TextInput
              style={[STYLES.style_input.textInput, { width: "80%" }]}
              secureTextEntry={isConfirmPasswordIcon}
              value={confirmPassword}
              onChangeText={text => CheckValue(text, "confirmPassword")}
            />
            <AntDesign
              onPress={() => {
                isConfirmPasswordIcon ? setIsConfirmPasswordIcon(false) : setIsConfirmPasswordIcon(true);
              }}
              style={
                [isConfirmPasswordIcon
                  ? STYLES.style_input.icon_right
                  : STYLES.style_input.icon_right_color,
                {}]
              }
              name={"eye"}
              size={20}
            />
          </View>
          {iSConfirmPassword && <ErrorText textName={iSConfirmPassword} />}

        </View>
        <View style={{ bottom: 0, height: '10%', marginTop: 12 }}>
          <TouchableOpacity onPress={onSubmit} style={styles.btn}>
            <View style={{ flexDirection: 'row', }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  paddingLeft: 10,
                }}>
                Cập nhật
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ModalPoup visible={iSChangePassword}>
          <View style={{ alignItems: 'center' }}>
            <SVG.Icon_success height={65} width={65} />
          </View>
          <Text style={{ marginVertical: 12, fontSize: 18, textAlign: 'center', color: "#323232" }}>
            Bạn vừa đổi mật khẩu thành công, vui lòng đăng nhập lại!
          </Text>
          <TouchableOpacity style={styles.loginTime} onPress={() => {
            logout(navigation)
          }}>

            <Text
              style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
              Xác Nhận
            </Text>

          </TouchableOpacity>
        </ModalPoup>

      </View></ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  loginTime: {

    marginHorizontal: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
    marginBottom: 12
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  main: {
    backgroundColor: 'white',
  },
  container: {
    paddingTop: 42,
    paddingHorizontal: 12,
    width: '100%',
  },
});
