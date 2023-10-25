
import React, {useEffect, useRef, useState} from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { STYLES, SVG } from '../../constants';
import IconCustom from './iconCustom';

const CustomDropdownDetailCustomer = (props: any) => {

    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const {setAgencyLevel} = props;
    const title = props.title;
    const dataAll = props.data;
    const titleSelect = props.titleSelect;
    const isBlack = props.isBlack;

    const labelField = props.labelField;
    const valueField = props.valueField;
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState<any>(1);
    const [data, setData] = useState(dataAll);
    const [isIcon, setIsIcon] = useState(true);

    const onSearch = (search: any) => {
        if (search !== '') {
            let tempData = dataAll.filter((item: any) => {
                return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(data);
        }
    };

    const handleChange = (item: any) => {
        console.log(item);
        onChange(name)(item.value)
        setDropdown(item.value);
        setAgencyLevel(item.label)

    };


    const _renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={{ paddingTop: 12, flexDirection: "row"}}>

            <View style={styles.container}>
                <Text style={[styles.text, {color: isBlack ? '#323232' : '#0288D1'}]}>
                    {title}
                </Text>
            </View>


            <Dropdown
                style={styles.dropdown}
                // containerStyle={styles.shadow}
                data={data}
                placeholder={titleSelect}
                labelField={labelField}
                valueField={valueField}
                value={dropdown}
                onChange={handleChange}
                selectedTextStyle={styles.selectedTextStyle}
                renderRightIcon={() => (
                    !isIcon ? <SVG.Icon_next height={25} width={25} /> : <SVG.Icon_dropdown height={25} width={25} />
                )}

                renderItem={item => _renderItem(item)}

            />
        </View>
    );
};
export default CustomDropdownDetailCustomer;

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#0288D1',
        width: '68%',
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
    container: {
        justifyContent: 'center',

    },
    dropdown: {

        borderColor: '#0288D1',
        width: '100%',
        height: 10,
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderRadius: 10,
        // paddingLeft: 12,
        // paddingRight: 12,
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
        color: '#323232'
    },
    shadow: {

        elevation: 5,
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
