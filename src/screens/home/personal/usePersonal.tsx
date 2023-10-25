import Snackbar from 'react-native-snackbar';
import React, { useState } from 'react';
import PersonalService from '../../../services/personal/personal.service';
import useLogin from '../../auth/useLogin';

export default function usePersonal() {
  const [visible, setVisible] = useState(false);

  const { AuthServiceChangePassword, AuthServiceUpdateProfile, getUser } =
    PersonalService();

  const [isPassword, setiSPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState('');
  const [iSConfirmPassword, setisConfirmPassword] = useState('');
  const [iSChangePassword, setisChangePassword] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [dataUser, setDataUser] = useState() as any;
  const ChangePassword = async function (data: any) {
    try {
      const result = await AuthServiceChangePassword(data);
      if (result.status == 200) {
        setisChangePassword(true);
        // Snackbar.show({
        //   text: 'Cập nhật mật khẩu thành công',

        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: '#22B265',
        //   textColor: '#FFFFFF',
        // });
      }
    } catch (err: any) {
      console.log('err.message-----------', err.message);
      setiSPassword(err.message);
      setIsNewPassword(''), setisConfirmPassword('');
    } finally {
    }
  };


  const User = async function () {
    try {
      const result = await getUser();
      if (result.status == 200) {
        setDataUser(result.data)
        setIsLoadingUser(true)
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
  // const UpdateProfile = async function (data: any) {
  //   console.log('data---------------', data);
  //   try {
  //     const formData = new FormData();
  //     formData.append('fullname', data.fullname);
  //     formData.append('dob', data.dob);
  //     formData.append('district', data.district);
  //     formData.append('city', data.city);
  //     formData.append('identityCard', data.identityCard);
  //     formData.append('identityAddress', data.identityAddress);
  //     formData.append('taxIdentification', data.taxIdentification);
  //     if (data.imageAfterCard != null)
  //       formData.append('imageAfterCard', data.imageAfterCard);
  //     if (data.imageBeforeCard != null)
  //       formData.append('imageBeforeCard', data.imageBeforeCard);
  //     const result = await AuthServiceUpdateProfile(formData);
  //     if (result.status == 200) {
  //       await User();
  //       Snackbar.show({
  //         text: 'Cập nhật mật khẩu thành công',

  //         duration: Snackbar.LENGTH_LONG,
  //         backgroundColor: '#22B265',
  //         textColor: '#FFFFFF',
  //       });
  //     }
  //   } catch (err: any) {
  //     console.log('err------------', JSON.stringify(err.message[0]));
  //     Snackbar.show({
  //       text: JSON.stringify(err.message),

  //       duration: Snackbar.LENGTH_LONG,
  //       backgroundColor: '#FFF2F0',
  //       textColor: 'red',
  //     });
  //   } finally {
  //   }
  // };

  return {
    visible,
    setVisible,
    ChangePassword,
    // UpdateProfile,
    isPassword,
    setiSPassword,
    isNewPassword,
    setIsNewPassword,
    iSConfirmPassword,
    setisConfirmPassword,
    iSChangePassword,
    dataUser,
    isLoadingUser,
    User
  };
}
