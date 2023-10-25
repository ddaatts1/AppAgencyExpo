import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ROUTES, SVG } from '../../../constants';
import dataSchedule from '../../../../ultidata/data';
import ItemChage from '../../../components/card-warehouse/itemChage';
import PercentageBar from '../../../components/personal/percentageBar';
import PercepercentageBarCourse from './percentageBarCourse';
import data from '../../../../ultidata/data';
import { Enum, EnumCourse, EnumNavigatorTraining } from '../../../constants/enum';


const Learning = ({ navigation, name }: any) => {

    const { Coures } = data()
    const statusItem = (item: Number) => {
        if (item == EnumCourse.Made) {
            return "Đã thực hiên"
        } else if (item == EnumCourse.Processing) {
            return "Đang thực hiện"
        } else {
            return "Chưa thực hiện"

        }


    }

    return (
        Coures.slice(0, 3).map((item, index) => {

            return (
                <ItemChage key={index} color={"#0288D1"} >
                    <View style={{ padding: 10, height: 145 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: '50%', }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.STARTLEARNING, {
                                    indexRoute: EnumNavigatorTraining.StartLearning,
                                    name: name

                                })}>

                                    <Image style={styles.image} source={item.image} />
                                </TouchableOpacity>
                            </View>
                            <View>

                                <Text style={item.status == EnumCourse.Made ? styles.styleMade : item.status == EnumCourse.Processing ? styles.styleProcessing : styles.styleUnfulfilled}>
                                    {statusItem(item.status)}
                                </Text>


                                <Text numberOfLines={3} style={styles.title}>Bí kíp ứng dụng chat GPT x3 năng suất </Text>
                                <Text style={{ color: "#0288D1", fontSize: 12 }} numberOfLines={2}>Đối tượng: Đại sứ & CTV </Text>
                                {item.status == EnumCourse.Unfulfilled ? <TouchableOpacity style={{ marginTop: 8, width: '40%', justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: "#0288D1", height: 36, }}

                                    onPress={() => navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
                                        indexRoute: EnumNavigatorTraining.StartLearning,
                                        name: name

                                    })}>

                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Học ngay</Text>

                                </TouchableOpacity>
                                    : <View style={{ width: "60%", }} >
                                        <PercepercentageBarCourse
                                            numerator={1}
                                            denominator={3}
                                            type={"đ"}
                                            height={20}
                                            backgroundColor={"#01579B"}
                                            completedColor={'#0288D1'}
                                            percentage={'65%'}
                                        />
                                    </View>}
                            </View>
                        </View>
                    </View>
                </ItemChage >
            );
        })
    );
};

const styles = StyleSheet.create({

    styleMade: { fontSize: 10, color: '#ffffff', alignSelf: 'flex-start', backgroundColor: "#009C10", padding: 6, borderRadius: 16, fontWeight: "bold" },//đã thực hiện
    styleProcessing: { fontSize: 10, color: '#ffffff', alignSelf: 'flex-start', backgroundColor: "#FFB300", padding: 6, borderRadius: 16, fontWeight: "bold" },// đang thực hiện
    styleUnfulfilled: { fontSize: 10, color: '#525252', alignSelf: 'flex-start', backgroundColor: "#C2C2C2", padding: 6, borderRadius: 16, fontWeight: "bold" },// chưa thực hiện
    box1: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#rgba(0, 78, 170, 0.15)',
        borderRadius: 16,
        borderWidth: 2,
        marginBottom: 16,
        paddingTop: 4,
        paddingBottom: 7,
        paddingRight: 5,
        elevation: 0.1,
    },
    box2: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 7,
    },
    box3: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#0288D1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    image: {
        width: 160,
        height: 120,
        borderRadius: 12,
        marginRight: 10,

    },
    title: {
        width: '50%',
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 30,
        color: '#323232',

    },
    object: {
        color: '#0288D1',
        fontSize: 12,
        marginBottom: 3,
    },
    dateTime: {
        width: '50%',
        flexDirection: 'row',
    },
    time: {
        flexDirection: 'row',
        marginLeft: 10,
        paddingRight: 7,
        alignItems: 'center',
        fontSize: 12,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
    },
});

export default Learning;
