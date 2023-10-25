import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import ItemBank from '../components/itemBank';
import { useEffect, useState } from 'react';
import { STYLES, SVG } from '../../../../constants';
import ModalPoup from '../../../../components/commons/modalPoup';
import useBank from './useBank';
import LoadingReact from '../../../../components/commons/loading';

const Bank = () => {
  const {
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
  } = useBank();

  async function onSubmit() {
    if (isSubmit) {

      let itemBank = dataBank.find((item: any) => item?.id == value);
      console.log("itemBank", itemBank?.bank_name.slice(itemBank?.bank_name.lastIndexOf("-") + 2));
      const data = {
        bankBranch: branch,
        bankAcc: accountNumber,
        bankAccName: accountHolder,
        bankName: itemBank?.bank_name.slice(itemBank?.bank_name.lastIndexOf("-") + 2),
      };
      UpdateBank(data);
    }


  }







  useEffect(() => {
    const fetchData = async () => {
      try {
        Bank();
      } catch (error) { }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <ScrollView style={styles.main}>
          <View style={styles.container}>
            <ItemBank
              data={dataBank}
              title=" Ngân hàng"
              titleSelect="Chọn Ngân hàng"
              labelField="bank_name"
              valueField="id"
              isValid={true}
              value={value}
              setValue={checkValidate}
            />

            <View style={{ paddingTop: 12 }}>
              <Text style={STYLES.text_16.text1}> Chi nhánh</Text>
              <View style={STYLES.style_input.view}>
                <TextInput
                  style={[STYLES.style_input.textInput]}
                  value={branch}
                  onChangeText={text => setBranch(text)}
                />
              </View>
            </View>
            <View style={{ paddingTop: 12 }}>
              <Text style={STYLES.text_16.text1}>
                {' '}
                Số tài khoản<Text style={STYLES.text_16.text_color}>*</Text>
              </Text>
              <View style={STYLES.style_input.view}>
                <TextInput
                  keyboardType="numeric"
                  style={[STYLES.style_input.textInput]}
                  value={accountNumber}
                  onChangeText={text => checkValidate(text, "accountNumber")}
                />
              </View>
            </View>
            <View style={{ paddingTop: 12 }}>
              <Text style={STYLES.text_16.text1}>
                Chủ tài khoản<Text style={STYLES.text_16.text_color}>*</Text>
              </Text>
              <View style={STYLES.style_input.view}>
                <TextInput

                  style={[STYLES.style_input.textInput]}
                  value={accountHolder}
                  onChangeText={text => checkValidate(text, "accountHolder")}
                />
              </View>
            </View>
            <View style={{ bottom: 0, height: '10%', marginTop: 12 }}>
              <TouchableOpacity onPress={onSubmit} style={[styles.btn, isSubmit ? { backgroundColor: '#0288D1' } : { backgroundColor: '#E3F2FD' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[{

                      fontSize: 16,
                      paddingLeft: 10,
                    }, isSubmit ? { color: '#FFFFFF', } : { color: '#0288D1', }]}>
                    Cập nhật
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ModalPoup visible={isModal}>
            <View style={{ alignItems: 'center' }}>
              <SVG.Icon_success height={65} width={65} />
            </View>
            <Text
              style={{
                marginVertical: 12,
                fontSize: 18,
                textAlign: 'center',
                color: '#323232',
              }}>
              Cập nhật thông tin ngân hàng của bạn thành công.
            </Text>
            <TouchableOpacity
              style={styles.loginTime}
              onPress={() => {
                setIsModal(false);
              }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10 }}>
                Xác Nhận
              </Text>
            </TouchableOpacity>
          </ModalPoup>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default Bank;

const styles = StyleSheet.create({
  loginTime: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 12,
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  main: {
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    paddingHorizontal: 12,
  },
  textInput: {
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#323232',
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,

    borderRadius: 15,
  },
});
