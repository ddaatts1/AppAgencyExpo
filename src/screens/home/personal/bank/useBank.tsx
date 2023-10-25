import Snackbar from 'react-native-snackbar';

import { useState } from 'react';
import _, { values } from 'lodash';
import PersonalService from '../../../../services/personal/personal.service';
import { StorageHelper } from '../../../../constants/storageHelper';

export default function useBank() {
  const { postBank, updateBank, getUser } = PersonalService();
  const [branch, setBranch] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [value, setValue] = useState() as any;
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBank, setDataBank] = useState() as any;
  const [isSubmit, setIsSubmit] = useState(false);
  const Bank = async function () {
    try {
      const resultUser = await getUser();
      if (resultUser.status == 200) {
        const data = resultUser?.data;

        setAccountHolder(data.bankAccName);
        setBranch(data.bankBranch);
        setAccountNumber(data.bankAcc);

        const result = await postBank();
        if (result.status == 200) {
          {
            const datas = result?.data;
            let itemBank = datas.find(
              (item: any) => item.bank_name == data.bankName,
            );

            setValue(itemBank?.id);

            setDataBank(datas.map((value: any, index: any) => {
              let item = datas[index];
              return { ...value, bank_name: `${item.bank_code} - ${item?.bank_name}` };

            }));
          }
        }
        setIsLoading(true);
      }
    } finally {
    }
  };

  const checkValidate = (text: any, type: any) => {

    if (type == 'accountNumber') {
      if (text) {
        if (accountHolder && value) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      } else {
        setIsSubmit(false)
      }
      setAccountNumber(text)
    } else if (type == 'accountHolder') {
      if (text) {
        if (accountNumber && value) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      } else {
        setIsSubmit(false)
      }
      setAccountHolder(text)
    } else if (type == 'bank_name') {
      if (text) {
        if (accountNumber && accountHolder) {
          setIsSubmit(true)
        } else {
          setIsSubmit(false)
        }
      } else {
        setIsSubmit(false)
      }
      setValue(text)
    }


  }

  const UpdateBank = async function (data: any) {
    try {
      const result = await updateBank(data);
      if (result.status == 200) {
        setIsModal(true);
      }
    } finally {
    }
  };

  return {
    Bank,
    isLoading,
    bankName,
    setBankName,
    setBranch,
    branch,
    accountNumber,
    setAccountNumber,
    accountHolder,
    setAccountHolder,
    value,
    setValue,
    dataBank,
    UpdateBank,
    isModal,
    setIsModal,
    checkValidate,
    isSubmit
  };
}
