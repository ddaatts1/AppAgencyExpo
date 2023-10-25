import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import ThankLetter from './ThankLetter';
import routes from '../../../constants/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import ModalPoup from '../../../components/commons/modalPoup';


const DocumentRequire = () => {
    const [visible, setVisible] = useState(true);
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={styles.container}>
            <ThankLetter/>
            <Pressable
              style={styles.confirm}
              onPress={() => navigation.navigate(routes.REGISTER)}>
              <Text style={styles.textStyle}>Xác nhận</Text>
            </Pressable>
            <ModalPoup visible={visible}>
                <View>
                  <Text style={{fontSize: 16, marginBottom: 12, textAlign:'center', fontWeight:'400'}}>
                    Vui lòng đọc hết và kéo xuống dưới để  xác nhận!
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setVisible(!visible)}>
                    <Text style={styles.textStyle}>Đồng ý</Text>
                  </Pressable>
                </View>
            </ModalPoup>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
  },
  button: {
    width: '50%',
    borderRadius: 12,
    padding: 10,
    marginLeft: 80,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  confirm: {
    width: '90%',
    backgroundColor: '#2196F3',
    borderRadius: 12,
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 20,
    padding: 10,
    textAlign: 'center',
  },
});

export default DocumentRequire;
