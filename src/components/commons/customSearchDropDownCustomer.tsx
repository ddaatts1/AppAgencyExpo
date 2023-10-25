
import React, {useEffect, useRef, useState} from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { STYLES, SVG } from '../../constants';
import IconCustom from './iconCustom';

const CustomSearchDropdownCustomer = (props: any) => {

    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const title = props.title;
    const dataAll = props.data;
    const titleSelect = props.titleSelect;
    const isBlack = props.isBlack;

    const labelField = props.labelField;
    const valueField = props.valueField;
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState<any>(1);
    const [data, setData] = useState(dataAll);
    const [isIcon, setIsIcon] = useState(false);

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
                renderInputSearch={() => (
                    <View >
                        <View
                            style={{
                                paddingTop: 12,
                                paddingBottom: 12,
                                alignItems: 'center', justifyContent: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#0288D1',
                            }}>
                            <Text style={{
                                color: "#0288D1", fontWeight: 'bold', fontSize: 16,

                            }}>{titleSelect}</Text>

                        </View>

                        {/*<View style={{*/}
                        {/*    flexDirection: 'row',*/}
                        {/*    width: '95%',*/}
                        {/*    height: 50,*/}
                        {/*    alignSelf: 'center',*/}
                        {/*    marginTop: 12,*/}
                        {/*    paddingLeft: 12,*/}
                        {/*    marginBottom: 12,*/}
                        {/*    backgroundColor: '#EEFAFF',*/}
                        {/*    borderColor: '#EEFAFF',*/}
                        {/*    borderWidth: StyleSheet.hairlineWidth,*/}
                        {/*    borderRadius: 180,*/}
                        {/*}}>*/}
                        {/*    <TextInput*/}
                        {/*        value={search}*/}
                        {/*        placeholder="Tìm Kiếm"*/}
                        {/*        onChangeText={txt => {*/}
                        {/*            console.log(txt);*/}
                        {/*            onSearch(txt);*/}
                        {/*            setSearch(txt);*/}
                        {/*        }}*/}
                        {/*        style={{*/}
                        {/*            width: '85%',*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    <SVG.Icon_search height={25} width={25} style={{ alignSelf: 'center', }} />*/}

                        {/*</View>*/}

                    </View>
                )}


                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                placeholder={value}
                search
                labelField={labelField}
                valueField={valueField}
                value={dropdown}
                onChange={handleChange}
                selectedTextStyle={styles.selectedTextStyle}
                onBlur={() =>

                    isIcon == true ? setIsIcon(false) : setIsIcon(true)

                }
                onFocus={() => isIcon == true ? setIsIcon(false) : setIsIcon(true)}
                renderRightIcon={() => (
                    !isIcon ? <SVG.Icon_next height={25} width={25} style={{color: '#C2C2C2'}} /> : <SVG.Icon_dropdown height={25} width={25} />
                )}

                renderItem={item => _renderItem(item)}

            />
        </View>
    );
};
export default CustomSearchDropdownCustomer;

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
        width: '32%'
    },
    dropdown: {

        borderColor: '#0288D1',
        width: '68%',
        height: 45,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 12,
        paddingRight: 12,
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
