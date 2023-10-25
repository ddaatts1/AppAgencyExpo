import { StorageHelper } from '../../constants/storageHelper';
import AuthService from '../../services/auth.service';
import { useAuth } from './AuthContext';
import Snackbar from 'react-native-snackbar';
import React, { useState } from 'react';
import PersonalService from '../../services/personal/personal.service';
import { UserPass } from '../../services/api/auth.dto';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../constants';
import _, { values } from 'lodash';
export default function useLogin() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const {
    AuthServiceLogin,
    AuthServiceLogout,
    AuthServiceForgotPassword,
    getProvince,
    getDistrict,
    AuthServiceRegister,
  } = AuthService();
  const [visible, setVisible] = useState(false);
  // const [isLogout, setIsLogout] = useState(false);
  const [visibleSenMail, setVisibleSenMail] = useState(false);
  const [isIntroModel, setIntroModel] = useState(false);
  const [isLodingRegister, setIsLodingRegister] = useState(false);
  const [isUsername, setIsUsername] = useState() as any;
  const [isEmail, setIsEmail] = useState() as any;
  const [isPasword, setIsPasword] = useState() as any;
  const [dataProvince, setDataProvince] = useState() as any;
  const [dataDistrict, setDataDistrict] = useState() as any;
  const { setAuthStates, setIntros } = useAuth() as any;
  const { getUser } = PersonalService();
  const [isLoading, setIsLoading] = useState(false);
  const [isDistrict, setIsDistrict] = useState(false);
  const [old, setOld] = useState() as any;
  const [fullname, setFullname] = useState() as any;
  const [email, setEmail] = useState() as any;
  const [telephone, setTelephone] = useState() as any;
  const [password, setPassword] = useState() as any;
  const [confirmPassword, setConfirmPassword] = useState() as any;
  const [city, setCity] = useState() as any;

  const [districts, setDistricts] = useState() as any;
  const [dataDistricts, setDataDistricts] = useState() as any;

  const login = async function (username: string, password: string) {
    try {
      const result = await AuthServiceLogin({ username, password });
      if (result.status == 200) {
        StorageHelper.setToken(result?.data?.token);
        let user = await User();

        let dataUser = {
          telephone: user?.data?.telephone,
          email: user?.data?.email,
          isIntro: true,
          product: 0,
        };

        setAuthStates(result?.data?.token, true);
        let rule: any = await StorageHelper.getRules();

        if (_.isEmpty(rule)) {
          await StorageHelper.setRules(JSON.stringify([dataUser]));
          setIntros(true);
        } else {
          let ruleJson = JSON.parse(rule);
          let index = ruleJson.findIndex(
            (item: any) => item.email === username,
          );
          if (index >= 0) {
            if (ruleJson[index]?.isIntro) {
              setIntros(true);
            } else {
              setIntros(false);
            }
          } else {
            let data = [...ruleJson, dataUser];
            await StorageHelper.setRules(JSON.stringify(data));
            setIntros(true);
          }
        }

        // console.log("==================", await StorageHelper.getRules())
      }
    } catch (err: any) {
      if (
        err.message == 'Tài khoản của bạn không tồn tại trên hệ thống!' ||
        err.message == 'Tài khoản không được để trống'
      ) {
        setIsUsername(err.message);
        setIsPasword(null);
      } else {
        setIsPasword(err.message);
        setIsUsername(null);
      }
      // Snackbar.show({
      //   text: err.message,

      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: '#FFF2F0',
      //   textColor: "red",

      // });
    } finally {
    }
  };

  const register = async function (data: any, referCode: String) {
    try {
      console.log("--------------------")
      setIsLodingRegister(true);
      setOld(),
        setFullname(),
        setEmail(),
        setTelephone(),
        setPassword(),
        setConfirmPassword();
      setCity(), setDistricts();
      if (referCode == "") {
        referCode = "dfsdfsdfsdf";
        setOld("Mã giới thiệu không được để trống");
      }
      const result = await AuthServiceRegister(data, referCode);
      if (result.status == 200) {
        await setTimeout(async () => {
          setIsLodingRegister(false);
        }, 3000);

        setIntroModel(true);
        //  StorageHelper.setRules("true")
        //  setIntros()
        await StorageHelper.clearUsePas();
        const dataUserPass: UserPass = {
          isSwitch: true,
          password: data.password,
          username: data.email,
        };
        await StorageHelper.setUsePass(dataUserPass);
      }
    } catch (err: any) {
      setIsLodingRegister(false);
      console.log('err--------------', err);
      err.message['error'] != undefined && setOld(err.message['error'][0]);
      err.message['fullname'] != undefined &&
        setFullname(err.message['fullname'][0]);

      err.message['old'] != undefined && setOld(err.message['old'][0]);
      err.message['email'] != undefined && setEmail(err.message['email'][0]);
      err.message['password'] != undefined &&
        setPassword(err.message['password'][0]);
      err.message['telephone'] != undefined &&
        setTelephone(err.message['telephone'][0]);
      err.message['confirmPassword'] != undefined &&
        setConfirmPassword(err.message['confirmPassword'][0]);
      err.message['city'] != undefined && setCity(err.message['city'][0]);
      err.message['district'] != undefined &&
        setDistricts(err.message['district'][0]);
    } finally {
    }
  };
  const User = async function () {
    try {
      const result = await getUser();
      if (result.status == 200) {
        StorageHelper.setUser(result.data);
        return result;
      }
    } catch (err: any) {
      Snackbar.show({
        text: err.message,

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    } finally {
    }
  };
  const checkRule = async function () {
    try {
      const intro: any = await StorageHelper.getRules();
      const user: any = await StorageHelper.getUser();
      let ruleJson = JSON.parse(intro);
      let userJson = JSON.parse(user);
      let ruleItem = ruleJson?.findIndex(
        (item: any) => item.email === userJson?.email,
      );

      if (ruleItem >= 0) {
        if (ruleJson[ruleItem]?.isIntro) {
          return true;
        } else {
          return false;
        }
      }
    } catch (err: any) { }
  };
  const getRulesStorage = async function () {
    try {
      const intro: any = await StorageHelper.getRules();
      const user: any = await StorageHelper.getUser();
      let ruleJson = JSON.parse(intro);
      let userJson = JSON.parse(user);
      let ruleItem = ruleJson?.findIndex(
        (item: any) => item.email === userJson?.email,
      );

      if (ruleItem >= 0) {
        if (ruleJson[ruleItem]?.isIntro) {
          return ruleJson[ruleItem];
        } else {
          return null;
        }
      }
    } catch (err: any) {
      return null;
    }
  };
  const logout = async (navigation: any) => {
    try {
      const result = await AuthServiceLogout();
      if (result.status == 200) {
        StorageHelper.clearSession();
        setAuthStates(null, false);
        setIntros(false);
        navigation.navigate(ROUTES.LOGIN);
        // isLogout ? setIsLogout(false) : setIsLogout(true)
      }
    } catch (err: any) { }
    return null;
  };
  const forgotPassword = async function (data: any) {
    try {
      const result = await AuthServiceForgotPassword(data);
      if (result.status == 200) {
        setVisible(true);
        const presentTime: any = new Date();
        await StorageHelper.setTimeForgotPass(JSON.stringify(presentTime));
        await setTimeout(async () => {
          setVisible(false);
          setVisibleSenMail(true);
        }, 3000);
      }
    } catch (err: any) {
      setIsEmail(err.message);
    } finally {
    }
  };
  const getDataProvinces = async function () {

    try {
      const result = await getProvince();

      if (result.status == 200) {

        setDataProvince(JSON.parse(
          JSON.stringify(result?.data, (k, v) =>
            v && typeof v === 'object' ? v : '' + v,
          ),
        ),);
        setIsLoading(true)
        return result?.data;
      }
    } catch (err: any) {
      Snackbar.show({
        text: err.message,

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    } finally {
    }

  }
  async function province() {
    try {
      const result = await getProvince();

      if (result.status == 200) {
        return result?.data;
      }
    } catch (err: any) {
      Snackbar.show({
        text: err.message,

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    } return null;

  }

  const getDistricts = async (id: Number) => {
    try {
      const result = await getDistrict(id);

      if (result.status == 200) {


        setDataDistricts(JSON.parse(
          JSON.stringify(result?.data, (k, v) =>
            v && typeof v === 'object' ? v : '' + v,
          ),
        ),);
        setIsDistrict(true)
        return result?.data;
      }
    } catch (err: any) {
      Snackbar.show({
        text: err.message,

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    }
    return null;
  };
  const district = async (id: Number) => {
    try {
      const result = await getDistrict(id);

      if (result.status == 200) {
        return result?.data;
      }
    } catch (err: any) {
      Snackbar.show({
        text: err.message,

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    }
    return null;
  };
  return {
    login,
    logout,
    forgotPassword,
    visible,
    setVisible,
    User,
    visibleSenMail,
    setVisibleSenMail,
    province,
    district,
    dataProvince,
    setDataProvince,
    register,
    isIntroModel,
    setIntroModel,
    isPasword,
    isUsername,
    checkRule,
    isEmail,
    setIsEmail,
    old,
    setOld,
    fullname,
    email,
    telephone,
    password,
    confirmPassword,
    city,
    districts,
    isLodingRegister,
    setTelephone,
    setIsUsername,
    setIsPasword,
    setCity,
    getDataProvinces,
    isLoading, getDistricts, isDistrict,
    dataDistricts, setEmail, setFullname, setPassword, setDistricts, setConfirmPassword,
    getRulesStorage,
  };
}
