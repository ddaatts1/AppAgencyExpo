import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StatusBar, Appearance, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Box from './Box';
import ModalPoup from '../../components/commons/modalPoup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StorageHelper } from '../../constants/storageHelper';
import { useAuth } from '../auth/AuthContext';
import getColorScheme = Appearance.getColorScheme;
import useLogin from '../auth/useLogin';
import { ActivityIndicator } from 'react-native-paper';
import LoadingReact from '../../components/commons/loading';


const Home = () => {
  const { intro, setIntros } = useAuth() as any
  const [checkModal, setCheckModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { checkRule }: any = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = () => {
    Linking.openURL('https://startup40.com/posts/chinh-sach-va-dieu-khoan/25');
  };
  const onCheckbox = async function () {
    if (isChecked) {
      let user: any = await StorageHelper.getUser();
      let rule: any = await StorageHelper.getRules();
      let ruleJson = JSON.parse(rule)
      let userJson = JSON.parse(user)
      let ruleItem = ruleJson?.findIndex((item: any) => item.email === userJson?.email)

      if (ruleItem >= 0) {
        ruleJson[ruleItem] = {
          telephone: userJson?.telephone,
          email: userJson?.email,
          isIntro: false,
          product: ruleJson[ruleItem]?.product,

        }

        await StorageHelper.setRules(JSON.stringify(ruleJson))

      }

      setIntros(false)
      setCheckModal(false)
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      let result = await checkRule()


      if (result) {
        setCheckModal(true)
      }

      setIsLoading(true)
    }
    fetchData()



  }, [])


  return (
    isLoading ? <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar
          backgroundColor="transparent"
          animated={true}
          barStyle={'dark-content'}
          translucent={true}
        />
        <Box />
        <ModalPoup visible={checkModal}>
          <Text style={{ paddingTop: 12, fontSize: 16, textAlign: 'center', color: "#0288D1", fontWeight: 'bold' }}>
            Chào mừng bạn đến với StartUp 4.0
          </Text>
          <Text style={{ marginVertical: 12, fontSize: 14, textAlign: 'center', color: "#000", }}>
            Chúng tôi rât coi trọng việc bảo vệ quyền riêng tư và bảo vệ thông tin cá nhân của bạn. Trước khi sử dụng, vui lòng đọc kỹ các điều khoản của FutureAgency !
          </Text>

          <TouchableOpacity onPress={handlePress}>

            <Text style={{ marginVertical: 12, fontSize: 16, textAlign: 'center', color: "#0288D1", }}>
              Chính sách và điều khoản Startup4.0
            </Text></TouchableOpacity>



          <BouncyCheckbox
            style={{ paddingTop: 12, paddingBottom: 28, marginHorizontal: 10 }}
            size={25}
            fillColor="#0288D1"
            text="Tôi đã đọc và đồng ý với tất cả các điều khoản, chính sách của StartUp 4.0"
            textStyle={{
              fontSize: 12,
              textDecorationLine: "none",
            }}
            onPress={() =>
              setIsChecked(true)
            }
          />
          <TouchableOpacity

            onPress={() => onCheckbox()}
            style={styles.Btn}>
            <View style={{ flexDirection: "row", }}>

              <Text style={{ color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold" }}>Đóng</Text>
            </View>
          </TouchableOpacity>
        </ModalPoup>
      </ScrollView>
    </SafeAreaView> : <LoadingReact />

  );

};

export default Home;

const styles = StyleSheet.create({
  // container: {
  //   width: '100%',
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  Btn: {
    marginBottom: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },

});
