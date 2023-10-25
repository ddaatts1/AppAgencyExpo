import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import Course from '../components/course';
import data from '../../../../ultidata/data';
import { EnumNavigatorTraining } from '../../../constants/enum';
import ItemCourse from '../components/itemCourse';
import useTraining from '../useTraining';
import LoadingReact from '../../../components/commons/loading';

const FutureAcademy = ({ navigation }: any) => {
    const { Coures } = data()

    // const navigationTab = (navigation: any, name: any) => {
    //     return (<TouchableOpacity style={{ borderRadius: 12, height: 45, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }} onPress={() => navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
    //         name: name,
    //         indexRoute: EnumNavigatorTraining.TrainingDetail,
    //         navigation: navigation,

    //     })}>

    //         <Text style={{ fontSize: 18, color: "#0288D1", fontWeight: "bold", paddingRight: 20 }}>{name}</Text>

    //         <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
    //             <Text style={{ fontSize: 14, color: "#0288D1", fontWeight: "bold", paddingRight: 10 }}>Xem tất cả</Text>
    //             <SVG.Next height={25} width={25} />
    //         </View>

    //     </TouchableOpacity>)
    // }

    // const Item = (name: any) => {

    //     return (Coures.slice(0, 5).map((item, index) => {

    //         return (

    //             <View key={index} style={{
    //                 width: 160,
    //                 marginHorizontal: 6,
    //             }}>
    //                 <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TRAINING_NAVIGATOR, {
    //                     name: name,
    //                     indexRoute: EnumNavigatorTraining.StartLearning,

    //                 })}>
    //                     <Image style={styles.image} source={item.image} />
    //                 </TouchableOpacity>
    //                 <View>
    //                     <Text numberOfLines={1} style={styles.title}>Bí kíp ứng dụng chat GPT x3 năng suất </Text>
    //                     <Text style={{ color: "#0288D1", fontSize: 12 }} numberOfLines={1}>Đối tượng: Đại sứ & CTV </Text>

    //                 </View>

    //             </View>

    //         );
    //     }))

    // }

    const { Courses, isLoadingCourses, dataCourses } = useTraining();


    useEffect(() => {
        const fetchData = async () => {
            try {
                Courses();
            } catch (error) { }
        };
        fetchData();
    }, [])
    return (<>

        {isLoadingCourses ? <ScrollView>
            <View style={styles.main}>
                <View style={styles.container}>
                    <ItemCourse navigation={navigation} dataCourses={dataCourses} />
                </View>

            </View>
        </ScrollView> : <LoadingReact />

        }

    </>

    );


};


const styles = StyleSheet.create({
    title: {

        fontSize: 14,
        fontWeight: "bold",
        marginRight: 30,
        color: '#323232',

    },
    image: {
        width: 160,
        height: 92,
        borderRadius: 12,
        marginRight: 10,

    },
    main: {
        backgroundColor: "#EEFAFF",
        height: "100%"
    },
    container: {
        backgroundColor: "white",
        marginVertical: 12,
        paddingHorizontal: 12,

    },

});
export default FutureAcademy;
