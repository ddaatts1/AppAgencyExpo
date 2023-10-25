import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ROUTES, SVG } from '../../constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EnumOder } from '../../constants/enum';
import { StorageHelper } from '../../constants/storageHelper';


const Intro = ({ navigation }: any) => {


  const onIntro = async function (index: Number) {

    let user: any = await StorageHelper.getUser();
    let rule: any = await StorageHelper.getRules();
    let ruleJson = JSON.parse(rule)
    let userJson = JSON.parse(user)
    let ruleItem = ruleJson?.findIndex((item: any) => item.email === userJson?.email)
    if (ruleItem >= 0) {
      ruleJson[ruleItem] = {
        telephone: userJson?.telephone,
        email: userJson?.email,
        isIntro: true,
        product: index,

      }
      await StorageHelper.setRules(JSON.stringify(ruleJson))
    }
    navigation.navigate(ROUTES.HOME)
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
        <View style={styles.imageLogo}>
          <SVG.Logoblue />
        </View>
        <View style={styles.wFull}>
          <View style={{
            flexDirection: "row", paddingTop: 25,
            paddingBottom: 12, alignItems: "center", justifyContent: 'center'
          }}>
            <SVG.Icon_tag />
            <Text style={styles.loginContinueTxt}>Chọn sản phẩm quản lý</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => onIntro(EnumOder.FutureLang)}>
              <View
                style={[
                  { borderWidth: 0, borderRadius: 10, paddingRight: 12 },
                  styles.dropShadow,
                ]}>
                <SVG.Logo_FutureLang />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onIntro(EnumOder.FKids)}>

              <View
                style={[{ borderWidth: 0, borderRadius: 10 }, styles.dropShadow]}>
                <SVG.LOGO_FKids />
              </View>

            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    height: 170,
  },
  dropShadow: {
    alignItems: 'center',
    width: 160,
    height: 160,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loginContinueTxt: {
    fontSize: 18,
    textAlign: 'center',
    color: '#323232',

  },

  wFull: {
    width: '100%',
    backgroundColor: 'white',
  },
  imageLogo: {
    paddingTop: 40,
    height: 150,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  main: {
    backgroundColor: 'white',

  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
  },
});
