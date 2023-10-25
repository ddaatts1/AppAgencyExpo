import React, { useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ROUTES, SVG } from '../../../constants';

import { useIsFocused } from '@react-navigation/native';
import useTraining from '../useTraining';
import LoadingReact from '../../../components/commons/loading';
import RenderHtml from 'react-native-render-html';
const DocumentDetail = ({ navigation, route }: any) => {
  const id = route?.params?.id;
  const { archivesDetail, isLoadingArchivesDetail, dataArchivesDetail } =
    useTraining();

  useEffect(() => {
    const fetchData = async () => {
      try {
        archivesDetail(Number(id));
      } catch (error) { }
    };
    fetchData();
  }, [id]);


  // console.log("dataArchivesDetail?.description", dataArchivesDetail.content)
  return (
    <>
      {isLoadingArchivesDetail ? (
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.container}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 24,
                  paddingHorizontal: 12,
                }}>
                <Image
                  style={styles.headerBox}
                  source={{ uri: dataArchivesDetail?.image }}
                />
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <Text
                  style={{
                    color: '#0288D1',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {dataArchivesDetail?.name}
                </Text>

                <RenderHtml
                  contentWidth={100}
                  source={{
                    html: dataArchivesDetail?.content,
                  }}
                />
                {/* <Text style={{ color: '#181818', fontSize: 16, paddingTop: 12 }}>
                  {dataArchivesDetail?.description}
                </Text> */}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingReact />
      )}
    </>
  );
};

export default DocumentDetail;
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    height: '100%',
  },
  headerBox: {
    width: '100%',
    height: 190,
    position: 'relative',
    resizeMode: 'stretch',
    // marginTop: -100
  },
  container: {
    paddingHorizontal: 12,
  },
});
