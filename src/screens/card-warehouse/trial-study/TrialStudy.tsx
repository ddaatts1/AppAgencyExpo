import React, {useState, useCallback, useEffect} from 'react';
import {Text, SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import ItemChage from '../../../components/card-warehouse/itemChage';
import {Field, Formik} from 'formik';
import DropdownCard from '../../../components/card-warehouse/dropdownCard';
import InputCard from '../../../components/card-warehouse/InputCard';
import ModalPoup from '../../../components/commons/modalPoup';
import {SVG} from '../../../constants';
import InputCardNumber from '../../../components/card-warehouse/InputCardNumber';
import ItemCourse from '../../training/components/itemCourse';
import useCard from "../useCard";
import {useFutureLang} from "../../context/StartUpProvider";
import {SERVICE_FTL, SERVICE_KIDS} from "../../../constants/service";
import {set} from "react-hook-form";
import * as yup from "yup";


const validate = yup.object().shape({
  quantity: yup
      .number()
      .typeError('Nhập số lượng hợp lệ')
      .integer('Nhập số lượng hợp lệ')
      .min(5, 'Số lượng phải lớn hơn hoặc bằng 5')
      .max(200, 'Số lượng phải nhỏ hơn hoặc bằng 200')
      .required('Đây là trường bắt buộc điền'),
});

const TrialStudy = ({navigation}: any) => {

  const [isBtn, setIsBtn] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmError, setConfirmError] = useState(false)
  const [dropdownCardData, setDropdownCardData] = useState([])
  const {futureLang} = useFutureLang()
  const body={
    service: futureLang?SERVICE_FTL:SERVICE_KIDS
  }
  const {
    fetchingListTrial,
    lisTrialData,
    createTrialAction,
    createTrialData,
    isCreatingTrial,
    createTrialCodeData,
    createTrialCodeAction,
  } = useCard()
  const [message, setMessage] = useState("")

  const onButton = (index: any) => {
    setIsBtn(index)

  }


  useEffect(() => {
    fetchingListTrial(body);
  }, [futureLang]);

  useEffect(() => {
    const data = lisTrialData.map(d => ({
      label: d.name,
      value: d.id.toString()
    }));
    setDropdownCardData(data);
  }, [lisTrialData]);



  const submit = (values: any) => {

    // console.log("san pham quan ly submit : " + futureLang)
    // console.log("values: " + JSON.stringify(values))
    if (isBtn) {
      // the dai ly
      // console.log("day la the dai ly")
      createTrialAction(values)
    } else {
      // the hoc le
      // console.log("=============> day la the hoc le ")
      createTrialAction(values)

    }

  }

  useEffect(() => {


    // console.log("===============")
    if (isBtn) {

      // console.log("response dai ly: " + JSON.stringify(createTrialCodeData?.status))
      // console.log("message : " + JSON.stringify(createTrialCodeData?.message))
    } else {
      // console.log("response hoc le : " + JSON.stringify(createTrialData?.status))
      // console.log("message : " + JSON.stringify(createTrialData?.message))
    }

    if (createTrialData?.status == 400 || createTrialCodeData?.status == 400) {
      // console.log("========> loi roi hihi")
      setMessage(createTrialCodeData !== null ? createTrialCodeData.message : createTrialData?.message)

      setConfirmError(true)
    } else if (createTrialData?.status == 200 || createTrialCodeData?.status == 200) {
      // console.log("========> thanh cong roi ")
      setMessage(createTrialCodeData !== null ? createTrialCodeData.message : createTrialData?.message)
      setConfirmModal(true)
    }
  }, [createTrialData, createTrialCodeData])


  useEffect(() => {
    // console.log("message: " + message)
  }, [message])

  return (
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.container}>
            <ItemCourse navigation={navigation}/>
            {/*// dsd*/}
            <View style={{
              flexDirection: "row",
              backgroundColor: "#EEFAFF",
              justifyContent: "space-between",
              borderRadius: 18,
              marginVertical: 12,
              marginHorizontal: 6
            }}>

              <TouchableOpacity style={isBtn ? styles.BtnBackgroundAtive : styles.BtnBackground}
                                onPress={() => onButton(true)}>
                <Text style={isBtn ? styles.styleTextWhite : styles.styleText}>Thẻ đại lý</Text>
              </TouchableOpacity>
              <TouchableOpacity style={isBtn ? styles.BtnBackground : styles.BtnBackgroundAtive}
                                onPress={() => onButton(false)}>
                <Text style={isBtn ? styles.styleText : styles.styleTextWhite}>Thẻ học lẻ</Text>
              </TouchableOpacity>
            </View>
            {/*dd*/}
          </View>

          {/*dd*/}
          <View style={[styles.container]}>


            <Formik
                validationSchema={validate}
                initialValues={{
                  // username: '',
                  // password: '',
                  // confirmPassword: '',
                  service: futureLang ? SERVICE_FTL : SERVICE_KIDS
                }}
                onSubmit={submit}>
              {({handleSubmit, isValid, values}) => (
                  <>
                    <ItemChage color={"#0288D1"}>

                      <View style={{paddingHorizontal: 8, paddingVertical: 12}}>

                        {dropdownCardData && dropdownCardData.length > 0 ? (
                            <Field
                                component={DropdownCard}
                                data={dropdownCardData}
                                title=" Thẻ học thử"
                                titleSelect="Chọn thẻ"
                                labelField="label"
                                valueField="value"
                                name="cardId"
                                isValid={true}
                            />
                        ) : null}


                        <Field
                            component={InputCardNumber}
                            isValid={true}
                            name="quantity"
                            title="Số lượng"
                            //isValid={true}
                            numberOnly={true}

                        />
                        <Field
                            component={InputCard}
                            isValid={true}
                            textarea={true}
                            name="note"
                            title="Mục đích"
                            placeholder="Bạn hãy nếu rõ kế hoạch bạn sử dụng thẻ như thế nào, và kê hoạch chăm sóc khách hàng để admin hỗ trợ"
                        />
                      </View>
                    </ItemChage>
                    <TouchableOpacity
                        onPress={() => {
                          handleSubmit()
                        }}
                        style={styles.Btn}>
                      <Text
                          style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            paddingLeft: 10,
                          }}>
                        Gửi yêu cầu
                      </Text>

                    </TouchableOpacity>

                  </>
              )}
            </Formik>


          </View>

          {/*dd*/}
        </View>
        {/*success popup*/}
        <ModalPoup visible={confirmModal}>

          <TouchableOpacity onPress={() => setConfirmModal(false)}>
            <View style={{alignItems: 'flex-end'}}>
              <SVG.Icon_close/>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <SVG.Icon_verified_green height={90} width={90}/>
          </View>
          <Text style={{fontSize: 16, textAlign: 'center', color: "#03AA00", fontWeight: "bold"}}>
            Tạo thẻ học thử thành công!
          </Text>
          <TouchableOpacity

              onPress={() =>
                  setConfirmModal(false)

              }

              style={styles.Btn}>
            <View style={{flexDirection: "row",}}>

              <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>OK</Text>
            </View>
          </TouchableOpacity>
        </ModalPoup>


        {/*eror popup*/}
        <ModalPoup visible={confirmError}>

          <TouchableOpacity onPress={() => setConfirmError(false)}>
            <View style={{alignItems: 'flex-end'}}>
              <SVG.Icon_close/>
            </View>
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <SVG.Icon_group height={90} width={90}/>
          </View>
          <Text style={{fontSize: 16, textAlign: 'center', color: "#aa0019", fontWeight: "bold"}}>
            Tạo thẻ học thử thất bại ! {message}
          </Text>
          <TouchableOpacity

              onPress={() =>
                  setConfirmError(false)

              }

              style={styles.Btn}>
            <View style={{flexDirection: "row",}}>

              <Text style={{color: '#FFFFFF', fontSize: 16, paddingLeft: 10, fontWeight: "bold"}}>OK</Text>
            </View>
          </TouchableOpacity>
        </ModalPoup>


      </ScrollView>

  );
};

export default TrialStudy;
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    height: "100%"
  },
  styleTextWhite: {
    fontSize: 16, color: "white"
  },
  styleText: {
    fontSize: 16, color: "#525252"
  },
  BtnBackgroundAtive: {
    height: 38,
    backgroundColor: "#0288D1",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18
  },
  BtnBackground: {
    height: 38,
    backgroundColor: "#EEFAFF",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18
  },

  btnText: {fontSize: 12, textAlign: 'center', color: '#fff',},
  containerButton: {

    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  Btn: {
    marginTop: 24,
    marginBottom:20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: '#0288D1',
    borderRadius: 15,
  },
  container: {

    paddingHorizontal: 12,
    backgroundColor: 'white',
  },


});
