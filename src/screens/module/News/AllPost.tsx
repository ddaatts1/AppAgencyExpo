import {
    StyleSheet,
    View,
    ScrollView,
  } from 'react-native';
  import React, { useEffect } from 'react';
import NewsList from './NewsList';
import AllPost from './AllPost';
import { useIsFocused } from '@react-navigation/native';
import useNews from './useNews';
import LoadingReact from '../../../components/commons/loading';
import All from './components/All';


const News = ({navigation} : any) => {

    const { news, isLoadingNews, dataNews } = useNews();
    const focus = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
        try {
            news();
        } catch (error) { }
        };
        fetchData();
    }, [focus]);

    return (
        <>
            {isLoadingNews ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <All navigation={navigation} dataNews={dataNews}/>
                </View>
                </ScrollView>
            ) : <LoadingReact/>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default News;
