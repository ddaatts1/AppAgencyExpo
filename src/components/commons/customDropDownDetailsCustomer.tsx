
import { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { STYLES, SVG } from '../../constants';
import IconCustom from './iconCustom';
import { StorageHelper } from '../../constants/storageHelper';
import useLogin from '../../screens/auth/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDropdownDetailsCustomer = (props: any) => {
    const { province, district, } = useLogin()
    // const [selectedValue, setSelectedValue] = useState(null);

    const {
        field: { name, onBlur, onChange, value},
        form: { errors, touched, setFieldTouched },
        setSelectedValue,
        ...inputProps
    } = props;
    // const [dataProvince, setDataProvince] = useState<String | undefined>();

    const hasError = errors[name] && touched[name];
    // const iconLeft = props.iconLeft;
    // const isIconLeft = props.isIconRight;
    const title = props.title;
    const dataAll = props.data;
    const checlocation = props.checlocation;
    const labelField = props.labelField;
    const valueField = props.valueField;
    const disable = props.disable;
    const defaultItem = props.defaultItem;
    const [search, setSearch] = useState() as any;
    const [dropdown, setDropdown] = useState() as any;
    const [data, setData] = useState() as any;

    useEffect(() => {
        if (checlocation) {
            setData(datafake)
        } else {
            setData(dataAll)
        }


    }, [])

     const [isIcon, setIsIcon] = useState(false);
    const onSearch = (search: any) => {
        if (search !== '') {
            let tempData = dataAll.filter((item: any) => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(data);
        }
    };
    const getDistrict = async (id: number) => {

        const data = await district(id)
        StorageHelper.setDistrict(JSON.stringify(data))
    }
    // const checkGetDistrict = async () => {
    //     setIsIcon(true)
    //     if (checlocation) {
    //         const dataDistric: any = await StorageHelper.getDistrict();
    //         const newObj = JSON.parse(JSON.stringify(JSON.parse(dataDistric), (k, v) => v && typeof v === 'object' ? v : '' + v));
    //         setData(newObj);
    //
    //     }
    //
    // }
    const _renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };
    return (
        <View style={{ paddingTop: 12, }}>

            <Text style={styles.text} >
                {title}
                <Text style={STYLES.text_16.text_color}></Text>
            </Text>
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

                            }}>{title}</Text>

                        </View>

                    </View>
                )}
                disable={disable}
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                search
                placeholder={defaultItem}
                placeholderStyle={{ color: 'black' }}
                labelField={labelField}
                valueField={valueField}
                value={defaultItem}
                onChange={item => {
                    setSelectedValue(item.id);
                    onChange(name)(item.id)
                    setDropdown(String(item.id));
                    //getDistrict(item.id)
                }}
                selectedTextStyle={styles.selectedTextStyle}
                onBlur={() =>

                    isIcon == true ? setIsIcon(true) : setIsIcon(true)

                }

                // onFocus={() => isIcon == true ? setIsIcon(false) : checkGetDistrict()}
                renderRightIcon={() => (
                    !isIcon ? <SVG.Icon_next height={25} width={25} /> : <SVG.Icon_dropdown_search_close height={25} width={25} style={{color: '#525252'}}/>
                )}
                // renderLeftIcon={() => (
                //     !isIconLeft ? iconLeft : null
                // )}

                renderItem={item => _renderItem(item)}

            />

            <View style={STYLES.style_input.viewErrorText}>
                {hasError && (
                    <Text style={STYLES.style_input.errorText}>
                        <SVG.Icon_exclamationcircleo /> {errors[name]}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default CustomDropdownDetailsCustomer;

const datafake = [{ "id": "1", "name": "" }]
const styles = StyleSheet.create({
    dropdown: {
        width: '100%',
        height: 52,
        backgroundColor: '#EEFAFF',
        borderColor: '#EEFAFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        paddingLeft: 12,
        paddingRight: 12,
        color: '#323232',
    },
    icon: {
        marginRight: 5,
        width: 18,
        height: 18,
    },
    item: {
        borderBottomWidth: 0.5,
        borderColor: '#EEEEEE',
        paddingVertical: 10,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#323232',
    },
    textItem: {
        paddingLeft: 12,
        flex: 1,
        fontSize: 16,
        color: '#323232',
    },
    shadow: {

        elevation: 5,
        alignSelf: 'flex-end',
        width: '60%',
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
    text: {
        fontSize: 16,
        color: '#039BE5',
        paddingBottom: 5,
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#323232',
    },
});
