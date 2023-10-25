import { useRef, useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { STYLES, SVG } from '../../constants';
import IconCustom from './iconCustom';
import { StorageHelper } from '../../constants/storageHelper';
import useLogin from '../../screens/auth/useLogin';
import { number } from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomLocation = ({
    isIconLeft,
    iconLeft,
    value,
    data,
    isIcon,
    isValid,
    name,
    title,
    setValue,
}: any) => {
    const [dataClone, setDataClone] = useState() as any;
    const [isFocus, setIsFocus] = useState(false);
    const [texSearch, setTexSearch] = useState() as any;
    useEffect(() => {
        const fetchData = async () => {
            setDataClone(data);
        };

        fetchData();
    }, []);
    const onSearch = (search: any) => {
        if (search !== '') {
            let tempData = data.filter((item: any) => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setDataClone(tempData);
        } else {
            setDataClone(data);
        }
    };
    const _renderItem = (item: any) => {
        return (
            <View
                style={[styles.item, item.id == value && { backgroundColor: '#C2C2C2' }]}>
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };
    return (


        <View>
            <Text
                style={[
                    STYLES.text_16.text,
                    { paddingTop: 12 },
                ]}>
                {title}
                <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Dropdown
                activeColor="#000"
                renderInputSearch={() => (
                    <View>
                        <View
                            style={{
                                paddingTop: 12,
                                paddingBottom: 12,
                                alignItems: 'center', justifyContent: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: '#0288D1',
                            }}>
                            <Text
                                style={{
                                    color: '#0288D1',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                {title}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row', width: '95%',
                                height: 50,
                                alignSelf: 'center',
                                marginTop: 12,
                                paddingLeft: 12,
                                marginBottom: 12,
                                backgroundColor: '#EEFAFF',
                                borderColor: '#EEFAFF',
                                borderWidth: StyleSheet.hairlineWidth,
                                borderRadius: 180,
                            }}>
                            <TextInput
                                value={texSearch}
                                placeholder="Tìm Kiếm"
                                onChangeText={txt => {
                                    onSearch(txt);
                                    setTexSearch(txt);
                                }}
                                style={{
                                    width: '90%',
                                }}
                            />
                            <SVG.Icon_search
                                height={25}
                                width={25}
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    </View>
                )}
                // selectedTextProps={{
                //     style: {
                //         fontWeight: 'bold',

                //         color: '#0288D1',
                //     },
                // }}
                style={[styles.dropdown, isValid ? { backgroundColor: '#EEFAFF', } : { backgroundColor: '#EEEEEE', }]}
                containerStyle={styles.shadow}
                data={dataClone}
                search
                placeholder=""
                labelField="name"
                valueField="id"
                value={value}
                onChange={item => {
                    setValue(item?.id);
                    setIsFocus(false);
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                renderRightIcon={() =>
                    !isFocus ? (
                        <SVG.Icon_next_grey height={25} width={25} />
                    ) : (
                        <SVG.Icon_dropdown height={25} width={25} />
                    )
                }
                renderLeftIcon={() => <SVG.Icon_location height={25} width={25} />}
                renderItem={item => _renderItem(item)}
            />


        </View>


    );
};
export default CustomLocation;
const datafake = [{ "id": "0", "name": "" }]
const styles = StyleSheet.create({
    viewDiplay: {
        width: '100%',
        flexDirection: 'row',
        height: 52,
        backgroundColor: '#EEEEEE',
        borderColor: '#EEFAFF',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    dropdown: {

        width: '100%',
        height: 52,
        // backgroundColor: '#EEEEEE',
        borderColor: '#EEFAFF',
        borderWidth: StyleSheet.hairlineWidth,
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
        paddingLeft: 5
    },
});