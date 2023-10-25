import React from 'react';
import { Text, SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import ScheduleListHome from '../../module/Schedules/ScheduleListHome';
import Course from '../components/course';
import Learning from '../components/Learning';

const TrainingDetail = ({ navigation, route }: any) => {
    const name = route?.params?.name;
    const navigations = route?.params?.navigation;

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.container}>
                    <Learning navigation={navigations} name={name} />

                </View>


            </View>
        </ScrollView>
    );
};

export default TrainingDetail;
const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        height: "100%"
    },
    container: {

        paddingHorizontal: 12,
    },

});