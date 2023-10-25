import Snackbar from 'react-native-snackbar';
import PersonalService from '../../../services/personal/personal.service';
import {useState} from 'react';
import Moment from 'moment';
import useLogin from '../../auth/useLogin';
import _, {values} from 'lodash';
import {StorageHelper} from '../../../constants/storageHelper';

export default function useReceiver() {
  const {getUser} = PersonalService();
  const [telephone, setTelephone] = useState('');
  const [fullname, setFullname] = useState('');
  const [districts, setDistrict] = useState() as any;
  const [city, setCity] = useState() as any;
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {province, district} = useLogin();
  const Receiver = async function () {
    try {
      let getReceiver: any = await StorageHelper.getReceiver();
      if (_.isEmpty(getReceiver)) {
        const result = await getUser();
        if (result.status == 200) {
          let data = result.data;
          setFullname(data.fullname);
          setTelephone(data.telephone);
          let provinces = await province();
          let itemProvinces = provinces.find(
            (item: any) => item.id == data.city,
          );
          setCity(itemProvinces);
          let districts = await district(Number(data.district));
          let itemDistricts = districts.find(
            (item: any) => item.id == data.district,
          );
          setDistrict(itemDistricts);
        }
      } else {
        let data = JSON.parse(getReceiver);
        setTelephone(data.telephone);
        setCity(data.city);
        setAddress(data.address);
        setDistrict(data.districts);
        setFullname(data?.fullname);
        setIsChecked(data.isChecked);
      }
      setIsLoading(true);
    } finally {
    }
  };

  return {
    Receiver,
    isLoading,
    setFullname,
    setDistrict,
    setCity,
    fullname,
    telephone,
    setTelephone,
    city,
    districts,
    address,
    setAddress,
    isChecked,
    setIsChecked,
  };
}
