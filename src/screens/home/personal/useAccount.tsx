import Snackbar from 'react-native-snackbar';
import PersonalService from '../../../services/personal/personal.service';
import { useState } from 'react';
import Moment from 'moment';
import useLogin from '../../auth/useLogin';
import _, { values } from 'lodash';
import { EnumKYC } from '../../../constants/enum';

export default function useAccount() {
  const { AuthServiceUpdateProfile, AuthServiceRequestKYC } = PersonalService();
  const { getUser } = PersonalService();
  const [email, setEmail] = useState('');

  const [telephone, setTelephone] = useState('');
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState() as any;
  const [districts, setDistrict] = useState() as any;
  const [city, setCity] = useState() as any;
  const [identityCard, setIdentityCard] = useState('');
  const [imageBeforeCard, setImageBeforeCard] = useState(null) as any;
  const [imageAfterCard, setImageAfterCard] = useState(null) as any;
  const [isIdentityCard, setIsIdentityCard] = useState() as any;
  const [identityAddress, setIdentityAddress] = useState() as any;
  const [taxIdentification, setTaxIdentification] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState() as any;
  const [dataProvince, setDataProvince] = useState() as any;
  const [dataDistrict, setDataDistrict] = useState() as any;
  const [status, setStatus] = useState() as any;
  const { province, district } = useLogin();
  const [isModal, setIsModal] = useState(false);
  const [modelKYC, setModelKYC] = useState(false);
  const getDataDistrict = async function (id: any) {
    let districts = await district(Number(id));
    setDataDistrict(
      JSON.parse(
        JSON.stringify(districts, (k, v) =>
          v && typeof v === 'object' ? v : '' + v,
        ),
      ),
    );



  }
  const User = async function () {
    try {
      const result = await getUser();
      if (result.status == 200) {
        let data = result.data;
        let provinces = await province();
        setDataProvince(
          JSON.parse(
            JSON.stringify(provinces, (k, v) =>
              v && typeof v === 'object' ? v : '' + v,
            ),
          ),
        );
        let districts = await district(Number(data.district));
        setDataDistrict(
          JSON.parse(
            JSON.stringify(districts, (k, v) =>
              v && typeof v === 'object' ? v : '' + v,
            ),
          ),
        );


        // export enum EnumKYC {
        //   initialStatus, // trạng thái ban đầu
        //   standbyStatus, //Trạng thái chờ duyệt
        //   incompleteStatus, //Chưa cập nhật xong thông tin
        //   completedStatus, //hoàn thành đã duyệt
        // }
        // setStatus(2);

        setStatus(checkKYC(data.kycRequested, data.kycApproved));
        // setStatus(checkKYC(null, 2));
        setFullname(data.fullname);


        if (data.dob == null) {
          setDob('');
        } else {
          setDob(Moment(data.dob).format('DD/MM/YYYY'));
        }

        setDistrict(data.district.toString());
        setCity(data.city.toString());
        if (!_.isEmpty(data.identityCard)) setIdentityCard(data.identityCard);
        data.identityAddress && setIdentityAddress(data.identityAddress);
        setTaxIdentification(data.taxIdentification);
        if (!_.isEmpty(data.imageBeforeCard)) {
          fetch(data.imageBeforeCard)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64Data = String(reader?.result)?.split(',')[1];

                setImageBeforeCard('data:image/png;base64,' + base64Data);
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              console.error('Error fetching or converting image:', error);
            });
        }

        if (!_.isEmpty(data.imageAfterCard)) {
          fetch(data.imageAfterCard)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64Data = String(reader?.result)?.split(',')[1];
                setImageAfterCard('data:image/png;base64,' + base64Data);
              };
              reader.readAsDataURL(blob);
            })
            .catch(error => {
              console.error('Error fetching or converting image:', error);
            });
        }

        setEmail(data.email);
        setTelephone(data.telephone);

        setIsLoading(true);
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

  const checkKYC = (kycRequested: any, kycApproved: any) => {
    if (kycRequested == null && kycApproved == null) {
      return EnumKYC.initialStatus;
    } else if (kycRequested == null && kycApproved == 2) {
      setTimeout(async () => {
        setModelKYC(true);
      }, 3000);

      return EnumKYC.incompleteStatus;
    } else if (kycRequested == 1 && kycApproved == null) {
      return EnumKYC.standbyStatus;
    } else if (kycRequested == 1 && kycApproved == 1) {
      return EnumKYC.completedStatus;
    }
  };
  const UpdateProfile = async function (data: any, type: any) {
    try {
      setIsLoading(false)
      const result = await AuthServiceUpdateProfile(data);
      if (result.status == 200) {
        type && (await RequestKYC());
        setIsLoading(true)
      }
    } catch (err: any) {

      err.message['identityCard'] != undefined && setIsIdentityCard(err.message['identityCard'][0]);
      setIsLoading(true)
      // Snackbar.show({
      //   text: JSON.stringify(err.message),

      //   duration: Snackbar.LENGTH_LONG,
      //   backgroundColor: '#FFF2F0',
      //   textColor: 'red',
      // });
    } finally {
    }
  };

  const RequestKYC = async function () {
    try {
      const result = await AuthServiceRequestKYC();
      if (result.status == 200) {
        setIsModal(true);
      }
    } catch (err: any) {
      console.log('err------------', JSON.stringify(err));
      Snackbar.show({
        text: JSON.stringify(err.message),

        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFF2F0',
        textColor: 'red',
      });
    } finally {
    }
  };
  return {
    UpdateProfile,
    User,
    isLoading,
    dataUser,
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
    telephone,
    email,
    dataDistrict,
    dataProvince,
    status,
    setStatus,
    modelKYC,
    setModelKYC,
    isModal,
    setIsModal,
    getDataDistrict, isIdentityCard, setIsIdentityCard
  };
}
