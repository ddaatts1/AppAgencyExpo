import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ROUTES, SVG } from '../../../constants';
import ScheduleListHome from '../../module/Schedules/ScheduleListHome';
import Course from '../components/course';
import Document from '../components/document';
import { useIsFocused } from '@react-navigation/native';
import useTraining from '../useTraining';
import LoadingReact from '../../../components/commons/loading';

const TrainingDocument = ({ navigation }: any) => {

  const { archives, isLoadingArchives, dataArchives } = useTraining();

  const focus = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        archives();
      } catch (error) { }
    };
    fetchData();
  }, [focus]);

  return (
    <>
      {isLoadingArchives ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              <Document navigation={navigation} dataArchives={dataArchives} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default TrainingDocument;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  container: {
    paddingHorizontal: 12,
    height: '100%',
  },
});
