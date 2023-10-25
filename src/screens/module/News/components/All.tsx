import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
import { ROUTES } from '../../../../constants';

const All = ({navigation, dataNews}: any) => {
    const isImage = (url: any) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    return (
        // <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={{ width: '100%', marginBottom: 12 }}>
                        <Text style={styles.headerText}>Chương trình</Text>
                    </View>
                    {dataNews?.map((item: any, index: any) => {

                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate(ROUTES.NEWSDETAIL,{
                                slug:item.slug
                            })}>
                                <View style={styles.box1}>
                                    <View style={{width: '40%', marginRight: 18}}>
                                        {isImage(item.image)  ? <Image style={styles.image} source={{ uri: item.image }}/> : <Image style = {styles.image} source={require('../../../../assets/image/logo.jpg')}/>}
                                    </View>
                                    <View style={{width: '50%'}}>
                                        <Text style={styles.headerTitle}>{item.title}</Text>
                                    </View>
                                </View>
                             </TouchableOpacity>

                        );
                    })}
                </View>
            </View>
        // </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
    },
    box: {
        width: '95%',
        marginLeft: 9,
        marginRight: 9,
        marginBottom: 300,
        marginTop: 24,
    },
    box1: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        width: '95%',
        marginTop: 50,
        marginLeft: 9,
        marginRight: 9,
        backgroundColor: '#fff',
        borderRadius: 53,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    button1: {
        width: '50%',
        borderRadius: 55,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    image: {
        // width: '40%',
        // borderRadius: 8,
        resizeMode: 'cover',
        width: 160,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    headerText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '600',
        color: '#0288D1',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        color: '#181818',
    },
});
export default All;
