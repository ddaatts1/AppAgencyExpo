import {
    StyleSheet,
    View,
    ScrollView,
  } from 'react-native';
  import React from 'react';
import NewsList from './NewsList';



const Program = ({route}:any) => {
    const  slug = route?.params?.slug;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <NewsList slug={slug} />
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

export default Program;
