import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import Course from '../components/course';
import data from '../../../../ultidata/data';
import { EnumNavigatorTraining } from '../../../constants/enum';
import ItemCourse from '../components/itemCourse';
import useTraining from '../useTraining';
import LoadingReact from '../../../components/commons/loading';
import ItemMyCourse from '../components/itemMyCourses';

const MyCoursrs = ({ navigation }: any) => {

    const { MyCourses, isLoadingMyCourses, dataMyCourses } = useTraining();


    useEffect(() => {
        const fetchData = async () => {
            try {
                MyCourses();
            } catch (error) { }
        };
        fetchData();
    }, [])
    return (<>

        {isLoadingMyCourses ? <ScrollView>
            <View style={styles.main}>
                <View style={styles.container}>
                    <ItemMyCourse navigation={navigation} dataMyCourses={dataMyCourses} />
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
export default MyCoursrs;
