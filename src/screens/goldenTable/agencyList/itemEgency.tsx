import React, {useRef, useState} from 'react';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {STYLES, SVG} from '../../../constants';

const Itemagency = ({
  data,

  titleSelect,
  value,
  setValue,

  valueField,
  labelField,
}: any) => {
  const handleChange = (item: any) => {
    setValue(item.id);
  };
  const _renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 12}}>
      <Dropdown
        renderInputSearch={() => (
          <View>
            <View
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.5,
                borderColor: '#0288D1',
              }}>
              <Text
                style={{
                  color: '#0288D1',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {titleSelect}
              </Text>
            </View>
          </View>
        )}
        style={styles.dropdown}
        containerStyle={styles.shadow}
        data={data}
        placeholder="Tất cả"
        search
        labelField={labelField}
        valueField={valueField}
        value={value}
        onChange={handleChange}
        selectedTextStyle={styles.selectedTextStyle}
        renderItem={item => _renderItem(item)}
      />
    </View>
  );
};
export default Itemagency;

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#0288D1',
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#0288D1',
    fontWeight: '500',
  },

  dropdown: {
    width: '100%',
    height: 45,

    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 12,

    borderColor: '#C2C2C2',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: '#EEEEEE',
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    paddingLeft: 12,
    flex: 1,
    fontSize: 16,
    color: '#323232',
  },
  shadow: {
    elevation: 5,
    height: 300,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#323232',
  },
});
