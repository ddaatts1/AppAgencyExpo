import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import useLogin from '../../auth/useLogin';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES } from '../../../constants';

const Location = () => {

    const [data, setData] = useState() as any;


    const { province, district } = useLogin()
    const [step, setStep] = useState(1)
    const [id, setId] = useState() as any;

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>()


    const [dataStep, setDataStep] = useState([
        { id: 1, name: '', selectlocation: '', type: 'Tỉnh/Thành phố' },
        { id: 2, name: '', selectlocation: 'Chọn Quận/Huyện', type: 'Quận/ Huyện' }

    ]);
    useEffect(() => {


        const fetchData = async () => {
            if (step == 1) {
                const data = await province()
                setData(data)

            } else if (step == 2) {
                const data = await district(id)
                setData(data)
            }

        }
        fetchData()


    }, [data])


    function handleSubmit(name: any, index: any) {
        let item = dataStep.find((item: any) => item.id === step)
        if (item) {
            dataStep[step - 1] = { id: item.id, name: name.name, selectlocation: item.selectlocation, type: item.type };
            setId(name.id)
            setStep(step + index)

            if (step == 2) {
                if (step == 2) {
                    navigation.navigate(ROUTES.RECEIVER, {
                        city: dataStep[0],
                        district: dataStep[1]

                    })
                }

            }

        }



    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.wFull}>
                    {step != 1 ? <Text style={{
                        fontSize: 16, color: "#525252", textAlignVertical: 'center', padding: 12
                    }}> Khu vực được chọn</Text> : null}
                    <View style={[{ width: '100%', }, step != 1 ? { padding: 12 } : null]}>
                        {dataStep.map((item: any, index: any) => {
                            if (step > item.id) {
                                return (


                                    <View style={{ marginTop: -6 }} key={index}>

                                        <View style={{ paddingLeft: 12 }}>


                                            <View style={{ flexDirection: "row", alignItems: 'center', }}>

                                                <View
                                                    style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: 15,
                                                        backgroundColor: '#0091EA',


                                                    }}>

                                                </View>

                                                <TouchableOpacity onPress={() => setStep(item.id)}>
                                                    <Text style={{
                                                        fontSize: 16, color: "#0091EA", textAlignVertical: 'center', paddingLeft: 12

                                                    }}> {item.name}</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View
                                                style={{
                                                    marginLeft: 4,
                                                    marginTop: -6,
                                                    width: 2,
                                                    height: 25,
                                                    backgroundColor: '#0091EA',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                }}>

                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        })}
                        {step != 1 ? <View style={{ height: 30, borderColor: "#EEEEEE", borderWidth: 0.5, justifyContent: 'center', paddingLeft: 12 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', }}>

                                <View
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 15,
                                        backgroundColor: '#525252',


                                    }}>

                                </View>

                                <Text style={{
                                    fontSize: 16, color: "#525252", textAlignVertical: 'center', paddingLeft: 12

                                }}>{dataStep[step - 1]?.selectlocation}</Text>


                            </View>
                        </View> : null}
                        <Text style={{
                            fontSize: 12, color: "#525252", textAlignVertical: 'center', padding: 12

                        }}>{dataStep[step - 1]?.type}</Text>
                    </View>



                    <ScrollView>
                        {data?.map((item: any, index: any) => {
                            return (<TouchableOpacity onPress={() => handleSubmit(item, 1)} key={index} >
                                <Text style={{ textAlignVertical: 'bottom', fontSize: 16, borderBottomColor: "#EEEEEE", borderBottomWidth: 0.5, height: 40, color: '#323232', paddingHorizontal: 12 }}>{item.name}</Text>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                </View>
            </View>



        </View>
    );
};

export default Location;

const styles = StyleSheet.create({

    main: {
        backgroundColor: 'white',
        height: '100%'
    },
    container: {
        marginTop: 50,
        width: '100%',
        backgroundColor: 'white',
    },
    wFull: {
        width: '100%',
        marginTop: -12,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 25,
        backgroundColor: 'white'
    },

});
