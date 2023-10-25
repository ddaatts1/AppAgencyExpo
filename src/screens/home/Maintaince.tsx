import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import ModalPoup from '../../components/commons/modalPoup';
import routes from '../../constants/routes';
import Home from './Home';


const Maintaince = () => {
    const [visible, setVisible] = useState(true);
    return (
        <View style={styles.container}>
            <Home/>
            <ModalPoup visible={visible}>
                <View style={styles.box}>
                    <Image style={styles.image} source={require('../../assets/image/Maintaince.png')}/>
                    <Text style={{fontSize: 16, marginBottom: 40, textAlign:'center', fontWeight:'400'}}>
                        Tính năng đang được cập nhật
                    </Text>

                </View>
                <View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setVisible(!visible)}>
                        <Text style={styles.textStyle}>OK</Text>
                    </Pressable>
                </View>
            </ModalPoup>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    marginBottom: 20,
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Maintaince;
